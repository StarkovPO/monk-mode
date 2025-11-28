# Audio Assets

## Required Files

### beep.mp3
A simple transition beep sound that plays when moving between meditation exercises.

**Specifications:**
- Duration: 0.5 - 1.0 seconds
- Format: MP3
- Volume: Medium (not jarring)
- Tone: Pleasant, neutral (e.g., 440 Hz sine wave)

**Temporary Workaround:**
The app will function without this file, but audio cues will be skipped. The AudioService gracefully handles missing audio files.

**How to add:**
1. Create or download a simple beep sound
2. Save as `beep.mp3` in this directory
3. The audio service will automatically load it

**Free resources:**
- Create online: https://www.beepbox.co/
- Download from: https://freesound.org/
- Or use any simple tone generator to create a 440 Hz beep
