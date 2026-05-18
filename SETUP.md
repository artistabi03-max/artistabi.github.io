# Artist Abi — GitHub Pages setup

Your site will live at **https://artistabi.github.io** once you follow these steps.

---

## Part 1 — Create GitHub account & repository (on PC or phone)

### 1. GitHub account
1. Go to [https://github.com/signup](https://github.com/signup)
2. Choose username: **`artistabi`** (if taken, pick something close and tell clients the link)
3. Verify email

### 2. Create the website repository
The repo **name must be exactly**:

```text
artistabi.github.io
```

Steps:
1. GitHub → **+** → **New repository**
2. Repository name: `artistabi.github.io`
3. Public
4. Do **not** add README (we already have files)
5. **Create repository**

### 3. Turn on GitHub Pages
1. Open repo `artistabi.github.io`
2. **Settings** → **Pages**
3. **Build and deployment** → Source: **Deploy from a branch**
4. Branch: **main** → folder **/ (root)** → **Save**
5. Wait 1–3 minutes. Your site URL: **https://artistabi.github.io**

---

## Part 2 — Upload your project (first time, on PC)

Open PowerShell in your project folder:

```powershell
cd "d:\Python project\abin_web"
git init
git add .
git commit -m "Initial portfolio site for Artist Abi"
git branch -M main
git remote add origin https://github.com/artistabi/artistabi.github.io.git
git push -u origin main
```

When asked to sign in, use your GitHub username and a **Personal Access Token** (not your password):
- GitHub → **Settings** → **Developer settings** → **Personal access tokens** → generate token with `repo` scope

---

## Part 3 — Use Git from your phone (add photos from camera roll)

### Install GitHub app
- **iPhone:** App Store → “GitHub”
- **Android:** Play Store → “GitHub”

Sign in as **artistabi**.

### Add a new photo (easy way)
1. Open repo **artistabi.github.io**
2. Tap **photos** folder
3. Tap **+** (Add file) or **Upload files**
4. Select image(s) from your camera roll
5. Scroll down → **Commit changes** (green button)
6. Wait ~1 minute — GitHub Actions will update `gallery.json` automatically
7. Refresh your site — new photo appears

> **Tip:** If Actions are disabled, go to repo **Actions** tab and enable workflows once.

### Edit bio or Instagram link on phone
1. Repo → open **config.json** → pencil icon (Edit)
2. Change `bio`, `instagram`, `whatsapp`, or `email`
3. **Commit changes**

### Add Instagram video links on phone
1. Repo → open **videos.json** → Edit
2. Copy link from Instagram (Share → Copy link) for a reel or post
3. Paste into `"url"` and set `"title"`
4. Example:

```json
[
  {
    "title": "Bedroom mural timelapse",
    "url": "https://www.instagram.com/reel/ABC123xyz/"
  }
]
```

5. Remove entries that still say `REPLACE_ME`
6. **Commit changes**

---

## Part 4 — Link from Instagram

1. Instagram app → your profile → **Edit profile**
2. **Links** → Add link
3. URL: `https://artistabi.github.io`
4. Title: e.g. “My murals” or “Portfolio”

---

## Files you will edit most

| File | What it does |
|------|----------------|
| `config.json` | Name, bio, Instagram, WhatsApp, email |
| `photos/` | Drop new mural photos here |
| `videos.json` | Instagram reel/post links |
| `logo.jpg` | Profile picture at top |

---

## Optional — test on your phone before going live

On PC, in the project folder:

```powershell
python -m http.server 8080
```

On phone (same Wi‑Fi), open browser: `http://YOUR-PC-IP:8080`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site shows 404 | Repo name must be `artistabi.github.io`, branch `main`, Pages enabled |
| New photo not showing | Wait 2 min; check **Actions** tab for green checkmark |
| Video embed blank | Link must be public Instagram post/reel; tap “Open on Instagram” still works |
| Username not `artistabi` | Site becomes `https://YOUR-USERNAME.github.io` |

---

Need help? Reply with your exact GitHub username if it is not `artistabi` and we will adjust links.
