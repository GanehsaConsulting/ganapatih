import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const SearchBar = ({ value = '', onSearch }) => {
  const [inputValue, setInputValue] = useState(value)

  // Sync prop value ke local state jika ada perubahan dari parent
  // supaya controlled dan responsive
  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleSubmit(e) {
    e.preventDefault()
    if (onSearch) onSearch(inputValue.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Cari Nama Layanan, Kategori"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search input"
        />
        <Button type="submit">
          Cari
        </Button>
      </div>
    </form>
  )
}
