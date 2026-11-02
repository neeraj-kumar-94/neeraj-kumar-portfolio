import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Served at /robots.txt. Everything is open to crawlers, including the AI
 *  ones: being read is the point. The watermark rule in middleware.ts is what
 *  protects the images, not a robots block. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
