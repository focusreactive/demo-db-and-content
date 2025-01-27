import 'server-only';

import type { QueryParams } from '@sanity/client';
import { draftMode } from 'next/headers';
import { sanityReadToken } from '@/environment';
import { client } from '@/sanity/client';

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && !sanityReadToken) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }

  const isDevelopment = process.env.NODE_ENV === 'development';

  return client.withConfig({ useCdn: !isDraftMode }).fetch<QueryResponse>(query, params, {
    cache: 'no-cache',
    ...(isDraftMode && {
      token: sanityReadToken,
      perspective: 'previewDrafts',
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  });
}
