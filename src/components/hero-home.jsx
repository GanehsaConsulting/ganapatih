import { heroSection } from "@/data/system"
import { TextMainGradient } from "./reuse-class"
import Image from "next/image"
import { Button } from "./ui/button"

export const HeroHome = () => {
    return (
        <section className="min-h-screen max-w-screen w-full h-full flex flex-col">
            <div className="w-full h-[40lvh] flex justify-between items-center gap-5 px-5">
                <div className="flex flex-col gap-5 w-[40%]">
                <h1 className="text-6xl tracking-tighter text-balance max-w-2x text-left">
                    Solusi Pajak Terpercaya untuk
                    <span className={`${TextMainGradient}`}>
                        {" "}  Bisnis Anda
                    </span>
                </h1>
                <Button className={'font-semibold border-0 w-fit bg-secondaryColorDark dark:bg-secondaryColorLight'}>
                    Mulai Sekarang
                </Button>
                </div>
                <div className="w-[40%] border-l px-5 border-mainColorLight/50 dark:border-mainColorDark/50 h-[130px] flex items-center bg-mainColorLight/5 dark:bg-mainColorDark/20 rounded-r-main">
                    <p className="max-w-2xl opacity-80">
                        {heroSection.subtitle}
                    </p>
                </div>
            </div>
            <div className="w-full h-[55lvh] rounded-main relative">
                <Image
                    className="object-cover object-bottom w-full h-full"
                    src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Banner Image"
                    width={500}
                    height={500}
                />
            </div>
        </section>
        // <section className="w-screen h-screen">
        //     <div className="relative w-full h-full">
        //         <Image
        //             className="object-cover object-bottom w-full h-full"
        //             src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        //             alt="Banner Image"
        //             fill
        //         />
        //         <div className="absolute inset-0 w-full h-full bg-darkColor/50 z-10" />
        //         <div className="absolute inset-0 w-full h-full z-20">
        //             <div className="w-full h-full flex  flex-col justify-center items-center gap-5">
        //                 <h1 className="text-6xl tracking-tighter text-balance text-white">
        //                     Solusi Pajak Terpercaya untuk  Bisnis Anda
        //                 </h1>
        //                 <p className="max-w-2xl text-secondaryLight">
        //                     {heroSection.subtitle}
        //                 </p>
        //                 <Button className={'bg-lightColor/80 backdrop-blur-lg font-semibold border-0'}>
        //                     Mulai Sekarang
        //                 </Button>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    )
}