# Deploy Backend to Render

## Why Render?
- ✅ Perfect for Express.js backends
- ✅ Persistent server (not serverless)
- ✅ Free tier: 750 hours/month
- ✅ Automatic HTTPS & environment variables
- ✅ Simple GitHub integration

## Prerequisites
1. GitHub account with your backend code pushed
2. Render account (sign up at https://render.com)
3. Gemini API key from https://aistudio.google.com/app/apikey

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
cd scaler-chatbot-backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `scaler-chatbot-backend` repository

### 3. Configure the Service

**Basic Settings:**
- **Name:** `scaler-chatbot-backend` (or your preferred name)
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `scaler-chatbot-backend` (if in monorepo) or leave blank
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** tier

### 4. Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your actual Gemini API key |
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGIN` | Your frontend URL (e.g., `https://your-app.vercel.app`) |

**Note:** `PORT` is automatically set by Render, don't add it manually.

### 5. Deploy

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Your backend will be live at: `https://your-service-name.onrender.com`

### 6. Update Frontend

Update your frontend `.env` file with the new backend URL:

```env
VITE_API_URL=https://your-service-name.onrender.com
```

Then redeploy your frontend on Vercel.

### 7. Update CORS Settings

Go back to Render dashboard:
1. Navigate to your service
2. Go to **Environment** tab
3. Update `ALLOWED_ORIGIN` with your actual frontend URL
4. Service will auto-redeploy

## Testing Your Deployment

Test the health endpoint:
```bash
curl https://your-service-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-04-30T..."
}
```

## Important Notes

### Free Tier Limitations
- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month free (enough for most projects)

### Cold Start Solution
If you need faster response times, consider:
1. Upgrading to paid tier ($7/month for always-on)
2. Using a cron job to ping your API every 10 minutes
3. Implementing a loading state in your frontend

### Monitoring
- View logs in Render dashboard under **"Logs"** tab
- Monitor deployments under **"Events"** tab
- Check metrics under **"Metrics"** tab

## Troubleshooting

### Deployment Failed
- Check build logs in Render dashboard
- Verify `package.json` has correct `start` script
- Ensure Node version is compatible (>=18.0.0)

### API Not Responding
- Check environment variables are set correctly
- View runtime logs for errors
- Verify CORS settings match your frontend URL

### CORS Errors
- Update `ALLOWED_ORIGIN` environment variable
- Make sure frontend URL doesn't have trailing slash
- Check that frontend is using correct backend URL

## Alternative: Deploy to Vercel (Not Recommended)

If you still want to use Vercel for the backend:

1. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Deploy via Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

**Limitations:**
- 10-second timeout on free tier
- Serverless cold starts
- More complex configuration

## Recommended Setup

**Best Practice:**
- ✅ Backend on **Render** (persistent server)
- ✅ Frontend on **Vercel** (optimized for React/Vite)

This gives you the best of both platforms!
