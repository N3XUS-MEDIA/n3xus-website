'use client';

import { openConsentPreferences } from '@/lib/consent';

/** The footer link that reopens the cookie settings, so a choice can always be changed or withdrawn. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      Cookie settings
    </button>
  );
}
