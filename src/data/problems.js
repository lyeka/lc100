/**
 * [INPUT]: /leetcode-hot100-json/*.json（100 个题解文件，Vite import.meta.glob 静态加载）
 * [OUTPUT]: problems（排序数组）、problemMap（id → 题目 Map）、categories（去重分类列表）
 * [POS]: 全站唯一数据源，构建时内联，零运行时请求
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── 构建时静态加载全部 JSON ── */
const modules = import.meta.glob('/leetcode-hot100-json/*.json', { eager: true })

export const problems = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => a.id - b.id)

export const problemMap = new Map(problems.map(p => [p.id, p]))

export const categories = [...new Set(problems.map(p => p.category))].sort()
