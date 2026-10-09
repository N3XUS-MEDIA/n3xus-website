'use client';

import { Button } from '@/ui/primitives/Button';

/** The browser's own "Save as PDF" is the report's PDF; print CSS does the rest. */
export function PrintButton() {
  return (
    <Button variant="secondary" onClick={() => window.print()}>
      Save as PDF
    </Button>
  );
}
