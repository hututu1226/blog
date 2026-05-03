import type { CollectionEntry } from 'astro:content';
import { withBase } from './site';

export function postSlug(post: CollectionEntry<'blog'>) {
  return post.id.replace(/\.(md|mdx)$/, '');
}

export function postUrl(post: CollectionEntry<'blog'>) {
  return withBase(`/posts/${postSlug(post)}/`);
}

export function postExcerpt(post: CollectionEntry<'blog'>) {
  const firstParagraph = (post.body ?? '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```'));

  return firstParagraph?.replace(/\s+/g, ' ').slice(0, 120) || post.data.description;
}
