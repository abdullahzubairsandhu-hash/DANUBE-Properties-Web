// src/dta/videos.ts

export interface VideoItem {
    id: string;
    title: string;
    youtubeUrl: string;
    embedUrl: string; // Added this for the iframe
    thumbnail: string; // Cloudinary Public ID
  }
  
  export const videoData: VideoItem[] = [
    { id: "1", title: "BREEZ - 2025", youtubeUrl: "https://www.youtube.com/watch?v=dLgdRfjEGAo", embedUrl: "https://www.youtube.com/embed/dLgdRfjEGAo", thumbnail: "breez-25_dzvqla" },
    { id: "2", title: "BAYZ 102 - 2024", youtubeUrl: "https://www.youtube.com/watch?v=FVCuU-gTIVw", embedUrl: "https://www.youtube.com/embed/FVCuU-gTIVw", thumbnail: "bayz102-24_zf3yy7" },
    { id: "3", title: "ASPIRZ - 2025", youtubeUrl: "https://www.youtube.com/watch?v=NBffziF05Ig", embedUrl: "https://www.youtube.com/embed/NBffziF05Ig", thumbnail: "aspirz-25_uzsyge" },
    { id: "4", title: "BAYZ 101- 2021", youtubeUrl: "https://www.youtube.com/watch?v=_LSbAwRULfg", embedUrl: "https://www.youtube.com/embed/_LSbAwRULfg", thumbnail: "bayz-video_tz37uo" },
    { id: "5", title: "TIMEZ - 2025", youtubeUrl: "https://www.youtube.com/watch?v=7NEhdbjMLuk", embedUrl: "https://www.youtube.com/embed/7NEhdbjMLuk", thumbnail: "timez-25_naaviq" },
    { id: "6", title: "ELEGANZ - 2023", youtubeUrl: "https://www.youtube.com/watch?v=55cNl46aK30", embedUrl: "https://www.youtube.com/embed/55cNl46aK30", thumbnail: "eleganz-23_exvynx" },
    { id: "7", title: "OASIZ - 2024", youtubeUrl: "https://www.youtube.com/watch?v=oAheCL5jlVc", embedUrl: "https://www.youtube.com/embed/oAheCL5jlVc", thumbnail: "oasiz-24_vbuos6" },
    { id: "8", title: "ELITZ 3 - 2023", youtubeUrl: "https://www.youtube.com/watch?v=PJdY9zsm9Mk", embedUrl: "https://www.youtube.com/embed/PJdY9zsm9Mk", thumbnail: "elitz3-23_csc1sx" },
    { id: "9", title: "DIAMONDZ - 2024", youtubeUrl: "https://www.youtube.com/watch?v=j9D0RBek2wc", embedUrl: "https://www.youtube.com/embed/j9D0RBek2wc", thumbnail: "diamondz-24_smlsew" },
    { id: "10", title: "FASHIONZ - 2023", youtubeUrl: "https://www.youtube.com/watch?v=2k7358XqZHk", embedUrl: "https://www.youtube.com/embed/2k7358XqZHk", thumbnail: "fashionz-23_a0opa5" },
    { id: "11", title: "SPORTZ - 2023", youtubeUrl: "https://www.youtube.com/watch?v=NzQ0rsSvtXk", embedUrl: "https://www.youtube.com/embed/NzQ0rsSvtXk", thumbnail: "sportz-23_mf3d56" },
    { id: "12", title: "PETALZ - 2022", youtubeUrl: "https://www.youtube.com/watch?v=dPGusYdvEUo", embedUrl: "https://www.youtube.com/embed/dPGusYdvEUo", thumbnail: "petalz-22_rlpxzc" },
    { id: "13", title: "OCEANZ - 2023", youtubeUrl: "https://www.youtube.com/watch?v=YtFPdCZSUuw", embedUrl: "https://www.youtube.com/embed/YtFPdCZSUuw", thumbnail: "oceanz-23_xcfynk" },
    { id: "14", title: "PEARLZ - 2022", youtubeUrl: "https://www.youtube.com/watch?v=OXo3s8q8R9E", embedUrl: "https://www.youtube.com/embed/OXo3s8q8R9E", thumbnail: "pearlz-22_jldcsl" },
    { id: "15", title: "ELITZ 2 - 2023", youtubeUrl: "https://www.youtube.com/watch?v=ebXMmnBW7jE", embedUrl: "https://www.youtube.com/embed/ebXMmnBW7jE", thumbnail: "elitz2-23_qeikuo" },
    { id: "16", title: "GEMZ - 2022", youtubeUrl: "https://www.youtube.com/watch?v=hdslCgPUjoQ", embedUrl: "https://www.youtube.com/embed/hdslCgPUjoQ", thumbnail: "gemz-22_m1toef" },
    { id: "17", title: "ELITZ - 2022", youtubeUrl: "https://www.youtube.com/watch?v=0ALt5GuMcI4", embedUrl: "https://www.youtube.com/embed/0ALt5GuMcI4", thumbnail: "elitz-22_uihlej" },
  ];