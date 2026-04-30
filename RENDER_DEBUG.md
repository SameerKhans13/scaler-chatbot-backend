# Render Deployment Debugging Guide

## Quick Diagnostic Steps

### Step 1: Check Service Status

Go to https://dashboard.render.com → Your Service

**What do you see?**

#### If Status is "Deploy failed" 🔴

1. Click **"Logs"** tab
2. Look for error messages (usually in red)
3. Common errors below ⬇️

#### If Status is "Live" 🟢 but URL doesn't work

1. Click **"Logs"** tab
2. Look for: `Server is running on port XXXXX`
3. If you see this, server is running
4. Problem might be:
   - Wrong URL
   - CORS issue
   - Missing environment variables

---

## Common Errors & Solutions

### Error 1: "Cannot find module"

**Log shows:**
```
Error: Cannot find module 'express'
Error: Cannot find module 'cors'
```

**Cause:** Dependencies not installed

**Fix:**
1. Go to **Settings** → **Build & Deploy**
2. Verify **Build Command** is: `npm install`
3. Click **"Save Changes"**
4. Click **"Manual Deploy"** → **"Clear build cache & deploy"**

---

### Error 2: "Port already in use" or "EADDRINUSE"

**Log shows:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Cause:** You set PORT in environment variables (Render sets this automatically)

**Fix:**
1. Go to **Environment** tab
2. **DELETE** the `PORT` variable if it exists
3. Service will auto-redeploy
4. Check logs again

---

### Error 3: "GEMINI_API_KEY is not defined"

**Log shows:**
```
API Key loaded: NO
Error: API key not configured
```

**Cause:** Missing or incorrect environment variable

**Fix:**
1. Go to **Environment** tab
2. Check `GEMINI_API_KEY` exists
3. Verify the value starts with `AIza`
4. If missing, add it:
   - Click **"Add Environment Variable"**
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyBsvix7Y9luIXpBrGoXmzKm3Jb-LF-bfvA`
5. Service will auto-redeploy

---

### Error 4: "Module type mismatch" or "require() of ES Module"

**Log shows:**
```
Error [ERR_REQUIRE_ESM]: require() of ES Module
```

**Cause:** Node.js version or module type issue

**Fix:**
1. Check `package.json` has: `"type": "module"` ✅ (You have this)
2. Go to **Settings** → **Build & Deploy**
3. Verify **Node Version** is 18 or higher
4. If not, add to `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```
5. Commit and push changes

---

### Error 5: "Build failed" during npm install

**Log shows:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Cause:** Dependency conflicts

**Fix:**
1. Locally run:
   ```bash
   cd scaler-chatbot-backend
   rm -rf node_modules package-lock.json
   npm install
   git add package-lock.json
   git commit -m "Fix dependencies"
   git push
   ```
2. Render will auto-deploy

---

### Error 6: Service is "Live" but "Couldn't reach the server"

**Symptoms:**
- Status shows 🟢 Live
- Logs show: `Server is running on port 10000`
- But URL returns error

**Possible Causes:**

#### A. Wrong URL
**Check:** Are you using the correct URL?
- ✅ Correct: `https://your-service-name.onrender.com`
- ❌ Wrong: `http://your-service-name.onrender.com` (no HTTPS)
- ❌ Wrong: `https://your-service-name.render.com` (missing .onrender)

#### B. Cold Start (Free Tier)
**Symptoms:** First request takes 30-60 seconds
**Solution:** Wait 60 seconds and try again

#### C. Server crashed after startup
**Check logs for:**
```
Server is running on port 10000
[Then errors below]
```
**Fix:** Look at the error message and fix the code issue

---

## Step-by-Step Debugging

### 1. Verify Environment Variables

Go to **Environment** tab. You should have:

| Key | Value | Required |
|-----|-------|----------|
| `GEMINI_API_KEY` | `AIzaSy...` (your key) | ✅ YES |
| `NODE_ENV` | `production` | ✅ YES |
| `ALLOWED_ORIGIN` | `*` or your frontend URL | ✅ YES |
| `PORT` | **SHOULD NOT EXIST** | ❌ DELETE |

**If PORT exists, DELETE IT!**

### 2. Verify Build Settings

Go to **Settings** → **Build & Deploy**:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Node Version** | Auto (or 18+) |

### 3. Check Logs

Go to **Logs** tab and look for:

**✅ Good signs:**
```
==> Cloning from https://github.com/...
==> Building...
==> Running 'npm install'
==> Starting service with 'npm start'
Server is running on port 10000
Environment: production
API Key loaded: YES
```

**❌ Bad signs:**
```
Error: Cannot find module
Error: EADDRINUSE
npm ERR!
Error: API key not configured
```

### 4. Test Locally First

Before debugging Render, make sure it works locally:

```bash
cd scaler-chatbot-backend

# Install dependencies
npm install

# Start server
npm start
```

**In another terminal:**
```bash
curl http://localhost:3001/api/health
```

**Expected:**
```json
{"status":"ok","timestamp":"...","environment":"development"}
```

If this fails, fix locally first!

---

## Manual Redeploy

If nothing works, try a clean deploy:

1. Go to your service dashboard
2. Click **"Manual Deploy"** (top right)
3. Select **"Clear build cache & deploy"**
4. Wait 2-3 minutes
5. Check logs for errors

---

## Get Your Service URL

Your backend URL should be:
```
https://your-service-name.onrender.com
```

**To find it:**
1. Go to your service dashboard
2. Look at the top - you'll see the URL
3. Copy it

**Test it:**
```bash
curl https://your-service-name.onrender.com/api/health
```

---

## Still Not Working?

### Share These Details:

1. **Service Status:** (Live/Failed/Building)
2. **Last 30 lines of logs:** (from Logs tab)
3. **Environment variables:** (just the keys, not values)
4. **Error message:** (exact text)
5. **Service URL:** (your .onrender.com URL)

### Quick Fixes to Try:

1. ✅ Delete `PORT` from environment variables
2. ✅ Verify `GEMINI_API_KEY` is set correctly
3. ✅ Clear build cache and redeploy
4. ✅ Wait 60 seconds for cold start
5. ✅ Use HTTPS (not HTTP) in URL
6. ✅ Test locally first

---

## Root Directory Issue?

**If your backend is in a subfolder:**

Example: Your repo structure is:
```
my-repo/
  ├── backend/
  │   ├── server.js
  │   └── package.json
  └── frontend/
```

**Then set Root Directory:**
1. Go to **Settings** → **Build & Deploy**
2. Set **Root Directory** to: `backend`
3. Save and redeploy

**Your structure (backend at root):**
```
scaler-chatbot-backend/
  ├── server.js
  └── package.json
```

**Root Directory should be:** BLANK (empty)

---

## Contact Support

If still stuck:
1. Render Status: https://status.render.com
2. Render Docs: https://render.com/docs
3. Render Support: https://render.com/support

---

## Quick Checklist

Before asking for help, verify:

- [ ] Service status is "Live" (not failed)
- [ ] Build logs show "Server is running on port..."
- [ ] `GEMINI_API_KEY` is set in Environment tab
- [ ] `NODE_ENV` is set to `production`
- [ ] `ALLOWED_ORIGIN` is set
- [ ] `PORT` is **NOT** set in Environment tab
- [ ] Using correct URL: `https://xxx.onrender.com`
- [ ] Waited 60 seconds for cold start
- [ ] Code works locally with `npm start`
- [ ] Root Directory is blank (if backend at repo root)

---

## Next Steps

1. Check your Render dashboard
2. Look at the Logs tab
3. Find the error message
4. Match it to the solutions above
5. If still stuck, share the logs with me!
