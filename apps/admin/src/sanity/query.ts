import { defineQuery } from 'next-sanity';

export const LOGO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "imageUrl": primaryLogo.asset->url,
  "imageAlt": primaryLogo.alt
}`);
