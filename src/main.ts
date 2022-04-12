import '@unocss/reset/tailwind.css'
import NProgress from 'nprogress'
import 'uno.css'
import autoRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './styles/main.css'


const routes = autoRoutes.map(i => ({
    ...i,
    alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`
}))

console.log(autoRoutes)


const scrollBehavior = (to: any, from: any, savedPosition: any) => {
    if (savedPosition)
        return savedPosition
    else
        return { top: 0 }
}

export const createApp = ViteSSG(
    App,
    { routes, scrollBehavior },
    ({ router, isClient }) => {
        if (isClient) {
            router.beforeEach(() => { NProgress.start() })
            router.afterEach(() => { NProgress.done() })
        }
    }
)
