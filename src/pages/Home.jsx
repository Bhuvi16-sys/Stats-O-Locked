import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import HomeAbout from '../components/HomeAbout';
import Cards from '../components/Cards';
import Features from '../components/Features';
import Stats from '../components/Stats';
import CTA from '../components/CTA';
import SpaceScene from '../components/SpaceScene';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {isDesktop && <SpaceScene />}
        <Hero />
      </div>
      <Marquee />
      <HomeAbout />
      <Cards />
      <Features />
      <Stats />
      <CTA />
    </>
  );
}
