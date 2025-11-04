# Step-by-Step Guide: Deploy to Vercel & Make iresoleye.me Visible on Google

## Prerequisites
- ✅ Your domain `iresoleye.me` registered on Namecheap
- ✅ Your website files ready in this folder
- ✅ A GitHub account (lolusoleye)

---

## Part 1: Deploy to Vercel (5 minutes)

### Step 1: Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Push your code to GitHub (if not already done)
Open PowerShell in this folder and run:

```powershell
cd "C:\Users\ireso\OneDrive\Documents\projects\personal-website"

# If this is your first time
git init
git add -A
git commit -m "Initial site for Vercel deployment"
git branch -M main
git remote add origin https://github.com/lolusoleye/personal-website.git
git push -u origin main

# If you already have a repo
git add -A
git commit -m "Update site for Vercel deployment"
git push
```

### Step 3: Import project in Vercel
1. In Vercel dashboard, click **Add New...** → **Project**
2. Find and select your `personal-website` repository
3. Click **Import**
4. Vercel will auto-detect settings:
   - **Framework Preset**: Other (it's a static site)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty (or `./` if prompted)
5. Click **Deploy**

### Step 4: Wait for deployment
- Vercel will build and deploy in ~30 seconds
- You'll get a URL like: `https://personal-website-abc123.vercel.app`
- ✅ **Test it works** by visiting that URL

---

## Part 2: Connect Your Domain (10 minutes)

### Step 5: Add domain in Vercel
1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter `iresoleye.me` and click **Add**
3. Also add `www.iresoleye.me` (optional but recommended)
4. Vercel will show you DNS records to configure

### Step 6: Configure DNS in Namecheap

**Option A: Use A Records (Recommended for apex domain)**
1. Go to [Namecheap.com](https://namecheap.com) → Sign in
2. Go to **Domain List** → Click **Manage** next to `iresoleye.me`
3. Go to **Advanced DNS** tab
4. Delete any existing A records for `@` (if any)
5. Add these **A Records** (one at a time):
   - **Host**: `@`
   - **Value**: `76.76.21.21` (Vercel's IP)
   - **TTL**: Automatic (or 300)
   - Click **✓** to save
   
   **Note**: Vercel may show multiple IPs. Use `76.76.21.21` as the primary.

6. For `www` subdomain:
   - **Type**: CNAME Record
   - **Host**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: Automatic
   - Click **✓** to save

**Option B: Use CNAME with Vercel's DNS (if supported)**
- Some registrars support CNAME for apex domains. Check Vercel's instructions for `iresoleye.me`.

### Step 7: Wait for DNS propagation
- DNS changes can take **5-60 minutes** (sometimes up to 24 hours)
- Check status in Vercel dashboard → **Settings** → **Domains**
- When it shows "Valid Configuration", you're done!

### Step 8: Test your domain
- Visit `https://iresoleye.me` in your browser
- It should load your website
- Vercel automatically provides SSL (HTTPS) certificates

---

## Part 3: Make Your Site Visible on Google (15 minutes)

### Step 9: Submit to Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **Add Property** → Choose **Domain** property
4. Enter: `iresoleye.me` (without https://)
5. Click **Continue**

### Step 10: Verify domain ownership
You'll see verification options. Choose **DNS verification**:

1. Google will show a **TXT record** to add
   - Example: `google-site-verification=abc123xyz...`
2. In Namecheap → **Advanced DNS**:
   - **Type**: TXT Record
   - **Host**: `@`
   - **Value**: Paste the entire verification string from Google
   - **TTL**: Automatic
   - Click **✓** to save
3. Wait 1-2 minutes, then in Google Search Console click **Verify**
4. ✅ You should see "Ownership verified"

### Step 11: Submit your sitemap
1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. In "Add a new sitemap", enter: `sitemap.xml`
3. Click **Submit**
4. Status should show "Success"

### Step 12: Request indexing
1. In Google Search Console, use the **URL Inspection** tool (top search bar)
2. Enter: `https://iresoleye.me/`
3. Click **Request Indexing**
4. Google will crawl and index your site (can take days to weeks)

### Step 13: Optimize for search
✅ Already done:
- Your title tag: "Ire Soleye"
- Meta description includes your name
- `robots.txt` allows crawling
- `sitemap.xml` is submitted
- Canonical URL set

**Additional tips:**
- Add a link to `iresoleye.me` in your GitHub profile bio
- Share your site on social media (creates backlinks)
- Keep your About section keyword-rich (mention "Ire Soleye", "computer science student")

---

## Part 4: Verify Everything Works

### Checklist:
- [ ] `https://iresoleye.me` loads your website
- [ ] `https://www.iresoleye.me` redirects to `iresoleye.me` (or loads the site)
- [ ] Projects section shows your GitHub repos (excluding personal-website)
- [ ] Site looks good on mobile (test on your phone)
- [ ] Google Search Console shows your site as verified
- [ ] Sitemap submitted successfully

### Test mobile responsiveness:
1. Open `https://iresoleye.me` on your phone
2. Or use Chrome DevTools:
   - Right-click → Inspect → Toggle device toolbar (Ctrl+Shift+M)
   - Test different screen sizes

---

## Troubleshooting

### Domain not working?
- Check Vercel dashboard → Domains for status
- Verify DNS records in Namecheap match Vercel's instructions
- Wait longer (DNS can take 24 hours)
- Try clearing browser cache

### Projects not loading?
- Check browser console (F12) for errors
- Verify your GitHub username is correct in `index.html`
- Make sure repos are public on GitHub

### Google not indexing?
- Be patient (new sites take days/weeks)
- Check Google Search Console for errors
- Ensure `robots.txt` allows crawling
- Request indexing for key pages manually

---

## Next Steps

Once deployed:
- ✅ Every time you push to GitHub, Vercel automatically redeploys
- ✅ Your site is live at `iresoleye.me`
- ✅ Google will index it over time
- ✅ You can track visitors in Google Search Console

**Need help?** Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)

