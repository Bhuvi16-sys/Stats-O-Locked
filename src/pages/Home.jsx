import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import HomeAbout from '../components/HomeAbout';
import Cards from '../components/Cards';
import Features from '../components/Features';
import Stats from '../components/Stats';
import CTA from '../components/CTA';
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <HomeAbout />
      <Cards />
      <Features />
      <Stats />
      <CTA />
    </>
  );
}
