import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth"
import { auth, firestore } from "../lib/firebase/init"
import { doc, getDoc } from "firebase/firestore"
import { TendantAttributes } from "../lib/util";

interface AuthType{
    user: User | null,
    loading: boolean
}

interface AdminContextType{
    isAdmin: boolean|null,
}

const AuthContext = createContext<AuthType>({ user: null, loading:true })

const AdminContext = createContext<AdminContextType>({ isAdmin: false });

export const AuthProvider = ({children}: {children: ReactNode})=>{
    const [user, setUser] = useState<User|null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
        <AuthContext.Provider value={{user, loading}}>
            <AdminContext.Provider value={{ isAdmin }}>
                { children }
            </AdminContext.Provider>
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
export const useAdmin = () => useContext(AdminContext)

