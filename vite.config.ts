import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  resolve: {  
    alias: {  
      components: '/src/components',
      interfaces: '/src/interfaces',
      styles: '/src/styles',
      store: '/src/store',
      util: "/src/util",
    },  
  },  
})