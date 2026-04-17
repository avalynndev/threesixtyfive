import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const GridLogo = () => (
  <svg
    width="20"
    height="20"
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

export function Footer() {
    return (
      <footer className="border-t border- px-6 py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <GridLogo />
              <span>ThreeSixtyFive</span>
            </div>
            <p className="text-sm text-foreground/80">Time, visualized</p>
          </div>
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
      </footer>
    );
}