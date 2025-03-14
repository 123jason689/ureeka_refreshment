import { ArrowLeft, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function UnauthorizedPage() {
    const navigate = useNavigate()

  return (
    <div className="h-[91.5vh] flex flex-col justify-between">
      <main className=" flex flex-1 items-center justify-center py-12">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Akses Ditolak</CardTitle>
            <CardDescription>
              Anda tidak memiliki izin untuk mengakses halaman ini. Silakan login terlebih dahulu.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>
              Halaman ini hanya dapat diakses oleh penyedia makanan yang terdaftar. Jika Anda adalah penyedia makanan,
              silakan login dengan akun Anda.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div onClick={()=>navigate("/login")} className="w-full">
              <Button variant="outline" className="w-full">Login</Button>
            </div>
            <div onClick={()=>navigate("/")} className="w-full">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="bg-muted py-6">
        <div className=" text-center text-sm">
          <p>© 2025 Program Makanan Sekolah Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}