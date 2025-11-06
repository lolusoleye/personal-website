# Fix: "There isn't a GitHub Pages site here" Error

Your domain `iresoleye.me` is currently pointing to GitHub Pages, but you want to use Vercel instead. Here's how to fix it:

---

## Step 1: Check if you've deployed to Vercel

**First, make sure your site is deployed on Vercel:**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Check if you have a project called `personal-website` deployed
3. If you see a URL like `https://personal-website-abc123.vercel.app`, click it
4. ✅ **Does your website load?** If yes, continue to Step 2
5. ❌ **If not deployed yet**, you need to:
   - Push your code to GitHub first
   - Deploy to Vercel (see DOMAIN_SETUP_GUIDE.md)

---

## Step 2: Add domain to Vercel (if not done)

1. In Vercel dashboard → Your project → **Settings** → **Domains**
2. Add `iresoleye.me` and `www.iresoleye.me`
3. Vercel will show you DNS records to configure

---

## Step 3: Update DNS in Namecheap (THIS IS THE KEY STEP)

Your Namecheap DNS is currently pointing to GitHub Pages. We need to change it to point to Vercel.

### Go to Namecheap DNS settings:

1. Go to [namecheap.com](https://namecheap.com) → Sign in
2. Go to **Domain List**
3. Find `iresoleye.me` → Click **Manage**
4. Click **Advanced DNS** tab

### Remove old GitHub Pages records:

**Delete these if they exist:**
- Any **A Records** pointing to GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Any **CNAME Records** pointing to `lolusoleye.github.io` or similar

**How to delete:**
- Find the record in the list
- Click the **trash icon** (🗑️) next to it
- Confirm deletion

### Add new Vercel records:

**Add A Record for apex domain (@):**
1. Click **Add New Record**
2. Select:
   - **Type**: `A Record`
   - **Host**: `@`
   - **Value**: `76.76.21.21` (Vercel's IP)
   - **TTL**: `Automatic`
3. Click **✓** (checkmark) to save

**Add CNAME Record for www:**
1. Click **Add New Record**
2. Select:
   - **Type**: `CNAME Record`
   - **Host**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `Automatic`
3. Click **✓** (checkmark) to save

### Final DNS setup should look like:

```
Type    | Host | Value                  | TTL
--------|------|------------------------|-------
A       | @    | 76.76.21.21           | Auto
CNAME   | www  | cname.vercel-dns.com  | Auto
```

**Important:** Make sure you DON'T have any records pointing to GitHub Pages IPs!

---

## Step 4: Remove domain from GitHub Pages (if configured)

If you previously set up GitHub Pages with your domain:

1. Go to [github.com/lolusoleye/personal-website](https://github.com/lolusoleye/personal-website)
2. Go to **Settings** → **Pages**
3. If you see `iresoleye.me` in **Custom domain**, remove it:
   - Clear the custom domain field
   - Save changes

This prevents GitHub from trying to serve your domain.

---

## Step 5: Wait for DNS propagation

- DNS changes take **5-60 minutes** to propagate worldwide
- Sometimes up to **24 hours** (rare)

### Check status in Vercel:

1. Go to Vercel → Your project → **Settings** → **Domains**
2. Check status next to `iresoleye.me`:
   - ✅ **Valid Configuration** = Success! (green checkmark)
   - ⏳ **Pending** = Still waiting for DNS (wait a bit longer)
   - ❌ **Invalid Configuration** = Check your DNS records again

---

## Step 6: Test your domain

1. Wait 5-60 minutes after updating DNS
2. Open a browser (try incognito/private mode to avoid cache)
3. Type: `iresoleye.me`
4. Press Enter
5. ✅ **Should load your Vercel site!**

---

## Troubleshooting

### Still seeing GitHub Pages error?

1. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files
   - Try again

2. **Check DNS propagation:**
   - Go to [whatsmydns.net](https://www.whatsmydns.net)
   - Enter `iresoleye.me`
   - Check if A records show `76.76.21.21`
   - If not, wait longer (DNS can take time)

3. **Verify DNS records in Namecheap:**
   - Make sure you deleted all GitHub Pages records
   - Make sure you added Vercel records correctly
   - Double-check the values match exactly

4. **Try different browser or device:**
   - Sometimes browsers cache DNS
   - Try mobile device or different browser

### Domain shows "Invalid Configuration" in Vercel?

1. Double-check DNS records in Namecheap match what Vercel shows
2. Make sure you removed all GitHub Pages records
3. Wait a bit longer (DNS can be slow)
4. Contact Vercel support if it persists

---

## Quick Checklist

- [ ] Site deployed on Vercel (you can access `.vercel.app` URL)
- [ ] Domain `iresoleye.me` added in Vercel → Settings → Domains
- [ ] Removed all GitHub Pages A records from Namecheap
- [ ] Removed all GitHub Pages CNAME records from Namecheap
- [ ] Added A Record in Namecheap: `@` → `76.76.21.21`
- [ ] Added CNAME Record in Namecheap: `www` → `cname.vercel-dns.com`
- [ ] Removed domain from GitHub Pages settings (if it was there)
- [ ] Waited 5-60 minutes for DNS propagation
- [ ] Vercel shows "Valid Configuration" for domain
- [ ] `iresoleye.me` loads in browser

---

Once DNS propagates, `iresoleye.me` will load your Vercel site instead of GitHub Pages!

