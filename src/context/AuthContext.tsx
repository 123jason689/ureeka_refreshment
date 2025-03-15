    import { useContext, useState, useEffect, createContext, ReactNode } from "react";
    import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
    import { auth, firestore } from "@/lib/firebase/init"
    import { doc, getDoc, DocumentReference, setDoc } from "firebase/firestore"
    import { TendantAttributes } from "@/lib/utils";

    interface AuthType{
        user: User | null,
        isAuthenticated: boolean,
        loading: boolean,
        loginUser: (email: string, password: string) => Promise<void>
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

    const AuthContext = createContext<AuthType>({ user: null, isAuthenticated:false, loading:true ,loginUser: async () => Promise.resolve()})

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

    const loginUser = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if(user){
                setUser(user);
                setIsAuthenticated(true);
                console.log(user)

            const docSnap = await getDoc(doc(firestore, "tendant", user.uid));
            console.log(docSnap + "docsp")
            if (docSnap.exists()) {
                const docdata = { id: docSnap.id, ...docSnap.data() } as TendantAttributes;
                setIsAdmin(docdata.isAdmin || false);
                setId(docdata.id);
                setName(docdata.name);
                setRegion(docdata.region);
                setPhone(docdata.phone);
                setAddress(docdata.address);
                console.log(`
                    ID: ${docdata.id}
                    Name: ${docdata.name}
                    Region: ${docdata.region}
                    Phone: ${docdata.phone}
                    Address: ${docdata.address}
                  `);
            } else {
                setIsAdmin(false);
            }
        }
        } catch (error) {
            console.error("Login failed:", error);
        }finally{
            setLoading(false);
        }
    };

    const registerUser = async (email: string, password: string, name: string, address: string, phone: string, region: string) => {
        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = users.user;
            const userRef = doc(firestore, "tendant", user.uid);
            const regionDir = `/region/${region}`;    
            const regionRef = doc(firestore, regionDir.replace(/^\//, ""))
            
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
                console.log("User Registered:", user);
    
                await setDoc(userRef, {
                    name,
                    address,
                    phone,
                    regionRef,
                    uid: user.uid,
                });
    
                setId(user.uid);
                setName(name);
                setRegion(regionRef);
                setPhone(phone);
                setAddress(address);
                setIsAdmin(false);
    
                console.log(`
                    UID: ${user.uid}
                    Name: ${name}
                    Address: ${address}
                    Phone: ${phone}
                    Region: ${regionDir}
                    Admin: false
                `);
            }
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setLoading(false);
        }
    };

        useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                setIsAuthenticated(true)
                try {
                    const docSnap = await getDoc(doc(firestore, "tendant", user.uid));
                    if (docSnap.exists()) {
                        const docdata = { id: docSnap.id, ...docSnap.data() } as TendantAttributes;
                        setIsAdmin(docdata.isAdmin || false);
                        setId(docdata.id);
                        setName(docdata.name);
                        setRegion(docdata.region);
                        setPhone(docdata.phone);
                        setAddress(docdata.address);  
                    } else {
                        setIsAdmin(false);
                    }
                } catch (e) {
                    console.error("Error fetching user data:", e);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


        return (
            <AuthContext.Provider value={{user, isAuthenticated, loading,loginUser}}>
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

