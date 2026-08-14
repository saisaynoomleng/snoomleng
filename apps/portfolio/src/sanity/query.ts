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

export const ABOUT_QUERY = defineQuery(`*[_type == 'about'
 && slug.current == 'about'][0]{
  "workflows": workFlow[]{
    _key,
    body,
    title
  },
  body,
 }`);

export const TECHSTACK_QUERY = defineQuery(`*[_type == 'technology'
 && defined(slug.current)]{
  _id,
  name,
  icon
 }`);

export const ALL_PROJECTS_QUERY = defineQuery(`*[_type == 'project'
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
    stacks[]
}`);

export const ALL_EMPLOYMENTS_QUERY = defineQuery(`*[_type == 'employment'
 && defined(slug.current)]
  | order(startedAt desc){
  _id,
  body,
  name,
  companyName,
  startedAt,
  endedAt
 }`);
