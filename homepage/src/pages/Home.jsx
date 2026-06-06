import Hero from '../components/Hero';
import HomeAbout from '../components/HomeAbout';
import Cards from '../components/Cards';
import Features from '../components/Features';
import ThreeDScene from '../components/ThreeDScene';
import Events from '../components/Events';
import Stats from '../components/Stats';
import TeamSection from '../components/TeamSection';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import RobotAssistant from '../components/RobotAssistant';

export default function Home() {
  return (
    <>
      {/* 1. Hero — full viewport intro */}
      <Hero />

      {/* 2. About Us section */}
      <HomeAbout />

      {/* 3. Core Domains — 4 domain cards */}
      <Cards />

      {/* 3. Features — 6 club features grid */}
      <Features />

      {/* 4. 3D scene interlude */}
      <ThreeDScene />

      {/* 5. Upcoming Events */}
      <Events />

      {/* 6. Impact stats */}
      <Stats />

      {/* 8. Team section */}
      <TeamSection />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. CTA */}
      <CTA />

      {/* Statsy bot — home page only, fixed position */}
      <RobotAssistant />
    </>
  );
}

