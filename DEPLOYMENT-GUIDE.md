# Deployment Guide - Gynecologist Website

## 🚀 Recommended: Vercel (Best for Astro + Supabase)

### Prerequisites
- GitHub account
- Vercel account (free)
- Your Supabase credentials

### Step 1: Prepare Your Repository
```bash
# Make sure your code is committed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your `gynecologist-near-me` repository
4. Vercel will auto-detect it's an Astro project
5. Click "Deploy"

### Step 3: Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Custom Domain (Optional)
- Go to Settings → Domains
- Add your custom domain (e.g., gynecologistnearme.in)
- Follow DNS configuration instructions

---

## 🥈 Alternative: Netlify

### Pros:
- Great for static sites
- Form handling (useful for contact forms)
- Branch previews

### Cons:
- Limited server-side rendering for dynamic content
- May need Edge Functions for full functionality

### Setup:
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Site Settings

---

## 🥉 Alternative: Cloudflare Pages

### Pros:
- Excellent performance
- Good free tier
- Workers for server-side functionality

### Cons:
- More complex setup for dynamic content
- Learning curve for Workers

### Setup:
1. Connect GitHub to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Configure Workers for SSR if needed

---

## 🚫 Not Recommended for This Project

### GitHub Pages
- ❌ Static only - won't work with your dynamic content
- ❌ No server-side rendering
- ❌ No database integration

### Surge.sh
- ❌ Static hosting only
- ❌ No SSR support

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Make sure these are set in your hosting platform:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 2. Build Configuration
Verify your `astro.config.mjs`:
```javascript
export default defineConfig({
  output: 'server', // or 'hybrid' for mixed rendering
  adapter: vercel(), // or netlify(), cloudflare()
});
```

### 3. Database Access
- Ensure Supabase project is accessible
- Check RLS (Row Level Security) policies
- Verify API keys are correct

### 4. Domain Configuration
- Update `baseUrl` in sitemap.xml.js
- Update canonical URLs
- Configure DNS records

---

## 🔧 Troubleshooting

### Common Issues:

**Build Failures:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment Variables Not Working:**
- Check variable names match exactly
- Restart deployment after adding variables
- Verify no typos in variable values

**Dynamic Routes Not Working:**
- Ensure `output: 'server'` in astro.config.mjs
- Check adapter is correctly configured
- Verify SSR is enabled

**Database Connection Issues:**
- Check Supabase URL and key
- Verify network access from hosting platform
- Test connection locally first

---

## 📊 Performance Tips

### 1. Optimize Images
```bash
# Add to package.json
"scripts": {
  "optimize": "imagemin src/assets/* --out-dir=public/optimized"
}
```

### 2. Enable Caching
- Sitemap: 1 hour cache
- Static assets: Long-term caching
- API responses: Appropriate cache headers

### 3. Monitor Performance
- Use Vercel Analytics (free)
- Google PageSpeed Insights
- Core Web Vitals monitoring

---

## 🌐 Domain Setup

### For gynecologistnearme.in:

1. **Purchase Domain** (if not owned)
   - Namecheap, GoDaddy, or Google Domains

2. **DNS Configuration:**
   ```
   Type: A
   Name: @
   Value: [Vercel IP]
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate:**
   - Automatically provided by Vercel
   - No additional configuration needed

---

## 🚀 Go Live Checklist

- [ ] Repository pushed to GitHub
- [ ] Hosting platform connected
- [ ] Environment variables configured
- [ ] Custom domain added (if applicable)
- [ ] SSL certificate active
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Test major pages (homepage, city pages, doctor profiles)
- [ ] Database connectivity verified
- [ ] Contact form working (if applicable)
- [ ] Analytics setup (Google Analytics, etc.)

---

## 💡 Pro Tips

1. **Use Vercel for this project** - Best compatibility with Astro + Supabase
2. **Enable automatic deployments** - Every GitHub push triggers deployment
3. **Set up branch previews** - Test changes before going live
4. **Monitor performance** - Use built-in analytics
5. **Backup database regularly** - Supabase provides backup options

---

## 📞 Support

If you encounter issues:
1. Check Vercel/Netlify documentation
2. Astro deployment guides
3. Supabase connection troubleshooting
4. Community forums and Discord servers 