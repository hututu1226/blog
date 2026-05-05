import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

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

function sanitizeFileName(name) {
  const parsed = path.parse(name);
  const base = parsed.name
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    .toLowerCase()
    || `media-${Date.now()}`;
  return `${base}${parsed.ext.toLowerCase()}`;
}

function inferType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.mp4', '.webm', '.mov'].includes(ext)) return 'video';
  return 'image';
}

async function askMissing(values) {
  const rl = readline.createInterface({ input, output });
  const result = { ...values };

  if (!result.file) result.file = await rl.question('图片/视频文件路径：');
  if (!result.title) result.title = await rl.question('标题：');
  if (!result.description) result.description = await rl.question('描述：');
  if (!result.type) result.type = inferType(result.file);

  rl.close();
  return result;
}

const values = await askMissing(parseArgs());
const sourcePath = path.resolve(String(values.file).replace(/^"|"$/g, ''));

if (!existsSync(sourcePath)) {
  console.error(`文件不存在：${sourcePath}`);
  process.exit(1);
}

const galleryDir = path.join(process.cwd(), 'public', 'gallery');
const dataPath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
const fileName = sanitizeFileName(path.basename(sourcePath));
const targetPath = path.join(galleryDir, fileName);

await mkdir(galleryDir, { recursive: true });
await copyFile(sourcePath, targetPath);

const raw = await readFile(dataPath, 'utf8');
const items = JSON.parse(raw);
items.unshift({
  type: values.type === 'video' ? 'video' : 'image',
  src: `/gallery/${fileName}`,
  title: values.title,
  description: values.description
});

await writeFile(dataPath, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
console.log(`已导入媒体：${targetPath}`);
console.log(`已更新照片墙：${dataPath}`);
