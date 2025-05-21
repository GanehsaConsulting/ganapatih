"use client"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

const items = [
    { label: "Termurah", value: "termurah" },
    { label: "Termahal", value: "termahal" },
];

export default function DropdownSort({
    label = "Urutkan Berdasar",
    menuLabel = "",
    items: propItems = items,
    onSelect = () => {},
    buttonClassName = "",
    ...props
}) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button className={`flex justify-between w-full px-4 ${buttonClassName}`}>
                    {label}
                    <ChevronDownIcon
                        className={`ml-2 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className={"min-w-47"}
            align="start" {...props}>
                {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}
                {menuLabel && <DropdownMenuSeparator />}
                {(propItems || items).map((item, idx) => (
                    <DropdownMenuItem
                        key={item.value || idx}
                        onSelect={() => onSelect(item)}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
