'use client'
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross2 } from "react-icons/rx";

export const MegaMenuNavbar = ({
    id,
    title,
    expandedId,
    setExpandedId,
    children,
    arrowVisibility,
    icon,
    iconClassName,
    mobile,
}) => {

    const isExpanded = expandedId === id;

    const handleToggleExpand = () => {
        setExpandedId(isExpanded ? null : id);
    };


    return (
        <div
            className="relative"
            onMouseEnter={() => setExpandedId(id)}
            onMouseLeave={() => setExpandedId(null)}
        >
            {/* Trigger */}
            <div className="z-[100] relative">
                {title ? (
                    <div
                        className="cursor-pointer gap-1 py-[6px] px-3 flex items-center"
                        onClick={handleToggleExpand}
                    >
                        {title}
                        <span className={`${arrowVisibility} ${isExpanded ? 'rotate-180' : ''} duration-300 ease-in-out`}>
                            <IoIosArrowDown />
                        </span>
                    </div>
                ) : (
                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={handleToggleExpand} checked={isExpanded} readOnly />
                        <div className="swap-off">
                            <div className={iconClassName}>{icon}</div>
                        </div>
                        <div className="swap-on">
                            <div className={iconClassName}><RxCross2 className="text-xl" /></div>
                        </div>
                    </label>
                )}
            </div>

            {/* Mega Menu */}
            <div
                onMouseEnter={() => setExpandedId(id)}
                className={`fixed top-[0px] left-0 w-full bg-white dark:bg-black transition-all duration-450 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] overflow-hidden shadow-white dark:shadow-black
                         ${isExpanded
                        ? 'pointer-events-auto opacity-100 translate-y-0 max-h-[80vh]'
                        : 'pointer-events-none opacity-0 -translate-y-5 max-h-0'}`}
                style={{
                    minHeight: isExpanded ? '30vh' : '0',
                }}
            >
                <div className={`md:mx-24 mt-20`}>
                    {children}
                </div>
            </div>



            {mobile && (
                <div
                    onMouseEnter={() => setExpandedId(id)}
                    className={`fixed inset-0 w-full bg-secondaryDark/20 dark:bg-secondaryLight/10 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] overflow-hidden
                             ${isExpanded ? 'pointer-events-auto max-h-[100vh] opacity-100 translate-y-0 overflow-y-scroll noBar' : 'pointer-events-none max-h-0 opacity-0 -translate-y-5'}`}
                >
                    <div
                        className={` transition-transform duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]
                                 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                    >
                        {mobile}
                    </div>
                </div>
            )}
        </div>
    );
};
