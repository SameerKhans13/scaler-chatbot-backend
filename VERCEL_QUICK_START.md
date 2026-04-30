# Vercel Deployment - Quick Start

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub (1 min)

```bash
cd scaler-chatbot-backend
git add .
git commit -m "Configure for Vercel"
git push origin main
```

### Step 2: Import to Vercel (2 min)

1. Go to https://vercel.com/new
2. Click **"Import"** on your `scaler-chatbot-backend` repo
3. Leave all settings as default
4. Click **"Deploy"**

### Step 3: Add Environment Variables (1 min)

After deployment:

1. Go to your project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these 3 variables:

```
GEMINI_API_KEY = AIzaSyBsvix7Y9luIXpBrGoXmzKm3Jb-LF-bfvA
NODE_ENV = production
ALLOWED_ORIGIN = *
```

4. Click **"Redeploy"** (top right) → **"Redeploy"**

### Step 4: Test (1 min)

Open in browser:
```
https://your-project.vercel.app/api/health
```

Should see:
```json
{"status":"ok","timestamp":"...","environment":"production"}
```

### Step 5: Update Frontend

Update `scaler-chatbot-frontend/.env`:
```env
VITE_API_URL=https://your-project.vercel.app
```

Redeploy frontend.

---

## ✅ Done!

Your backend is live at: `https://your-project.vercel.app`

---

## ⚠️ Important Notes

1. **10-second timeout** - AI responses must complete in 10 seconds
2. **Cold starts** - First request might be slow
3. **Update CORS** - Change `ALLOWED_ORIGIN` to your frontend URL after testing

---

## Troubleshooting

### "Module not found" error
- Check `package.json` has all dependencies
- Redeploy

### "Function timeout" error
- AI response took >10 seconds
- Optimize prompts or upgrade to Pro ($20/month)
- Or use Render instead (no timeout)

### CORS error
- Update `ALLOWED_ORIGIN` environment variable
- Redeploy

---

## Full Documentation

See `VERCEL_DEPLOYMENT.md` for detailed instructions.
