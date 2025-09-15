import { RecommendedArticles } from "@/components/article-recommend";
import { CardCarousel } from "@/components/card-carousel";
import { Carousel } from "@/components/carousel";
import { CTA } from "@/components/cta";
import { RecommendServices } from "@/components/recommend-services";
import { ServicesButton } from "@/components/services-button";

export default function Home() {
  return (
    <>
      <Carousel />
      <ServicesButton />
      <CardCarousel />
      <RecommendServices/>
      <CTA/>
    </>
  );
}
