import { CardCarousel } from "@/components/card-carousel";
import { Carousel } from "@/components/carousel";
import { ServicesButton } from "@/components/services-button";


export default function Home() {
  return (
    <>
      <Carousel />
      <ServicesButton />
      <CardCarousel />
    </>
  );
}
