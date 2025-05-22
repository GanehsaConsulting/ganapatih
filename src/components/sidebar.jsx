"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { services, sidebarItems } from "@/data/system"
import { MultiMenuButton } from "./multi-menu-button"
import { Input } from "./ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
    const pathActive = usePathname()

    const [openKeys, setOpenKeys] = useState(["kategori-layanan", "rentang-harga"])
    const [priceRange, setPriceRange] = useState("")

    return (
        <main className={`sticky top-19 max-h-[90.4lvh] no-scrollbar overflow-y-auto border dark:border-darkColor px-5 py-4 rounded-main`}>
            <p className="text-xl font-medium mb-3">Filter Produk</p>

            <section className="space-y-2">
                <ToggleSection
                    id="kategori-layanan"
                    title="Kategori Layanan"
                    openKeys={openKeys}
                    setOpenKeys={setOpenKeys}
                >
                    <MultiMenuButton
                        pathActive={pathActive}
                        categories={sidebarItems.categories}
                        services={services}
                    />
                </ToggleSection>

                <ToggleSection
                    id="rentang-harga"
                    title="Rentang Harga"
                    openKeys={openKeys}
                    setOpenKeys={setOpenKeys}
                >
                    <ToggleChildrenWrapper className={"space-y-3"}>
                        <section className="grid grid-cols-5 mt-2">
                            <div className="col-span-2">
                                <Input
                                    className={""}
                                    placeholder="Min"
                                />
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                -
                            </div>
                            <div className="col-span-2">
                                <Input
                                    className={""}
                                    placeholder="Max"
                                />
                            </div>
                        </section>
                        <section>
                            <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                                {sidebarItems.rangeHarga.map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                        <RadioGroupItem value={item.value} id={`price-${idx}`} />
                                        <Label className={"truncate"} htmlFor={`price-${idx}`}>{item.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </section>
                        <Button
                            size={"sm"}
                            className={"w-full"}
                            variant={"secondary"}
                        >
                            Terapkan
                        </Button>
                    </ToggleChildrenWrapper>
                </ToggleSection>
            </section>
        </main>
    )
}


export const ToggleSection = ({ id, title, openKeys, setOpenKeys, children }) => {
    const isOpen = openKeys.includes(id)

    const toggle = () => {
        setOpenKeys(prev =>
            prev.includes(id)
                ? prev.filter(k => k !== id)
                : [...prev, id]
        )
    }

    return (
        <section>
            <Button
                onClick={toggle}
                variant={"ghost"}
                className={`${isOpen ? "bg-mainColorDark/30 dark:bg-mainColorDark/60 border-none !px-4" : "!px-0 hover:!px-4"} flex items-center gap-2 justify-between w-full font-semibold`}
            >
                {title}
                {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </Button>
            {isOpen && children}
        </section>
    )
}

export const ToggleChildrenWrapper = ({ children, className }) => {
    return (
        <section className={`${className} border-l border-l-mainColorDark/30 pl-4 ml-4 mt-2 space-y-1`}>
            {children}
        </section>
    )
}