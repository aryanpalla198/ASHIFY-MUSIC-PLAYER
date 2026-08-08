import os
import subprocess
import shutil

tracks = [
    {
        "name": "love_me_again",
        "query": 'ytsearch1:"Love Me Again" Nannaku Prematho'
    },
    {
        "name": "emitemitemo",
        "query": 'ytsearch1:"Emitemitemo" Alphonse'
    },
    {
        "name": "baby_doll",
        "query": 'ytsearch1:"Baby Doll" Khushboo'
    },
    {
        "name": "sheila_ki_jawani",
        "query": 'ytsearch1:"Sheila Ki Jawani" Vishal Shekhar'
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
