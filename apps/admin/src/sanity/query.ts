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
