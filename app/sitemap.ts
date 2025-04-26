import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `https://www.cruxhire.com/blog/${post.slugAsParams}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const routes = [
    {
      url: "https://www.cruxhire.com",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    
    {
      url: "https://www.cruxhire.com/pricing",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: "https://www.cruxhire.com/terms",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: "https://www.cruxhire.com/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: "https://www.cruxhire.com/login",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    // {
    //   url: "https://www.cruxhire.com/register",
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 1,
    // },
  ];

  return [...routes, ...posts];
}
