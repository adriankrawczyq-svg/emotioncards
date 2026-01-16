import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // To jest kluczowe: przenosi wartość z environment variables Vercela do kodu aplikacji
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
});