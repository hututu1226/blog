# 每天进步一点点

一个基于 Astro 的个人博客，首版部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev
```

本地预览默认可访问：

```text
http://127.0.0.1:4321/blog/
```

## 新增文章

在 `src/content/blog/` 下新增 Markdown 文件，并填写 frontmatter：

```md
---
title: 文章标题
description: 文章摘要
pubDate: 2026-05-03
category: 成长记录
tags: [博客, 记录]
draft: false
---

正文内容
```

## 部署

推送到 GitHub 仓库 `hututu1226/blog` 后，GitHub Actions 会自动构建并发布到 GitHub Pages。

首版地址：

```text
https://hututu1226.github.io/blog/
```

在仓库 Settings -> Pages 中，将 Source 设置为 GitHub Actions。
