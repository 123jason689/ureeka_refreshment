import { ArrowRight } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();

  return (
        <>
      <main className="flex-1">
        <section className="bg-muted py-20 ">
          <div className=" flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Program Makanan Sekolah Indonesia
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Menyediakan makanan bergizi untuk anak-anak sekolah di seluruh Indonesia. Program ini bertujuan untuk
              meningkatkan gizi dan kesehatan anak-anak Indonesia.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div onClick={()=>navigate("/menu")}>
                <Button size="lg" className="gap-2 hover:underline">
                  Lihat Menu Besok <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div onClick={()=>navigate("/register")}>
                <Button size="lg" variant="outline">
                  Daftar Sebagai Penyedia
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20   ">
          <div className="px-32">
            <h2 className="mb-12 text-center text-3xl font-bold">Tentang Program</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Makanan Bergizi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Program ini menyediakan makanan bergizi yang seimbang untuk memenuhi kebutuhan nutrisi anak-anak
                    sekolah.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cakupan Nasional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Program ini mencakup seluruh wilayah Indonesia, dengan menu yang disesuaikan dengan kebutuhan lokal.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Transparansi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Informasi menu disediakan secara terbuka untuk memastikan transparansi dan akuntabilitas program.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className=" text-center text-sm">
          <p>© 2025 Program Makanan Sekolah Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
      </>
  )
}

