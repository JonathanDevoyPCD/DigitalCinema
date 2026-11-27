# Cloud Sync Guide

The Digital Slate now supports **cloud sync** via Supabase, allowing you to save your edits from your tablet and access them on your PC (or any device with internet).

## What Gets Synced

- **Take numbers** for each shot
- **Custom setup** selections (camera angles, lenses, movements)
- **Edits** to scene names, descriptions, locations
- **Project name** (applies to all shots)

## How It Works

1. **Local first**: All edits are saved on your tablet in browser storage
2. **Push**: Press "🔄 Sync" → "Push now" to upload your edits to the cloud
3. **Pull**: On your PC, press "🔄 Sync" → "Pull latest" to download the latest edits
4. **Merge or Replace**: Choose whether to merge cloud edits with your PC edits or completely replace them

## Setup (5 minutes)

### Step 1: Create a Free Supabase Account

1. Go to **[supabase.com](https://supabase.com)**
2. Click **"Start your project"**
3. Sign up with your GitHub account (easy) or email
4. Create a new project:
   - **Name**: `DigitalCinema`
   - **Region**: US East (or closest to you)
   - **Password**: Any password
5. Wait for the project to initialize (~2 minutes)

### Step 2: Get Your Credentials

1. Inside your new project, click **Settings** (⚙️ icon) in the left sidebar
2. Go to **API** tab
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxx.supabase.co`)
   - **Anon public key** (long string starting with `eyJ...`)

### Step 3: Connect Your Digital Slate

**On your tablet:**
1. Open the Digital Slate app
2. Press the **🔄 Sync** button (top right)
3. Paste your **Project URL** in the first field
4. Paste your **Anon public key** in the second field
5. Click **Connect**
6. If successful, it will say "Connected to Supabase successfully!"

## Using Cloud Sync

### Push Your Tablet Edits to Cloud

1. On your tablet, make your shot edits (take numbers, setups, etc.)
2. Press **🔄 Sync**
3. Click **Push now**
4. Wait for confirmation ("Slates pushed to cloud!")

### Pull Cloud Edits to Your PC

1. On your PC, open the Digital Slate
2. Press **🔄 Sync**
3. Paste your Supabase credentials if not already connected
4. Click **Connect**
5. Click **Pull latest**
6. Choose whether to **merge** (keep PC edits + add cloud edits) or **replace** (use only cloud edits)
7. Your PC now has the latest take numbers and setups!

## Sync Workflow Example

**Scenario: You're on set with a tablet, then need to log takes on your PC**

1. **Day 1 - On Set (Tablet)**
   - Edit shots, increment take numbers as you roll
   - Before wrapping: Press **🔄 Sync** → **Push now**
   - Tablet edits uploaded to cloud ☁️

2. **Day 1 - Evening (PC)**
   - Open Digital Slate
   - Press **🔄 Sync** → Enter credentials → **Connect**
   - Click **Pull latest**
   - Your PC now has all the take numbers from the tablet
   - Export or document the take counts for your continuity log

3. **Day 2 - On Set (Tablet)**
   - Your previous session's edits are still on the tablet
   - Make new edits for Day 2 shots
   - **Push now** to update the cloud
   - PC can pull these new edits in the evening

## Troubleshooting

**"Connection failed" error**
- Double-check your Supabase URL and API key (copy-paste carefully)
- Make sure your tablet has internet access
- Verify you're using the **Anon public key**, not the service role key

**"Table does not exist" or HTTP 404**
- In Supabase dashboard, manually create a table:
  - Go to **SQL Editor** → **New Query**
  - Paste and run:
    ```sql
    CREATE TABLE digital_slate (
      id BIGSERIAL PRIMARY KEY,
      project TEXT,
      edits JSONB,
      updated_at TIMESTAMP DEFAULT NOW()
    );
    
    ALTER TABLE digital_slate ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Allow anon inserts" ON digital_slate
      FOR INSERT WITH CHECK (TRUE);
    
    CREATE POLICY "Allow anon selects" ON digital_slate
      FOR SELECT USING (TRUE);
    
    CREATE POLICY "Allow anon updates" ON digital_slate
      FOR UPDATE USING (TRUE);
    ```
  - Then try connecting again from the Digital Slate

**Data not pushing/pulling**
- Confirm you're online and can browse the web
- Check browser console (F12 → Console tab) for error messages
- Disconnect and reconnect your credentials

**I need to disconnect**
- Press **🔄 Sync**
- Click **Disconnect**
- Your local edits remain unchanged; they just won't sync to cloud

## Security & Privacy

- Your **Supabase credentials are stored only in your browser's local storage**—never sent to our servers
- Supabase is a trusted, open-source PostgreSQL backend (used by thousands of apps)
- The free tier includes 500 MB storage, more than enough for years of shot data
- If you're concerned: Supabase credentials can be rotated or revoked anytime in the Supabase dashboard

## Limitations

- **Requires internet** to push/pull (your local edits always work offline)
- **Credentials are device-specific**: Each device (tablet, PC, phone) needs to connect separately
- **Latest version wins**: If you edit on tablet and PC simultaneously, one might overwrite the other; always push before switching devices
- **Supabase free tier limits**: 500 MB storage, 2 concurrent connections (plenty for this use)

## Advanced: Viewing Data in Supabase

To see your slate data in the Supabase dashboard:

1. Open your Supabase project
2. Click **SQL Editor** (left sidebar)
3. Run:
   ```sql
   SELECT project, edits, updated_at FROM digital_slate ORDER BY updated_at DESC LIMIT 10;
   ```
4. Your slate edits appear as JSON rows

---

**Questions?** The app is open-source: view the [DigitalCinema GitHub repo](https://github.com/JonathanDevoyPCD/DigitalCinema).
