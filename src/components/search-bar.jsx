import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const SearchBar = () => {
    return (
        <>
            <main>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Cari Nama Layanan, Kategori"
                    />
                    <Button
                    >
                        Cari
                    </Button>
                </div>
            </main>
        </>
    )
}