# Deployment Guide for Netlify

## Quick Deploy Options

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Netlify will auto-detect Next.js and configure settings
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

   For first deployment, run:
   ```bash
   netlify init
   ```
   Then follow the prompts.

### Option 3: Drag & Drop (Quick Test)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the `.next` folder
   - Wait for deployment

## Environment Variables (if needed)

If you add environment variables later:
1. Go to Site settings → Environment variables
2. Add your variables
3. Redeploy

## Custom Domain

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Important Notes

- The project uses Next.js 14 with the App Router
- Netlify automatically handles Next.js deployment with the `@netlify/plugin-nextjs` plugin
- Build time typically takes 2-5 minutes
- Your site will be live at `https://your-site-name.netlify.app`

## Troubleshooting

If build fails:
1. Check Node.js version (should be 18+)
2. Ensure all dependencies are in `package.json`
3. Check build logs in Netlify dashboard
4. Try `npm install` locally to verify dependencies

