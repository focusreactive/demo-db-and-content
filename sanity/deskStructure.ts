// @ts-nocheck
import { DefaultDocumentNodeContext, List, ListBuilder, StructureBuilder, StructureResolver } from 'sanity/desk';
import { PreviewIFrame } from '@/sanity/preview/Preview';
import { dynamicPage } from '@/sanity/schemas/dynamicPage';
import config from '@/sanity/config';
import { PackageIcon, EarthAmericasIcon } from '@sanity/icons';
import { regions } from './schemas/regions';

const webTypes = ['dynamicPage', 'review', 'header', 'footer'];
const regionFolder = (S: StructureBuilder, region: string): typeof ListBuilder => {
  return S.list()
    .id(region)
    .items(
      webTypes.map((tp) =>
        S.listItem()
          .id(tp)
          .title(tp)
          .schemaType(tp)
          .child(
            S.documentList().id(tp).schemaType(tp).filter('country == $region && _type == $tp').params({ region, tp }),
          ),
      ),
    );
};

const commonSettings = (S: StructureBuilder) =>
  S.listItem()
    .id('settings')
    .title('Settings')
    .icon(PackageIcon)
    .child(
      S.list()
        .id('settings')
        .items(webTypes.map((tp) => S.documentTypeListItem(tp))),
    );

export const deskStructure: StructureResolver = (S) => {
  return S.list()
    .id('regions')
    .title('Regions')
    .items([
      ...regions.map((reg) =>
        S.listItem()
          .id(reg.name)
          .title(reg.title)
          .icon(() => reg.icon)
          .child(regionFolder(S, reg.name)),
      ),
      commonSettings(S),
    ]);
};

export const defaultDocumentNode = (S: StructureBuilder, { schemaType, getClient }: DefaultDocumentNodeContext) => {
  const documentsWithPreview: string[] = [dynamicPage.name];

  if (documentsWithPreview.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(PreviewIFrame)
        .options({
          client: getClient({ apiVersion: config.apiVersion }),
        })
        .title('Preview'),
    ]);
  }

  return S.document();
};
