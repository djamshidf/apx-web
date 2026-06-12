import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CanvasOverlay from '@/components/CanvasOverlay';
import GradientOrbs from '@/components/GradientOrbs';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Statistics from '@/sections/Statistics';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-warm-white overflow-x-hidden">
      {/* Global overlays */}
      <CanvasOverlay />
      <GradientOrbs />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Statistics />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
