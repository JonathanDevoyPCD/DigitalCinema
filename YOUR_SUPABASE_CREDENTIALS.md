# 🚀 Your Supabase Account is Ready!

## Your Credentials

```
Project URL: https://oqywbtcsfqafzwejztbu.supabase.co
Anon Key: sb_publishable_9TZ8FIrgJC_TOZwpUdY_Lg_O9y1f7LS
```

## ⚡ Quick Setup (3 Steps)

### Step 1: Initialize Database (2 minutes)

1. **Go to Supabase Dashboard**
   - Open: https://supabase.co/sign-in
   - Log in with your GitHub account
   - Select project "DigitalCinema"

2. **Open SQL Editor**
   - Click **SQL Editor** in left sidebar
   - Click **New Query**

3. **Copy & Paste This SQL**
   ```sql
   CREATE TABLE IF NOT EXISTS digital_slate (
     id BIGSERIAL PRIMARY KEY,
     project TEXT,
     edits JSONB,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   ALTER TABLE digital_slate ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow anon inserts" ON digital_slate
     FOR INSERT WITH CHECK (TRUE);

   CREATE POLICY "Allow anon selects" ON digital_slate
     FOR SELECT USING (TRUE);

   CREATE POLICY "Allow anon updates" ON digital_slate
     FOR UPDATE USING (TRUE);

   CREATE INDEX IF NOT EXISTS digital_slate_updated_at_idx ON digital_slate(updated_at DESC);
   ```

4. **Click RUN** (or press Ctrl+Enter)

✅ **Done!** Your database is ready.

---

### Step 2: Connect Your Tablet (30 seconds)

1. **Open Digital Slate App**
   - https://jonathandevoypcd.github.io/DigitalCinema/

2. **Click 🔄 Sync** (top right corner)

3. **Enter Your Credentials**
   - **Project URL:** `https://oqywbtcsfqafzwejztbu.supabase.co`
   - **Anon Key:** `sb_publishable_9TZ8FIrgJC_TOZwpUdY_Lg_O9y1f7LS`

4. **Click CONNECT**

✅ **Connected!** You should see: "Connected to Supabase successfully!"

---

### Step 3: Test Push/Pull (1 minute)

1. **Make an Edit**
   - Change a take number to 3
   - Change setup to "Wide shot test"
   - See changes in Live Preview

2. **Push to Cloud**
   - Click 🔄 Sync
   - Click **Push now**
   - Wait for confirmation

3. **Pull from Cloud** (optional, to verify)
   - Click 🔄 Sync
   - Click **Pull latest**
   - Your edits should come back!

✅ **Working!** Cloud sync is live. 🎉

---

## 📱 Now You Can...

**On Your Tablet (On Set)**
1. Edit shots (take numbers, setups, descriptions)
2. 🔄 Sync → **Push now** before wrapping
3. ☁️ All your edits saved to cloud

**On Your PC (Back at Office)**
1. 🔄 Sync → Enter creds → **Connect**
2. Click **Pull latest**
3. 📥 All tablet edits now on PC
4. Export or log in your continuity doc

**Next Day on Set (Tablet)**
1. Continue editing new shots
2. 🔄 Sync → **Push now**
3. PC can pull these edits in evening

---

## 🆘 If SQL Query Fails

**Error: "already exists"**
- Table was created but query ran twice
- Just re-run to verify it exists

**Error: "syntax error"**
- Copy SQL again carefully (may have copy-paste issues)

**Can't see the SQL Editor?**
- Make sure you're logged into Supabase
- Make sure you selected "DigitalCinema" project
- SQL Editor is in left sidebar, below "Database"

---

## 🔍 Verify Everything Works

**After running SQL:**
1. Click **Editor** (left sidebar, under SQL Editor)
2. You should see **digital_slate** table listed
3. Click on it to view the table

**After connecting in app:**
1. Make some edits
2. 🔄 Sync → Push now
3. Go back to Supabase → Click **Editor** → Click **digital_slate**
4. You should see your data as a row!

---

## 📚 Documentation

- **[QUICK_START_SYNC.md](QUICK_START_SYNC.md)** — 1-pager
- **[CLOUD_SYNC.md](CLOUD_SYNC.md)** — Full guide
- **[IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md)** — Technical details
- **[setup-supabase.sql](setup-supabase.sql)** — SQL script

---

## 🎬 You're Ready!

1. ✅ Supabase account created
2. ⏳ Run SQL query (see Step 1 above)
3. ⏳ Connect tablet to Supabase (see Step 2 above)
4. ⏳ Test push/pull (see Step 3 above)

**Total time: ~5 minutes**

---

**Ready to sync? Start with Step 1 above! 🚀**
