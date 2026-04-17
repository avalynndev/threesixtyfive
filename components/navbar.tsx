"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./mode-toggle";

const GridLogo = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" />
    <rect
      x="9"
      y="2"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.5"
    />
    <rect
      x="16"
      y="2"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.3"
    />
    <rect
      x="2"
      y="9"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.5"
    />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
    <rect
      x="16"
      y="9"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.5"
    />
    <rect
      x="2"
      y="16"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.3"
    />
    <rect
      x="9"
      y="16"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.5"
    />
    <rect x="16" y="16" width="6" height="6" rx="1" fill="currentColor" />
  </svg>
);

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className={cn(
      "relative text-sm font-medium text-foreground transition-colors duration-150 hover:text-foreground/70",
      "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground/70",
      "after:transition-all after:duration-300 hover:after:w-full",
    )}
  >
    {children}
  </a>
);

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
          aria-label="ThreeSixtyFive"
        >
          <span className="transition-transform duration-300 group-hover:rotate-90">
            <GridLogo />
          </span>
          <span>ThreeSixtyFive</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="#types">Wallpapers</NavLink>
          <NavLink href="#customize">Customize</NavLink>
          <NavLink href="#setup">Setup</NavLink>
        </div>
        <div className="space-x-2">
          <ModeToggle />

          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <GitHubLogoIcon className="h-20 w-20" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
