# Digital Slate Cloud Sync — Quick Reference

## ✅ What You Now Have

Your Digital Slate app now has **cloud sync** enabled. This means:

- 📱 **Save edits on tablet** (take numbers, setups, descriptions)
- ☁️ **Push to Supabase** (free, no credit card required)
- 💻 **Pull on PC** to access the same data
- 🔄 **Merge or replace** cloud data with your local edits
- 🔐 **Secure** — credentials stored only in your browser

## 🚀 5-Minute Setup

### 1. Create Supabase Account (Free)
- Go to: **https://supabase.com**
- Sign up with GitHub or email
- Create new project named "DigitalCinema" in US East
- Wait ~2 minutes for setup

### 2. Get Your Credentials
- Click **Settings** ⚙️ → **API**
- Copy **Project URL** (https://xxxx.supabase.co)
- Copy **Anon public key** (eyJ...)

### 3. Connect Your Tablet
- Open Digital Slate app
- Press **🔄 Sync** (top right)
- Paste URL and Key
- Click **Connect**
- ✅ Ready!

## 📝 Daily Workflow

**On Set (Tablet)**
```
1. Edit shots → Set take numbers
2. 🔄 Sync → Push now
3. Keep your tablet edits in the cloud
```

**Back at Office (PC)**
```
1. 🔄 Sync → Enter credentials → Connect
2. Pull latest
3. All your tablet edits now on PC
4. Export or log in your continuity doc
```

**Next Day (Tablet)**
```
1. Continue editing new shots
2. 🔄 Sync → Push now
3. PC can pull these edits in evening
```

## 📱 App URL

**Browser:** https://jonathandevoypcd.github.io/DigitalCinema/

**Tablet Home Screen (iOS):**
1. Open in Safari
2. Share → Add to Home Screen
3. Opens as app (internet required)

**Android:**
1. Open in Chrome
2. Menu → Install app
3. Opens as app (internet required)

## 🆘 If Something Goes Wrong

| Problem | Solution |
|---------|----------|
| "Connection failed" | Copy/paste credentials carefully; check internet |
| "Table doesn't exist" | See step in CLOUD_SYNC.md "Troubleshooting" |
| Want to disconnect | 🔄 Sync → Disconnect (local data stays) |
| Data lost | Local edits saved in browser; use Pull to restore cloud version |

## 📚 Full Docs

See **[CLOUD_SYNC.md](CLOUD_SYNC.md)** for:
- Advanced merge/replace workflow
- Supabase free tier limits
- Security & privacy notes
- SQL queries to view data
- More troubleshooting

## 🔗 Useful Links

- **App:** https://jonathandevoypcd.github.io/DigitalCinema/
- **GitHub:** https://github.com/JonathanDevoyPCD/DigitalCinema
- **Supabase:** https://supabase.com
- **Docs:** See CLOUD_SYNC.md in repo

---

**You're ready to sync! Start with:** 🔄 Sync button (top right) → Enter Supabase credentials → Push/Pull
