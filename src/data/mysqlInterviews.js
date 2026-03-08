/**
 * [INPUT]: /mysql-interview-json/*.json（6 个分类文件，每个为题目数组）
 * [OUTPUT]: mysqlInterviews（排序数组）、mysqlInterviewMap（id → 题目 Map）、mysqlInterviewCategories（按教学顺序的分类列表）
 * [POS]: MySQL 面试题数据源，构建时内联，零运行时请求
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── 构建时静态加载全部 JSON（每个文件是数组，需 flatMap）── */
const modules = import.meta.glob('/mysql-interview-json/*.json', { eager: true })

export const mysqlInterviews = Object.values(modules)
  .flatMap(m => m.default)
  .sort((a, b) => a.categoryId - b.categoryId)

export const mysqlInterviewMap = new Map(mysqlInterviews.map(q => [q.id, q]))

/* ── 按 categoryId 排序，保留教学顺序（非字母序）── */
export const mysqlInterviewCategories = [...new Map(
  mysqlInterviews.map(q => [q.categoryId, q.category])
).values()]
