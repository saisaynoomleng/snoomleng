import { defineQuery } from 'next-sanity';

export const MAIN_HERO_QUERY = defineQuery(`*[_type == 'hero'
 && slug.current == "home-page"][0]{
  _id,
  title,
  body,
  actions[]{
    _key,
    label,
    href
  },
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  position[],
 }`);
