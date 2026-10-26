// Per-branch contact details for chains whose branches each take their own
// bookings. Lives in src/lib (not a "use client" module) because server
// components read it.

export interface BranchContact {
  /** Branch name as parents know it, e.g. "Mega Bangna". */
  name: string;
  /** Where to find it in the building, e.g. "2nd floor, near HomePro". */
  location?: string;
  phone?: string;
  /** A line.me link, e.g. decoded from the branch's LINE QR code. */
  lineUrl?: string;
}
