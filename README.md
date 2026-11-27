# Digital Slate

A touch-friendly, camera-ready slate for **Mission Possible: Operation China Speed**. The scene and shot list and suggested coverage come from the supplied PowerPoint, including the B-roll slates.

## On set

1. Choose a scene, then a shot.
2. Edit the project name, scene name or number, shot ID, description, or location if needed. Tap a suggested setup or type your own. The project name applies to every shot; other edits are saved for the selected shot.
3. Set the take with the − and + buttons, then tap **Present slate** and hold the screen towards the camera.
4. Tap **Next take** for a retake. Use the previous and next shot or scene controls to move between slates without leaving presentation mode. Shot navigation crosses scene boundaries; scene navigation opens that scene's first shot. Your saved edits and take number return when you revisit a shot.
5. Tap **Back to editor** to change a setup or other details. Escape also returns to the editor.

Edits and take numbers are saved per shot in the browser on that device. They do not sync between devices or browsers, and clearing browser site data removes them. Log takes separately in your continuity workbook. The slate is visual only: it does not produce a clapper sound or record footage.

The app is a static site; open `index.html` or serve this folder with any static web server. GitHub Pages can publish it from the `main` branch root. Internet access is needed for the hosted fonts; system fonts are used if they are unavailable.

To regenerate the shot data from the original PowerPoint in PowerShell, run:

```powershell
.\tools\extract-slates.ps1 -PowerPoint 'C:\path\to\your-presentation.pptx'
```
