import type { MetadataRoute } from "next";
import { SCHOOLS } from "@/lib/schools";
import { ARTICLES } from "@/lib/articles";
import { PROVIDERS } from "@/lib/learningSupport";

export const baseUrl = "https://www.bkkfamilies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/schools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/activities`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/fitness-health`, changeFrequency: "monthly", priority: 0.6 },
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
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

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

  return [
    ...staticPages,
    ...articlePages,
    ...schoolPages,
    ...learningSupportPages,
  ];
}
