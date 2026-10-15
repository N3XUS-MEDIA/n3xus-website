'use client';

import { useEffect } from 'react';
import { captureSource, persistSource } from '@/lib/source';
import { subscribeConsent } from '@/lib/consent';

/**
 * Works out where the visit came from and keeps it in memory; writes it to the
 * session only when analytics is accepted — now, or later in the visit.
 * Renders nothing.
 */
export function SourceCapture() {
  useEffect(() => {
    captureSource();
    return subscribeConsent(persistSource);
  }, []);
  return null;
}
