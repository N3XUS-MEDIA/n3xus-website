import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/ui/layout/Container';
import { AuditResult } from '@/ui/audit/AuditResult';
import { AUDIT_TOKEN } from '@/lib/auditContract';

/**
 * One visitor's audit. The token is the only key, so the page is never
 * indexed, never linked from anywhere public, and sends no referrer onward.
 */
export const metadata: Metadata = {
  title: 'Your website audit',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function AuditTokenPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!AUDIT_TOKEN.test(token)) notFound();

  return (
    <div className="audit-report py-14 sm:py-20">
      <Container>
        <AuditResult token={token} />
      </Container>
    </div>
  );
}
