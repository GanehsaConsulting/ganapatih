"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"

export default function ProductQuantityCounter({ min = 1, max = 99, onChange }) {
    const [quantity, setQuantity] = useState(min)

    const handleIncrement = () => {
        if (quantity < max) {
            const newQty = quantity + 1
            setQuantity(newQty)
            onChange?.(newQty)
        }
    }

    const handleDecrement = () => {
        if (quantity > min) {
            const newQty = quantity - 1
            setQuantity(newQty)
            onChange?.(newQty)
        }
    }

    return (
        <div className="flex items-center gap-3 border border-border rounded-btnSecondary px-1 py-1 w-fit">
            <Button
                size={"xs"}
                variant={"ghost"}
                onClick={handleDecrement}
                disabled={quantity <= min}
                className="text-muted-foreground rounded-full hover:text-mainColorLight dark:hover:text-mainColorDark disabled:opacity-40"
            >
                <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-semibold min-w-[24px] text-center">{quantity}</span>
            <Button
                size={"xs"}
                variant={"ghost"}
                onClick={handleIncrement}
                disabled={quantity >= max}
                className="text-muted-foreground rounded-full hover:text-mainColorLight dark:hover:text-mainColorDark disabled:opacity-40"
            >
                <Plus className="w-3 h-3" />
            </Button>
        </div>
    )
}
