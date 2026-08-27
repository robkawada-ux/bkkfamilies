export default function PageHero({
  eyebrow,
  title,
  subtitle,
  color = "orange",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  color?: "orange" | "teal" | "purple" | "green";
}) {
  const bg = {
    orange: "bg-orange",
    teal: "bg-teal",
    purple: "bg-purple",
    green: "bg-green",
  }[color];

  return (
    <section className={`${bg} px-4 py-16 text-white`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
