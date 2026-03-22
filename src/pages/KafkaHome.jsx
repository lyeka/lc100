/**
 * [INPUT]: react-router (useSearchParams, Link), react (useState), @/data/kafkaInterviews, @/lib/progress (useProgress)
 * [OUTPUT]: KafkaHome — Kafka 面试题古典目录页
 * [POS]: 路由 /kafka，按 8 大分类分组的 Table of Contents，纯文字筛选
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { useSearchParams, Link } from 'react-router'
import { kafkaInterviews, kafkaInterviewCategories } from '@/data/kafkaInterviews'
import { useProgress } from '@/lib/progress'

/* ── 罗马数字 ── */
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X']

/* ── 等级颜色 — 与难度色系对齐 ── */
const LEVEL_COLOR = {
  'L2':    'text-chart-3',
  'L2/L3': 'text-chart-4',
  'L3':    'text-destructive',
}

const LEVELS = ['L2', 'L2/L3', 'L3']

export function KafkaHome() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || ''
  const activeLevel    = params.get('level') || ''
  const showUnlearned  = params.get('unlearned') === '1'
  const [catOpen, setCatOpen] = useState(false)
  const { isLearned } = useProgress('kafka', kafkaInterviews.length)

  /* ── 筛选 ── */
  const filtered = kafkaInterviews.filter(q => {
    if (activeCategory && q.category !== activeCategory) return false
    if (activeLevel && q.level !== activeLevel) return false
    if (showUnlearned && isLearned(q.id)) return false
    return true
  })

  /* ── 按分类分组（保持 categoryId 教学顺序）── */
  const grouped = kafkaInterviewCategories.reduce((acc, cat) => {
    const items = filtered.filter(q => q.category === cat)
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
         装饰标题区
         ════════════════════════════════════════ */}
      <div className="text-center mb-12">
        <h1 className="text-2xl tracking-[0.3em] text-foreground mb-4">
          ·　Kafka 面 试　·
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

        {/* 等级筛选 */}
        <div className="flex items-center justify-center gap-1 text-sm">
          {LEVELS.map((lvl, i) => (
            <span key={lvl} className="flex items-center gap-1">
              {i > 0 && <span className="text-border mx-1">·</span>}
              <span
                className={`cursor-pointer transition-colors ${
                  activeLevel === lvl
                    ? LEVEL_COLOR[lvl]
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => toggle('level', lvl)}
              >
                {lvl}
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

        {/* 分类筛选 */}
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

          {catOpen && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 text-xs leading-relaxed">
              <span
                className={`cursor-pointer transition-colors ${
                  activeCategory === '' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => { toggle('category', activeCategory); setCatOpen(false) }}
              >
                全部
              </span>

              {kafkaInterviewCategories.map(cat => (
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
      {filtered.length !== kafkaInterviews.length && (
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
              {items.map(q => (
                <Link
                  key={q.id}
                  to={`/kafka/${q.id}`}
                  className="group flex items-baseline gap-3 py-2 px-2 -mx-2 transition-colors hover:bg-card/50"
                >
                  {/* 已学标记 */}
                  <span className="flex-none w-3 text-center text-[8px] leading-none">
                    {isLearned(q.id) && <span className="text-primary/50">●</span>}
                  </span>

                  {/* ID */}
                  <span className="flex-none w-14 text-right text-xs font-mono text-primary/70">
                    {q.id}
                  </span>

                  {/* 标题 */}
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {q.title}
                  </span>

                  {/* 点引线 */}
                  <span className="flex-1 border-b border-dotted border-border/50 translate-y-[-4px] min-w-[20px]" />

                  {/* 等级 */}
                  <span className={`flex-none text-xs tracking-wider ${LEVEL_COLOR[q.level] || 'text-muted-foreground'}`}>
                    {q.level}
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
          没有匹配的面试题，试试调整筛选条件
        </div>
      )}
    </main>
  )
}
