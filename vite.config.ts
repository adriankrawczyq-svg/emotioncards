
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /**
   * We do not define process.env here as the API key is injected automatically 
   * by the execution environment. This follows the @google/genai guidelines.
   */
});
