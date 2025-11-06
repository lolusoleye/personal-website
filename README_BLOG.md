# Blog System - Complete Setup Guide

## ✅ What's Been Built

Your blog system is now complete! Here's what you have:

### Features
- ✅ **Admin-only posting**: Only you (lolusoleye) can create/edit posts via GitHub OAuth
- ✅ **Public blog feed**: Everyone can view posts at `/blog`
- ✅ **Individual post pages**: Each post has its own URL with full content
- ✅ **File attachments**: Upload images, videos, PDFs (max 10MB each)
- ✅ **Likes**: Visitors can like posts (one like per unique fingerprint)
- ✅ **View counts**: Unique views tracked per post
- ✅ **Timestamps**: Every post shows creation date/time
- ✅ **Responsive design**: Works perfectly on mobile, tablet, desktop
- ✅ **SEO optimized**: Posts have proper metadata for search engines

## 📋 Final Checklist Before Deployment

### 1. Environment Variables in Vercel

Make sure ALL these are set in **Vercel → Your Project → Settings → Environment Variables**:

```
NEXTAUTH_URL=https://iresoleye.me
NEXTAUTH_SECRET=[your-generated-secret]
GITHUB_ID=[your-github-oauth-client-id]
GITHUB_SECRET=[your-github-oauth-client-secret]
ADMIN_GITHUB_USERNAME=lolusoleye
SUPABASE_URL=https://orzwvzqutfrcathjhobc.supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
NEXT_PUBLIC_SUPABASE_URL=https://orzwvzqutfrcathjhobc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
ATTACHMENTS_BUCKET=attachments
VIEW_FINGERPRINT_SALT=[your-generated-salt]
```

**Important**: 
- `NEXT_PUBLIC_*` variables are exposed to the browser (for client-side Supabase)
- `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed (server-side only)

### 2. Supabase Storage Bucket

Make sure the `attachments` bucket exists and is **public**:
- Go to Supabase → Storage
- Create bucket named `attachments` if it doesn't exist
- Set it to **Public** (so uploaded files can be viewed)

### 3. GitHub OAuth App

Make sure your callback URL is correct:
- **Production**: `https://iresoleye.me/api/auth/callback/github`
- If testing before DNS is live, also add your Vercel preview URL

### 4. Deploy to Vercel

```bash
# Install dependencies
npm install

# Commit and push
git add .
git commit -m "Add Next.js blog system"
git push
```

Vercel will automatically:
- Detect Next.js
- Install dependencies
- Build the app
- Deploy it

## 🚀 How to Use

### Creating Your First Post

1. **Visit**: `https://iresoleye.me/admin`
2. **Sign in**: Click "Sign in with GitHub" (must be your `lolusoleye` account)
3. **Create post**:
   - Enter title
   - Write content
   - Upload attachments (click or drag files)
   - Click "Publish Post"
4. **View post**: Navigate to `/blog` and click on your new post

### Viewing Your Blog

- **Public feed**: `https://iresoleye.me/blog`
- **Individual post**: `https://iresoleye.me/blog/[post-slug]`

### Security (Only You Can Post)

- **GitHub OAuth**: Only your GitHub account can sign in
- **Username check**: Server verifies username is `lolusoleye`
- **API protection**: All write APIs check authentication
- **Database RLS**: Direct database writes blocked (only service role can write)

## 📊 Analytics

### View Unique Page Visits

You can see unique views in two ways:

1. **Via Supabase Dashboard**:
   - Go to Supabase → Table Editor → `views` table
   - Filter by `post_id` to see unique viewers for each post
   - Each row = one unique viewer (based on fingerprint)

2. **Via API** (future enhancement):
   - I can add an admin analytics page if you want
   - Would show total views, likes, and visitor stats per post

### How Unique Views Work

- Each visitor gets a **fingerprint** (hashed IP + user agent + salt)
- Same fingerprint = same person (across visits)
- Unique views = count of unique fingerprints per post
- All-time tracking (not reset)

## 🔧 Troubleshooting

### "Unauthorized" when trying to post
- Check `ADMIN_GITHUB_USERNAME` matches your GitHub username exactly
- Make sure you're signed in with the correct GitHub account
- Verify GitHub OAuth app is configured correctly

### Posts not showing
- Check Supabase → Table Editor → `posts` table (should have rows)
- Check Vercel logs for errors
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct

### File uploads failing
- Check `ATTACHMENTS_BUCKET` exists in Supabase Storage
- Verify bucket is set to **Public**
- Check file size (max 10MB)
- Check file type (images, videos, PDFs allowed)

### Likes/views not working
- Check `VIEW_FINGERPRINT_SALT` is set
- Verify API routes are accessible (check browser console)
- Check Vercel logs for errors

## 🎨 Customization

Want to customize the blog? Here are the key files:

- **Blog feed**: `app/blog/page.tsx`
- **Individual post**: `app/blog/[slug]/page.tsx`
- **Admin editor**: `app/admin/AdminEditor.tsx`
- **Styles**: `app/globals.css` (look for `.blog-*` classes)

## 📝 Next Steps

1. **Deploy**: Push code and let Vercel deploy
2. **Test**: Create your first post
3. **Share**: Link to your blog from your homepage
4. **Post daily**: Use `/admin` to create new posts anytime!

Your blog is ready to go! 🎉

