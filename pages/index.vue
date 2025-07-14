<template>
  <section class="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-20">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
        Your AI Career Coach for Fresh Graduates
      </h1>
      <p class="text-lg text-gray-600 mb-10">
        Discover your ideal career path, analyze your resume, and build a personalized roadmap toward your dream job — powered by AI.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          to="/resume"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
        >
          Upload Resume
        </NuxtLink>

        <NuxtLink
          to="/roadmap"
          class="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
        >
          Get Career Roadmap
        </NuxtLink>
      </div>
    </div>

    <div class="mt-20 max-w-4xl mx-auto text-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">What Can You Do Here?</h2>
      <ul class="space-y-4 text-gray-600">
        <li>🧠 Upload your CV and let AI suggest suitable job roles</li>
        <li>📚 Get a personalized learning plan with free resources</li>
        <li>📄 Build a clean, AI-enhanced resume (Coming Soon)</li>
        <li>🎤 Practice interviews with a smart mock interviewer (Coming Soon)</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
// No specific logic for now — just UI
</script>

<style scoped>
/* Optional: any scoped styles */
</style>
