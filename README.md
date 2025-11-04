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

The Projects section fetches your public, non-fork, non-archived repos (top 9 by stars) and links to each repo and optional homepage.

## Deploy to GitHub Pages

1. Create a new GitHub repo (public): e.g. `personal-website`.
2. Commit all files and push to `main`.
3. In GitHub → Settings → Pages:
   - Build and deployment: Source = Deploy from a branch
   - Branch = `main` / root (`/`)
4. Wait for Pages to build; your site will be live at `https://<username>.github.io/personal-website/`.

Tip: If you prefer the special Pages repo, name it `<username>.github.io` and deploy from `main`.

## Custom domain (iresoleye.me)

This repo includes a `CNAME` file with `iresoleye.me`.

In GitHub → Settings → Pages:
- Custom domain: `iresoleye.me`
- Enable “Enforce HTTPS” after the certificate is issued.

In Namecheap DNS (Domain → Advanced DNS):
- For apex `@` add A records to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- For `www` add a CNAME record pointing to `<username>.github.io`.

Propagation can take a bit. Once active, the GitHub Pages URL will redirect to `iresoleye.me`.

## GitHub Student Developer Pack

- Free domain via Namecheap (you used this already).
- GitHub Pro benefits (increased limits), which help with private repos and Actions minutes.
- Many other credits/tools you can use for future projects.

 ## License

 MIT

