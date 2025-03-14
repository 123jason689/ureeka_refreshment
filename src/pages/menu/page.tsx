import { useState } from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useNavigate } from "react-router-dom"

// Sample data - in a real app, this would come from an API
const regions = [
  { id: "jakarta", name: "Jakarta" },
  { id: "bandung", name: "Bandung" },
  { id: "surabaya", name: "Surabaya" },
  { id: "yogyakarta", name: "Yogyakarta" },
  { id: "medan", name: "Medan" },
  { id: "makassar", name: "Makassar" },
]

const mealData = {
  jakarta: {
    lunch: "Nasi Uduk dengan Ayam dan Tempe",
    snack: "Pisang dan Susu",
    nutritionalInfo: "Protein: 20g, Karbohidrat: 45g, Lemak: 15g, Vitamin A, C, D",
  },
  bandung: {
    lunch: "Nasi Merah dengan Ikan dan Sayuran",
    snack: "Apel dan Yogurt",
    nutritionalInfo: "Protein: 18g, Karbohidrat: 40g, Lemak: 12g, Vitamin B, C, D",
  },
  surabaya: {
    lunch: "Nasi dengan Ayam Bakar dan Capcay",
    snack: "Jeruk dan Susu Kedelai",
    nutritionalInfo: "Protein: 22g, Karbohidrat: 42g, Lemak: 14g, Vitamin A, B, C",
  },
  yogyakarta: {
    lunch: "Nasi dengan Pepes Ikan dan Sayur Asem",
    snack: "Pepaya dan Susu",
    nutritionalInfo: "Protein: 19g, Karbohidrat: 38g, Lemak: 10g, Vitamin A, C, E",
  },
  medan: {
    lunch: "Mie Goreng dengan Ayam dan Sayuran",
    snack: "Pisang Raja dan Susu",
    nutritionalInfo: "Protein: 21g, Karbohidrat: 48g, Lemak: 16g, Vitamin A, B, D",
  },
  makassar: {
    lunch: "Nasi dengan Ikan Bakar dan Sayur Kangkung",
    snack: "Mangga dan Susu",
    nutritionalInfo: "Protein: 20g, Karbohidrat: 43g, Lemak: 13g, Vitamin A, C, D",
  },
}

export default function NextMenu() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("")
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const formattedDate = tomorrow.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-6">
        <div className="container flex items-center justify-between">
          <div onClick={()=>navigate("/")} className="text-2xl font-bold text-primary-foreground">
            Program Makanan Sekolah
          </div>
          <nav className="flex items-center gap-4">
            <div onClick={()=>navigate("/meals")} className="text-primary-foreground hover:underline">
              Menu Besok
            </div>
            <div onClick={()=>navigate("/login")}>
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold">Menu Makanan Besok</h1>
          <div className="mb-8 flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-5 w-5" />
            <span>{formattedDate}</span>
          </div>

          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">Pilih Wilayah</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih wilayah Anda" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Wilayah</SelectLabel>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedRegion ? (
            <Card>
              <CardHeader>
                <CardTitle>Menu untuk {regions.find((r) => r.id === selectedRegion)?.name}</CardTitle>
                <CardDescription>Menu makanan untuk besok, {formattedDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Makan Siang</h3>
                  <p>{mealData[selectedRegion as keyof typeof mealData].lunch}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Camilan</h3>
                  <p>{mealData[selectedRegion as keyof typeof mealData].snack}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-semibold">Informasi Gizi</h3>
                  <p>{mealData[selectedRegion as keyof typeof mealData].nutritionalInfo}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">Silakan pilih wilayah untuk melihat menu makanan besok.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-muted py-6">
        <div className="container text-center text-sm">
          <p>© 2025 Program Makanan Sekolah Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}

