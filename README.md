# 每天进步一点点

一个基于 Astro 的个人博客，后续计划部署到腾讯云 EdgeOne Pages，并绑定独立域名 `hututu1226.top`。

## 本地开发

```bash
npm install
npm run dev
```

本地预览默认可访问：

```text
http://127.0.0.1:4321/
```

## 新增文章

推荐两种方式。

### 在 GitHub 网页新增

1. 打开仓库 `hututu1226/blog`
2. 进入 `src/content/blog`
3. 复制 `_template.md` 的结构
4. 点击 `Add file -> Create new file`
5. 新建一个 `.md` 文件
6. 提交后部署平台会自动构建更新

### 在本地新增

在 `src/content/blog/` 下新增 Markdown 文件，并填写 frontmatter：

```md
---
title: 文章标题
description: 文章摘要
pubDate: 2026-05-03
category: 知识管理
tags: [博客, 记录]
draft: false
---

正文内容
```

当前分类建议使用：`知识管理`、`项目`、`阅读`、`生活杂谈`。

## EdgeOne Pages 部署参数

连接 GitHub 仓库 `hututu1226/blog` 后使用：

```text
构建命令：npm run build
输出目录：dist
Node 版本：22
```

域名绑定完成后，正式访问地址：

```text
https://hututu1226.top/
```
