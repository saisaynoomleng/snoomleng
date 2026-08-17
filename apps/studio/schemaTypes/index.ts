import {aboutType} from './documents/aboutType'
import {blogCategoryType} from './documents/blogCategoryType'
import {blogFocusType} from './documents/blogFocusType'
import {blogType} from './documents/blogType'
import {emplopymentType} from './documents/employmentType'
import {heroType} from './documents/heroType'
import {projectType} from './documents/projectType'
import {siteSetting} from './documents/siteSetting'
import {technologyType} from './documents/technologyType'
import {blockContent, imageWithAlt, seo, socialLink} from './shareTypes'

export const schemaTypes = [
  imageWithAlt,
  blockContent,
  seo,
  socialLink,
  siteSetting,
  heroType,
  aboutType,
  technologyType,
  projectType,
  emplopymentType,
  blogCategoryType,
  blogFocusType,
  blogType,
]
