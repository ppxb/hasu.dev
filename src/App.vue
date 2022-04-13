<template>
  <Navbar />
  <main px-7 py-10>
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
