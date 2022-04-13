import vue from '@vitejs/plugin-vue'
import path from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Componets from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    vue({
      reactivityTransform: true,
      include: [/\.vue$/, /\.md$/]
    }),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Markdown({
      // wrapperComponent: 'post',
      headEnabled: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
        'pinia'
      ],
      dts: true,
    }),
    Componets({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
    Unocss({
      theme: {
        fontFamily: {
          sans: '"游明朝","Yu Mincho",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji'
        }
      }
    })
  ]
})
