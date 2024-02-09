'use client';

import { enableOverlays, HistoryAdapterNavigate } from '@sanity/overlays';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useLiveMode } from './useQuery';
import { client } from '../client';

// Always enable stega in Live Mode
const stegaClient = client.withConfig({
  stega: {
    enabled: true,
    studioUrl: '/admin',
    filter: (props) => {
      if (['bgColor', 'sectionConfig'].find((key) => props.sourcePath.includes(key))) {
        return false;
      }
      return props.filterDefault(props);
    },
  },
});

// Only allow same-origin Studios to connect
const allowStudioOrigin = typeof location === 'undefined' ? 'http://localhost:3000' : location.origin;

export default function VisualEditing() {
  const router = useRouter();
  const routerRef = useRef(router);
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate | undefined>();

  useEffect(() => {
    routerRef.current = router;
  }, [router]);
  useEffect(() => {
    const disable = enableOverlays({
      history: {
        subscribe: (navigate) => {
          setNavigate(() => navigate);
          return () => setNavigate(undefined);
        },
        update: (update) => {
          switch (update.type) {
            case 'push':
              return routerRef.current.push(update.url);
            case 'pop':
              return routerRef.current.back();
            case 'replace':
              return routerRef.current.replace(update.url);
            default:
              throw new Error(`Unknown update type: ${update.type}`);
          }
        },
      },
    });
    return () => disable();
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (navigate) {
      navigate({
        type: 'push',
        url: `${pathname}${searchParams?.size ? `?${searchParams}` : ''}`,
      });
    }
  }, [navigate, pathname, searchParams]);

  useLiveMode({ allowStudioOrigin, client: stegaClient });
  // useEffect(() => {
  //   // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
  //   if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && window === parent) {
  //     location.href = '/api/disable-draft';
  //   }
  // }, []);

  return null;
}
