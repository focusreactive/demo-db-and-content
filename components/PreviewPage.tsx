'use client';

import { QueryParams } from '@sanity/client';
import { Page } from '@/components/Page';
import { PAGE_CONTENT_QUERY } from '@/model/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';
import { DynamicPagePayload } from '@focusreactive/cms-kit';

const PreviewPage = ({
  initial,
  params,
}: {
  initial: QueryResponseInitial<DynamicPagePayload | null>;
  params: QueryParams;
}) => {
  const { data } = useQuery<DynamicPagePayload | null>(PAGE_CONTENT_QUERY, params, { initial });

  // @ts-ignore
  return <Page page={data} />;
};

export default PreviewPage;
