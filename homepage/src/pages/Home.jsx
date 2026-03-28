import Hero from '../components/Hero';
import Cards from '../components/Cards';
import ThreeDScene from '../components/ThreeDScene';
import Events from '../components/Events';
import Stats from '../components/Stats';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Cards />
      <ThreeDScene />
      <Events />
      <Stats />
      <CTA />
    </>
  );
}
