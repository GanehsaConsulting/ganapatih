"use client"
import { services } from "@/data/system"
import { Button } from "./ui/button"
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"

export const Sidebar = () => {
    const [showCategories, setShowCategories] = useState(false)
    const [expanded, setExpanded] = useState([])

    const toggleExpand = (key) => {
        setExpanded(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        )
    }

    const categories = [
        { key: "law", label: "Layanan Hukum" },
        { key: "creative", label: "Layanan Kreatif" },
        { key: "finance", label: "Layanan Finansial" },
        { key: "management", label: "Layanan Manajemen" },
        { key: "workspace", label: "Layanan Workspace" },
    ]

    return (
        <main className="border dark:border-darkColor px-5 py-4 rounded-main">
            <p className="text-xl font-medium mb-3">
                Filter Produk
            </p>
            <section>
                {/* Toggle kategori layanan */}
                <Button
                    onClick={() => setShowCategories(prev => !prev)}
                    className={`${showCategories && "bg-mainColorDark/15 dark:bg-mainColorDark/40 border-none !px-4"} flex items-center gap-2 justify-between px-0 w-full font-semibold`}

                >
                    Kategori Layanan
                    {showCategories ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </Button>

                {showCategories && (
                    <section className="">
                        <div className="border-l border-l-mainColorDark/30 pl-4 ml-4 mt-2 space-y-1">
                            {categories.map((cat) => (
                                <div key={cat.key}
                                    className={`${expanded.includes(cat.key) ? "" : "border-b pb-[1px] hover:border-0"}`}
                                >
                                    <Button
                                        onClick={() => toggleExpand(cat.key)}
                                        className={`${expanded.includes(cat.key) ? "!px-4 bg-secondaryColorDark/35 dark:bg-secondaryColorDark/50" : ""} flex items-center gap-2 justify-between px-0 w-full`}
                                        variant={expanded.includes(cat.key) ? "main" : "ghost"}
                                        size="ghost"
                                    >
                                        {cat.label}
                                        <span className={`${expanded.includes(cat.key) ? "text-black dark:text-white" : ""} text-muted-foreground`}>
                                            {expanded.includes(cat.key) ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                        </span>
                                    </Button>

                                    {expanded.includes(cat.key) && (
                                        <ul className="border-l border-l-secondaryColorDark/50 pl-4 ml-4 mt-2 mb-3 space-y-2">
                                            {services[cat.key]?.map((item, idx, arr) => (
                                                <li
                                                    key={item.id}
                                                    className={`cursor-pointer hover:text-black dark:hover:text-white hover:font-medium hover:scale-101 duration-300 flex gap-2 justify-between px-0 w-full text-sm text-muted-foreground border-b pb-2`}
                                                >
                                                    {item.label}
                                                    <span className="mt-1">
                                                        {item.icon}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </section>
        </main>
    )
}
