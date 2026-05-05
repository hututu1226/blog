import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const categories = ['知识管理', '项目', '阅读', '生活杂谈'];

function parseArgs() {
  const args = process.argv.slice(2);
  const values = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = args[index + 1];
    values[key] = next && !next.startsWith('--') ? next : 'true';
    if (next && !next.startsWith('--')) index += 1;
  }
  return values;
}

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    .toLowerCase()
    || `post-${Date.now()}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

async function askMissing(values) {
  const rl = readline.createInterface({ input, output });
  const result = { ...values };

  if (!result.title) result.title = await rl.question('文章标题：');
  if (!result.description) result.description = await rl.question('文章摘要：');
  if (!result.category) {
    const answer = await rl.question(`分类（${categories.join(' / ')}）：`);
    result.category = answer || '生活杂谈';
  }
  if (!result.tags) result.tags = await rl.question('标签（用逗号分隔，可空）：');
  if (!result.date) result.date = today();
  if (!result.slug) result.slug = slugify(result.title);

  rl.close();
  return result;
}

const values = await askMissing(parseArgs());
const category = categories.includes(values.category) ? values.category : '生活杂谈';
const tags = String(values.tags || '')
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean);

const filename = `${values.date}-${slugify(values.slug)}.md`;
const dir = path.join(process.cwd(), 'src', 'content', 'blog');
const filePath = path.join(dir, filename);

if (existsSync(filePath)) {
  console.error(`文件已存在：${filePath}`);
  process.exit(1);
}

const content = `---
title: ${yamlQuote(values.title)}
description: ${yamlQuote(values.description)}
pubDate: ${values.date}
category: ${yamlQuote(category)}
tags: [${tags.map(yamlQuote).join(', ')}]
draft: false
---

这里开始写正文。
`;

await mkdir(dir, { recursive: true });
await writeFile(filePath, content, 'utf8');
console.log(`已创建文章：${filePath}`);
