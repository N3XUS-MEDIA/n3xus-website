import type { Metadata } from 'next';
import { AmbientHex } from '@/ui/brand/AmbientHex';
import { BrandIntro } from '@/ui/brand/BrandIntro';
import { HexArtMark } from '@/ui/brand/HexArtMark';
import { HexMark } from '@/ui/brand/HexMark';

/**
 * A scratch page for judging the brand assets in place, because the choice
 * between them is a looking decision rather than an arguing one.
 *
 * DELETE THIS ROUTE once the animation placement is settled. It is noindex and
 * absent from the sitemap, so it cannot be found or ranked in the meantime,
 * but it should not outlive the decision it exists to serve.
 */
export const metadata: Metadata = {
  title: 'Brand preview (internal)',
  robots: { index: false, follow: false },
};

export default function BrandPreviewPage() {
  return (
    <>
      {/* force: replays on every load here, unlike the real first-visit rule */}
      <BrandIntro force />

      <div className="bg-paper px-6 py-12">
        <h1 className="text-3xl text-ink">Brand preview</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
          The mark at the sizes it is actually used, and the two placements for the
          animation. The intro overlay replayed when this page loaded — reload to see it
          again.
        </p>

        <h2 className="mt-12 text-xl text-ink">The mark, on light</h2>
        <p className="mt-2 text-sm text-ink-muted">Hover any of these to see the motion.</p>
        <div className="mt-5 flex items-end gap-8">
          {([['h-6', '24px'], ['h-7', '28px'], ['h-8', '32px'], ['h-10', '40px'], ['h-14', '56px'], ['h-20', '80px']] as const).map(
            ([h, label]) => (
              <span key={label} className="text-center">
                <HexArtMark className={`block ${h}`} />
                <span className="mt-2 block text-xs text-ink-muted">{label}</span>
              </span>
            ),
          )}
        </div>
      </div>

      <div className="bg-carbon px-6 py-12 text-on-carbon">
        <h2 className="text-xl">The mark, on carbon — this is where the nav uses it</h2>
        <div className="mt-5 flex items-end gap-8">
          <span className="text-center">
            <HexArtMark className="block h-7" />
            <span className="mt-2 block text-xs text-on-carbon/65">28px — nav</span>
          </span>
          <span className="text-center">
            <HexArtMark className="block h-8" />
            <span className="mt-2 block text-xs text-on-carbon/65">32px — launcher</span>
          </span>
          <span className="text-center">
            <HexArtMark className="block h-14" />
            <span className="mt-2 block text-xs text-on-carbon/65">56px</span>
          </span>
          <span className="text-center">
            <HexMark className="size-7 text-accent" />
            <span className="mt-2 block text-xs text-on-carbon/65">drawn, 28px</span>
          </span>
        </div>
      </div>

      {/* Option A */}
      <div className="relative overflow-hidden bg-carbon px-6 py-24 text-on-carbon">
        <AmbientHex />
        <div className="relative max-w-2xl">
          <p className="eyebrow text-accent">Option A</p>
          <h2 className="mt-3 text-3xl">Ambient background on a dark band</h2>
          <p className="mt-4 leading-relaxed text-on-carbon/75">
            The mark oversized and bleeding off the right of a carbon band, at 28% and
            masked so it fades rather than stopping at an edge. The text column stays
            clear of it. No alpha needed — the near-black it was composited against is
            the band colour. Plays only while on screen, and not at all under
            reduced-motion.
          </p>
        </div>
      </div>

      <div className="bg-paper px-6 py-12">
        <p className="eyebrow">Option B</p>
        <h2 className="mt-3 text-3xl text-ink">First-visit brand moment</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          That was the overlay you saw when this page loaded. 1.2 seconds, once per visitor
          ever, never blocking the page underneath. Reload to see it again.
        </p>
      </div>
    </>
  );
}
