# 张强强 · UX 设计师个人网站

以黑色基底、荧光绿、细边框和动态排版为视觉参考，独立实现个人网站。技术栈为 Vite、原生 JavaScript 和 CSS。

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

构建产物位于 `dist/`，可以部署到静态托管平台。

## GitHub Pages 部署

仓库已包含 GitHub Pages 自动部署工作流。把这些文件提交到 GitHub 后：

1. 在仓库依次进入 `Settings` -> `Pages`。
2. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
3. 打开仓库的 `Actions`，等待 `Deploy to GitHub Pages` 工作流完成。
4. 页面会显示网站访问地址，通常为 `https://你的用户名.github.io/仓库名/`。

网站已使用相对资源路径，适用于 GitHub Pages 的项目地址；手机浏览器会自动使用单列卡片、折叠菜单与不小于 12px 的文字样式。

## 内容维护

- 首页和个人经历：`src/main.js`。
- AI 工具和博主数据：`src/data.js`。
- 首页猫咪照片：`public/images/home/`，来自用户提供的本地照片。
- 样式与动效：`src/style.css`。

首页动效可暂停，设置保存在本地；默认遵循系统的减少动态效果设置。网站以 hash 路由提供首页、AI 工具和 AI 博主三个页面。

个人履历来自用户提供的简历，经历截至 2023 年。未推断之后的经历或当前任职状态。Web 字体通过 Google Fonts 加载，网络不可用时使用系统中文字体。
