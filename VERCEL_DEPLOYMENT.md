# Deploy Backend to Vercel

## ✅ Files Created for Vercel

I've set up your backend for Vercel serverless deployment:

1. ✅ `vercel.json` - Vercel configuration
2. ✅ `api/index.js` - Serverless function entry point
3. ✅ Updated CORS to allow GET requests

---

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub

```bash
cd scaler-chatbot-backend
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

#### Step 2: Import to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your `scaler-chatbot-backend` repository
4. Configure the project:

**Framework Preset:** Other
**Root Directory:** `./` (leave as default)
**Build Command:** Leave empty or `npm install`
**Output Directory:** Leave empty
**Install Command:** `npm install`

#### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | Your Gemini API key (starts with `AIza...`) |
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGIN` | `*` (or your frontend URL) |

**Important:** Add these to **all environments** (Production, Preview, Development)

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. You'll get a URL like: `https://your-project.vercel.app`

---

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd scaler-chatbot-backend

# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

#### Step 4: Set Environment Variables

```bash
vercel env add GEMINI_API_KEY
# Paste your API key when prompted

vercel env add NODE_ENV
# Enter: production

vercel env add ALLOWED_ORIGIN
# Enter: * (or your frontend URL)
```

Then redeploy:
```bash
vercel --prod
```

---

## Testing Your Deployment

### Test Health Endpoint

Open in browser or use curl:

```bash
curl https://your-project.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-04-30T...",
  "environment": "production"
}
```

### Test Chat Endpoint

```bash
curl -X POST https://your-project.vercel.app/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "persona": "abhimanyu"
  }'
```

---

## Update Frontend

Once deployed, update your frontend `.env`:

```env
VITE_API_URL=https://your-project.vercel.app
```

Then redeploy your frontend.

---

## Important Notes

### ⚠️ Vercel Limitations

1. **10-second timeout** on free tier
   - AI responses might timeout if they take >10 seconds
   - Upgrade to Pro ($20/month) for 60-second timeout

2. **Serverless cold starts**
   - First request might be slow
   - Subsequent requests are faster

3. **No persistent connections**
   - Each request is independent
   - No WebSocket support on free tier

### ✅ Vercel Advantages

1. **Zero configuration** (mostly)
2. **Automatic HTTPS**
3. **Global CDN**
4. **Great GitHub integration**
5. **Instant deployments**

---

## Troubleshooting

### Error: "Module not found"

**Solution:** Make sure `package.json` has all dependencies:
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Error: "Function timeout"

**Symptoms:** Requests fail after 10 seconds

**Solutions:**
1. Optimize your AI prompts to respond faster
2. Upgrade to Vercel Pro ($20/month) for 60s timeout
3. Use Render instead (no timeout)

### Error: "CORS policy"

**Solution:** Update environment variable:
```bash
vercel env add ALLOWED_ORIGIN
# Enter your frontend URL: https://your-frontend.vercel.app
```

Then redeploy:
```bash
vercel --prod
```

### Error: "Cannot find module 'dotenv'"

**This is normal!** Vercel doesn't need `dotenv` in production. Environment variables are set in the dashboard.

If you want to keep it:
```bash
npm install dotenv
git add package.json package-lock.json
git commit -m "Add dotenv"
git push
```

---

## Monitoring

### View Logs

1. Go to https://vercel.com/dashboard
2. Click your project
3. Click **"Deployments"**
4. Click on a deployment
5. Click **"Functions"** tab to see logs

### View Analytics

1. Go to your project dashboard
2. Click **"Analytics"** tab
3. See request counts, errors, and performance

---

## Environment Variables Management

### Add/Update Variables

**Via Dashboard:**
1. Go to project settings
2. Click **"Environment Variables"**
3. Add or edit variables
4. Redeploy for changes to take effect

**Via CLI:**
```bash
# Add new variable
vercel env add VARIABLE_NAME

# Remove variable
vercel env rm VARIABLE_NAME

# List all variables
vercel env ls
```

---

## Custom Domain (Optional)

### Add Your Domain

1. Go to project settings
2. Click **"Domains"**
3. Add your domain (e.g., `api.yourdomain.com`)
4. Update DNS records as instructed
5. Vercel automatically provisions SSL

---

## Automatic Deployments

### How It Works

- **Push to `main`** → Deploys to production
- **Push to other branches** → Creates preview deployment
- **Pull requests** → Creates preview deployment with unique URL

### Disable Auto-Deploy

1. Go to project settings
2. Click **"Git"**
3. Toggle **"Production Branch"** settings

---

## Cost Comparison

### Free Tier
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless function executions
- ⚠️ 10-second timeout
- ⚠️ 12 serverless functions

### Pro Tier ($20/month)
- ✅ 60-second timeout
- ✅ 1 TB bandwidth/month
- ✅ Unlimited serverless functions
- ✅ Advanced analytics
- ✅ Priority support

---

## Comparison: Vercel vs Render

| Feature | Vercel | Render |
|---------|--------|--------|
| **Best For** | Serverless APIs | Traditional servers |
| **Timeout** | 10s (free), 60s (pro) | No limit |
| **Cold Starts** | Yes | Yes (free tier) |
| **Setup** | Easy | Easy |
| **Cost (Paid)** | $20/month | $7/month |
| **Your Use Case** | ⚠️ Works, but timeout risk | ✅ Better fit |

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Import to Vercel dashboard
3. ✅ Add environment variables
4. ✅ Deploy
5. ✅ Test endpoints
6. ✅ Update frontend with new backend URL
7. ✅ Monitor for timeout issues

---

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Open project in browser
vercel open
```

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Check deployment logs in dashboard
- Share error messages for debugging

---

## ⚠️ Recommendation

If you experience timeout issues with AI responses, consider using **Render** instead:
- No timeout limits
- Better for traditional Express servers
- Cheaper paid tier ($7 vs $20)

See `RENDER_DEPLOYMENT.md` for Render deployment guide.
