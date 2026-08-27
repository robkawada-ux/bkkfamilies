const COLORS: Record<string, string> = {
  orange: "bg-orange",
  teal: "bg-teal",
  purple: "bg-purple",
  green: "bg-green",
};

export default function StatCard({
  value,
  label,
  color = "orange",
}: {
  value: string;
  label: string;
  color?: "orange" | "teal" | "purple" | "green";
}) {
  return (
    <div className={`${COLORS[color]} rounded-xl px-6 py-8 text-center text-white shadow-sm`}>
      <div className="font-heading text-3xl font-bold md:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-white/90">{label}</div>
    </div>
  );
}
