# Step-by-Step: Make iresoleye.me Load in Any Browser

This guide will help you make your website load when you (or anyone) types `iresoleye.me` into any browser.

---

## Prerequisites
- ✅ Domain `iresoleye.me` registered on Namecheap
- ✅ Website files ready in your `personal-website` folder
- ✅ A GitHub account (lolusoleye)

---

## PART 1: Push Your Code to GitHub (5 minutes)

### Step 1: Open PowerShell
1. Press `Windows + X` → Select **Windows PowerShell** (or **Terminal**)
2. Navigate to your project folder:
```powershell
cd "C:\Users\ireso\OneDrive\Documents\projects\personal-website"
```

### Step 2: Check if Git is initialized
```powershell
git status
```

**If you see "fatal: not a git repository":**
```powershell
git init
git add -A
git commit -m "Initial site setup"
git branch -M main
git remote add origin https://github.com/lolusoleye/personal-website.git
git push -u origin main
```

**If you already have a git repo:**
```powershell
git add -A
git commit -m "Update site for Vercel deployment"
git push
```

### Step 3: Verify code is on GitHub
1. Go to [github.com/lolusoleye/personal-website](https://github.com/lolusoleye/personal-website)
2. You should see all your files (index.html, styles.css, etc.)

---

## PART 2: Deploy to Vercel (5 minutes)

### Step 4: Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (top right)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### Step 5: Import your project
1. In Vercel dashboard, click **Add New...** → **Project**
2. You should see your GitHub repositories listed
3. Find and click **Import** next to `personal-website`
4. Vercel will show project settings:
   - **Framework Preset**: Other (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
5. Click **Deploy** (bottom right)

### Step 6: Wait for deployment
- Vercel will build and deploy in ~30 seconds
- You'll see a URL like: `https://personal-website-abc123.vercel.app`
- ✅ **Test it**: Click the URL to see your website
- ✅ **Success!** Your site is now live on Vercel

---

## PART 3: Connect Your Domain (10 minutes)

### Step 7: Add domain in Vercel
1. In your Vercel project dashboard, click **Settings** (top menu)
2. Click **Domains** (left sidebar)
3. In the "Add Domain" field, type: `iresoleye.me`
4. Click **Add**
5. Also add: `www.iresoleye.me` (click **Add** again)
6. Vercel will show you DNS records to configure (you'll use these next)

### Step 8: Configure DNS in Namecheap

**A. Go to Namecheap:**
1. Go to [namecheap.com](https://namecheap.com)
2. Click **Sign In** (top right)
3. Sign in with your account

**B. Access DNS settings:**
1. Go to **Domain List** (from the menu)
2. Find `iresoleye.me` in your domain list
3. Click **Manage** (on the right side of the domain)

**C. Configure DNS records:**
1. Click **Advanced DNS** tab
2. You'll see existing DNS records (might be blank or have default records)

**D. Add A Record for apex domain (@):**
1. Scroll to **Host Records** section
2. Click **Add New Record**
3. Select:
   - **Type**: `A Record`
   - **Host**: `@`
   - **Value**: `76.76.21.21` (Vercel's IP address)
   - **TTL**: `Automatic` (or `300`)
4. Click **✓** (checkmark) to save

**E. Add CNAME Record for www subdomain:**
1. Click **Add New Record** again
2. Select:
   - **Type**: `CNAME Record`
   - **Host**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `Automatic` (or `300`)
3. Click **✓** (checkmark) to save

**F. Remove conflicting records (if any):**
- If you see any other A records or CNAME records for `@` or `www`, delete them
- Click the trash icon next to conflicting records

**G. Save changes:**
- Your changes should save automatically (you'll see green checkmarks)

### Step 9: Wait for DNS propagation
- DNS changes can take **5-60 minutes** to propagate worldwide
- Sometimes it takes up to **24 hours** (rare)
- You can check status in Vercel → Settings → Domains

### Step 10: Verify domain is connected
1. Go back to Vercel → Settings → Domains
2. Check the status next to `iresoleye.me`:
   - ✅ **Valid Configuration** = Success! (green checkmark)
   - ⏳ **Pending** = Still waiting for DNS (wait a bit longer)
   - ❌ **Invalid Configuration** = Check your DNS records in Namecheap

---

## PART 4: Test Your Domain (2 minutes)

### Step 11: Test in your browser
1. Open any browser (Chrome, Firefox, Edge, Safari, etc.)
2. In the address bar, type: `iresoleye.me`
3. Press Enter
4. ✅ **Your website should load!**

### Step 12: Test www subdomain
1. Type: `www.iresoleye.me`
2. Press Enter
3. ✅ **Should also load your website**

### Step 13: Test HTTPS (secure connection)
1. Type: `https://iresoleye.me`
2. Press Enter
3. ✅ **Should load with a padlock icon** (Vercel provides free SSL)

---

## Troubleshooting

### Domain not loading?
1. **Check DNS propagation:**
   - Wait 5-60 minutes after adding DNS records
   - DNS propagation can be slow

2. **Verify DNS records in Namecheap:**
   - Go to Namecheap → Domain List → Manage → Advanced DNS
   - Make sure you have:
     - A Record: `@` → `76.76.21.21`
     - CNAME Record: `www` → `cname.vercel-dns.com`

3. **Check Vercel domain status:**
   - Vercel → Settings → Domains
   - Should show "Valid Configuration" (green checkmark)

4. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete` (or `Cmd + Shift + Delete` on Mac)
   - Clear cached images and files
   - Try again

5. **Try different browser or incognito mode:**
   - Sometimes browsers cache DNS
   - Try incognito/private window

### Still not working?
- Check Vercel dashboard → Settings → Domains for any error messages
- Verify DNS records match exactly what Vercel shows
- Wait up to 24 hours for DNS to fully propagate

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Site deployed on Vercel
- [ ] Domain `iresoleye.me` added in Vercel
- [ ] Domain `www.iresoleye.me` added in Vercel
- [ ] A Record added in Namecheap (`@` → `76.76.21.21`)
- [ ] CNAME Record added in Namecheap (`www` → `cname.vercel-dns.com`)
- [ ] Vercel shows "Valid Configuration" for domains
- [ ] `iresoleye.me` loads in browser
- [ ] `www.iresoleye.me` loads in browser
- [ ] HTTPS works (padlock icon)

---

## What Happens Next?

✅ **Every time you update your code:**
1. Push to GitHub: `git add -A && git commit -m "Update" && git push`
2. Vercel automatically redeploys your site (in ~30 seconds)
3. Your changes appear live on `iresoleye.me` automatically!

✅ **Your site is now:**
- Live on `iresoleye.me`
- Accessible from any browser, anywhere in the world
- Secured with HTTPS (free SSL certificate)
- Mobile-responsive (works on phones, tablets, desktops)

---

**Need help?** Check the Vercel dashboard for status and any error messages.

