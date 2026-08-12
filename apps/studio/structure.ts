import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('snoomleng')
    .items([S.divider().title('Operations')])
