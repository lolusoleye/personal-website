# Deployment Instructions for Blog System

## Prerequisites Completed ✅
- ✅ Supabase database tables created
- ✅ Supabase Storage bucket created (`attachments`)
- ✅ GitHub OAuth app created
- ✅ Environment variables set in Vercel

## Next Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Environment Variables to Vercel

Make sure these are set in **Vercel → Project Settings → Environment Variables**:

```
NEXTAUTH_URL=https://iresoleye.me
NEXTAUTH_SECRET=[your-secret]
GITHUB_ID=[your-github-oauth-client-id]
GITHUB_SECRET=[your-github-oauth-client-secret]
ADMIN_GITHUB_USERNAME=lolusoleye
SUPABASE_URL=https://orzwvzqutfrcathjhobc.supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
NEXT_PUBLIC_SUPABASE_URL=https://orzwvzqutfrcathjhobc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
ATTACHMENTS_BUCKET=attachments
VIEW_FINGERPRINT_SALT=[your-salt]
```

### 3. Push to GitHub

```bash
git add .
git commit -m "Add Next.js blog system with admin editor"
git push
```

### 4. Deploy to Vercel

Vercel will automatically detect the Next.js app and deploy it.

### 5. Test the Blog

1. **Visit your site**: `https://iresoleye.me/blog` - should show empty blog (no posts yet)
2. **Visit admin**: `https://iresoleye.me/admin` - should prompt GitHub login
3. **Sign in with GitHub** (lolusoleye account)
4. **Create a post**:
   - Enter title and content
   - Upload attachments (images/videos/files)
   - Click "Publish Post"
5. **View your post**: Navigate to `/blog` and click on your post
6. **Test likes/views**: The post should show like button and view count

## How It Works

### Admin Access (Only You)
- Visit `/admin` → Sign in with GitHub
- Only `lolusoleye` GitHub username can access
- Create posts with attachments
- All posts are timestamped automatically

### Public Access (Everyone)
- Visit `/blog` → See all posts in reverse chronological order
- Click a post → See full content, attachments, likes, and views
- Anyone can like posts (one like per unique fingerprint)
- View counts are unique (one per unique fingerprint)

### Security
- Only your GitHub account can create/edit posts (enforced server-side)
- File uploads validated (size, type)
- Likes/views tracked via hashed fingerprints (privacy-friendly)

## Troubleshooting

### "Unauthorized" error in admin
- Check `ADMIN_GITHUB_USERNAME` matches your GitHub username exactly
- Make sure you're signed in with the correct GitHub account

### Posts not showing
- Check Supabase database has posts
- Check Vercel logs for errors
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct

### File uploads failing
- Check `ATTACHMENTS_BUCKET` exists in Supabase Storage
- Verify bucket is public (for reading)
- Check file size (max 10MB)

### Likes/views not working
- Check `VIEW_FINGERPRINT_SALT` is set
- Verify API routes are accessible
- Check browser console for errors

