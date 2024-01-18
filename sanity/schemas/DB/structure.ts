import { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/desk';
import dbTypes from './casino';

export const structureDB: StructureResolver = (S) => {
  return S.list()
    .id('de')
    .items([S.listItem().id('de').title('DE').child(S.documentTypeList('casino'))]);
  // return S.documentTypeList('casino');
};
