import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { isProductionMarketingHost } from "@/lib/marketing/site-host";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  if (!isProductionMarketingHost()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
