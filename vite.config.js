import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/auction-website/',
  define: {
    'process.env.PUBLIC_URL': {}
  },
  assetsInclude: ["**/*.glb"]
})
