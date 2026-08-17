import { defineQuery } from 'next-sanity';

export const ALL_BLOGS_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)]
  | order(publishedAt desc){
    _id,
    name,
    "slug": slug.current,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    'imageAlt': mainImage.alt,
    excerpt,
    "focus": focus->name,
    "category": category->name
  }`);

export const BLOG_LOGO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "imageUrl": secondaryLogo.asset->url,
  "imageAlt": secondaryLogo.alt
}`);
