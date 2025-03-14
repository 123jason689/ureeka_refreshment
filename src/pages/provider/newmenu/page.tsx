import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { getTomorowDate } from "@/lib/utils"


export default function NewMenu(){
    const [lunch, setLunch] = useState("")
    const [snack, setSnack] = useState("")
    const [nutritionalInfo, setNutritionalInfo] = useState("")
    
    const formattedDate = getTomorowDate()
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      alert("Menu untuk besok berhasil diperbarui!")
    }

    return (
        <Card>
        <CardHeader>
          <CardTitle>Kelola Menu</CardTitle>
          <CardDescription>Tentukan menu makanan untuk besok, {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="lunch">Makan Siang</Label>
              <Input
                id="lunch"
                value={lunch}
                onChange={(e) => setLunch(e.target.value)}
                placeholder="Contoh: Nasi dengan Ayam dan Sayuran"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="snack">Camilan</Label>
              <Input
                id="snack"
                value={snack}
                onChange={(e) => setSnack(e.target.value)}
                placeholder="Contoh: Buah dan Susu"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nutritional-info">Informasi Gizi</Label>
              <Textarea
                id="nutritional-info"
                value={nutritionalInfo}
                onChange={(e) => setNutritionalInfo(e.target.value)}
                placeholder="Contoh: Protein: 20g, Karbohidrat: 45g, Lemak: 15g, Vitamin A, C, D"
                rows={3}
              />
            </div>
            <Button variant="outline" type="submit">Simpan Menu</Button>
          </form>
        </CardContent>
      </Card>
    )
}