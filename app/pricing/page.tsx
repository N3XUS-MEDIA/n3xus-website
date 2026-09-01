import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section } from '@/ui/layout/Section';
import { RetainerBuilder } from '@/ui/marketing/RetainerBuilder';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Build a monthly growth retainer from modular components. Every build starts on the Website OS base; add search visibility, social, AI agents and paid media as you need them.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Build the retainer your business actually needs."
        lede="Every build starts on the same Website OS base — the engine that routes leads, holds your data and keeps the lights on. Everything above it is modular. Pick what you need, see the monthly cost as you go."
      />

      <Section size="sm">
        <RetainerBuilder />
      </Section>
    </>
  );
}
