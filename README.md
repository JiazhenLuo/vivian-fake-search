# Vivian Fake Search

这是一个纯静态网站，不需要 npm、React 或服务器。

## 文件结构

```text
vivian-fake-search-vscode/
├── index.html          # 页面结构与文字内容
├── css/
│   └── styles.css      # 颜色、排版、手机适配与全部视觉样式
├── js/
│   └── app.js          # 搜索、跳转、返回与文章交互
└── README.md
```

## 在 VS Code 中预览

1. 在 VS Code 中打开整个 `vivian-fake-search-vscode` 文件夹。
2. 安装扩展 **Live Server**。
3. 右键 `index.html`，选择 **Open with Live Server**。

也可以直接双击 `index.html`，但 Live Server 更接近部署后的效果。

## 修改位置

- 改页面文字或搜索结果：编辑 `index.html`。
- 改颜色、字体、间距或手机布局：编辑 `css/styles.css`。
- 改默认搜索词、点击行为或假文章正文：编辑 `js/app.js`。

默认搜索词位于 `js/app.js` 顶部：

```js
const DEFAULT_QUERY = 'spells that use dead bird feathers';
```

## 部署

部署时上传整个 `vivian-fake-search-vscode` 文件夹，保持 `css` 和 `js` 两个子文件夹的位置不变。网站入口文件是根目录的 `index.html`。

可以直接用于 Netlify Drop、GitHub Pages、Cloudflare Pages 或其他静态网站服务，不需要 build command。
