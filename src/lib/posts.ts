import type { CollectionEntry } from 'astro:content';
import { withBase } from './site';

export function postSlug(post: CollectionEntry<'blog'>) {
  return post.id.replace(/\.(md|mdx)$/, '');
}

export function postUrl(post: CollectionEntry<'blog'>) {
  return withBase(`/posts/${postSlug(post)}/`);
}
