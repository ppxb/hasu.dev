<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <header z-40>
    <router-link
      class="absolute lg:fixed m-6 select-none outline-none text-5xl dark:text-white"
      to="/"
      focusable="false"
    >
      蓮
    </router-link>
    <nav class="nav" text-xl mt-6 inline-flex gap-2 select-none>
      <div class="spacer" />
      <div class="right" text-base>
        <router-link to="/posts">
          <span class="lt-md:hidden">Blog</span>
          <div i-carbon-sun md:hidden />
        </router-link>
        <router-link to="/tags" class="lt-md:hidden"> Tags </router-link>
        <router-link to="/projects">
          <span class="lt-md:hidden">Projects</span>
        </router-link>
        <a
          href="https://github.com/antfu"
          target="_blank"
          title="GitHub"
          class="lt-md:hidden"
        >
          <div i-carbon-logo-github />
        </a>
        <a class="lt-md:hidden" @click="toggleDark()">
          <div v-if="isDark" i-carbon-moon></div>
          <div v-else i-carbon-sun></div>
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}
.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}
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
.nav img {
  margin-bottom: 0;
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
