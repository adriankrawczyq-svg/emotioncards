
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Fix: Removed loadEnv and process.cwd() usage which caused Type errors.
// As per instructions, process.env.API_KEY is automatically injected in the execution context,
// so manual definition in 'define' block is not required.
export default defineConfig({
  plugins: [react()],
});
