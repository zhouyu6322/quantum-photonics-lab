/**
 * 期刊优先级排名（数字越小越优先）
 * 新增期刊：在对应位置加一行即可
 */
const JOURNAL_RANK: Record<string, number> = {
  // Nature 系
  'Nature':                    1,
  'Nature Physics':            2,
  'Nature Photonics':          3,
  'Nature Communications':     4,
  // Science 系
  'Science':                   5,
  'Science Advances':          6,
  // PRL / PRX
  'Physical Review Letters':   7,
  'PRX Quantum':               8,
  // 光子学旗舰
  'Laser & Photonics Reviews': 9,
  'Optica':                   10,
  'Light: Science & Applications': 11,
  // 应用物理
  'Applied Physics Reviews':  12,
  'Photonics Research':       13,
  // 光学
  'Optics Letters':           14,
  'Optics Express':           15,
};

/** 返回期刊优先级，未知期刊返回 99 */
export function journalRank(journal: string): number {
  // 精确匹配
  if (JOURNAL_RANK[journal] !== undefined) return JOURNAL_RANK[journal];
  // 模糊匹配（包含关键词）
  for (const [key, rank] of Object.entries(JOURNAL_RANK)) {
    if (journal.toLowerCase().includes(key.toLowerCase())) return rank;
  }
  return 99;
}

/** 对论文数组排序：年份降序，同年按期刊排名升序 */
export function sortPublications<T extends { year: number; journal: string }>(pubs: T[]): T[] {
  return [...pubs].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return journalRank(a.journal) - journalRank(b.journal);
  });
}
