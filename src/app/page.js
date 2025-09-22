import { CardCarousel } from "@/components/homepage/card-carousel";
import { Carousel } from "@/components/homepage/carousel";
import { CTA } from "@/components/cta";
import { RecommendServices } from "@/components/homepage/recommend-services";
import { ServicesButton } from "@/components/homepage/services-button";
import { RecommendedArticlesHome } from "@/components/homepage/recommend-articles";

export default function Home() {
  return (
    <>
      <Carousel />
      <ServicesButton />
      <CardCarousel
        sourcePath="konsultan-pajak"
        title="Paket Konsultan Pajak"
      />
      <CardCarousel sourcePath="pendirian-pt" title="Paket Pendirian PT" />
      <RecommendServices />
      <RecommendedArticlesHome />
      <CTA />
    </>
  );
}
