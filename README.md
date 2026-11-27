# Digital Slate

A touch-friendly, camera-ready slate for **Mission Possible: Operation China Speed**. The scene and shot list and suggested coverage come from the supplied PowerPoint, including the B-roll slates.

## Quick Start

**On Your Tablet (On Set)**
1. Choose a scene, then a shot
2. Edit details (take number, setup, description)
3. Tap **Present slate** to show the camera
4. Use **Previous/Next shot/scene** controls to navigate without leaving presentation mode
5. Tap **Change setup** to adjust camera angles on the fly

**Save to Cloud (Free Supabase)**
1. Tap **🔄 Sync** (top right) on your tablet
2. Enter your Supabase credentials ([5-minute setup](CLOUD_SYNC.md))
3. Tap **Push now** to upload your edits
4. On your PC, tap **Pull latest** to download take numbers and setups

[📖 Complete cloud sync guide](CLOUD_SYNC.md)

## On Set

1. Choose a scene, then a shot.
2. Edit the project name, scene name or number, shot ID, description, or location if needed. Tap a suggested setup or type your own. The project name applies to every shot; other edits are saved for the selected shot.
3. Set the take with the − and + buttons, then tap **Present slate** and hold the screen towards the camera.
4. Tap **Change setup** in presentation mode to select suggested coverage or enter a custom setup. Tap **Next take** for a retake. Use the previous and next shot or scene controls to move between slates without leaving presentation mode. Shot navigation crosses scene boundaries; scene navigation opens that scene's first shot. Your saved edits and take number return when you revisit a shot.
5. Tap **Back to editor** to change other details. Escape closes the setup picker or returns to the editor.

Edits and take numbers are saved per shot in the browser on that device. For cross-device access and backup, use the cloud sync feature via Supabase (free tier, no credit card required).

The app is a static site; open `index.html` or serve this folder with any static web server. GitHub Pages can publish it from the `main` branch root. Internet access is needed for the hosted fonts; system fonts are used if they are unavailable.

To regenerate the shot data from the original PowerPoint in PowerShell, run:

```powershell
.\tools\extract-slates.ps1 -PowerPoint 'C:\path\to\your-presentation.pptx'
```
