/**
 * [INPUT]: react-router (useSearchParams, Link), @/data/problems, @/components/ui/badge
 * [OUTPUT]: Home 首页 — 古典书籍目录页
 * [POS]: 路由 /，全站入口，按分类分组的 Table of Contents
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useSearchParams, Link } from 'react-router'
import { problems, categories } from '@/data/problems'
import { Badge } from '@/components/ui/badge'

/* ── 罗马数字转换 ── */
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV']

/* ── 难度颜色 — 皮革书脊调性 ── */
const DIFF_COLOR = {
  Easy:   'text-chart-3',
  Medium: 'text-chart-4',
  Hard:   'text-destructive',
}

/* ── 筛选栏难度样式 ── */
const DIFF_STYLE = {
  Easy:   'bg-chart-3/15 text-chart-3 border border-chart-3/30',
  Medium: 'bg-chart-4/15 text-chart-4 border border-chart-4/30',
  Hard:   'bg-destructive/15 text-destructive border border-destructive/30',
}

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export function Home() {
  const [params, setParams] = useSearchParams()
  const activeCategory   = params.get('category') || ''
  const activeDifficulty = params.get('difficulty') || ''

  /* ── 筛选 ── */
  const filtered = problems.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false
    if (activeDifficulty && p.difficulty !== activeDifficulty) return false
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
        {/* <p className="text-sm text-muted-foreground">
          Go 语言题解 · {problems.length} 道题 · {categories.length} 个算法分类
        </p> */}
      </div>

      {/* ════════════════════════════════════════
         筛选栏
         ════════════════════════════════════════ */}
      <div className="mb-12 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge
            variant={activeCategory === '' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggle('category', activeCategory)}
          >
            全部
          </Badge>
          {categories.map(cat => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggle('category', cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          {DIFFICULTIES.map(diff => (
            <Badge
              key={diff}
              className={`cursor-pointer ${
                activeDifficulty === diff ? DIFF_STYLE[diff] : ''
              }`}
              variant={activeDifficulty === diff ? 'secondary' : 'outline'}
              onClick={() => toggle('difficulty', diff)}
            >
              {diff}
            </Badge>
          ))}
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
