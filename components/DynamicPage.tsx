import dynamic from 'next/dynamic';
import { Page } from '@/components/Page';
import { DynamicPagePayload } from '@focusreactive/cms-kit';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';
import { draftMode } from 'next/headers';

const PreviewPage = dynamic(() => import('@/components/PreviewPage'));
const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'));

export const DynamicPage = ({
  initial,
  pageSlug,
  isDraftMode,
  token,
}: {
  initial: QueryResponseInitial<DynamicPagePayload>;
  pageSlug: string;
  isDraftMode: boolean;
  token: string;
}) => {
  if (isDraftMode && token) {
    return (
      <>
        <PreviewPage initial={initial} params={{ slug: pageSlug }} />
        {draftMode().isEnabled && <VisualEditing />}
      </>
    );
  }

  // @ts-ignore
  return <Page page={initial.data} />;
};
