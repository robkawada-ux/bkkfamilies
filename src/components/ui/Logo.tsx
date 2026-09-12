/**
 * The canonical BKK Families mark.
 *
 * Geometry is taken directly from the master logo file: four circles of
 * r=9 on a 64x64 canvas, centres offset 23 from the middle, so the mark
 * fills the viewBox edge to edge with no built-in padding. Orange top,
 * teal right, purple bottom, green left.
 *
 * Two other copies of this mark exist and MUST use these same numbers
 * and colours:
 *   - src/app/icon.svg      (favicon)
 *   - src/app/apple-icon.png (iOS home screen, padded for the platform)
 *
 * Because there is no internal padding, pass a smaller `size` than you
 * would for a padded logo. 36 in the header, 28 in the footer.
 */
export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="9" r="9" fill="#F4831F" />
      <circle cx="55" cy="32" r="9" fill="#3EC1D3" />
      <circle cx="32" cy="55" r="9" fill="#5C2D91" />
      <circle cx="9" cy="32" r="9" fill="#8DC63F" />
    </svg>
  );
}
