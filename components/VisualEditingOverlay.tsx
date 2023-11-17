'use client';

import { useEffect } from 'react';
import { enableOverlays } from '@sanity/overlays';

export const VisualEditingOverlay = () => {
  useEffect(enableOverlays, []);

  return null;
};
