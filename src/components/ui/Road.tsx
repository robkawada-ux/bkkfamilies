/**
 * Cartoon roads for the "Your Bangkok Roadmap" theme.
 *
 * A road is an SVG path drawn as a thick black stroke with a dashed white
 * centre line. Paths are written in a 1000-unit-wide viewBox that stretches
 * to the container's width; vector-effect keeps the stroke width constant
 * however wide the container is, so the road never gets fat or thin.
 *
 * Roads are decoration only: aria-hidden, pointer-events off, and placed
 * behind the boxes they connect so they never cover content. A road's ends
 * run a few units into the box edge and disappear under it, which reads as
 * the road arriving at that box.
 */

type RoadProps = {
  /** Path data in a 1000 x `height` coordinate space. */
  paths: string[];
  /** Height of the drawing area in px (also the viewBox height). */
  height: number;
  className?: string;
};

export function Road({ paths, height, className = "" }: RoadProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 1000 ${height}`}
      preserveAspectRatio="none"
      height={height}
      className={`pointer-events-none absolute inset-x-0 w-full overflow-visible ${className}`}
    >
      {paths.map((d) => (
        <g key={d} fill="none" strokeLinecap="round">
          {/* kerb */}
          <path d={d} stroke="#1f1530" strokeWidth={18} vectorEffect="non-scaling-stroke" />
          {/* tarmac */}
          <path d={d} stroke="#2b2b2b" strokeWidth={14} vectorEffect="non-scaling-stroke" />
          {/* centre line */}
          <path
            d={d}
            stroke="#ffffff"
            strokeWidth={2}
            strokeDasharray="9 9"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Roads linking the four homepage stat cards: over the top from card 1 to
 * card 2, under the bottom from card 2 to card 3, over the top from card 3
 * to card 4. Desktop only; on phones the cards stack two by two and the
 * roads would have nowhere sensible to go.
 */
export function StatRoads() {
  return (
    <>
      <Road
        height={64}
        className="-top-[60px] hidden md:block"
        paths={[
          "M 170 72 C 175 -4, 300 -4, 330 72",
          "M 670 72 C 675 -4, 800 -4, 830 72",
        ]}
      />
      <Road
        height={40}
        className="-bottom-[38px] hidden md:block"
        paths={["M 420 -8 C 430 40, 580 40, 590 -8"]}
      />
    </>
  );
}
