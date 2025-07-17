# Netlify Deployment Guide

This document provides instructions for deploying this project on Netlify with proper handling of public assets (images, models, etc.).

## Automatic Deployment

When pushing to GitHub, Netlify should automatically deploy your project. However, to ensure that your public assets (images, models) are properly included in the build, we've added some configuration files:

1. `netlify.toml` - Contains build settings and redirects
2. `public/_redirects` - Ensures proper routing for SPA
3. `prebuild.sh` - Checks for public assets before building
4. `verify-assets.js` - Verifies assets are included in the build

## Manual Deployment Settings

If you're setting up the project manually on Netlify, use these settings:

- **Build command:** `chmod +x prebuild.sh && ./prebuild.sh && npm run build`
- **Publish directory:** `dist`
- **Environment variables:** None required for basic deployment

## Troubleshooting Missing Assets

If your assets (images, models) are still not showing up:

1. **Check build logs:** Look for the output from `prebuild.sh` to see if assets were found
2. **Verify file paths:** Make sure you're using correct paths like `/images/astronout.png` (with leading slash)
3. **Check Netlify deploy settings:** Ensure the publish directory is set to `dist`
4. **Force clear cache:** Add `?v=1` to the end of asset URLs to bypass caching

## Manual Fix for Missing Assets

If assets are still missing, you can:

1. Go to the Netlify dashboard for your site
2. Navigate to "Deploys" > "Trigger deploy" > "Clear cache and deploy site"
3. Check the deploy logs to see if assets are being included

## Local Testing

To test locally before deploying:

```bash
npm run build
npm run verify  # Checks if assets are in the build
npm run preview # Serves the build locally
```

If assets are missing in the local build, they will also be missing in the Netlify deployment. 