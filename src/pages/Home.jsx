/**
 * [INPUT]: react-router (useSearchParams, Link), react (useState), @/data/problems, @/lib/progress (useProgress)
 * [OUTPUT]: Home 首页 — 古典书籍目录页
 * [POS]: 路由 /leetcode，LeetCode 目录页，按分类分组的 Table of Contents，纯文字筛选
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { useSearchParams, Link } from 'react-router'
import { problems, categories } from '@/data/problems'
import { useProgress } from '@/lib/progress'

/* ── 罗马数字 ── */
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV']

/* ── 难度颜色 — 皮革书脊调性 ── */
const DIFF_COLOR = {
  Easy:   'text-chart-3',
  Medium: 'text-chart-4',
  Hard:   'text-destructive',
}

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export function Home() {
  const [params, setParams] = useSearchParams()
  const activeCategory   = params.get('category') || ''
  const activeDifficulty = params.get('difficulty') || ''
  const showUnlearned    = params.get('unlearned') === '1'
  const [catOpen, setCatOpen] = useState(false)
  const { isLearned } = useProgress('leetcode', problems.length)

  /* ── 筛选 ── */
  const filtered = problems.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false
    if (activeDifficulty && p.difficulty !== activeDifficulty) return false
    if (showUnlearned && isLearned(p.id)) return false
    return true
  })

  /* ── 按分类分组 ── */
  const grouped = categories.reduce((acc, cat) => {
    const items = filtered.filter(p => p.category === cat)
    if (items.length > 0) acc.push({ category: cat, items })
    return acc
  }, [])

  /* ── 切换筛选参数 ── */
  function toggle(key, value) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      if (next.get(key) === value) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      return next
    })
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      {/* ════════════════════════════════════════
         装饰标题区 — 目录
         ════════════════════════════════════════ */}
      <div className="text-center mb-12">
        <h1 className="text-2xl tracking-[0.3em] text-foreground mb-4">
          ·　目　录　·
        </h1>
        <div className="flex items-center justify-center gap-3 text-primary/40 text-sm mb-6">
          <span>─────────</span>
          <span className="text-primary">✦</span>
          <span>─────────</span>
        </div>
      </div>

      {/* ════════════════════════════════════════
         筛选栏 — 纯文字，古典索引风格
         ════════════════════════════════════════ */}
      <div className="mb-12 text-center space-y-4">

        {/* 难度筛选：3 个文字链 */}
        <div className="flex items-center justify-center gap-1 text-sm">
          {DIFFICULTIES.map((diff, i) => (
            <span key={diff} className="flex items-center gap-1">
              {i > 0 && <span className="text-border mx-1">·</span>}
              <span
                className={`cursor-pointer transition-colors ${
                  activeDifficulty === diff
                    ? DIFF_COLOR[diff]
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => toggle('difficulty', diff)}
              >
                {diff}
              </span>
            </span>
          ))}
          <span className="text-border mx-1">·</span>
          <span
            className={`cursor-pointer transition-colors ${
              showUnlearned ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => toggle('unlearned', '1')}
          >
            未学
          </span>
        </div>

        {/* 分类筛选：折叠触发器 */}
        <div>
          <span
            className={`cursor-pointer text-xs tracking-wider transition-colors ${
              activeCategory ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setCatOpen(o => !o)}
          >
            {catOpen ? '▾' : '▸'}
            {' '}
            {activeCategory ? `筛选分类：${activeCategory}` : '筛选分类'}
          </span>

          {/* 展开的分类列表 */}
          {catOpen && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 text-xs leading-relaxed">
              {/* 全部（重置） */}
              <span
                className={`cursor-pointer transition-colors ${
                  activeCategory === '' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => { toggle('category', activeCategory); setCatOpen(false) }}
              >
                全部
              </span>

              {categories.map(cat => (
                <span key={cat} className="flex items-center gap-1">
                  <span className="text-border">·</span>
                  <span
                    className={`cursor-pointer transition-colors ${
                      activeCategory === cat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => { toggle('category', cat); setCatOpen(false) }}
                  >
                    {cat}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
         结果计数
         ════════════════════════════════════════ */}
      {filtered.length !== problems.length && (
        <p className="mb-8 text-center text-sm text-muted-foreground">
          筛选结果：{filtered.length} 道题
        </p>
      )}

      {/* ════════════════════════════════════════
         分类分组目录
         ════════════════════════════════════════ */}
      <div className="space-y-12">
        {grouped.map(({ category, items }, gi) => (
          <section key={category}>
            {/* ── PART 标题 ── */}
            <div className="text-center mb-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-1">
                Part {ROMAN[gi] || gi + 1}
              </div>
              <div className="text-lg tracking-[0.15em] text-foreground">
                {category}
              </div>
              <div className="mt-3 mx-auto w-full max-w-xs border-t border-border" />
            </div>

            {/* ── 目录条目 ── */}
            <div className="space-y-0">
              {items.map(p => (
                <Link
                  key={p.id}
                  to={`/problem/${p.id}`}
                  className="group flex items-baseline gap-3 py-2 px-2 -mx-2 transition-colors hover:bg-card/50"
                >
                  {/* 已学标记 */}
                  <span className="flex-none w-3 text-center text-[8px] leading-none">
                    {isLearned(p.id) && <span className="text-primary/50">●</span>}
                  </span>

                  {/* 序号 */}
                  <span className="flex-none w-8 text-right text-xs font-mono text-primary/70">
                    {String(p.id).padStart(3, '0')}
                  </span>

                  {/* 标题 */}
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </span>

                  {/* 点引线 */}
                  <span className="flex-1 border-b border-dotted border-border/50 translate-y-[-4px] min-w-[20px]" />

                  {/* 难度 */}
                  <span className={`flex-none text-xs tracking-wider ${DIFF_COLOR[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ── 空状态 ── */}
      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          没有匹配的题目，试试调整筛选条件
        </div>
      )}
    </main>
  )
}
