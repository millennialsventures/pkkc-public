import type { MetadataRoute } from "next";
import { orgInfo } from "@/src/data/orgInfo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${orgInfo.domain}/sitemap.xml`,
  };
}
