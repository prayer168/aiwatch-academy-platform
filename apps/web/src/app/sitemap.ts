import type { MetadataRoute } from "next";
import { sitemapPages } from "./_content/public-pages";
import { siteUrl } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl.toString(), changeFrequency: "weekly", priority: 1 },
    ...sitemapPages.map(({ slug }) => ({
      url: new URL(`/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

