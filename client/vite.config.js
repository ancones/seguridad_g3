import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // hace que el servidor escuche en 0.0.0.0 (todas las interfaces)
    port: 3000, // puedes definir el puerto, debe coincidir con el expuesto en docker
  },
})
