'use client';

import { useEffect } from 'react';
import { captureSource } from '@/lib/source';

/** Records where the visit came from, once per session. Renders nothing. */
export function SourceCapture() {
  useEffect(() => {
    captureSource();
  }, []);
  return null;
}
