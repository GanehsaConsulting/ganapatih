"use client"
import { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Button } from "../ui/button";

const data = [
    {
        ulr: "",
        img: "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        ulr: "",
        img: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        ulr: "",
        img: "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        ulr: "",
        img: "https://plus.unsplash.com/premium_photo-1683121489634-5d3f7892a6fe?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        ulr: "",
        img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

export const Carousel = () => {
    const delay = 4000;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (data.length > 1) {
            const timer = setTimeout(() => {
                setIndex((prevIndex) =>
                    prevIndex === data.length - 1 ? 0 : prevIndex + 1
                );
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [index]);

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <div className="margin overflow-hidden rounded-main md:h-[45lvh] h-[25lvh] shadow-mainShadow relative flex flex-col items-center justify-center group">
                <div
                    className="whitespace-nowrap transition-transform ease-in-out duration-700 w-full h-full"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                    {data.map((el, i) => (
                        <div
                            key={i}
                            className="inline-block shadow w-full relative overflow-hidden rounded-main h-full"
                        >
                            <img
                                width={500}
                                height={500}
                                className="w-full h-full object-cover rounded-main hover:scale-110 duration-150 bg-baseColor"
                                src={el.img}
                                alt={`Slide ${i + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute z-10 bottom-2 flex justify-center mt-5">
                    {data.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 mx-1 min-w-0 rounded-full duration-200 cursor-pointer shadow-mainShadow
                                ${i === index ? "bg-white w-7" : "bg-white/50"}
                                `}
                        />
                    ))}
                </div>
                <div className="absolute bottom-0 w-[10vw] h-[10%] bg-black/10 blur-xl"></div>

                {/* Previous Button */}
                <Button
                    size={"icon"}
                    onClick={handlePrev}
                    className="hidden opacity-0 group-hover:opacity-100 border-neutral-200/20 absolute left-4 top-1/2 transform -translate-y-1/2 bg-mainColorLight/20 dark:bg-mainColorDark/20 dark:group-hover:bg-mainColorDark group-hover:bg-mainColorLight text-white  w-10 h-10 aspect-square !rounded-full group-hover:shadow-md group-hover:scale-110 scale-90 md:flex items-center justify-center md:!text-2xl"
                >
                    <RiArrowLeftSLine />
                </Button>

                {/* Next Button */}
                <Button
                    size={"icon"}
                    onClick={handleNext}
                    className="hidden opacity-0 group-hover:opacity-100 border-neutral-200/20 absolute right-4 top-1/2 transform -translate-y-1/2 bg-mainColorLight/20 dark:bg-mainColorDark/20 dark:group-hover:bg-mainColorDark group-hover:bg-mainColorLight text-white  w-10 h-10 aspect-square !rounded-full group-hover:shadow-md group-hover:scale-110 scale-90 md:flex items-center justify-center md:!text-2xl"
                >
                    <RiArrowRightSLine />
                </Button>
            </div>

        </>
    );
};
