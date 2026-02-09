// src/data/tours.ts

export interface TourItem {
    id: string;
    name: string;
    thumbnail: string;
    tourUrl: string;
  }
  
  // Our 4 available testing folders
  const paths = [
    "/3d/studio/index.htm",
    "/3d/1bhk/index.htm",
    "/3d/2bhk/index.htm",
    "/3d/3bhk/index.htm"
  ];
  
  export const tourData: TourItem[] = [
    { id: "1", name: "Shahrukhz", thumbnail: "shahrukhz-25_og28wl", tourUrl: paths[0] }, // Studio
    { id: "2", name: "Breez", thumbnail: "breez-25_dzvqla", tourUrl: paths[1] },      // 1BHK
    { id: "3", name: "Aspirz", thumbnail: "aspirz-25_uzsyge", tourUrl: paths[2] },     // 2BHK
    { id: "4", name: "Sparklz", thumbnail: "sparklz-2025_qmyd01", tourUrl: paths[3] },  // 3BHK
    { id: "5", name: "Timez", thumbnail: "timez-25_naaviq", tourUrl: paths[0] },       // Starts over
    { id: "6", name: "Bayz 102", thumbnail: "bayz102-24_zf3yy7", tourUrl: paths[1] },
    { id: "7", name: "Oasiz", thumbnail: "oasiz-24_vbuos6", tourUrl: paths[2] },
    { id: "8", name: "Oceanz", thumbnail: "oceanz-23_xcfynk", tourUrl: paths[3] },
    { id: "9", name: "Fashionz", thumbnail: "fashionz-23_a0opa5", tourUrl: paths[0] },
    { id: "10", name: "Bayz 101", thumbnail: "bayz101-24_e7mm2p", tourUrl: paths[1] },
    { id: "11", name: "Diamondz", thumbnail: "diamondz-24_smlsew", tourUrl: paths[2] },
  ];