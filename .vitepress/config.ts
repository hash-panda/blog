import { defineConfig } from "vitepress";
import weiboLogo from "../assets/weibo.svg";
export default defineConfig({
  title: "geekDAO的博客",
  description: "记录思考、工作、生活",
  lastUpdated: true,
  head: [["meta", { name: "theme-color", content: "#2d26fc" }]],
  themeConfig: {
    logo: "/assets/logo.png",
    nav: [
      { text: "前端", link: "/fe/", activeMatch: "/fe/" },
      { text: "web3", link: "/web3/", activeMatch: "/web3/" },
      { text: "思考", link: "/blog/", activeMatch: "/blog/" },
    ],
    socialLinks: [
      { icon: { svg: weiboLogo }, link: "https://weibo.com/u/7565123862" },
      { icon: "twitter", link: "https://twitter.com/geek_dao" },
      { icon: "github", link: "https://github.com/geekdao-info" },
    ],
    footer: {
      message: "记录生活、工作碎碎事",
      copyright: "Copyright © 2023-present geekDAO",
    },
    //   carbonAds: {
    //     code: '',
    //     placement: 'geekdao.info',
    //   },
    //   algolia: {
    //     appId: '',
    //     appKey: '',
    //   }
  },
});
