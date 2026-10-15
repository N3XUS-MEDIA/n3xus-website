import { InView } from './InView';

type Cfg = {
  suppliers: [string, string, string, string];
  you: string;
  joined: string;
  before: { label: string; rows: readonly (readonly [string, string])[] };
  after: { label: string; rows: readonly (readonly [string, string])[] };
  summary: string;
};

const LINE = 'stroke-on-carbon/45';
const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * Homepage problem band (carbon): the same four jobs, wired two ways. On the
 * left every supplier connects to you and to nobody useful; on the right they
 * report into one team and one set of numbers before anything reaches you.
 * Drawn, then the existing before/after rows underneath each side.
 */
export function ScatteredVsConnected({ suppliers, you, joined, before, after, summary }: Cfg) {
  const corners = [
    { x: 14, y: 14 },
    { x: 214, y: 14 },
    { x: 14, y: 186 },
    { x: 214, y: 186 },
  ];
  const tangled = [
    'M60 44 C 120 40, 70 110, 136 108',
    'M260 44 C 200 90, 250 120, 184 108',
    'M60 186 C 80 120, 150 170, 140 130',
    'M260 186 C 230 130, 170 170, 180 130',
    'M60 44 C 160 80, 170 150, 260 186',
    'M260 44 C 150 70, 120 160, 60 186',
    'M106 29 C 150 60, 170 0, 214 29',
  ];

  return (
    <InView
      as="figure"
      aria-describedby="scattered-summary"
      className="m-0 mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-lg bg-on-carbon/15 md:grid-cols-2"
    >
      <p id="scattered-summary" className="sr-only">
        {summary}
      </p>

      <div className="bg-carbon p-6">
        <p className="eyebrow-on-carbon">{before.label}</p>
        <svg viewBox="0 0 320 230" className="mt-5 w-full" role="presentation" aria-hidden>
          {tangled.map((d, i) => (
            <path
              key={d}
              d={d}
              fill="none"
              pathLength={1}
              strokeWidth="1.5"
              className={`x-draw ${LINE}`}
              style={S(i + 4)}
            />
          ))}
          {corners.map((c, i) => (
            <g key={i} className="x-rise" style={S(i)}>
              <rect x={c.x} y={c.y} width="92" height="30" rx="4" className="fill-carbon-light stroke-on-carbon/30" />
              <text x={c.x + 46} y={c.y + 19.5} textAnchor="middle" fontSize="12" className="fill-on-carbon" style={{ fontFamily: 'inherit' }}>
                {suppliers[i]}
              </text>
            </g>
          ))}
          <g className="x-rise" style={S(11)}>
            <circle cx="160" cy="115" r="26" className="fill-carbon stroke-accent" strokeWidth="1.5" />
            <text x="160" y="119.5" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-on-carbon" style={{ fontFamily: 'inherit' }}>
              {you}
            </text>
          </g>
        </svg>
        <ul className="mt-6 space-y-3">
          {before.rows.map(([label, note]) => (
            <li key={label} className="text-sm text-on-carbon/70">
              <span className="text-on-carbon">{label}</span>
              {note ? <span className="text-on-carbon/65"> — {note}</span> : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-carbon-light p-6">
        <p className="eyebrow-on-carbon">{after.label}</p>
        <svg viewBox="0 0 320 230" className="mt-5 w-full" role="presentation" aria-hidden>
          {suppliers.map((s, i) => {
            const x = 8 + i * 78;
            return (
              <g key={s}>
                <line
                  x1={x + 35}
                  y1="44"
                  x2={x + 35}
                  y2="104"
                  pathLength={1}
                  strokeWidth="1.5"
                  className="x-draw stroke-accent"
                  style={S(i + 4)}
                />
                <g className="x-rise" style={S(i)}>
                  <rect x={x} y="14" width="70" height="30" rx="4" className="fill-carbon stroke-on-carbon/30" />
                  <text x={x + 35} y="33.5" textAnchor="middle" fontSize="11" className="fill-on-carbon" style={{ fontFamily: 'inherit' }}>
                    {s}
                  </text>
                </g>
              </g>
            );
          })}
          <g className="x-rise" style={S(8)}>
            <rect x="8" y="104" width="304" height="34" rx="4" className="fill-accent/15 stroke-accent" />
            <text x="160" y="125.5" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-on-carbon" style={{ fontFamily: 'inherit' }}>
              {joined}
            </text>
          </g>
          <line x1="160" y1="138" x2="160" y2="180" pathLength={1} strokeWidth="1.5" className="x-draw stroke-accent" style={S(9)} />
          <g className="x-rise" style={S(10)}>
            <circle cx="160" cy="202" r="22" className="fill-carbon stroke-accent" strokeWidth="1.5" />
            <text x="160" y="206.5" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-on-carbon" style={{ fontFamily: 'inherit' }}>
              {you}
            </text>
          </g>
        </svg>
        <ul className="mt-6 space-y-3">
          {after.rows.map(([label]) => (
            <li key={label} className="text-sm text-on-carbon">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}
