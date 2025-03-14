import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export interface TendantAttributes{
    id:string,
    isAdmin:boolean,
    name:string,
}