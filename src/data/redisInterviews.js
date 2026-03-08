/**
 * [INPUT]: /redis-interview-json/*.json（8 个分类文件，每个为题目数组）
 * [OUTPUT]: redisInterviews（排序数组）、redisInterviewMap（id → 题目 Map）、redisInterviewCategories（按教学顺序的分类列表）
 * [POS]: Redis 面试题数据源，构建时内联，零运行时请求
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── 构建时静态加载全部 JSON（每个文件是数组，需 flatMap）── */
const modules = import.meta.glob('/redis-interview-json/*.json', { eager: true })

export const redisInterviews = Object.values(modules)
  .flatMap(m => m.default)
  .sort((a, b) => a.categoryId - b.categoryId)

export const redisInterviewMap = new Map(redisInterviews.map(q => [q.id, q]))

/* ── 按 categoryId 排序，保留教学顺序（非字母序）── */
export const redisInterviewCategories = [...new Map(
  redisInterviews.map(q => [q.categoryId, q.category])
).values()]
