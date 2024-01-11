import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'GeekDAO',
  description: '代码创造生活',
  lastUpdated: true,
  // 详见：https://vitepress.dev/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    lastUpdatedText: '上次更新于',
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '手写代码',
        link: '/coding/js'
      },
      {
        text: '算法',
        link: '/coding/algorithm/'
      },
      { text: '关于我', link: 'https://github.com/geekdao-info' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/geekdao-info'
      }
    ]
  }
})
