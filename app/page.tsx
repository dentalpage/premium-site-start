import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Process } from "@/components/process";
import { Testimonial } from "@/components/testimonial";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Work />
        <Process />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
