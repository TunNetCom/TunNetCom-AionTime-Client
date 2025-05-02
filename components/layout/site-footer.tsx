import * as React from "react";
import Link from "next/link";

import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";

import { NewsletterForm } from "../newsletter/newsletter-form";
import { Icons } from "../shared/icons";
import { SocialButton } from "../ui/social-button";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center gap-16">
          {/* Main Footer Content - Multiple Columns */}
          <div className="grid w-full gap-16 md:grid-cols-12">
            {/* Brand Section */}
            <div className="flex flex-col space-y-4 md:col-span-4">
              <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="size-8" />
                <span className="font-urban text-xl font-bold">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="max-w-sm text-muted-foreground">
                {siteConfig.description}
              </p>

              <div className="flex items-center space-x-3 pt-2">
                <SocialButton
                  icon={<Icons.twitter className="size-4" />}
                  label="Twitter"
                />
                <SocialButton
                  icon={<Icons.gitHub className="size-4" />}
                  label="GitHub"
                />
                <SocialButton
                  icon={<Icons.instagram className="size-4" />}
                  label="Instagram"
                />
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="grid gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-2">
              {footerLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items?.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="md:col-span-4">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Stay Updated
                </h3>
                <p className="text-sm text-muted-foreground">
                  Subscribe to receive updates and exclusive content.
                </p>
                <NewsletterForm />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex w-full flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
