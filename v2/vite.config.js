import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// Tạo chuỗi phiên bản dựa trên giờ, phút và giây hiện tại
const now = new Date();
const randomVersion = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(randomVersion), // Define a global random version constant
  },
  build: {
    rollupOptions: {},
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'My Vite App',
          description: 'This is a description for my Vite app',
          version: randomVersion,
        },
      },
    }),
  ],
});