<template>
  <Header />
  <main px-7>
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

<style>
#app {
  height: 100vh;
}
</style>
