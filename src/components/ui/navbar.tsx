import { useNavigate } from "react-router-dom"
import { Button } from "./button"
import { useAdmin, useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/init";

const Navbar = ()=>{
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const { isAdmin } = useAdmin();

    const handleLogout = async ()=>{
      try {
        await signOut(auth);
        navigate('/login'); // Redirect to login page after logout
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }

    if (loading) {
      return (
        <div className="w-full flex justify-between py-5 px-15 fixed top-0 left-0 z-50 bg-background">
          <div className="text-2xl font-bold text-primary-foreground">
            Program Makanan Sekolah
          </div>
          <div className="text-primary-foreground">Loading...</div>
        </div>
      );
    }


    
    return(
        <div className="w-full flex justify-between py-5 px-15 fixed top-0 left-0 z-50 bg-background">
        <div onClick={()=>navigate("/")} className="text-2xl font-bold text-primary-foreground cursor-pointer">
          Program Makanan Sekolah
        </div>
        <nav className="flex items-center gap-10 cursor-pointer">
          { isAdmin && 
            <div onClick={()=>navigate("/admin")} className="text-lg text-red-600 font-bold hover:underline">
              Admin
            </div>
          }
          { isAuthenticated && 
            <div onClick={()=>navigate("/dashboard")} className="text-lg text-primary-foreground hover:underline">
              Dashboard
            </div>
          }
          <div onClick={()=>navigate("/menu")} className="text-lg text-primary-foreground hover:underline">
            Menu Besok
          </div>
          { !isAuthenticated ? 
            <div onClick={()=>navigate("/login")}>
              <Button variant="outline" size="sm" >
                Login Penyedia
              </Button>
            </div>
            :
            <div onClick={()=>handleLogout()}>
              <Button variant="outline" size="sm" >
                Logout
              </Button>
            </div>
          }
        </nav>
            </div>
    )
}


export default Navbar