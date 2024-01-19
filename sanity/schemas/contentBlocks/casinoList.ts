import { defineField, defineType } from 'sanity';
import { BiImage } from 'react-icons/bi';
import { documentTitleField } from '../common/title';
import { sectionConfigField } from '../common/section';
import { imageWithAltField } from '../common/imageWithAlt';
import { getContentBlockDefaultOptions } from '../utils/getContentBlockDefaultOptions';


export const casinoList = defineType({
  name: 'casinoList',
  title: 'Casino List',
  type: 'object',
  icon: BiImage,
  ...getContentBlockDefaultOptions({ title: documentTitleField.name }),
  fields: [
    documentTitleField,
    defineField({
      name: 'studio',
      title: 'Casinos created by',
      type: 'array',
      of: [{ type: 'reference', to: [{type: 'studio'}] }],
    }),
    sectionConfigField,
  ],
});

export default [casinoList];
