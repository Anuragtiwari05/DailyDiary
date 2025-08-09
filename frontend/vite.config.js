import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { BrowserRouter } from 'react-router-dom';
export default defineConfig({
  plugins: [ tailwindcss(),react()],
})
