import { PageHero } from '@/ui/layout/PageHero';
import { Section } from '@/ui/layout/Section';
import type { LegalSection } from '@/content/privacy';

/**
 * Shared shell for /privacy and /terms.
 *
 * Consecutive <li> blocks are gathered back into one <ul> — the source HTML
 * interleaves paragraphs and list items as siblings, and rendering each item
 * as its own list would be wrong for a screen reader ("list, 1 item" eleven
 * times over).
 */
export function LegalPage({
  title,
  lede,
  sections,
}: {
  title: string;
  lede?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={lede} />

      <Section width="narrow">
        <div className="longform">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {groupBlocks(section.blocks).map((group, i) =>
                group.kind === 'ul' ? (
                  <ul key={i}>
                    {group.items.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{group.text}</p>
                ),
              )}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}

type Group = { kind: 'p'; text: string } | { kind: 'ul'; items: string[] };

function groupBlocks(blocks: LegalSection['blocks']): Group[] {
  const groups: Group[] = [];

  for (const block of blocks) {
    if (block.kind === 'li') {
      const last = groups[groups.length - 1];
      if (last?.kind === 'ul') last.items.push(block.text);
      else groups.push({ kind: 'ul', items: [block.text] });
    } else {
      groups.push({ kind: 'p', text: block.text });
    }
  }

  return groups;
}
