import { DefaultTheme, defineConfig } from 'vitepress';
import pressAuto from "./vitepress-auto";

// https://vitepress.yiov.top/plugin.html
// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Record',
  description: 'VitePress',
  // base: '/',
  base: '/record/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  metaChunk: true,
  // mpa: true,
  lastUpdated: true,

  themeConfig: {
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/QLing-yes' },
    ],
    nav: [
      { text: '首页', link: "/index" },
      { text: '留言', link: "/msg" },
    ],
    sidebar: pressAuto({
      path: '/notes',
    })
  },
  vite: {},
  vue: {
    // @vitejs/plugin-vue 选项
  }
});
