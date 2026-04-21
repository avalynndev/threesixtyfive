import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ThreeSixtyFive",
    template: "%s — ThreeSixtyFive",
  },
  description:
    "Dynamic lock screen wallpapers that update daily. Track your year progress, life calendar, or countdown to your goals.",
  keywords: [
    "wallpaper",
    "lock screen",
    "year progress",
    "life calendar",
    "goal countdown",
    "dynamic wallpaper",
    "iOS shortcut",
    "Android MacroDroid",
  ],
  authors: [{ name: "avalynndev" }],
  creator: "avalynndev",
  metadataBase: new URL("https://365tsf.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://365tsf.vercel.app",
    siteName: "ThreeSixtyFive",
    title: "ThreeSixtyFive — Visualize Your Time",
    description:
      "365 dots. One fills each day. Dynamic wallpapers for your lock screen that update automatically.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreeSixtyFive — Visualize Your Time",
    description:
      "365 dots. One fills each day. Dynamic wallpapers for your lock screen that update automatically.",
    creator: "@avalynndev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="365" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
