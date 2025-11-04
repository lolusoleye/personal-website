 # iresoleye.me — Personal Website

 A simple, fast, and responsive personal website with an About section and a Projects showcase.

## Getting started

 - Open `index.html` directly in your browser, or
 - Serve the folder with any static server (recommended for correct asset paths):

 ```bash
 # Python 3
 python -m http.server 8080

 # Node
 npx serve . -p 8080 --single
 ```

 ## Structure

 - `index.html` — Main page markup
 - `styles.css` — Site styles (responsive, dark-mode friendly)

 ## Editing

 - Change title and meta tags in `index.html`.
- Update About content in its section.
 - Tweak colors, spacing, and typography in `styles.css`.

### Show your GitHub projects

This site can automatically list repositories from your GitHub account:

- Set your username in `index.html` via the meta tag:

```html
<meta name="github-username" content="YOUR_GITHUB_USERNAME" />
```

- Or pass it via URL: `index.html?u=YOUR_GITHUB_USERNAME`

The Projects section fetches all your public, non-fork, non-archived repos and displays them sorted by last updated. The `personal-website` repo is automatically excluded from the list.

## Deployment

This site is configured for **Vercel** deployment.

### Quick Deploy to Vercel

1. Push your code to GitHub (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → Import your `personal-website` repository
4. Click **Deploy** (Vercel auto-detects settings)

### Connect Custom Domain (iresoleye.me)

1. In Vercel project → **Settings** → **Domains**
2. Add `iresoleye.me` and `www.iresoleye.me`
3. Configure DNS in Namecheap:
   - **A Record** for `@` → `76.76.21.21` (Vercel's IP)
   - **CNAME Record** for `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (5-60 minutes)

**📖 For detailed step-by-step instructions, see [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)**

### Make it Visible on Google

1. Submit to [Google Search Console](https://search.google.com/search-console)
2. Verify domain ownership via DNS (TXT record)
3. Submit `sitemap.xml` in Search Console
4. Request indexing for `https://iresoleye.me/`

See the deployment guide for complete instructions.

## GitHub Student Developer Pack

- Free domain via Namecheap (you used this already).
- GitHub Pro benefits (increased limits), which help with private repos and Actions minutes.
- Many other credits/tools you can use for future projects.

 ## License

 MIT

