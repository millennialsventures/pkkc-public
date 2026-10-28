export type Activity = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export const activities: Activity[] = [
  {
    id: 1,
    title: "Gotong-Royong Perdana",
    description:
      "Aktiviti bergotong-royong membersihkan kawasan taman dan ruang komuniti bersama penduduk.",
    icon: "broom",
  },
  {
    id: 2,
    title: "Majlis Rumah Terbuka Aidilfitri",
    description:
      "Sambutan perayaan bersama yang mengeratkan hubungan silaturahim antara penduduk pelbagai taman.",
    icon: "home",
  },
  {
    id: 3,
    title: "Malam Futsal Komuniti",
    description:
      "Pertandingan futsal rakan serumah sebagai medan sukan dan riadah komuniti.",
    icon: "ball",
  },
  {
    id: 4,
    title: "Mesyuarat Agung Tahunan",
    description:
      "Perhimpunan rasmi tahunan untuk melaporkan aktiviti, kewangan, dan hala tuju persatuan.",
    icon: "document",
  },
  {
    id: 5,
    title: "Kelas Tuisyen Percuma",
    description:
      "Kelas bimbingan akademik percuma untuk anak-anak penduduk di kawasan liputan PKKC.",
    icon: "book",
  },
];
