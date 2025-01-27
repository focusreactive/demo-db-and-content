import { defineArrayMember, defineField, defineType } from 'sanity';
import { logos } from './contentBlocks/logos';
import { capabilities } from './contentBlocks/capabilities';
import { about } from './contentBlocks/about';
import { hero } from './contentBlocks/hero';
import { customerSpotlight } from './contentBlocks/customerSpotlight';
import { documentTitleField } from './common/title';
import { CgCollage } from 'react-icons/cg';
import { header } from './common/header';
import { footer } from './common/footer';
import { regions } from './regions';
import { casinoList } from './contentBlocks/casinoList';

export const dynamicPage = defineType({
  name: 'dynamicPage',
  title: 'Dynamic Page',
  type: 'document',
  icon: CgCollage,
  groups: [
    {
      name: 'seoGroup',
      title: 'SEO',
    },
  ],
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    documentTitleField,
    defineField({
      name: 'country',
      title: 'For Country',
      type: 'string',
      options: {
        list: regions.map((reg) => ({ value: reg.name, title: reg.title })),
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Metatags',
      type: 'seo',
      group: 'seoGroup',
      fieldset: 'seo',
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'reference',
      to: [{ type: header.name }],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      to: [{ type: footer.name }],
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      of: [hero, logos, capabilities, about, customerSpotlight, casinoList].map((block) =>
        defineArrayMember({ type: block.name }),
      ),
    }),
  ],
});
