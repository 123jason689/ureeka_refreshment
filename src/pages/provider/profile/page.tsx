import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { useTendant } from "@/context/AuthContext"
import { getAllRegion, RegionsType, fetchRegion } from "@/lib/utils"

const ProfilePage = ()=>{
    const tendantInfo = useTendant();

    const [regions, setRegions] = useState<RegionsType[]>([])
    const [name, setName] = useState<string|null>(tendantInfo.name)
    const [region, setRegion] = useState<RegionsType>()
    const [address, setAddress] = useState<string|null>(tendantInfo.address)
    const [phone, setPhone] = useState<string|null>(tendantInfo.phone)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        if(tendantInfo.region){
            fetchRegion(tendantInfo.region, setRegion)
        }
        getAllRegion(setRegions);
    },[]);

    const handleRemoveAccount = ()=>{
        console.log("Account Removed");
    }

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            // In a real app, you would send this to a backend
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setSuccess(true)

            // Reset success message after 3 seconds
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        } catch (err) {
            setError("Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.")
            console.error("Error updating profile:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>Perbarui informasi profil penyedia makanan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Berhasil!</AlertTitle>
                    <AlertDescription>Informasi profil Anda telah berhasil diperbarui.</AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nama Penyedia</Label>
                    <Input
                      id="name"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Penyedia"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="region">Wilayah</Label>
                    <Select 
                      value={region?.id} 
                      onValueChange={(value) => {
                        const selectedRegion = regions.find(r => r.id === value);
                        if (selectedRegion) setRegion(selectedRegion);
                      }} 
                      required
                    >
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Pilih wilayah" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                      id="address"
                      value={ address || "" }
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Alamat lengkap"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={phone || ""}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nomor telepon"
                      />
                    </div>
                  </div>

                  <Button variant="outline" type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </form>
              </CardContent>
            </Card> 

            {/* Account Information */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Informasi Akun</CardTitle>
                <CardDescription>Detail akun dan informasi pendaftaran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">ID Penyedia</h3>
                      <p className="mt-1">{tendantInfo.id}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tindakan Akun</h3>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <Button
                        onClick={()=>handleRemoveAccount()}
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        Nonaktifkan Akun
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Menonaktifkan akun akan menghentikan semua layanan dan akses ke dashboard penyedia. Hubungi
                      administrator untuk mengaktifkan kembali akun Anda.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </>
    )
}

export default ProfilePage
