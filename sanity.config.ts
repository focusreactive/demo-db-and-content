import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { media } from 'sanity-plugin-media';
import { DatabaseIcon, EarthGlobeIcon, CodeBlockIcon } from '@sanity/icons';

import { locate } from '@/sanity/utils/locate';
import { schemaTypes } from '@/sanity/schemas';
import { structureDB } from '@/sanity/schemas/DB/structure';
import config from '@/sanity/config';
import { defaultDocumentNode, deskStructure } from '@/sanity/deskStructure';
import { client } from '@/sanity/client';
import { createQueryStore } from '@sanity/react-loader';

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

export default defineConfig({
  name: 'default',
  title: 'Next.js + Sanity MVP',

  basePath: '/admin',

  ...config,

  plugins: [
    deskTool({
      name: 'content',
      title: 'Content',
      icon: EarthGlobeIcon,
      structure: deskStructure,
      defaultDocumentNode,
    }),
    deskTool({
      name: 'database',
      title: 'Database',
      icon: DatabaseIcon,
      structure: structureDB,
      defaultDocumentNode,
    }),
    presentationTool({
      name: 'preview',
      title: 'Visual Editing',
      previewUrl: {
        origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.origin,
        draftMode: {
          enable: '/api/draft',
        },
      },
      locate,
    }),

    media(),
    visionTool({ name: 'playground', title: 'GROQ', icon: CodeBlockIcon }),
    colorInput(),
  ],

  schema: {
    // @ts-ignore
    types: schemaTypes,
  },
});

export const { loadQuery, useQuery, useLiveMode } = createQueryStore({
  client,
});
