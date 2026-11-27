# Supabase Setup Instructions

Your Supabase project is ready! Here's how to initialize it:

## 1. Run SQL Setup (1 minute)

1. Go to your Supabase dashboard: https://supabase.co/sign-in
2. Select project "DigitalCinema"
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the contents of **setup-supabase.sql** (in this folder)
6. Click **Run**

That's it! The table is created and ready.

## 2. Test Connection

1. Open the Digital Slate app: https://jonathandevoypcd.github.io/DigitalCinema/
2. Click **🔄 Sync** (top right)
3. Enter your credentials:
   - **Project URL:** https://oqywbtcsfqafzwejztbu.supabase.co
   - **Anon Key:** sb_publishable_9TZ8FIrgJC_TOZwpUdY_Lg_O9y1f7LS
4. Click **Connect**
5. You should see: "Connected to Supabase successfully!"

## 3. Test Push/Pull

1. Make some edits (change a take number, setup, etc.)
2. Click **🔄 Sync** → **Push now**
3. Wait for confirmation
4. Click **🔄 Sync** → **Pull latest** to verify it comes back

**You're done!** Cloud sync is live. 🎉

---

## Security Note

Your credentials are stored **only in your browser's localStorage** on each device.
To use the app on another device, repeat step 2 to connect.
