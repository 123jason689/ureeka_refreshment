import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import dotenv from "dotenv"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
    
  ],
  define:{
    "process.env.VITE_APIKEY": JSON.stringify(process.env.VITE_APIKEY),
    "process.env.VITE_AUTHDOMAIN": JSON.stringify(process.env.VITE_AUTHDOMAIN),
    "process.env.VITE_DATABASEURL": JSON.stringify(process.env.VITE_DATABASEURL),
    "process.env.VITE_PROJECTID": JSON.stringify(process.env.VITE_PROJECTID),
    "process.env.VITE_STORAGEBUCKET": JSON.stringify(process.env.VITE_STORAGEBUCKET),
    "process.env.VITE_MESSAGINGSENDERID": JSON.stringify(process.env.VITE_MESSAGINGSENDERID),
    "process.env.VITE_APPID": JSON.stringify(process.env.VITE_APPID),
    "process.env.VITE_MEASUREMENTID": JSON.stringify(process.env.VITE_MEASUREMENTID)
  },
  server: {
    watch: {
      usePolling: true, // Enable polling to detect changes
    },
    hmr: true, // Enable Hot Module Replacement
  },
})
