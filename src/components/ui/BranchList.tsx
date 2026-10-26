import type { BranchContact } from "@/lib/branches";

/** Branch-by-branch phone and LINE links. Server component. */
export default function BranchList({ branches }: { branches: BranchContact[] }) {
  return (
    <ul className="mt-2 space-y-3 text-sm text-neutral-700">
      {branches.map((b) => (
        <li key={b.name}>
          <span className="font-semibold">{b.name}</span>
          {b.location && <span className="text-neutral-500">, {b.location}</span>}
          <span className="block">
            {b.phone && (
              <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-teal hover:underline">
                {b.phone}
              </a>
            )}
            {b.phone && b.lineUrl && <span className="text-neutral-400"> · </span>}
            {b.lineUrl && (
              <a href={b.lineUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                Chat on LINE
              </a>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
