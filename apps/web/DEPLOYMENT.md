# GitHub Pages Deployment Guide

## Overview

This project uses **GitHub Actions** to automatically deploy to GitHub Pages whenever you push to the `main` branch. This is the recommended approach as it's automated and doesn't require manual deployment steps.

## What Was Fixed

1. ✅ **GitHub Actions workflow** now uses `npm run build` instead of `next build` to include the `fix-image-paths.js` script
2. ✅ Workflow is configured to deploy from the `out/` directory (Next.js static export)

## GitHub Repository Setup

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/novaliatester/rusker_landing`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions` (NOT "Deploy from a branch")
5. Click **Save**

### Step 2: Verify Repository Name

Make sure your repository name matches the `basePath` in `next.config.js`:
- Repository name should be: `rusker_landing`
- BasePath is configured as: `/rusker_landing`

If your repository has a different name, update the `basePath` in `next.config.js` and `app/layout.tsx` to match.

### Step 3: Push Your Code

Once GitHub Pages is enabled with GitHub Actions as the source:

1. Commit and push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Fix deployment workflow"
   git push origin main
   ```

2. The GitHub Action will automatically:
   - Build your Next.js site
   - Run the `fix-image-paths.js` script
   - Deploy to GitHub Pages

### Step 4: Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy Next.js site to Pages"
3. Click on it to see the build and deployment progress
4. Once complete, your site will be available at:
   ```
   https://novaliatester.github.io/rusker_landing/
   ```

## Troubleshooting

### Workflow Fails

If the workflow fails:

1. Check the **Actions** tab for error messages
2. Common issues:
   - **Build errors**: Check TypeScript/ESLint errors in your code
   - **Missing dependencies**: Ensure `package.json` has all required dependencies
   - **Path issues**: Verify `basePath` matches repository name

### Site Not Loading

If the site doesn't load:

1. Check that GitHub Pages is enabled with **GitHub Actions** as the source
2. Verify the repository name matches the `basePath` (`rusker_landing`)
3. Wait a few minutes after deployment (GitHub Pages can take 1-2 minutes to update)
4. Clear your browser cache and try again

### Images Not Loading

If images aren't loading:

1. Ensure the `fix-image-paths.js` script ran successfully (check Actions logs)
2. Verify images exist in `public/images/` directory
3. Check that image paths in the HTML include `/rusker_landing/images/` prefix

## Manual Deployment (Alternative)

If you prefer manual deployment using the `deploy.sh` script:

1. Make sure you have a `gh-pages` branch:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   git checkout main
   ```

2. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. Then configure GitHub Pages to deploy from the `gh-pages` branch (not recommended, use GitHub Actions instead)

## Configuration Files

- **Workflow**: `.github/workflows/nextjs.yml` - GitHub Actions configuration
- **Build Config**: `next.config.js` - Next.js configuration with basePath
- **Build Script**: `package.json` - Includes `fix-image-paths.js` in build process
- **Path Fixer**: `scripts/fix-image-paths.js` - Fixes image paths for GitHub Pages

## Custom Domain Setup

If you're using a **custom domain** (e.g., `yourdomain.com` instead of `github.io`), you need to disable the basePath:

### Step 1: Configure Repository Variable

1. Go to your GitHub repository: `https://github.com/novaliatester/rusker_landing`
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click on the **Variables** tab
4. Click **New repository variable**
5. Set:
   - **Name**: `NEXT_PUBLIC_BASE_PATH`
   - **Value**: `` (empty string - leave it blank)
6. Click **Add variable**

### Step 2: Configure Custom Domain in GitHub Pages

1. Still in **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `yourdomain.com`)
3. Check **Enforce HTTPS** (recommended)
4. Click **Save**

### Step 3: Deploy

The next time you push to `main`, the workflow will:
- Detect that `NEXT_PUBLIC_BASE_PATH` is empty
- Build without basePath (paths will be `/images/...` instead of `/rusker_landing/images/...`)
- Deploy correctly for your custom domain

### Why This Fixes HTTPS Issues

When using a custom domain, GitHub Pages serves your site from the root (`/`), not from a subdirectory. The hardcoded `/rusker_landing` basePath causes:
- Broken asset paths (CSS, JS, images)
- Mixed content warnings (HTTP vs HTTPS)
- 404 errors for all resources

Setting `NEXT_PUBLIC_BASE_PATH` to an empty string makes all paths relative to the root, fixing these issues.

## Notes

- **GitHub Pages (github.io)**: Uses basePath `/rusker_landing` by default
- **Custom Domain**: Set `NEXT_PUBLIC_BASE_PATH` to empty string in repository variables
- All image paths are automatically fixed during build based on the basePath setting
- The workflow runs automatically on every push to `main`
- You can also trigger it manually from the Actions tab using `workflow_dispatch`

