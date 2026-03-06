/**
 * [INPUT]: react-router (Link), @/components/ui/card, @/components/ui/badge
 * [OUTPUT]: ProblemCard 题目卡片组件
 * [POS]: 首页网格的核心单元，展示题号、标题、难度、分类，点击进入详情
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ── 难度颜色映射 — 全部来自设计系统 Token ── */
const DIFF = {
  Easy:   'bg-chart-3/15 text-chart-3 border border-chart-3/30',
  Medium: 'bg-chart-4/15 text-chart-4 border border-chart-4/30',
  Hard:   'bg-destructive/15 text-destructive border border-destructive/30',
}

export function ProblemCard({ problem }) {
  const { id, title, difficulty, category, leetcodeId } = problem

  return (
    <Link to={`/problem/${id}`} className="block">
      <Card
        variant="elevated"
        className="h-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
      >
        <CardContent className="flex flex-col gap-3 pt-5">

          {/* 题号 + LeetCode ID */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">
              #{String(id).padStart(3, '0')}
            </span>
            <span className="text-xs text-muted-foreground">
              LC {leetcodeId}
            </span>
          </div>

          {/* 标题 */}
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {title}
          </h3>

          {/* 难度 + 分类 */}
          <div className="flex items-center gap-2 mt-auto">
            <Badge className={DIFF[difficulty]}>{difficulty}</Badge>
            <Badge variant="outline" className="text-xs">{category}</Badge>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
