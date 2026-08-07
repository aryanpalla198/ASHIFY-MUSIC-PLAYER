import subprocess
import os
import shutil

songs = [
    {
        "name": "no_lie",
        "query": "ytsearch1:No Lie Sean Paul Dua Lipa"
    },
    {
        "name": "kalyani",
        "query": "ytsearch1:Kalyani Malayalam song ARJN"
    }
]

dest_dirs = [
    r"C:\Users\User\.gemini\antigravity\scratch\ash-music-app\public\audio",
    r"C:\Users\User\.gemini\antigravity\scratch\ash-plays\public\audio"
]

for d in dest_dirs:
    os.makedirs(d, exist_ok=True)

print("Starting downloads for remaining songs...")

for song in songs:
    name = song["name"]
    query = song["query"]
    print(f"Downloading {name} with query: {query}...")
    
    out_template = os.path.join(dest_dirs[0], f"{name}.m4a")
    
    cmd = [
        "python", "-m", "yt_dlp",
        "-f", "ba[ext=m4a]",
        "-o", out_template,
        query
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"Successfully downloaded {name} to {out_template}")
    except Exception as e:
        print(f"Error downloading {name}: {e}")

print("Copying all songs to both directories...")
all_song_names = ["starboy", "mr_perfect", "no_lie", "kalyani", "sahiba"]

for name in all_song_names:
    src_file = os.path.join(dest_dirs[0], f"{name}.m4a")
    dst_file = os.path.join(dest_dirs[1], f"{name}.m4a")
    
    if os.path.exists(src_file):
        try:
            shutil.copy2(src_file, dst_file)
            print(f"Copied {name}.m4a to {dst_file}")
        except Exception as e:
            print(f"Error copying {name}.m4a: {e}")
    elif os.path.exists(dst_file):
        try:
            shutil.copy2(dst_file, src_file)
            print(f"Copied {name}.m4a from {dst_file} back to {src_file}")
        except Exception as e:
            print(f"Error copying {name}.m4a back: {e}")
    else:
        print(f"Warning: {name}.m4a not found in either directory.")

print("Finished processing all songs.")
