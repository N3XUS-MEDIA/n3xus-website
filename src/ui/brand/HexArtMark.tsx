'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * The real N3XUS hexagon: the supplied artwork, not a drawing of it.
 *
 * ── Why this is an image and a clipped video, not a transparent video ───────
 * The supplied files are H.264 `yuv420p`. H.264 has **no alpha channel** — not
 * as an export setting, as a codec fact — so the near-black ground (#050709)
 * is baked in and cannot be removed from the file.
 *
 * Two ways to get transparency out of it were tested:
 *
 *   Luma key (brightness → opacity). Correct on a dark ground, wrong on a
 *   light one: the artwork is glowing light on black, so keying deletes the
 *   dark structure and the hexagon dissolves into a smudge.
 *
 *   Shape mask. The mark is a clean pointy-top hexagon, so it can simply be
 *   cut to that polygon. Solid on both themes, no keying artefacts.
 *
 * The second wins, and CSS can do it directly with `clip-path` — which means
 * the video needs no alpha at all. That sidesteps the usual transparent-video
 * tax entirely: no VP9-with-alpha WebM for Chrome plus HEVC-with-alpha MP4 for
 * Safari, no feature detection, no fallback matrix. One 32KB H.264 file that
 * every browser has decoded for a decade, cut to a hexagon by the CSS.
 *
 * The asset is pre-cropped to the hexagon's exact bounding box, so the polygon
 * below maps to 0–100% and lands on the artwork's own edges.
 *
 * ── Why the still is the default ────────────────────────────────────────────
 * Measured at nav size, the texture is mud: at 28–40px the crystalline detail
 * that is the whole point of the artwork is not resolvable, and a 7-second
 * particle drift reads as flicker rather than life. So the still carries every
 * size, and the motion appears on hover — where someone is looking at it, and
 * only then is the video fetched. Visitors who never hover pay 9KB, not 41KB.
 *
 * The clip also fixes the source's loop seam. The supplied file does not loop
 * cleanly (first-to-last frame is 24.7dB against a 33.1dB frame-to-frame
 * baseline — a visible jump every 7s), so `hex-alive.mp4` is a ping-ponged
 * slice: it plays forward then backward, which is seamless by construction.
 */

/** Pointy-top hexagon. Matches the crop, so it sits on the artwork's edges. */
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

export function HexArtMark({
  className,
  animateOnHover = true,
  alt = '',
}: {
  className?: string;
  /** Set false where motion would be noise — dense lists, tiny inline uses. */
  animateOnHover?: boolean;
  /** Empty by default: the mark is usually decorative beside a text label. */
  alt?: string;
}) {
  const [wantsVideo, setWantsVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * The video element is not rendered until the first hover, so its bytes are
   * never fetched for the majority of visits. Once mounted it stays mounted —
   * re-fetching on every hover would be worse than keeping 32KB around.
   */
  function onEnter() {
    if (!animateOnHover) return;
    setWantsVideo(true);
    void videoRef.current?.play().catch(() => {
      /* Autoplay refused, reduced-motion, decode failure: the still remains. */
    });
  }

  function onLeave() {
    videoRef.current?.pause();
  }

  return (
    <span
      className={cn('relative inline-block aspect-[105/120] align-middle', className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/hex-mark.webp"
        alt={alt}
        width={105}
        height={120}
        className="absolute inset-0 size-full object-contain"
        style={{ clipPath: HEX_CLIP }}
        draggable={false}
      />

      {wantsVideo ? (
        <video
          ref={videoRef}
          src="/brand/hex-alive.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          className={cn(
            'absolute inset-0 size-full object-contain transition-opacity duration-300',
            // Only revealed once it can actually play, so there is never a
            // blank or half-decoded frame over the still.
            ready ? 'opacity-100' : 'opacity-0',
            // The still stays underneath, so a paused or failed video is
            // invisible rather than broken.
            'motion-reduce:hidden',
          )}
          style={{ clipPath: HEX_CLIP }}
        />
      ) : null}
    </span>
  );
}
