import os
import subprocess
import shutil

tracks = [
    {
        "name": "udi_udi",
        "query": 'ytsearch1:"Udi Udi" Aneesh'
    },
    {
        "name": "naa_ready",
        "query": 'ytsearch1:"Naa Ready" Leo Anirudh'
    },
    {
        "name": "teri_baaton_mein",
        "query": 'ytsearch1:"Teri Baaton Mein Aisa Uljha Jiya" Raghav'
    },
    {
        "name": "bad_boy",
        "query": 'ytsearch1:"Bad Boy" Saaho'
    },
    {
        "name": "jhoome_jo_pathaan",
        "query": 'ytsearch1:"Jhoome Jo Pathaan"'
    }
]

app_audio_dir = r"C:\Users\User\.gemini\antigravity\scratch\ash-music-app\public\audio"
os.makedirs(app_audio_dir, exist_ok=True)

for track in tracks:
    print(f"Downloading {track['name']}...")
    temp_output = os.path.join(r"C:\Users\User\.gemini\antigravity\scratch\ash-music-app", f"{track['name']}.m4a")
    
    cmd = [
        "python", "-m", "yt_dlp",
        "-f", "ba[ext=m4a]",
        "-o", temp_output,
        track['query']
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Successfully downloaded {track['name']}")
        if os.path.exists(temp_output):
            shutil.move(temp_output, os.path.join(app_audio_dir, f"{track['name']}.m4a"))
            print(f"Moved {track['name']}.m4a to public/audio")
        else:
            print(f"Error: Downloaded file not found at {temp_output}")
    else:
        print(f"Error downloading {track['name']}: {res.stderr}")
