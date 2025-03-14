import { useNavigate } from "react-router-dom"
import { Button } from "./button"


const Navbar = ()=>{
    const navigate = useNavigate()
    return(
        <div className="w-full flex justify-between py-5 px-15 fixed top-0 left-0 z-50 bg-background">
        <div onClick={()=>navigate("/")} className="text-2xl font-bold text-primary-foreground cursor-pointer">
          Program Makanan Sekolah
        </div>
        <nav className="flex items-center gap-10 cursor-pointer">
          <div onClick={()=>navigate("/menu")} className="text-lg text-primary-foreground hover:underline">
            Menu Besok
          </div>
          <div onClick={()=>navigate("/login")}>
            <Button variant="outline" size="sm" >
              Login Penyedia
            </Button>
          </div>
        </nav>
            </div>
    )
}


export default Navbar