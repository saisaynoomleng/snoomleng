import { defineQuery } from 'next-sanity';

export const ALL_BLOGS_QUERY_DESC = defineQuery(`{
  "blogs": *[_type == 'blog'
 && defined(slug.current)]
  | order(publishedAt desc)
  [$startIndex...$endIndex]{
    _id,
    name,
    "slug": slug.current,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    'imageAlt': mainImage.alt,
    excerpt,
    "focus": focus->name,
    "category": category->name
  },
  "total": count(*[_type == 'blog'
                && defined(slug.current)])
}`);

export const ALL_BLOGS_QUERY_ASC = defineQuery(`{
  "blogs": *[_type == 'blog'
 && defined(slug.current)]
  | order(publishedAt asc)
  [$startIndex...$endIndex]{
    _id,
    name,
    "slug": slug.current,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    'imageAlt': mainImage.alt,
    excerpt,
    "focus": focus->name,
    "category": category->name
  },
  "total": count(*[_type == 'blog'
                && defined(slug.current)])
}`);

export const BLOG_LOGO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "imageUrl": secondaryLogo.asset->url,
  "imageAlt": secondaryLogo.alt
}`);
