<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>{ nothing here yet }</div>
    </template>
    <app-link
      v-for="route in posts"
      :key="route.path"
      dark:text-white
      block
      font-normal
      mb-6
      mt-2
      no-underline
      :to="route.path"
      w-fit
    >
      <li class="no-underline">
        <div text-lg mb-1>
          {{ route.title }}
        </div>
        <div class="time opacity-50 text-sm -mt-1">
          {{ formatDate(route.date) }}
          <span v-if="route.duration" opacity-50>· {{ route.duration }}</span>
        </div>
      </li>
    </app-link>
  </ul>
</template>

<script setup lang="ts">
import { formatDate } from '~/composables'

export interface Post {
  path: string
  title: string
  date: string
  duration?: string
}

const props = defineProps<{
  type?: string
  posts?: Post[]
}>()

const router = useRouter()
const posts: Post[] = router
  .getRoutes()
  .filter(i => i.path.startsWith('/posts/') && i.meta.frontmatter.date!)
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
  )
  .filter(
    i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type
  )
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    duration: i.meta.frontmatter.duration
  }))
</script>
