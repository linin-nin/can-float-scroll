import AlthernatingText from "@/components/AlthernatingText";
import BigText from "@/components/BigText";
import Carousel from "@/components/Carousel";
import Hero from "@/components/hero/Hero";
import SkyDive from "@/components/SkyDive";

export default function Home() {
  return (
    <>
      <Hero/>
      <SkyDive/>
      <Carousel/>
      <AlthernatingText/>
      <BigText/>
    </>
  );
}
