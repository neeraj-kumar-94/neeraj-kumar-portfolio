import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** Served at /sitemap.xml. Lists every page worth indexing, so search engines
 *  and the AI crawlers that read sitemaps find the case studies, not just the
 *  home page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((study) => ({
      url: `${SITE_URL}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
