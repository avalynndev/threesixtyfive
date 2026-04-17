import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AppShell />
      </main>
      <Footer />
    </>
  );
}
