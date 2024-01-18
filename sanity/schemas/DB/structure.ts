import { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/desk';

export const structureDB = (S: StructureBuilder): StructureResolver => {
  return S.list()
    .id('de')
    .items([S.listItem().id('de').title('DE').child(S.documentTypeList('casino'))]);
  // return S.documentTypeList('casino');
};
