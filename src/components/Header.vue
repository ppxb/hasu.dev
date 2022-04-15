<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 h-$h-header-height px-6 bg-white dark:bg-dark-800 !bg-opacity-80 backdrop-blur"
  >
    <div
      class="max-w-screen-lg mx-auto h-full flex justify-between items-center"
    >
      <router-link
        class="text-2xl font-bold select-none outline-none dark:text-white"
        focusable="false"
        to="/"
      >
        蓮
      </router-link>
      <nav class="nav">
        <router-link to="/posts">
          <span class="lt-md:hidden">Posts</span>
          <div i-ri-article-line md:hidden />
        </router-link>
        <router-link to="/tags">
          <span class="lt-md:hidden">Tags</span>
          <div i-ri-hashtag md:hidden></div>
        </router-link>
        <router-link to="/about">
          <span class="lt-md:hidden">About</span>
          <div i-ri-bear-smile-line md:hidden></div>
        </router-link>
        <a href="https://github.com/ppxb" target="_blank" title="GitHub">
          <div i-uil-github-alt />
        </a>
        <a @click="toggleDark()">
          <div v-if="isDark" i-ri-moon-line></div>
          <div v-else i-ri-sun-line></div>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.7;
  outline: none;
  padding: 0.5rem;
}
.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
