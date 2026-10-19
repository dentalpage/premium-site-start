// Simplified sagittal view of an upper incisor; labial surface is on the left.
const OUTER = { top: [60, 95], c1: [52, 140], c2: [70, 210], edge: [92, 246] };

function labial(d: number) {
  const [tx, ty] = OUTER.top;
  const [ax, ay] = OUTER.c1;
  const [bx, by] = OUTER.c2;
  const [ex, ey] = OUTER.edge;
  return { start: `${tx + d} ${ty}`, curve: `C ${ax + d} ${ay}, ${bx + d} ${by}, ${ex + d / 2} ${ey}` };
}

// Region between two labial contours (outer offset `from`, inner offset `to`).
function band(from: number, to: number) {
  const a = labial(from);
  const [bx, by] = OUTER.c2;
  const [ax, ay] = OUTER.c1;
  const [tx, ty] = OUTER.top;
  return `M ${a.start} ${a.curve} L ${OUTER.edge[0] + to / 2} ${OUTER.edge[1]} C ${bx + to} ${by}, ${ax + to} ${ay}, ${tx + to} ${ty} Z`;
}

export function ToothDiagram({ id, removed, existing = 0 }: { id: string; removed: number; existing?: number }) {
  const outer = labial(0);
  const prepared = labial(existing + removed);
  return (
    <svg viewBox="40 0 110 256" className="h-72 w-auto" role="img" aria-label="치아 단면 도식">
      <defs>
        <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="var(--color-accent)" strokeWidth="1.4" />
        </pattern>
      </defs>
      <path d="M60 95 C 62 50, 85 10, 97 8 C 110 10, 130 50, 132 95 Z" fill="#ece2d1" stroke="#211e1b33" />
      <path d={`M ${outer.start} ${outer.curve} L 100 246 C 112 200, 130 150, 132 95 Z`} fill="#fbf8f2" stroke="#211e1b55" />
      <path d="M70 100 C 66 140, 80 195, 95 230 C 106 195, 120 150, 122 100 Z" fill="#e6d6bd" />
      {existing ? <path d={band(0, existing)} fill="#211e1b" fillOpacity={0.28} /> : null}
      <path d={band(existing, existing + removed)} fill="var(--color-accent)" fillOpacity={0.18} />
      <path d={band(existing, existing + removed)} fill={`url(#${id})`} />
      <path d={`M ${outer.start} ${outer.curve}`} fill="none" stroke="#211e1b" strokeDasharray="3 3" strokeWidth="0.8" />
      <path d={`M ${prepared.start} ${prepared.curve}`} fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
    </svg>
  );
}
