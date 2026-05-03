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

## 内容目录

```text
src/content/blog/      博客文章 Markdown
public/gallery/        照片墙图片和视频
public/attachments/    PDF、Word、PPT、压缩包等附件
```

## 新增文章

在 `src/content/blog/` 下新增 Markdown 文件，并填写 frontmatter：

```md
---
title: 文章标题
description: 文章摘要
pubDate: 2026-05-04
category: 知识管理
tags: [博客, 记录]
draft: false
---

正文内容
```

当前分类建议使用：`知识管理`、`项目`、`阅读`、`生活杂谈`。

## 新增照片或视频

1. 把文件放到 `public/gallery/`
2. 打开 `src/pages/gallery.astro`
3. 在 `galleryItems` 数组里新增一项

```js
{
  type: 'image',
  src: '/gallery/photo.jpg',
  title: '照片标题',
  description: '照片描述'
}
```

视频把 `type` 改成 `video`，`src` 指向 `.mp4` 文件。

## 添加附件

1. 把附件放到 `public/attachments/`
2. 在文章里用 Markdown 链接引用

```md
[下载附件](/attachments/file.pdf)
```

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
