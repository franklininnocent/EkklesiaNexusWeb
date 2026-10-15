"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type StaffAppLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function StaffAppLink({ href, className, children }: StaffAppLinkProps) {
  return (
    <a
      href={href}
      className={className}
      rel="noopener noreferrer"
      onClick={() => trackEvent("login_click")}
    >
      {children}
    </a>
  );
}
