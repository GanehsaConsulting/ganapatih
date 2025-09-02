import { FAQ } from "@/components/kontak/FAQ";
import { KontakForm } from "@/components/kontak/KontakForm";
import { RightSection } from "@/components/kontak/RightSection";

export default function KontakPage() {
  return (
    <main className=" w-full min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-stretch sm:mb-20">
        <KontakForm />
        <RightSection />
      </section>
      <FAQ/>
    </main>
  )
}
