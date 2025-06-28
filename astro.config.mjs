import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    define: {
      'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL || 'https://cajddzsauxliholgbsfi.supabase.co'),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamRkenNhdXhsaWhvbGdic2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzU3MjQsImV4cCI6MjA2NTU1MTcyNH0.Synv7-xMkCFONnVlsXTg9sj8uPwOpn0yPPdl3ODhE24'),
      'process.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_933f5607a695f85b2ace589c46459019715af7ac')
    }
  }
});