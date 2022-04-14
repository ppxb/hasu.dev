<template>
  <div>
    <p text-3xl>創造の思考</p>
    <p mb-12>
      <em text-xl op75>I'm a full-stack devoloper based in china</em>
    </p>
    <AppLink
      v-for="(route, index) in routes"
      :key="route.path"
      :to="route.path"
    >
      <div flex flex-col text-base select-none dark:text-white mb-4>
        <p># {{ index + 1 }}</p>
        <p>{{ route.title?.toString().toUpperCase() }}</p>
      </div>
    </AppLink>
  </div>
</template>

<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
const router = useRouter()
const routes = router
  .getRoutes()
  .filter(i => i.path.startsWith('/posts/') && !i.path.endsWith('.html'))
  .map(i => ({
    path: i.path,
    title: i.name
  }))

// const routes = autoRoutes.map(i => ({
//   ...i,
//   alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`
// }))

// const posts = routes.filter(item => item.name?.toString().slice(6).length != 0)
</script>
