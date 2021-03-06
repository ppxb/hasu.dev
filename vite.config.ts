import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import matter from 'gray-matter'
import { default as anchor, default as archor } from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-ignore
import TOC from 'markdown-it-table-of-contents'
import Prisma from 'markdown-it-prism'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Componets from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ]
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat'
    ]
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        const md = fs.readFileSync(path, 'utf-8')
        const { data } = matter(md)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data })
      }
    }),
    Markdown({
      wrapperComponent: 'Post',
      headEnabled: true,
      wrapperClasses: 'prose m-auto',
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Prisma)
        md.use(archor, {
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' })
          })
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3],
        })

      }
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head'
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Componets({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Unocss()
  ],
  ssgOptions: {
    formatting: 'minify',
    format: 'cjs'
  }
})
