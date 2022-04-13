<template>
  <div>
    <p text-3xl>創造の思考</p>
    <p mb-6>
      <em text-xl op75>I'm a full-stuck developer based in China.</em>
    </p>
    <div>
      <div v-for="(post, index) in posts">
        <a :href="post.path" text-xl :key="post.path">
          # Post{{ index + 1 }} {{ post.name?.toString().toUpperCase() }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import autoRoutes from 'virtual:generated-pages'

const routes = autoRoutes.map(i => ({
  ...i,
  alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`
}))

const posts = routes.filter(item => item.name?.toString().slice(6).length != 0)
</script>
