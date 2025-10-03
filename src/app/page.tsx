import AboutSection from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TestimonialsSection from "@/components/sections/Testimonials";


export default function Home() {
  return (
    <main >
      <Hero/>
      <Services/>
      <AboutSection/>
      <TestimonialsSection/>
    </main>
     
  );
}
