import { defineQuery } from 'next-sanity';

export const ALL_BLOGS_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)]{
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

export const ALL_CATEGORIES_QUERY = defineQuery(`*[_type == 'blogCategory'
 && defined(slug.current)]
  | order(_createdAt desc){
    _id,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    name,
    "slug": slug.current
  }`);

export const BLOGS_BY_CATEGORY_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)
 && category->name match $category]{
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

export const BLOG_QUERY =
  defineQuery(`*[_type == 'blog' && slug.current == $slug][0]{
  name,
  publishedAt,
  body,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "category": category->name,
  "categorySlug": category->slug.current,
  "focus": focus->name,
  "seo": seo{
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url
  },
  "relatedBlogs": *[_type == 'blog'
    && defined(slug.current)
    && category._ref == ^.category._ref
    && slug.current != $slug
  ]{
   _id,
    name,
    "slug": slug.current,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    'imageAlt': mainImage.alt,
    excerpt,
    "focus": focus->name,
    "category": category->name
  }
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "logoUrl": secondaryLogo.asset->url,
  "logoAlt": secondaryLogo.alt,
  socialLinks[]{
    _key,
    icon,
    platform,
    url
  },
}`);

export const SEARCH_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)
 && (
   !(defined($search))
    || name match text::query($search)
    || category->name match text::query($search)
    || focus->name match text::query($search)
 )]
  | order(publishedAt desc)
  {
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
