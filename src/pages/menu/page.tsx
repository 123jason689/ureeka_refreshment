import { useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getTomorowDate, getAllRegion, RegionsType } from "@/lib/utils"
import { getDoc } from "firebase/firestore"

export default function NextMenu() {
  const formattedDate = getTomorowDate();
  const [selectedRegionId, setSelectedRegionId] = useState<string|undefined>(undefined);
  const [regions, setRegions] = useState<RegionsType[]>([]);
  const selectedRegion = selectedRegionId ? regions.find(r => r.id === selectedRegionId) : undefined;
  const [lunch, setLunch] = useState<string>("");
  const [snack, setSnack] = useState<string>("");
  const [nutritionalInfo, setNutritionalInfo] = useState<string>("");

  useEffect(()=>{
    getAllRegion(setRegions);
  },[]);
  useEffect(()=>{
    if (selectedRegionId) {
      getMenu();
    }
  }, [selectedRegionId]);

  const getMenu = async ()=>{
    const ref = selectedRegion?.menu
    if(ref){
      try{
        const snap = await getDoc(ref);
        const data = snap.data();
        if(data){
          setLunch(data.name||"Tidak ada informasi");
          setSnack(data.snack||"Tidak ada informasi");
          setNutritionalInfo(data.gizi||"Tidak ada informasi")
        } else {
          console.error("Menu not available in that region");
        }
      } catch (e){
        console.error("Error fetching menu data with code : \n" + e);
      }
    } else {
      console.error("Menu not available in that region");
    }
  }



  return (
    <div className="h-[91.5vh] flex flex-col justify-between">
        <main className="flex-col h-[60vh] justify-center items-center pt-28">
            <div className="mx-auto max-w-3xl ">
            <h1 className="mb-6 text-3xl font-bold">Menu Makanan Besok</h1>
            <div className="mb-8 flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="h-5 w-5" />
                <span>{formattedDate}</span>
            </div>
            
            <div className="mb-8">
                <label className="mb-2 block text-sm font-medium">Pilih Wilayah</label>
                <Select value={selectedRegionId} onValueChange={setSelectedRegionId} >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih wilayah Anda" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel>Wilayah</SelectLabel>
                        {regions.map((region) => (
                            <SelectItem key={region.id} value={region.id}>
                            {region.region}
                            </SelectItem>
                        ))}
                      </SelectGroup>
                  </SelectContent>
                </Select>
            </div>

            {selectedRegionId ? (
                <Card>
                <CardHeader>
                    <CardTitle>Menu untuk {regions.find((r) => r.id === selectedRegionId)?.region}</CardTitle>
                    <CardDescription>Menu makanan untuk besok, {formattedDate}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                    <h3 className="mb-2 font-semibold">Makan Siang</h3>
                    <p>{lunch}</p>
                    </div>
                    <div>
                    <h3 className="mb-2 font-semibold">Camilan</h3>
                    <p>{snack}</p>
                    </div>
                    <div className="rounded-lg bg-muted">
                    <h3 className="mb-2 font-semibold">Informasi Gizi</h3>
                    <p>{nutritionalInfo}</p>
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
            <div className="text-center text-sm">
            <p>© 2025 Program Makanan Sekolah Indonesia. Hak Cipta Dilindungi.</p>
            </div>
        </footer>
    </div>
  )
}

