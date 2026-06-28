# Urban Garden App Prototype

基于 Figma 故事版整理出的线上用户与城市农夫双角色原型。项目使用 Vite + 原生 HTML/CSS/JavaScript，界面按 iPhone 17 逻辑尺寸设计，最大预览约为 402 × 874 CSS px。

## Index 3 双角色版本

- Vite 默认入口使用 `src/main3.js` 与 `src/styles3.css`
- 线上用户与城市农夫拥有独立导航和任务流程
- 田地视频页使用底部全宽订阅主按钮
- `index3.html` 可直接双击离线打开
- `?mode=figma` 展示全部实际页面流程板

```bash
npm run build:index3
```

## 功能范围

- 按城市浏览农夫管理的田地与田间影像
- 田地频道点赞、评论、分享与田地信息展示
- 订阅与共同认养两种参与方式；同一田地支持多用户订阅
- 订阅后解锁 Farmer Space Introduction、田间视频、环境声音与照片
- 订阅者成长动态、社区提案、投票与农夫自主决定机制
- 订阅者现场探访申请与个人参与记录

## 本地运行

```bash
npm install
npm run dev
```

启动后打开：

```text
http://127.0.0.1:5173/
```

兼容入口：

```text
http://127.0.0.1:5173/index2.html
```

根路径和 `index2.html` 显示同一版本。按住 `Ctrl` 后滚动鼠标滚轮可缩放整台手机原型，缩放比例会自动记住。

`index2.html` 是自包含离线版本，可以直接双击打开。Vite 页面有更新后，运行下面的命令重新同步：

```bash
npm run build:standalone
```

不要直接双击源码目录里的 `index.html` 作为主要预览方式；它是 Vite 入口文件，需要开发服务器处理模块和样式。需要查看静态构建时，先运行 `npm run build`，再使用服务器打开 `dist` 目录。

## 版本策略

详见 `docs/versioning.md`。当前版本为 `0.1.0`，用于毕业设计服务 App 的可交互初版。
