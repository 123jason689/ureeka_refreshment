import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { getTomorowDate } from "@/lib/utils"
import { getAllMenu, MenusType } from "@/lib/utils"
import { collection, writeBatch, updateDoc, doc } from "firebase/firestore"
import { firestore } from "@/lib/firebase/init"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTendant } from "@/context/AuthContext"



export default function NewMenu(){
    const { region } = useTendant();
    const [menus, setMenus] = useState<MenusType[]>([]);
    const [lunch, setLunch] = useState("")
    const [snack, setSnack] = useState("")
    const [nutritionalInfo, setNutritionalInfo] = useState("")
    const [selectedMenuId, setselectedMenuId] = useState<string|undefined>(undefined);
    
    useEffect(()=>{
      getAllMenu(setMenus);      
    }, []);

    const formattedDate = getTomorowDate();
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if(selectedMenuId === "none"){
        if(!validate()){ return; }
        
        // Create a batch operation
        const batch = writeBatch(firestore);
        
        // Create a new document reference with auto-generated ID
        const menuDocRef = doc(collection(firestore, "menu"));
        
        // Set the new menu data
        batch.set(menuDocRef, {
          name: lunch,
          snack: snack,
          gizi: nutritionalInfo,
        });
        
        // Update the region's menu reference with the new menu ID
        if (region) {
          batch.update(region, {
            menu: menuDocRef
          });
        }
        
        try {
          // Commit the batch
          await batch.commit();
          alert("Menu untuk besok berhasil diperbarui!")
        } catch (error) {
          console.error("Error updating menu:", error);
          alert("Gagal memperbarui menu")
        }
      } else {
        if(region && selectedMenuId && selectedMenuId !== "none"){
          const selectedMenuRef = doc(firestore, "menu", selectedMenuId);
          updateDoc(region, { menu: selectedMenuRef });
          alert("Menu untuk besok berhasil diperbarui!")
        } else {
          alert("Gagal memperbarui menu")
        }

      }
    }

    const validate = ():boolean=>{
      if(lunch.length < 3){
        alert("Nama menu harus lebih panjang dari 3 karakter")
        return false;
      } else if(snack.length < 3){
        alert("Nama camilan harus lebih panjang dari 3 karakter ");
        return false;
      } else if(nutritionalInfo.length < 3){
        alert("Deskripsi nutrisi tidak boleh lurang dari 3 karakter");
        return false;
      } else {
        return true
      }
    }

    return (
        <Card>
        <CardHeader>
          <CardTitle>Kelola Menu</CardTitle>
          <CardDescription>Tentukan menu makanan untuk besok, {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-8">
                <label className="mb-2 block text-sm font-medium">Pilih Menu Sebelumnya</label>
                <Select value={selectedMenuId} onValueChange={setselectedMenuId} >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih menu yang ada" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel>Menu</SelectLabel>
                        <SelectItem key={"00000000000"} value="none">
                          Buat Menu Baru
                        </SelectItem>
                        {menus.map((menu) => (
                            <SelectItem key={menu.id} value={menu.id}>
                            {menu.name}
                            </SelectItem>
                        ))}
                      </SelectGroup>
                  </SelectContent>
                </Select>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            { selectedMenuId === "none" &&
              <>
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
              </> 
            }
            <Button variant="outline" type="submit">Simpan Menu Besok</Button>
          </form>
        </CardContent>
      </Card>
    )
}