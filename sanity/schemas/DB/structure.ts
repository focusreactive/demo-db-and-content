import { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/desk';
import dbTypes from './casino';
// const dbTypes = [casino, casinoStudio, 'payment', 'review'];

export const structureDB: StructureResolver = (S) => {
  return S.list()
    .id('db')
    .title('Database')
    .items(
      dbTypes
        .map((model) => model.name)
        .map((tp) =>
          S.listItem()
            .id(tp)
            .title(tp)
            .schemaType(tp)
            .child(S.documentList().id(tp).title(tp).schemaType(tp).filter('_type == $tp').params({ tp })),
        ),
    );
};
