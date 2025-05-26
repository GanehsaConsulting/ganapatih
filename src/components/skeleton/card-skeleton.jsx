export const CardSkeleton = ({ items = 4 }) => {
    const renderSkeletonItem = () => (
        <span className="md:h-[40lvh] h-[50lvh] p-0 flex-1 flex md:flex-col flex-row gap-2 justify-between group rounded-2xl relative">
            <div className="bg-lightColor dark:bg-darkColor flex-1 w-auto md:h-[30lvh] h-[100lvw] rounded-3xl animate-shimmer"></div>
        </span>
    );

    return (
        <>
            <section className="space-y-5">
                <div className="md:grid md:grid-cols-4 flex flex-col md:gap-5">
                    {Array.from({ length: items }).map((_, index) => (
                        <div key={index}>{renderSkeletonItem()}</div>
                    ))}
                </div>
            </section>
        </>
    );
};
