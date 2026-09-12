/**
 * The canonical BKK Families mark.
 *
 * Geometry is taken directly from the master logo file: four circles of
 * r=9 with centres offset 23 from the middle. Orange top, teal right,
 * purple bottom, green left.
 *
 * The canvas is 68 rather than 64, which puts 2 units of padding around
 * the mark. The circles previously sat exactly on the viewBox edge, so
 * subpixel rounding shaved the top and bottom dots at small sizes. The
 * mark itself is unchanged, it just is not flush to the edge any more.
 *
 * Two other copies of this mark exist and MUST use these same numbers
 * and colours:
 *   - src/app/icon.svg      (favicon)
 *   - src/app/favicon.ico   (legacy favicon, multi-size)
 *   - src/app/apple-icon.png (iOS home screen)
 */
export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 overflow-visible"
    >
      <circle cx="34" cy="11" r="9" fill="#F4831F" />
      <circle cx="57" cy="34" r="9" fill="#3EC1D3" />
      <circle cx="34" cy="57" r="9" fill="#5C2D91" />
      <circle cx="11" cy="34" r="9" fill="#8DC63F" />
    </svg>
  );
}
