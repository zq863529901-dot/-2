# 张强强 · UX 设计师个人网站

以 Swash 网站的黑色基底、荧光绿、细边框和动态排版为视觉参考，独立实现个人网站。技术栈为 Vite、原生 JavaScript 和 CSS。

## 本地预览

```sh
npm install
npm run dev -- --port 5173
```

打开 http://127.0.0.1:5173/ 。

## 构建

```sh
npm run build
npm run preview
```

构建产物位于 `dist/`，可以部署到静态托管平台。当前尚未部署到互联网。

## 内容维护

- 首页和个人经历：`src/main.js`。
- 收藏数据：`src/data.js`。AI 网站与博主列表目前为空，页面显示预留状态。
- 首页猫咪照片：`public/images/home/`，来自用户提供的本地照片。
- 样式与动效：`src/style.css`。

首页动效可暂停，设置保存在本地；默认遵循系统的减少动态效果设置。网站以 hash 路由提供首页、AI 网站和博主三个页面。

个人履历来自用户提供的简历，经历截至 2023 年。未推断之后的经历或当前任职状态。Web 字体通过 Google Fonts 加载，网络不可用时使用系统中文字体。
