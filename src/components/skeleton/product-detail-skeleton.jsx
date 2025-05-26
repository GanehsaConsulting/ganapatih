export const ProductDetailSkeleton = () => {
    return (
        <div className="margin space-y-4">
            <div className="h-5 w-1/2 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
            <div className="md:grid md:grid-cols-9 gap-5 flex flex-col">
                <div className="col-span-3">
                    <div className="w-full h-full aspect-square animate-shimmer bg-lightColor dark:bg-darkColor rounded-main"></div>
                </div>
                <div className="col-span-6 space-y-4 flex flex-col">
                    <div className="h-10 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full"></div>
                    <div className="h-4 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full"></div>
                    <div className="h-4 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full"></div>
                    <div className="h-4 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full mt-auto"></div>
                    <div className="h-4 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full mt-auto"></div>
                    <div className="h-4 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full mt-auto"></div>
                    <div className="h-10 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary w-full"></div>
                </div>
            </div>
            <div className="md:grid md:grid-cols-10 gap-5 flex flex-col my-10">
                <div className="col-span-5 space-y-4">
                    <div className="h-10 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                    <div className="h-5 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                    <div className="h-5 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                    <div className="h-5 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                </div>
                <div className="col-span-5 space-y-4">
                    <div className="h-10 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                    <div className="h-5 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                    <div className="h-5 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                    <div className="h-5 animate-shimmer bg-lightColor dark:bg-darkColor rounded-secondary"></div>
                </div>
            </div>
        </div>
    )
}