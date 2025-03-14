import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth"
import { auth, firestore } from "@/lib/firebase/init"
import { doc, getDoc, DocumentReference } from "firebase/firestore"
import { TendantAttributes } from "@/lib/utils";

interface AuthType{
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean
}

interface AdminContextType{
    isAdmin: boolean|null,
}

interface TendantContextType{
  id:string|null,
  name:string|null,
  address:string|null,
  phone:string|null,
  region:DocumentReference|null,
}

const AuthContext = createContext<AuthType>({ user: null, isAuthenticated:false, loading:true })

const AdminContext = createContext<AdminContextType>({ isAdmin: false });

const TendantContext = createContext<TendantContextType>({ id: null, name:null, region:null, phone:null, address:null });

export const AuthProvider = ({children}: {children: ReactNode})=>{
    const [user, setUser] = useState<User|null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [id, setId] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null);
    const [address, setAddress] = useState<string|null>(null);
    const [phone, setPhone] = useState<string|null>(null);
    const [region, setRegion] = useState<DocumentReference|null>(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            console.log("Fetching user data");
            if (user) {
              try {
                const docSnap = await getDoc(doc(firestore, "tendant", user.uid));
                if (docSnap.exists()) {
                  const docdata = {id:docSnap.id, ...docSnap.data()} as TendantAttributes;
                  setIsAdmin(docdata.isAdmin || false);
                  setIsAuthenticated(true);
                  setId(docdata.id);
                  setName(docdata.name);
                  setRegion(docdata.region);
                  setPhone(docdata.phone);
                  setAddress(docdata.address);
                } else {
                  setIsAdmin(false);
                }
              } catch (e) {
                console.error("Error fetching admin status:", e);
                setIsAdmin(false);
              }
            } else {
              setIsAdmin(false);
            }
            setLoading(false);
          });
          return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, isAuthenticated, loading}}>
            <AdminContext.Provider value={{ isAdmin }}>
              <TendantContext.Provider value={{ id, name, region, phone, address}}>
                { children }
              </TendantContext.Provider>
            </AdminContext.Provider>
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
export const useAdmin = () => useContext(AdminContext)
export const useTendant = ()=> useContext(TendantContext)

