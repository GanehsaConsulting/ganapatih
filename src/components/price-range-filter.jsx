import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function PriceRangeFilter({
  valueMin = 0,
  valueMax = Infinity,
  onChange = () => {},
  options = [],
}) {
  const [localMin, setLocalMin] = useState("")
  const [localMax, setLocalMax] = useState("")
  const [hasInteracted, setHasInteracted] = useState(false)

  // Saat prop berubah dan user belum edit, sync nilai tapi kosongkan input
  useEffect(() => {
    if (!hasInteracted) {
      setLocalMin("")
      setLocalMax("")
    }
  }, [valueMin, valueMax, hasInteracted])

  function handleApply() {
    const min = parseInt(localMin)
    const max = parseInt(localMax)

    const minPrice = isNaN(min) ? 0 : min
    const maxPrice = isNaN(max) ? 9999999999 : max

    onChange({
      minPrice,
      maxPrice,
    })

    setHasInteracted(true)
  }

  const radioValue =
    localMin && localMax ? `${localMin}-${localMax}` : ""

  return (
    <div className="space-y-3">
      <section className="grid grid-cols-5 mt-2">
        <div className="col-span-2">
          <Input
            placeholder="Min"
            type="number"
            value={localMin}
            onChange={(e) => {
              setLocalMin(e.target.value)
              setHasInteracted(true)
            }}
          />
        </div>
        <div className="col-span-1 flex items-center justify-center">-</div>
        <div className="col-span-2">
          <Input
            placeholder="Max"
            type="number"
            value={localMax}
            onChange={(e) => {
              setLocalMax(e.target.value)
              setHasInteracted(true)
            }}
          />
        </div>
      </section>

      <section>
        <RadioGroup
          value={radioValue}
          onValueChange={(val) => {
            const [min, max] = val.split('-')
            setLocalMin(min)
            setLocalMax(max)
            setHasInteracted(true)
          }}
        >
          {options.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <RadioGroupItem value={item.value} id={`price-${idx}`} />
              <Label htmlFor={`price-${idx}`}>{item.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      <Button size="sm" variant="secondary" className="w-full" onClick={handleApply}>
        Terapkan
      </Button>
    </div>
  )
}
