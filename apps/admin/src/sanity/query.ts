import { defineQuery } from 'next-sanity';

export const LOGO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "imageUrl": primaryLogo.asset->url,
  "imageAlt": primaryLogo.alt
}`);

export const SETTING_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
    "branding": {
      siteName,
      "primaryLogo": {
        "imageUrl": primaryLogo.asset->url,
        "imageAlt": primaryLogo.alt,
      },
      "secondaryLogo": {
        "imageUrl": secondaryLogo.asset->url,
        "imageAlt": secondaryLogo.alt,
      },
      socialLinks[]{
        _key,
        icon,
        platform,
        url
      },
      contactInfo{
        city,
        email,
        githubURL,
        leetCodeURL,
        linkedInUrl,
        state
      },
      mode[],
      isAvailable,
    },

  "navigation": navigation[]{
                  _key,
                  href,
                  isButton,
                  label
                },

  "footer": {
    "columns": footerColumns[]{
      _key,
      columnLinks[]{
        _key,
        href,
        label
      }
    },
    "text": footerText
  }
}`);

export const ALL_TECH_STACK_QUERY = defineQuery(`{
  "techs": *[_type == 'technology'
 && defined(slug.current)]{
  _id,
  name,
  "slug": slug.current,
  "iconText": icon,
  type,
 },
  "total": count(*[_type == 'technology'
 && defined(slug.current)]),
   "frontendCount": count(*[_type == 'technology'
 && type == 'frontend']),
  "backendCount": count(*[_type == 'technology'
 && type == 'backend']),
  "aiCount": count(*[_type == 'technology'
 && type == 'ai']),
  "toolingCount": count(*[_type == 'technology'
 && type == 'tooling']),
  "devopsCount": count(*[_type == 'technology'
 && type == 'devops']),
  "badgeCount": count(*[_type == 'technology'
 && type == 'badge']),
  "cloudCount": count(*[_type == 'technology'
 && type == 'cloud-and-infrastructure'])
}`);

export const TECH_STACK_QUERY = defineQuery(`*[_type == 'technology'
 && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  icon,
  type,
  _id
 }`);

export const ALL_HEROES_QUERY = defineQuery(`{
    "heroes": *[_type == 'hero'
  && defined(slug.current)]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
  }, 
    "total": count(*[_type == 'hero'
              && defined(slug.current)])
}`);

export const HERO_QUERY = defineQuery(`*[_type == 'hero'
 && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  position,
  title,
  body,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  actions[]
 }`);
