import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // أو @vitejs/plugin-react حسب النسخة لديك

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // يضاف هذا السطر هنا (عادة السطر 6 أو 7) لضمان عمل الروابط النسبية
  plugins: [react()],
})
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
