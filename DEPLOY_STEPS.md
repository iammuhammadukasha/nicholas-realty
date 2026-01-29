# Deploy Nicholas Realty — Steps

## 1. Create a new GitHub repo

1. Go to [github.com/new](https://github.com/new).
2. Name the repo (e.g. `nicholas-realty`).
3. Leave it **empty** (no README, no .gitignore).
4. Create the repo.

## 2. Push this folder to the repo

From a terminal, in this folder (`nicholas-realty-deploy`):

```bash
cd "C:\Users\iammu\Downloads\nicholas-realty (3)\nicholas-realty-deploy"

git init
git add .
git commit -m "Initial commit - Nicholas Realty Next.js site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

## 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub).
2. Click **Add New** → **Project**.
3. Import the repo you just pushed.
4. **Root Directory:** leave **blank** (this folder is the project root).
5. Click **Deploy**.

After the build finishes, you’ll get a URL like `nicholas-realty.vercel.app`.

## 4. (Optional) Custom domain

In Vercel: **Project** → **Settings** → **Domains** → add your domain.
