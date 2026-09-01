import type { Metadata } from 'next';
import { LegalPage } from '@/ui/legal/LegalPage';
import { termsSections } from '@/content/terms';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing engagements with N3XUS Media, including services, intellectual property, payment, liability and termination.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <LegalPage title="Terms of Service" sections={termsSections} />;
}
