// server/api/parse-resume.ts
import { IncomingForm } from 'formidable'
import fs from 'fs'
import pdfParse from 'pdf-parse'
import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY // pastikan sudah diset
})

export default defineEventHandler(async (event) => {
  const form = new IncomingForm({ keepExtensions: true })

  const file = await new Promise<any>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) return reject(err)
      resolve(files.file?.[0] || files.file)
    })
  })

  const buffer = fs.readFileSync(file.filepath)
  const data = await pdfParse(buffer)

  let text = data.text

  // 🔒 Filter data sensitif
text = text
  // Email
  .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi, 'user@example.com')

  // Nomor HP
  .replace(/(\+62|62|0)8[1-9][0-9]{7,11}/g, '+62 812-XXXX-XXXX')
  .replace(/(\+?\d{1,3}[\s\-]?)?(\(?\d{2,4}\)?[\s\-]?)?\d{3,4}[\s\-]?\d{4}/g, '+XX XXXX-XXXX') // versi global

  // Alamat / Address
  .replace(/\b(Address\.?|Jl\.?|Jalan|Street|St\.?)\s[\s\S]{0,40}?(Kota|City|Kab\.?|Province|State|Indonesia)?\b/gi, 'Jl. Street City')

  // Tanggal lahir / Date of birth
  .replace(/\b(Date of Birth|DOB|Tanggal Lahir)[:\-]?\s*\d{1,2}[\/\-\s](\d{1,2}|\w{3,9})[\/\-\s]\d{2,4}\b/gi, 'Date of Birth: 01 Jan 1990')
  .replace(/\b\d{1,2}[\/\-\s](\d{1,2}|\w{3,9})[\/\-\s]\d{2,4}\b/gi, '01 Jan 1990')

  // Tempat lahir / Place of birth
  .replace(/\b(Birth|Tempat Lahir|Place of Birth)[:\-]?\s*\w+/gi, 'Place of Birth: City')

  // NIK / National ID
  .replace(/\b\d{16}\b/g, '123456**********')

  // Nama lengkap jika eksplisit
  .replace(/\b(Nama|Full Name)[:\-]?\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/gi, 'Full Name: John Doe')

if (!text || text.trim() === '') {
 throw new Error('PDF tidak bisa dibaca. Kemungkinan file hanya berisi gambar (bukan teks). Silakan unggah PDF yang dibuat dari Word atau editor teks serupa.')

}
console.log(`✅ Ini isinya: ${text}`)

  const prompt = `
Berikut adalah isi resume pengguna. Berikan jawaban terstruktur terhadap 5 poin ini:
1. Job role yang cocok
2. Arah karier pribadi
3. Rencana belajar selama 3 bulan (mingguan)
4. Kekurangan dalam skill atau info
5. Saran perbaikan resume

Resume:
${text}
`

  // Kirim ke Groq
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    temperature: 0.8,
    max_tokens: 1024,
    top_p: 1,
    stream: false
  })

  const response = chatCompletion.choices?.[0]?.message?.content || 'No response'

  return { analysis: response }
})
