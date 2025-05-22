"use client"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { ToggleChildrenWrapper, ToggleSection } from "./sidebar"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MultiMenuButton } from "./multi-menu-button"
import { services, sidebarItems } from "@/data/system"
import { RiFilter2Fill } from "react-icons/ri";

export const GroupFilter = () => {
    const pathActive = usePathname()

    const [openKeys, setOpenKeys] = useState(["kategori-layanan", "rentang-harga"])
    const [priceRange, setPriceRange] = useState("")
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className={"md:hidden flex items-center gap-2"}
                        variant="outline"
                    >
                        <RiFilter2Fill />
                        Filter
                    </Button>
                </DialogTrigger>
                <DialogContent variant="bottom" className={"max-h-[70vh] overflow-x-scroll"}>
                    <DialogHeader className={"text-left"}>
                        <DialogTitle>Filter Layanan</DialogTitle>
                    </DialogHeader>
                    <section className="space-y-2 my-5">
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
                                                <Label className={"truncate"} htmlFor={`price-${idx}`}>
                                                    {item.label}
                                                </Label>
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
                    <DialogFooter>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                type="submit"
                                variant={"destructive"}
                            >
                                Reset filter
                            </Button>
                            <Button
                                type="submit"
                                variant={"main"}
                            >
                                Terapkan Filter
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}