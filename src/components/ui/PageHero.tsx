export default function PageHero({
  eyebrow,
  title,
  subtitle,
  color = "orange",
  image,
  imageAlt,
  imageCredit,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  color?: "orange" | "teal" | "purple" | "green";
  /** Optional hero photo. Renders beside the copy rather than behind it. */
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
}) {
  const bg = {
    orange: "bg-orange",
    teal: "bg-teal",
    purple: "bg-purple",
    green: "bg-green",
  }[color];

  const copy = (
    <>
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/80">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-4xl font-bold md:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>
      )}
    </>
  );

  if (!image) {
    return (
      <section className={`${bg} px-4 py-16 text-white`}>
        <div className="mx-auto max-w-6xl">{copy}</div>
      </section>
    );
  }

  return (
    <section className={`${bg} text-white`}>
      <div className="mx-auto grid max-w-6xl items-stretch md:grid-cols-2">
        {/* Photo first on mobile, second on desktop */}
        <div className="relative order-1 aspect-[4/3] w-full sm:aspect-[16/9] md:order-2 md:aspect-auto md:min-h-[26rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt ?? ""}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {imageCredit && (
            <p className="absolute bottom-0 right-0 bg-purple-dark/70 px-2 py-1 text-[0.65rem] text-white/80">
              {imageCredit}
            </p>
          )}
        </div>
        <div className="order-2 px-4 py-12 md:order-1 md:flex md:flex-col md:justify-center md:py-16 md:pr-10">
          {copy}
        </div>
      </div>
    </section>
  );
}
