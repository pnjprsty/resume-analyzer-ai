declare module 'pdf-parse' {
  interface PdfParseResult {
    text: string
    info?: any
    metadata?: any
    version?: string
    numpages?: number
    numrender?: number
  }

  function pdfParse(dataBuffer: Buffer): Promise<PdfParseResult>
  export = pdfParse
}
