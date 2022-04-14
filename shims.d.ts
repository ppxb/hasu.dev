/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: any
  }
}

// declare module 'markdown-it-table-of-contents' {
//   export { TOC as default } from 'markdown-it-table-of-contents'
// }