/**
 * [INPUT]: react-router (useSearchParams), @/data/problems, @/components/ProblemCard, @/components/ui/badge
 * [OUTPUT]: Home 首页（迷你 Hero + 筛选栏 + 100 题网格）
 * [POS]: 路由 /，全站入口，内容即首页——零点击到达题库
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useSearchParams } from 'react-router'
import { problems, categories } from '@/data/problems'
import { ProblemCard } from '@/components/ProblemCard'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

/* ── 难度颜色映射 ── */
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

  /* ── 筛选逻辑 ── */
  const filtered = problems.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false
    if (activeDifficulty && p.difficulty !== activeDifficulty) return false
    return true
  })

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
    <main className="mx-auto max-w-6xl px-6 py-10">

      {/* ── 迷你 Hero ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          LeetCode Hot 100
        </h1>
        <p className="mt-2 text-muted-foreground">
          Go 语言题解 · {problems.length} 道题 · {categories.length} 个算法分类
        </p>
      </div>

      <Separator className="mb-8" />

      {/* ── 筛选栏 ── */}
      <div className="mb-8 space-y-4">

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2">
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

        {/* 难度筛选 */}
        <div className="flex gap-2">
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

      {/* ── 结果计数 ── */}
      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length === problems.length
          ? `共 ${problems.length} 道题`
          : `筛选结果：${filtered.length} 道题`}
      </p>

      {/* ── 题目网格 ── */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <ProblemCard key={p.id} problem={p} />
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
