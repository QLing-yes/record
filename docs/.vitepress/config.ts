import { DefaultTheme, defineConfig } from 'vitepress';
// import { envParse } from 'vite-plugin-env-parse' //自动生成 ImportMetaEnv
import pressAuto from "./vitepress-auto";
// https://vitepress.yiov.top/plugin.html
// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Blog',
  description: 'VitePress',
  // #region fav
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
  ],
  // base: '/',
  base: '/record/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  metaChunk: true,
  // mpa: true,
  lastUpdated: true,


  //多语言
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      // label: 'English',
      label: '暂无其他语言版本',
      lang: 'en-US',// 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/en/',
    },
  },

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: false,
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
  },

  themeConfig: {
    logo: '/logo.svg', //左上角logo
    // siteTitle: 'Hello World',//设置站点标题 会覆盖title
    nav: [
      { text: '🏡 首页', link: "/index" },
      {
        text: '🗂 分类',
        items: [
          { text: '📔 笔记', link: '/notes/web/✨元素相关' },
        ]
      },
      { text: '💬 留言', link: "/nav/msg" },
    ],
    // sidebar: pressAuto({ path: '/notes' }),
    sidebar: {
      "/": pressAuto({ path: '/notes' }),
      // "/notes/": pressAuto({ path: '/notes' })
    },

    //本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {

          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  navigateText: '切换',
                  selectText: '选择',
                  closeText: '关闭',
                },
              }
            }
          },

        },
      },
    },
    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/QLing-yes' },
    ],
    //页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 备案号：<a href="https://beian.miit.gov.cn/">京****号</a>',
    },
    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },
    //编辑本页
    editLink: {
      pattern: 'https://github.com/QLing-yes/record/edit/main/docs/:path',
      text: '编辑本页'
    },
    lastUpdated: {
      text: '最后更新于',
    },
    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    }

  },

  vite: {
    // plugins: [envParse()]
  },
  vue: {
    // @vitejs/plugin-vue 选项
  }
});
