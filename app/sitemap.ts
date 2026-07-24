import type { MetadataRoute } from "next";
import { leverandorer } from "@/data/leverandorer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const sider = ["", "/produkter", "/om-oss", "/kontakt", "/tilbud"];

  const statiske = sider.map((sti) => ({
    url: `${baseUrl}${sti}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: sti === "" ? 1 : 0.8,
  }));

  const leverandorSider = leverandorer.map((leverandor) => ({
    url: `${baseUrl}/produkter/${leverandor.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...statiske, ...leverandorSider];
}
