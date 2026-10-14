import type { MetadataRoute } from "next";
import { SCHOOLS } from "@/lib/schools";
import { CAMPS } from "@/lib/camps";
import { HALLOWEEN_IMG_DIR, HALLOWEEN_POSTERS, HALLOWEEN_SLUG } from "@/lib/halloween";
import { CHRISTMAS_IMG_DIR, CHRISTMAS_POSTERS, CHRISTMAS_SLUG } from "@/lib/christmas";
import { NYE_IMG_DIR, NYE_POSTERS, NYE_SLUG } from "@/lib/nye";
import { ARTICLES } from "@/lib/articles";
import { PROVIDERS } from "@/lib/learningSupport";
import { FACILITIES } from "@/lib/healthcare";
import { INSURERS } from "@/lib/insurance";
import { PLAYGROUPS } from "@/lib/playgroups";
import { ACTIVITIES } from "@/lib/activities";

export const baseUrl = "https://www.bkkfamilies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/schools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/activities`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/healthcare`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/healthcare/hospitals`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/healthcare/maternity`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/healthcare/paediatrics`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/healthcare/insurance`,
      lastModified: new Date("2026-09-17"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learning-support`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/school-breaks`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/camps`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/playgroups`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((a) => {
    // Image sitemap entries: the hero image, plus any seasonal guide's posters.
    const posters: Record<string, { dir: string; files: readonly { file: string }[] }> = {
      [HALLOWEEN_SLUG]: { dir: HALLOWEEN_IMG_DIR, files: HALLOWEEN_POSTERS },
      [CHRISTMAS_SLUG]: { dir: CHRISTMAS_IMG_DIR, files: CHRISTMAS_POSTERS },
      [NYE_SLUG]: { dir: NYE_IMG_DIR, files: NYE_POSTERS },
    };
    const set = posters[a.slug];
    const images = [
      ...(a.heroImage ? [`${baseUrl}${a.heroImage}`] : []),
      ...(set ? set.files.map((p) => `${baseUrl}${set.dir}/${p.file}.jpg`) : []),
    ];
    return {
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.updated ?? a.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(images.length ? { images } : {}),
    };
  });

  const schoolPages: MetadataRoute.Sitemap = SCHOOLS.map((s) => ({
    url: `${baseUrl}/schools/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const learningSupportPages: MetadataRoute.Sitemap = PROVIDERS.map((p) => ({
    url: `${baseUrl}/learning-support/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const campPages: MetadataRoute.Sitemap = CAMPS.map((c) => ({
    url: `${baseUrl}/camps/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const healthcarePages: MetadataRoute.Sitemap = FACILITIES.map((f) => ({
    url: `${baseUrl}/healthcare/hospitals/${f.slug}`,
    lastModified: new Date(f.lastVerified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insurancePages: MetadataRoute.Sitemap = INSURERS.map((i) => ({
    url: `${baseUrl}/healthcare/insurance/${i.slug}`,
    lastModified: new Date(i.lastVerified),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const playgroupPages: MetadataRoute.Sitemap = PLAYGROUPS.map((p) => ({
    url: `${baseUrl}/playgroups/${p.slug}`,
    lastModified: new Date(p.lastVerified),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const activityPages: MetadataRoute.Sitemap = ACTIVITIES.map((a) => ({
    url: `${baseUrl}/activities/${a.slug}`,
    lastModified: new Date(a.lastVerified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...schoolPages,
    ...learningSupportPages,
    ...campPages,
    ...healthcarePages,
    ...insurancePages,
    ...playgroupPages,
    ...activityPages,
  ];
}
