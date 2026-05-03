export const siteName = '每天进步一点点';
export const siteDescription = 'hututu1226 的个人博客，记录学习、项目和生活里的持续进步。';

export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
