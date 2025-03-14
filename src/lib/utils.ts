import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { collection, DocumentReference, getDocs, getDoc } from "firebase/firestore"
import { firestore } from "@/lib/firebase/init"

export interface TendantAttributes{
    id:string,
    isAdmin:boolean,
    name:string,
    region: DocumentReference,
    phone: string,
    address: string,
}

export type RegionsType = {
  region: string,
  id: string,
  menu: DocumentReference|null
}

export type MenusType = {
  id: string,
  name: string,
}

export async function getAllRegion(setRegions: React.Dispatch<React.SetStateAction<RegionsType[]>>) {
  const colref = collection(firestore, "region");
  const snapshot = await getDocs(colref);
  setRegions(snapshot.docs.map(doc => { return {region: doc.data().region, id: doc.id, menu: doc.data().menu} as RegionsType}))
}

export async function getAllMenu(setMenus: React.Dispatch<React.SetStateAction<MenusType[]>>) {
  const colref = collection(firestore, "menu");
  const snapshot = await getDocs(colref);
  setMenus(snapshot.docs.map(doc => { return {name: doc.data().name, id: doc.id} as MenusType}))  
}

export const fetchRegion = async (region:DocumentReference, setRegion:React.Dispatch<React.SetStateAction<RegionsType|undefined>>) => {
  try {
    const regionDoc = await getDoc(region);
    if (regionDoc.exists()) {
      const regionData = regionDoc.data();
      setRegion({ region: regionData.region, id: regionDoc.id, menu: regionData.menu } as RegionsType)
    } else {
      setRegion({ region: "Unknown", id:"Unknown", menu:null } as RegionsType)
    }
  } catch (error) {
    console.error("Error fetching region data:", error);
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTomorowDate = ():string =>{
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const formattedDate = tomorrow.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return formattedDate
}