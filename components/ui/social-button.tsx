"use client";

import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
}

export function SocialButton({ icon, label }: SocialButtonProps) {
  return (
    <Button variant="outline" size="icon">
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
} 