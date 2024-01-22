import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: '哈希熊猫',
  description: '代码创造生活',
  lastUpdated: false,
  // 详见：https://vitepress.dev/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    lastUpdatedText: '上次更新于',
    logo: '/logo.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vue3', link: '/vue3/' },
      {
        text: '手写代码',
        link: '/coding/js/'
      },
      {
        text: '算法',
        link: '/coding/algorithm/'
      },
      {
        text: '规范',
        items: [
          { text: 'git', link: '/spec/git/git-branch' }
        ]
      },
      { text: '关于我', link: 'https://github.com/hash-panda' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/hash-panda'
      }
    ]
  }
})
