import subprocess
import os
import shutil

songs = [
    {
        "name": "sahiba",
        "query": "https://youtu.be/n2dVFdqMYGA"
    },
    {
        "name": "hukum",
        "query": "ytsearch1:Hukum Jailer video song"
    }
]

dest_dirs = [
    r"C:\Users\User\.gemini\antigravity\scratch\ash-music-app\public\audio",
    r"C:\Users\User\.gemini\antigravity\scratch\ash-plays\public\audio"
]

for d in dest_dirs:
    os.makedirs(d, exist_ok=True)

print("Starting download of new Sahiba and Hukum...")

for song in songs:
    name = song["name"]
    query = song["query"]
    print(f"Downloading {name} with query/url: {query}...")
    
    out_template = os.path.join(dest_dirs[0], f"{name}.m4a")
    
    # Remove old one if it exists to overwrite cleanly
    if os.path.exists(out_template):
        try:
            os.remove(out_template)
        except Exception as e:
            print(f"Error removing old {name}: {e}")
            
    cmd = [
        "python", "-m", "yt_dlp",
        "-f", "ba[ext=m4a]",
        "-o", out_template,
        query
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"Successfully downloaded {name} to {out_template}")
        
        # Copy to the second directory
        dest_2 = os.path.join(dest_dirs[1], f"{name}.m4a")
        if os.path.exists(dest_2):
            os.remove(dest_2)
        shutil.copy2(out_template, dest_2)
        print(f"Copied {name} to {dest_2}")
    except Exception as e:
        print(f"Error downloading {name}: {e}")

print("Downloads finished.")
