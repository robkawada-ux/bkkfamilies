export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="12" r="5" fill="#F4831F" />
      <circle cx="36" cy="24" r="5" fill="#3EC1D3" />
      <circle cx="24" cy="36" r="5" fill="#5C2D91" />
      <circle cx="12" cy="24" r="5" fill="#8DC63F" />
    </svg>
  );
}
