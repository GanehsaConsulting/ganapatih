"use client"

import { useMemo, useState } from "react"
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

const defaultItems = [
  { label: "Termurah", value: "termurah" },
  { label: "Termahal", value: "termahal" },
]

export default function DropdownSort({
  value = "",
  onSelect = () => {},
  onChange = () => {},
  label = "Urutkan Berdasar",
  menuLabel = "",
  items = defaultItems,
  buttonClassName = "",
  ...props
}) {
  const [open, setOpen] = useState(false)

  // Cari label berdasarkan selected value
  const currentItem = (items || propItems).find((i) => i.value === value)

  return (
        <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={`flex justify-between w-full px-4 ${buttonClassName}`}>
          {currentItem?.label || label}
          <ChevronDownIcon className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {(items || propItems).map((item) => (
          <DropdownMenuItem
            key={item.value}
            onSelect={() => onChange(item.value)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
