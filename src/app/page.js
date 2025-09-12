import { RecommendedArticles } from "@/components/article-recommend";
import { CardCarousel } from "@/components/card-carousel";
import { Carousel } from "@/components/carousel";
import { CTA } from "@/components/cta";
import { ServicesButton } from "@/components/services-button";

export default function Home() {
  return (
    <>
      <Carousel />
      <ServicesButton />
      <CardCarousel />
      <CTA
      title="Lorem Ipsum"
      desc="lorem ipsum dolor sit amet"
      buttonCTA="Hubungi Kami"
      className="mx-24"
      />
    </>
  );
}
