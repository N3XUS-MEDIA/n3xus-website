import type { Metadata } from 'next';
import { LegalPage } from '@/ui/legal/LegalPage';
import { privacySections } from '@/content/privacy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How N3XUS Media collects, uses, shares and retains personal information, and your rights under POPIA and GDPR.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" sections={privacySections} />;
}
