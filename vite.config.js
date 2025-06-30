import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Spo-Tinder/",

  server: {
    allowedHosts: ["bwxiax-ip-173-173-201-74.tunnelmole.net"]
  }
  
})
