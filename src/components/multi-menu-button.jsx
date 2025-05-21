"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import Link from "next/link"

export const MultiMenuButton = ({ categories = [], services = {}, pathActive = "" }) => {
    const [expanded, setExpanded] = useState([])

    const toggleExpand = (key) => {
        setExpanded(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        )
    }

    const allMainProducts = categories
        .flatMap(cat => services[cat.key] || [])
        .filter(item => item.mainProduct)
        .sort((a, b) => a.id - b.id)

    const isExpanded = (key) => expanded.includes(key)

    // --- Auto-expand berdasarkan pathActive ---
    useEffect(() => {
        const expandedKeys = []

        // Cek mainProduct
        if (allMainProducts.some(item => item.href === pathActive)) {
            expandedKeys.push("main")
        }

        // Cek kategori reguler
        categories.forEach(cat => {
            const items = (services[cat.key] || []).filter(item => !item.mainProduct)
            const match = items.some(item => item.href === pathActive)
            if (match) expandedKeys.push(cat.key)
        })

        setExpanded(expandedKeys)
    }, [pathActive, categories, services])

    return (
        <section className="border-l border-l-mainColorDark/30 pl-4 ml-4 mt-2 space-y-1">
            {allMainProducts.length > 0 && (
                <CategorySection
                    label="Layanan Populer"
                    items={allMainProducts}
                    isExpanded={isExpanded("main")}
                    toggle={() => toggleExpand("main")}
                    pathActive={pathActive}
                />
            )}

            {categories.map((cat) => {
                const items = (services[cat.key] || []).filter(item => !item.mainProduct)
                if (items.length === 0) return null

                return (
                    <CategorySection
                        key={cat.key}
                        label={cat.label}
                        items={items}
                        isExpanded={isExpanded(cat.key)}
                        toggle={() => toggleExpand(cat.key)}
                        pathActive={pathActive}
                    />
                )
            })}
        </section>
    )
}

const CategorySection = ({ label, items, isExpanded, toggle, pathActive }) => {
    return (
        <div className={`${isExpanded ? "" : "border-b pb-[1px] hover:border-0"}`}>
            <Button
                onClick={toggle}
                className={`flex items-center gap-2 justify-between w-full px-0 ${isExpanded ? "!px-4 bg-secondaryColorDark/35 dark:bg-secondaryColorLight/50" : ""}`}
                variant={isExpanded ? "main" : "ghost"}
                size="ghost"
            >
                {label}
                <span className={`${isExpanded ? "text-black dark:text-white" : ""} text-muted-foreground`}>
                    {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </span>
            </Button>

            {isExpanded && (
                <ul className="border-l border-l-secondaryColorDark/50 pl-4 ml-4 mt-2 mb-3 space-y-2">
                    {items.map((item) => (
                        <ServiceItem key={item.id} item={item} pathActive={pathActive} />
                    ))}
                </ul>
            )}
        </div>
    )
}

const ServiceItem = ({ item, pathActive }) => {
    const isActive = pathActive === item.href

    return (
        <Link
            href={item.href}
            className={`cursor-pointer hover:text-black dark:hover:text-white hover:font-medium hover:scale-101 duration-300 flex gap-2 justify-between w-full text-sm border-b dark:border-b-secondaryDark pb-2
                ${isActive
                    ? "text-mainColor font-semibold dark:text-mainColor"
                    : "text-muted-foreground"
                }`}
        >
            {item.label}
            <span className="mt-1">{item.icon}</span>
        </Link>
    )
}