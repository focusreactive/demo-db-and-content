'use client';

import { useEffect } from 'react';
import { enableOverlays } from '@sanity/overlays';
import { useLiveMode } from '@/sanity.config';

export const VisualEditingOverlay = () => {
  useEffect(() => enableOverlays(), []);

  useLiveMode({ allowStudioOrigin: 'https://localhost:3000' });

  return null;
};
