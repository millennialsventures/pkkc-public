import type { MetadataRoute } from "next";
import { orgInfo } from "@/src/data/orgInfo";

export const dynamic = "force-static";

const routes = ["", "/tentang", "/organisasi", "/aktiviti", "/aplikasi"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${orgInfo.domain}${route}`,
  }));
}
