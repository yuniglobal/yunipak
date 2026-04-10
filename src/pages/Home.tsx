import Hero from '../components/HOME/Hero';
import FeaturesReveal from '../components/HOME/FeaturesReveal';
import CTA from '../components/HOME/CTA';
import TextEffect from '../components/HOME/TextEffect';
import Slider from '../components/HOME/slider';   // use the new component

export default function Home() {
  // Example logo images – replace with your actual paths
const logoImages = [
  'https://picsum.photos/id/100/100/100',   // camera
  'https://picsum.photos/id/101/100/100',   // mountain landscape
  'https://picsum.photos/id/104/100/100',   // waterfall
  'https://picsum.photos/id/107/100/100',   // grass
  'https://picsum.photos/id/116/100/100',   // mountain reflection
  'https://picsum.photos/id/119/100/100',   // mountain lake
  'https://picsum.photos/id/120/100/100',   // fruit
  'https://picsum.photos/id/155/100/100',   // train
  'https://picsum.photos/id/169/100/100',   // sunset
  'https://picsum.photos/id/176/100/100',   // flowers
];

  return (
    <>
      <Hero />
      <FeaturesReveal />
      
      <Slider
        images={logoImages.slice(0, 9)} // different set or same
        width={230}
        height={230}
        reverse={true}
        quantity={9}
      />
      <TextEffect />
      <CTA />
    </>
  );
}