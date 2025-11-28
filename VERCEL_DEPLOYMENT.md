# Vercel Deployment Guide

## Overview

This project is configured to deploy to **Vercel**, the recommended platform for Next.js applications. Vercel provides:
- ✅ Automatic deployments on every push
- ✅ Zero-configuration setup
- ✅ Custom domain support (no basePath issues!)
- ✅ Better performance and CDN
- ✅ Preview deployments for pull requests
- ✅ Free SSL certificates

## Quick Start

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Your Repository**
   - Click **"Add New..."** → **"Project"**
   - Import your GitHub repository: `novaliatester/rusker_landing`
   - Vercel will auto-detect Next.js settings

3. **Configure Project Settings**
   - **Framework Preset**: **Other** (important for static exports!)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `out` (for static export)
   - **Install Command**: `npm install` (default)
   
   ⚠️ **Important**: Set Framework Preset to "Other", NOT "Next.js". This ensures Vercel serves the static files correctly.

4. **Deploy**
   - Click **"Deploy"**
   - Wait for the build to complete (~2-3 minutes)
   - Your site will be live at: `https://rusker-landing-[hash].vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production: `vercel --prod`

## Custom Domain Setup

### Step 1: Add Domain in Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Enter your domain (e.g., `yourdomain.com` or `www.yourdomain.com`)
4. Click **Add**

### Step 2: Configure DNS

Vercel will show you DNS records to add:

**For Root Domain (yourdomain.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For WWW Subdomain (www.yourdomain.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### Step 3: Wait for DNS Propagation

- DNS changes can take 24-48 hours (usually much faster)
- Vercel will automatically provision SSL certificates
- You'll see a green checkmark when ready

### Step 4: Enforce HTTPS (Automatic)

Vercel automatically:
- ✅ Provisions SSL certificates via Let's Encrypt
- ✅ Enforces HTTPS redirects
- ✅ Handles certificate renewal

## Environment Variables

If you need environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add your variables:
   - **Name**: `NEXT_PUBLIC_BASE_PATH`
   - **Value**: `` (leave empty for Vercel)
   - **Environment**: Production, Preview, Development (as needed)

## Automatic Deployments

Vercel automatically deploys:
- ✅ **Production**: Every push to `main` branch
- ✅ **Preview**: Every push to other branches
- ✅ **Preview**: Every pull request

## Configuration Files

- **`vercel.json`**: Vercel-specific configuration
- **`next.config.js`**: Next.js configuration (no basePath needed for Vercel)
- **`package.json`**: Build scripts

## Advantages Over GitHub Pages

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| Next.js Support | ⚠️ Static export only | ✅ Full Next.js features |
| Custom Domains | ⚠️ Requires basePath config | ✅ Zero config |
| SSL Certificates | ✅ Automatic | ✅ Automatic |
| Performance | ⚠️ Basic CDN | ✅ Global CDN + Edge |
| Preview Deployments | ❌ No | ✅ Yes (PR previews) |
| Build Time | ⚠️ ~5-10 min | ✅ ~2-3 min |
| Analytics | ❌ No | ✅ Built-in |

## Troubleshooting

### CSS/JavaScript Not Loading (Unstyled Page)

If your site shows unstyled content (just text, no styling):

1. **Check Build Output**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment → "Build Logs"
   - Verify the build completed successfully
   - Check that `out/_next/static/` folder exists in build output

2. **Verify Vercel Configuration**
   - Go to Settings → General
   - **Output Directory**: Should be `out`
   - **Build Command**: Should be `npm run build`
   - **Framework Preset**: Should be "Other" (not "Next.js") for static exports

3. **Check Browser Console**
   - Open browser DevTools (F12)
   - Check Console for 404 errors on CSS/JS files
   - Check Network tab to see if `/_next/static/...` files are loading

4. **Redeploy**
   - In Vercel Dashboard, go to Deployments
   - Click "..." on latest deployment → "Redeploy"
   - This forces a fresh build

5. **Alternative: Remove Static Export for Vercel**
   - If issues persist, consider removing `output: 'export'` from `next.config.js`
   - Vercel handles Next.js better without static export
   - You can keep static export for GitHub Pages by using environment variables

### Build Fails

1. Check build logs in Vercel Dashboard
2. Common issues:
   - **Missing dependencies**: Ensure `package.json` has all dependencies
   - **TypeScript errors**: Fix type errors in your code
   - **Build command**: Verify `npm run build` works locally

### Custom Domain Not Working

1. Verify DNS records are correct (use `dig` or `nslookup`)
2. Wait for DNS propagation (can take up to 48 hours)
3. Check domain status in Vercel Dashboard
4. Ensure domain is verified (green checkmark)

### Images Not Loading

1. Verify images exist in `public/images/` directory
2. Check image paths in code (should start with `/images/...`)
3. Clear browser cache
4. Check browser console for 404 errors

## Migration from GitHub Pages

If you're migrating from GitHub Pages:

1. **Remove basePath configuration** (already done in this setup)
2. **Deploy to Vercel** (follow Quick Start above)
3. **Update DNS** to point to Vercel
4. **Disable GitHub Pages** (optional, in GitHub Settings → Pages)

## Notes

- ✅ No basePath needed - Vercel serves from root `/`
- ✅ Custom domains work automatically without configuration
- ✅ All paths are relative to root (`/images/...`, `/_next/...`)
- ✅ HTTPS is automatically enforced
- ✅ Deployments are automatic on every push

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

