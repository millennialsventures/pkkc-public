export type CommitteeMember = {
  id: number;
  name: string;
  position: string;
  level: 1 | 2 | 3 | 4;
};

export const committee: CommitteeMember[] = [
  { id: 1, name: "ASMEL SUFIAN BIN HASSAN", position: "Pengerusi PKKC", level: 1 },
  { id: 2, name: "ABDUL HADI BIN OSMAN", position: "Timbalan Pengerusi PKKC", level: 2 },
  { id: 3, name: "Puan Syuhaidah", position: "Setiausaha PKKC", level: 3 },
  { id: 4, name: "NORMALA BINTI CHE EEMBI @ JAMIL", position: "Penolong Setiausaha PKKC", level: 3 },
  { id: 5, name: "MOHD HAFIZZUDDIN BIN KAMARUZAINI", position: "Bendahari PKKC", level: 3 },
  { id: 6, name: "ABDUL KARIM BIN ABDUL RAHIM", position: "AJK PKKC", level: 4 },
  { id: 7, name: "MUHAMMAD HARITH BIN ZAMSAIMI", position: "AJK PKKC", level: 4 },
  { id: 8, name: "MUHAMMAD AZHARUDDIN BIN KASWANDI", position: "AJK PKKC", level: 4 },
  { id: 9, name: "NIK KHAIRUL HAKIM BIN AB RAZAK", position: "AJK PKKC", level: 4 },
  { id: 10, name: "KHAIRUN NIZAM BIN ABD SAMAD", position: "AJK PKKC", level: 4 },
  { id: 11, name: "ZAKIR BIN HJ MOKRI", position: "AJK PKKC", level: 4 },
  { id: 12, name: "MOHD YUNUS BIN MAT NAWAWI", position: "AJK PKKC", level: 4 },
  { id: 13, name: "ABU HANIFAH BIN YAHAYA", position: "AJK PKKC", level: 4 },
  { id: 14, name: "ABDUL RAHMAN BIN MUSTAPHA", position: "AJK PKKC", level: 4 },
];
