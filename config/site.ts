import { SidebarNavItem, SiteConfig } from "types/index.d";

import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "AionTime AI",
  description:
    "AionTime AI is an intelligent agent for Azure DevOps designed to streamline project management tasks. Leveraging AI in an agentic workflow, it helps teams optimize their DevOps processes while keeping humans in the loop for critical decisions.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    gitHub: "https://github.com/Ashref-dev/cruxhire",
    twitter: "https://x.com/cruxhire_ai",
    instagram: "https://www.instagram.com/cruxhire_ai/",
    facebook: "https://facebook.com/513241155206826",
    bluesky: "https://bsky.app/profile/cruxhire-ai.com",
  },
  mailSupport: "support@cruxhire.com",
};

export const SUPPORTED_LANGUAGES = {
  EN: { name: "English", flag: "🇺🇸", greeting: "Hello!" },
  FR: { name: "French", flag: "🇫🇷", greeting: "Bonjour!" },
  ES: { name: "Spanish", flag: "🇪🇸", greeting: "¡Hola!" },
  DE: { name: "German", flag: "🇩🇪", greeting: "Hallo!" },
  AR: { name: "Arabic", flag: "🇸🇦", greeting: "!مرحبا" },
} as const;

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  // {
  //   title: "Product",
  //   items: [
  //     { title: "Security", href: "#" },
  //     { title: "Customization", href: "#" },
  //     { title: "Customers", href: "#" },
  //     { title: "Changelog", href: "#" },
  //   ],
  // },
  // {
  //   title: "Docs",
  //   items: [
  //     { title: "Introduction", href: "#" },
  //     { title: "Installation", href: "#" },
  //     { title: "Components", href: "#" },
  //     { title: "Code Blocks", href: "#" },
  //   ],
  // },
];
