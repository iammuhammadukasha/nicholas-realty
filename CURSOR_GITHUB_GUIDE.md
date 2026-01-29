# Use Cursor with GitHub — Quick Guide

Your project is already connected to:
**https://github.com/iammuhammadukasha/nicholas-realty**

---

## 1. Open this folder in Cursor

1. In Cursor: **File** → **Open Folder**
2. Choose: `nicholas-realty-deploy`  
   (full path: `C:\Users\iammu\Downloads\nicholas-realty (3)\nicholas-realty-deploy`)
3. Click **Select Folder**

Cursor will use this folder as the workspace. All Git actions (commit, push) will apply to this repo.

---

## 2. Sign in to GitHub in Cursor

1. Click the **Account** icon (bottom-left) or **File** → **Preferences** → **Settings**
2. Or open **Source Control**: click the branch icon in the left sidebar (or `Ctrl+Shift+G`)
3. If Cursor asks to sign in to GitHub, choose **Sign in with GitHub** and complete the sign-in in the browser

You only need to do this once. After that, Cursor can push and pull without asking again.

---

## 3. Commit and push changes from Cursor

Whenever you edit files:

1. **Open Source Control**  
   - Click the branch icon in the left sidebar, or press `Ctrl+Shift+G`

2. **Stage changes**  
   - You’ll see a list of changed files  
   - Click **+** next to a file to stage it, or **+** next to "Changes" to stage all

3. **Commit**  
   - Type a short message in the box at the top (e.g. "Update hero section")
   - Click the **✓ Commit** button (or press `Ctrl+Enter`)

4. **Push to GitHub**  
   - Click **Sync Changes** or the **↑** (push) icon  
   - Or click the **...** menu in Source Control → **Push**

Your changes will be on GitHub, and if Vercel is connected to this repo, it will deploy automatically.

---

## 4. Pull latest from GitHub

If you change code on GitHub (or on another machine):

1. Open Source Control (`Ctrl+Shift+G`)
2. Click **...** → **Pull**  
   Or click the **↓** (pull) icon if it appears

---

## 5. Check connection

- **Bottom-left of Cursor:** you should see the branch name (e.g. `main`) and the repo
- **Source Control panel:** shows changed files and commit history

If push asks for a password, use a **Personal Access Token** from GitHub (Settings → Developer settings → Personal access tokens), not your GitHub password.
