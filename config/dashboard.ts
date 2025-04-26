import { UserRole } from "@prisma/client";

import type { SidebarNavItem } from "types/index.d";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/dashboard",
        icon: "dashboard",
        title: "Dashboard",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/posts",
        icon: "history",
        title: "Posts",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/candidates",
        icon: "user",
        title: "Candidates",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/archive",
        icon: "package",
        title: "Archive",
        authorizeOnly: UserRole.USER,
      },
      //! Admin routes
      // {
      //   href: "/admin",
      //   icon: "laptop",
      //   title: "Admin Panel",
      //   authorizeOnly: UserRole.ADMIN,
      // },
      // {
      //   href: "/admin/orders",
      //   icon: "package",
      //   title: "Orders",
      //   badge: 2,
      //   authorizeOnly: UserRole.ADMIN,
      // },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/settings", icon: "settings", title: "Settings" },
      // { href: "/", icon: "home", title: "Homepage" },
      // { href: "/docs", icon: "bookOpen", title: "Documentation" },
    ],
  },
];
