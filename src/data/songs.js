const RAW_INITIAL_SONGS = [
  {
    id: "starboy",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    genre: "Pop / R&B",
    duration: 230,
    coverUrl: "covers/cover6.jpg",
    audioUrl: "audio/starboy.m4a",
    plays: "2,890,400",
    liked: true,
    rank: 1,
    lyrics: [
      { time: 0, text: "♪ (Heavy 808 sub-bass drop & dark atmospheric R&B synth) ♪" },
      { time: 10, text: "I'm tryna put you in the worst mood, ah" },
      { time: 18, text: "P1 cleaner than your church shoes, ah" },
      { time: 26, text: "Milli point two just to hurt you, ah" },
      { time: 34, text: "All my navy cars look like slate grey, ah" },
      { time: 42, text: "Look what you've done, I'm a motherf***ing Starboy!" }
    ]
  },
  {
    id: "mr_perfect",
    title: "Mr. Perfect",
    artist: "Arya 2 (DSP Hit)",
    album: "Arya 2 OST",
    genre: "Tollywood Pop",
    duration: 278,
    coverUrl: "covers/cover1.jpg",
    audioUrl: "audio/mr_perfect.m4a",
    plays: "1,529,102",
    liked: true,
    rank: 2,
    lyrics: [
      { time: 0, text: "♪ (Fast Telugu pop rock synth intro) ♪" },
      { time: 10, text: "He is Mr. Perfect... He is Mr. Perfect..." },
      { time: 20, text: "Live life king size, no compromises!" }
    ]
  },
  {
    id: "no_lie",
    title: "No Lie",
    artist: "Sean Paul ft. Dua Lipa",
    album: "Mad Love",
    genre: "Dancehall / Pop",
    duration: 221,
    coverUrl: "covers/cover2.jpg",
    audioUrl: "audio/no_lie.m4a",
    plays: "4,912,050",
    liked: true,
    rank: 3,
    lyrics: [
      { time: 0, text: "♪ (Dancehall riddim intro) ♪" },
      { time: 10, text: "Feel your eyes they're all over me" },
      { time: 15, text: "Don't be shy, take control of me" },
      { time: 20, text: "No lie, no lie, hyping it up, no lie!" }
    ]
  },
  {
    id: "kalyani",
    title: "Kalyani",
    artist: "ARJN ft. Shreya Ghoshal",
    album: "Kalyani (Single)",
    genre: "Malayalam Independent R&B",
    duration: 180,
    coverUrl: "covers/cover3.jpg",
    audioUrl: "audio/kalyani.m4a",
    plays: "3,740,110",
    liked: true,
    rank: 4,
    lyrics: [
      { time: 0, text: "♪ (R&B fusion synth beat intro) ♪" },
      { time: 8, text: "Ninte nunakuzhi kandappo... en nenchil thottu" },
      { time: 16, text: "Karimizhiyulla Kalavaani... kalyani nee..." }
    ]
  },
  {
    id: "sahiba",
    title: "Sahiba",
    artist: "Aditya Rikhari",
    album: "Sahiba (Single)",
    genre: "Hindi Pop / Indie",
    duration: 180,
    coverUrl: "covers/cover4.jpg",
    audioUrl: "audio/sahiba.m4a",
    plays: "3,102,900",
    liked: false,
    rank: 5,
    lyrics: [
      { time: 0, text: "♪ (Aditya Rikhari - Sahiba Intro) ♪" },
      { time: 10, text: "Kyun hota hai pyaar mein aisa..." },
      { time: 20, text: "Sahiba... Sahiba... o sahiba..." }
    ]
  },
  {
    id: "hukum",
    title: "Hukum",
    artist: "Anirudh Ravichander",
    album: "Jailer OST",
    genre: "Kollywood Rock",
    duration: 208,
    coverUrl: "covers/cover5.jpg",
    audioUrl: "audio/hukum.m4a",
    plays: "5,820,400",
    liked: true,
    rank: 6,
    lyrics: [
      { time: 0, text: "♪ (Hukum Jailer Title Beat Intro) ♪" },
      { time: 12, text: "Hukum... Alappara Kelapparom..." },
      { time: 22, text: "Thalaivar Alappara..." }
    ]
  },
  {
    id: "uppenantha",
    title: "Uppenantha",
    artist: "Devi Sri Prasad (Arya 2)",
    album: "Arya 2 OST",
    genre: "Tollywood Pop",
    duration: 326,
    coverUrl: "covers/cover2.jpg",
    audioUrl: "audio/uppenantha.m4a",
    plays: "19,430,290",
    liked: true,
    rank: 7,
    lyrics: [
      { time: 0, text: "♪ (Uppenantha Ee Premaki Intro) ♪" },
      { time: 15, text: "Uppenantha ee premaki..." },
      { time: 28, text: "Guppedantha gunde chala..." }
    ]
  },
  {
    id: "mein_tera_boyfriend",
    title: "Mein Tera Boyfriend",
    artist: "Arijit Singh & Neha Kakkar",
    album: "Raabta OST",
    genre: "Bollywood Pop",
    duration: 276,
    coverUrl: "covers/cover3.jpg",
    audioUrl: "audio/mein_tera_boyfriend.m4a",
    plays: "354,820,400",
    liked: true,
    rank: 8,
    lyrics: [
      { time: 0, text: "♪ (Mein Tera Boyfriend Dance Beat Intro) ♪" },
      { time: 10, text: "Duniya me kitni hai nafratein..." },
      { time: 20, text: "Na jaane koi..." },
      { time: 30, text: "Mein tera boyfriend... Tu meri girlfriend..." }
    ]
  },
  {
    id: "monica",
    title: "Monica",
    artist: "Anirudh Ravichander & Sublahshini",
    album: "Coolie OST",
    genre: "Kollywood Dance-Pop",
    duration: 172,
    coverUrl: "covers/cover4.jpg",
    audioUrl: "audio/monica.m4a",
    plays: "12,940,300",
    liked: true,
    rank: 9,
    lyrics: [
      { time: 0, text: "♪ (Retro Disco Synth Intro) ♪" },
      { time: 10, text: "Monica Monica... Oh my dear monica..." },
      { time: 20, text: "Disco Raja comes to play..." }
    ]
  },
  {
    id: "majboor",
    title: "Majboor",
    artist: "Sheheryar Rehan",
    album: "Majboor (Single)",
    genre: "Pakistani Indie / Pop",
    duration: 218,
    coverUrl: "covers/cover5.jpg",
    audioUrl: "audio/majboor.m4a",
    plays: "2,390,400",
    liked: false,
    rank: 10,
    lyrics: [
      { time: 0, text: "♪ (Soft acoustic guitar intro) ♪" },
      { time: 12, text: "Dil se jo chaha vo mila nahi..." },
      { time: 25, text: "Majboor hu is qadar..." }
    ]
  },
  {
    id: "dil_ka_jo_haal",
    title: "Dil Ka Jo Haal Hai",
    artist: "Abhijeet Bhattacharya & Shreya Ghoshal",
    album: "Besharam OST",
    genre: "Bollywood Pop / Romance",
    duration: 288,
    coverUrl: "covers/cover1.jpg",
    audioUrl: "audio/dil_ka_jo_haal.m4a",
    plays: "54,203,900",
    liked: true,
    rank: 11,
    lyrics: [
      { time: 0, text: "♪ (Upbeat Bollywood romance intro) ♪" },
      { time: 15, text: "Dil ka jo haal hai, kahoon ya na kahoon..." },
      { time: 30, text: "Hai kaisa ye nasha..." }
    ]
  },
  {
    id: "love_me_again",
    title: "Love Me Again",
    artist: "Nannaku Prematho",
    album: "Nannaku Prematho OST",
    genre: "Tollywood Pop",
    duration: 254,
    coverUrl: "covers/love_me_again.jpg",
    audioUrl: "audio/love_me_again.m4a",
    plays: "18,290,400",
    liked: true,
    rank: 12,
    lyrics: [
      { time: 0, text: "♪ (Upbeat Telugu energy intro) ♪" },
      { time: 10, text: "Love me again... Love me again..." },
      { time: 20, text: "Naa manasupadi nee venake thirigane..." }
    ]
  },
  {
    id: "emitemitemo",
    title: "Emitemitemo",
    artist: "Alphonse",
    album: "Emitemitemo (Single)",
    genre: "Malayalam Independent R&B",
    duration: 212,
    coverUrl: "covers/emitemitemo.jpg",
    audioUrl: "audio/emitemitemo.m4a",
    plays: "3,190,200",
    liked: false,
    rank: 13,
    lyrics: [
      { time: 0, text: "♪ (Smooth acoustic chill guitar) ♪" },
      { time: 12, text: "Emitemitemo kandoo njan..." },
      { time: 24, text: "Melle melle ninte chiri kandu..." }
    ]
  },
  {
    id: "baby_doll",
    title: "Baby Doll",
    artist: "Khushboo",
    album: "Baby Doll (Single)",
    genre: "Bollywood Pop",
    duration: 236,
    coverUrl: "covers/baby_doll.jpg",
    audioUrl: "audio/baby_doll.m4a",
    plays: "4,890,400",
    liked: true,
    rank: 14,
    lyrics: [
      { time: 0, text: "♪ (Fast Punjabi dance synth intro) ♪" },
      { time: 10, text: "Yeh duniya pitta di... baby doll main sone di..." },
      { time: 20, text: "Baby doll main sone di..." }
    ]
  },
  {
    id: "sheila_ki_jawani",
    title: "Sheila Ki Jawani",
    artist: "Vishal-Shekhar",
    album: "Tees Maar Khan OST",
    genre: "Bollywood Pop",
    duration: 283,
    coverUrl: "covers/sheila_ki_jawani.jpg",
    audioUrl: "audio/sheila_ki_jawani.m4a",
    plays: "75,102,900",
    liked: true,
    rank: 15,
    lyrics: [
      { time: 0, text: "♪ (Heavy dholak and brass intro) ♪" },
      { time: 12, text: "I know you want it... but you never gonna get it..." },
      { time: 24, text: "My name is Sheila... Sheila ki jawani..." }
    ]
  },
  {
    id: "udi_udi",
    title: "Udi Udi",
    artist: "Aneesh",
    album: "Udi Udi (Single)",
    genre: "Indie Pop",
    duration: 210,
    coverUrl: "covers/udi_udi.jpg",
    audioUrl: "audio/udi_udi.m4a",
    plays: "1,204,900",
    liked: true,
    rank: 16,
    lyrics: [
      { time: 0, text: "♪ (Smooth acoustic vibes) ♪" },
      { time: 10, text: "Udi udi jaye man ke patang..." },
      { time: 20, text: "Man ki patang jaye udi udi..." }
    ]
  },
  {
    id: "naa_ready",
    title: "Naa Ready",
    artist: "Anirudh Ravichander ft. Thalapathy Vijay",
    album: "Leo OST",
    genre: "Kollywood Rock",
    duration: 247,
    coverUrl: "covers/naa_ready.jpg",
    audioUrl: "audio/naa_ready.m4a",
    plays: "180,490,200",
    liked: true,
    rank: 17,
    lyrics: [
      { time: 0, text: "♪ (Heavy drums and whistle intro) ♪" },
      { time: 12, text: "Ready-ah? Ready ready ready..." },
      { time: 25, text: "Naa Ready dhaan varava? Annan na erangi varava?" }
    ]
  },
  {
    id: "teri_baaton_mein",
    title: "Teri Baaton Mein Aisa Uljha Jiya",
    artist: "Raghav, Tanishk Bagchi, Asees Kaur",
    album: "Teri Baaton Mein Aisa Uljha Jiya (Single)",
    genre: "Bollywood Pop",
    duration: 228,
    coverUrl: "covers/teri_baaton_mein.jpg",
    audioUrl: "audio/teri_baaton_mein.m4a?v=2",
    plays: "65,302,900",
    liked: true,
    rank: 18,
    lyrics: [
      { time: 0, text: "♪ (Upbeat dance pop intro) ♪" },
      { time: 10, text: "Teri baaton mein aisa uljha jiya..." },
      { time: 20, text: "Baithe hi baithe maine dil de diya..." }
    ]
  },
  {
    id: "bad_boy",
    title: "Bad Boy",
    artist: "Badshah & Neeti Mohan",
    album: "Saaho OST",
    genre: "Tollywood Pop",
    duration: 197,
    coverUrl: "covers/bad_boy.jpg",
    audioUrl: "audio/bad_boy.m4a",
    plays: "94,103,400",
    liked: false,
    rank: 19,
    lyrics: [
      { time: 0, text: "♪ (Fast party electronic beat intro) ♪" },
      { time: 12, text: "I'm a bad boy... can you be my bad girl?" },
      { time: 24, text: "Bad boy... bad boy..." }
    ]
  },
  {
    id: "jhoome_jo_pathaan",
    title: "Jhoome Jo Pathaan",
    artist: "Arijit Singh & Sukriti Kakar",
    album: "Pathaan OST",
    genre: "Bollywood Pop",
    duration: 208,
    coverUrl: "covers/jhoome_jo_pathaan.jpg",
    audioUrl: "audio/jhoome_jo_pathaan.m4a",
    plays: "250,409,200",
    liked: true,
    rank: 20,
    lyrics: [
      { time: 0, text: "♪ (Energetic Pathaan arabic-style string intro) ♪" },
      { time: 15, text: "Tumne mohabbat ki hai... humne mohabbat ki hai..." },
      { time: 30, text: "Jhoome jo Pathaan meri jaan... mehfil hi lutt jaye..." }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Tracks", color: "from-blue-600 to-slate-800" },
  { id: "Pop / R&B", name: "🔥 Starboy & Pop Hits", color: "from-red-600 to-navy-900" },
  { id: "Malayalam Independent R&B", name: "🌴 Kerala Vibes (Kalyani)", color: "from-emerald-600 to-slate-900" },
  { id: "Hindi Pop / Indie", name: "🎙️ Hindi Indie (Sahiba)", color: "from-amber-600 to-slate-900" },
  { id: "Tollywood Pop", name: "⚡ South Hits (Mr. Perfect)", color: "from-cyan-600 to-navy-900" },
  { id: "Kollywood Rock", name: "🤘 Tamil Hit (Hukum)", color: "from-purple-600 to-navy-950" }
];

const RAW_FEATURED_PLAYLISTS = [
  {
    id: "pl-ashify-hits",
    title: "ASHIFY Original Hits",
    description: "Starboy, Mr. Perfect, No Lie, Kalyani, Sahiba, and Hukum.",
    coverUrl: "covers/cover5.jpg",
    songIds: ["starboy", "mr_perfect", "no_lie", "kalyani", "sahiba", "hukum", "uppenantha"]
  }
];

const RAW_MADE_FOR_YOU_MIXES = [
  {
    id: "mix-1",
    title: "Your Daily Fusion Mix",
    description: "Kalyani, Sahiba, Hukum, and Mr. Perfect.",
    coverUrl: "covers/cover3.jpg",
    songIds: ["kalyani", "sahiba", "hukum", "mr_perfect"]
  }
];

const RAW_PODCAST_EPISODES = [
  {
    id: "pod-1",
    title: "Ep 104: The Global Beats of ASHIFY",
    show: "ASHIFY Music Deep Dive",
    host: "Marcus Vance",
    duration: 1800,
    coverUrl: "covers/cover6.jpg",
    audioUrl: "audio/starboy.m4a",
    description: "In this episode, we explore how cross-cultural beats like Kalyani and Starboy reshape the playlist charts."
  }
];

export const FRIEND_ACTIVITY = [
  {
    id: "f-1",
    name: "Devon Vance",
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='50' fill='%231e293b'/><text x='50' y='60' font-size='40' font-weight='bold' text-anchor='middle' fill='%2338bdf8'>DV</text></svg>",
    songTitle: "Kalyani",
    artist: "ARJN, KDS, FIFTY4, RONN",
    timeAgo: "1m ago"
  }
];

const BASE = import.meta.env.BASE_URL || '/';

export const INITIAL_SONGS = RAW_INITIAL_SONGS.map(song => ({
  ...song,
  coverUrl: song.coverUrl.startsWith('http') || song.coverUrl.startsWith('data:') ? song.coverUrl : `${BASE}${song.coverUrl}`,
  audioUrl: song.audioUrl.startsWith('http') ? song.audioUrl : `${BASE}${song.audioUrl}`
}));

export const FEATURED_PLAYLISTS = RAW_FEATURED_PLAYLISTS.map(playlist => ({
  ...playlist,
  coverUrl: playlist.coverUrl.startsWith('http') ? playlist.coverUrl : `${BASE}${playlist.coverUrl}`
}));

export const MADE_FOR_YOU_MIXES = RAW_MADE_FOR_YOU_MIXES.map(mix => ({
  ...mix,
  coverUrl: mix.coverUrl.startsWith('http') ? mix.coverUrl : `${BASE}${mix.coverUrl}`
}));

export const PODCAST_EPISODES = RAW_PODCAST_EPISODES.map(episode => ({
  ...episode,
  coverUrl: episode.coverUrl.startsWith('http') ? episode.coverUrl : `${BASE}${episode.coverUrl}`,
  audioUrl: episode.audioUrl.startsWith('http') ? episode.audioUrl : `${BASE}${episode.audioUrl}`
}));
