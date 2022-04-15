import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'
import './styles/markdown.css'
import './styles/prose.css'

import autoRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import type { RouterScrollBehavior } from 'vue-router'

const routes = autoRoutes.map(i => ({
    ...i,
    alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`
}))

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
    if (savedPosition)
        return savedPosition
    else
        return { top: 0 }
}

export const createApp = ViteSSG(
    App,
    { routes, scrollBehavior }
)
