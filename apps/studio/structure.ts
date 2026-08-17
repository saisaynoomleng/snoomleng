import {StructureResolver} from 'sanity/structure'

import {CiSettings} from 'react-icons/ci'
import {MdCategory, MdOutlineViewQuilt} from 'react-icons/md'
import {GiFiles, GiNewspaper, GiStairsGoal, GiSuitcase} from 'react-icons/gi'
import {FaLaptopCode, FaLinux} from 'react-icons/fa'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('snoomleng')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSetting').title('Settings').icon(CiSettings),
      S.documentTypeListItem('hero').title('Page Heroes').icon(MdOutlineViewQuilt),
      S.documentTypeListItem('about').title('About Me').icon(GiStairsGoal),
      S.documentTypeListItem('technology').title('Tech Stacks').icon(FaLinux),
      S.documentTypeListItem('project').title('Projects').icon(GiFiles),
      S.documentTypeListItem('employment').title('Employment Histories').icon(GiSuitcase),

      S.divider().title('Blogs'),
      S.documentTypeListItem('blogCategory').title('Categories').icon(MdCategory),
      S.documentTypeListItem('blogFocus').title('Focus').icon(FaLaptopCode),
      S.documentTypeListItem('blog').title('Blogs').icon(GiNewspaper),
    ])
