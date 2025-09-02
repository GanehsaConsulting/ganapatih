import { KontakForm } from "@/components/kontak/KontakForm";
import { RightSection } from "@/components/kontak/RightSection";

export default function KontakPage() {
  return (
    <main className=" w-full min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
        <KontakForm />
        <RightSection />
      </div>
    </main>
  )
}
