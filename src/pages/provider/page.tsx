import type React from "react"

import { useEffect, useState } from "react"
import { Calendar, LogOut, User } from "lucide-react"
import { DocumentReference, getDoc } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import NewMenu from "./newmenu/page"
import ProfilePage from "./profile/page"
import { useTendant } from "@/context/AuthContext"

type Page = "profile" | "newmenu";

interface PageProp{
  page: Page
}

const ProviderDashboard:React.FC<PageProp> =({page})=>{
  const { name, region } = useTendant()

  const [regionName, setRegionName] = useState<string>("Not Authorized");

  useEffect(()=>{
    // get the region name
    if (region) {
      // Fetch the region document data
      fetchRegion(region);
    }

  }, []);

  const fetchRegion = async (region:DocumentReference) => {
    try {
      const regionDoc = await getDoc(region);
      if (regionDoc.exists()) {
        const regionData = regionDoc.data();
        setRegionName(regionData?.region || "Undefined");
      } else {
        setRegionName("Undefined");
        console.log("No region document found");
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
  };

  const [pagein, setPagein] = useState<Page>(page);

  const handleLogout = ()=>{
    console.log("Logged out");
  }

  return (
    <>
    <div className="flex flex-col h-[91vh] justify-between">
      <main className="pt-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Penyedia</h1>
              <p className="text-muted-foreground">
                Selamat datang, {name ? name : "Unknown"}. Anda mengelola wilayah {regionName}.
              </p>
              <div className="container flex h-16 items-center justify-between">

                <nav className="hidden gap-6 lg:flex">
                  <div onClick={()=>setPagein("newmenu")} className="flex items-center gap-2 font-medium hover:underline cursor-pointer">
                    <Calendar className="h-5 w-5" />
                    Kelola Menu
                  </div>
                  <div onClick={()=>setPagein("profile")} className="flex items-center gap-2 font-medium hover:underline cursor-pointer">
                    <User className="h-5 w-5" />
                    Profil
                  </div>
                </nav>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden lg:flex">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
              </div>
            </div>
            { pagein == "newmenu" && <NewMenu/> }
            { pagein == "profile" && <ProfilePage/> }
          </div>
        </div>
      </main>
      <footer className="">
        <div className=" text-center text-sm text-muted-foreground">
          <p>© 2025 Program Makanan Sekolah Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
    </>
  )
}

export default ProviderDashboard;

