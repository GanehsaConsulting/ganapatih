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
  // Pastikan nilai max kalau Infinity diganti ke angka besar untuk input
  const safeMax = valueMax === Infinity ? 9999999999 : valueMax

  const [localMin, setLocalMin] = useState(valueMin.toString())
  const [localMax, setLocalMax] = useState(safeMax.toString())

  // Sync state lokal jika props berubah
  useEffect(() => {
    setLocalMin(valueMin.toString())
  }, [valueMin])

  useEffect(() => {
    setLocalMax((valueMax === Infinity ? 9999999999 : valueMax).toString())
  }, [valueMax])

  function handleApply() {
    const min = parseInt(localMin)
    const max = parseInt(localMax)

    const minPrice = isNaN(min) ? 0 : min
    const maxPrice = isNaN(max) ? 9999999999 : max

    console.log('🟩 Terapkan harga:', { minPrice, maxPrice })

    onChange({
      minPrice,
      maxPrice,
    })
  }

  // Buat value untuk RadioGroup biar sesuai dengan pilihan saat ini
  const radioValue = `${localMin}-${localMax}`

  return (
    <div className="space-y-3">
      <section className="grid grid-cols-5 mt-2">
        <div className="col-span-2">
          <Input
            placeholder="Min"
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
          />
        </div>
        <div className="col-span-1 flex items-center justify-center">-</div>
        <div className="col-span-2">
          <Input
            placeholder="Max"
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
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
