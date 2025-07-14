<template>
  <section class="min-h-screen py-20 px-6 bg-gray-50">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
        Upload Your Resume (PDF)
      </h1>

      <p class="mb-4 text-gray-600">
        The generated insights will be based on the following 5 key points:
      </p>
      <ol class="list-decimal list-inside mb-6 text-gray-600">
        <li>Recommended job roles</li>
        <li>Suggested career direction</li>
        <li>3-month learning roadmap (weekly)</li>
        <li>Skill gaps or missing information</li>
        <li>Resume improvement suggestions</li>
      </ol>

      <p class="text-sm text-gray-500 italic mb-8">
        Please avoid uploading resumes that contain sensitive personal data such as phone numbers or full addresses. We do apply automatic masking, but keeping your data private is always the safest practice.
      </p>

      <form @submit.prevent="uploadResume" class="bg-white p-6 rounded-xl shadow-md space-y-4">
        <input type="file" accept=".pdf" @change="handleFileChange" class="block w-full" />

        <button
          type="submit"
          :disabled="!selectedFile || loading"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {{ loading ? 'Uploading...' : 'Upload and Analyze' }}
        </button>
      </form>

      <div v-if="parsedData" class="mt-10">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">AI-Powered Resume Analysis</h2>
        <div
          class="prose prose-slate max-w-none bg-white p-6 rounded-lg shadow"
          v-html="parsedData"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { marked } from 'marked'

const selectedFile = ref<File | null>(null)
const parsedData = ref('')
const loading = ref(false)

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  selectedFile.value = file || null
}

async function uploadResume() {
  if (!selectedFile.value) return
  loading.value = true

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const res = await $fetch('/api/parse-resume', {
      method: 'POST',
      body: formData,
    })

    // Show analysis as markdown if available
    parsedData.value = marked(res.analysis || res.text || '')
  } catch (err: any) {
  const errorMessage = err?.data?.message || err?.message || 'Unknown error'
  parsedData.value = `<pre class="text-red-600">Error: ${errorMessage}</pre>`
  } finally {
    loading.value = false
  }
}
</script>
