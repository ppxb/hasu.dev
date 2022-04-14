<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <header z-99>
    <router-link
      class="absolute lg:fixed m-6 select-none outline-none text-4xl dark:text-white"
      to="/"
    >
      蓮
    </router-link>
    <nav class="nav" text-xl inline-flex gap-2 select-none>
      <div class="spacer" />
      <div class="right" text-base>
        <router-link to="/posts">
          <span class="lt-md:hidden">Blog</span>
          <div i-carbon-align-box-bottom-center md:hidden />
        </router-link>
        <router-link to="/tags">
          <span class="lt-md:hidden">Tags</span>
          <div i-carbon-hashtag md:hidden></div>
        </router-link>
        <router-link to="/projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-carbon-gradient md:hidden></div>
        </router-link>
        <a href="https://github.com/ppxb" target="_blank" title="GitHub">
          <div i-carbon-logo-github />
        </a>
        <a @click="toggleDark()">
          <div v-if="isDark" i-carbon-moon></div>
          <div v-else i-carbon-sun></div>
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}
.nav > * {
  margin: auto;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}
.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}
.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}
.nav .right > * {
  margin: auto;
}
</style>
