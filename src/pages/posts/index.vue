<script setup lang="ts">
import autoRoutes from 'virtual:generated-pages'

const routes = autoRoutes.map(i => ({
  ...i,
  alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`
}))

const posts = routes.filter(item => item.name?.toString().slice(6).length != 0)
</script>

<template>
  <div>
    <h1 text-4xl mb-2>Posts</h1>
    <div v-for="post in posts">
      <a :href="post.path" text-xl>
        {{ post.name?.toString().toUpperCase() }}
      </a>
    </div>
  </div>
</template>
