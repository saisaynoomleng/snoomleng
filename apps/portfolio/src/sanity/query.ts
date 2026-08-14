import { defineQuery } from 'next-sanity';

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  contactInfo,
  footerColumns,
  navigation[],
  "logoUrl": primaryLogo.asset->url,
  "logoAlt": primaryLogo.alt,
  socialLinks[]
}`);

export const HOME_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == 'siteSetting'][0]{
      contactInfo,
      "logoUrl": primaryLogo.asset->url,
      "logoAlt": primaryLogo.alt,
      socialLinks[],
      mode
  },
  "hero": *[_type == 'hero'
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
   },
  "technology": *[_type == 'technology'
   && defined(slug.current)]{
      _id,
      name,
      icon
  },
  "projects": *[_type == 'project'
   && defined(slug.current)]
    | order(createdAt){
      _id,
      name,
      "slug": slug.current,
      startedAt,
      endedAt,
      excerpt,
      links[]{
        _key,
        label,
        url
      },
      stacks[],
      type
    },
  "employments": *[_type == 'employment'
   && defined(slug.current)]
    | order(startedAt desc){
      _id,
      body,
      name,
      companyName,
      startedAt,
      endedAt
   },
  "about": *[_type == 'about'
    && slug.current == 'about'][0]{
      body,
 }
}`);
