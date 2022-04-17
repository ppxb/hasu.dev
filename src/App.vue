<template>
  <Header />
  <main px-7 mt-18>
    <router-view />
    <Footer />
  </main>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Hasu Chen' },
    { name: 'description', content: "Hasu Chen's personal website" }
  ]
})
</script>
