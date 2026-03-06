/**
 * [INPUT]: react-router (Link), @/components/ui/badge
 * [OUTPUT]: ProblemCard 书籍封面风格题目卡片
 * [POS]: 首页网格核心单元，1:1.45 书籍比例，三段式居中排版，3D 透视 + hover 展平
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router'

/* ── 难度颜色映射 — 皮革书脊调性 ── */
const DIFF_COLOR = {
  Easy:   'text-chart-3',
  Medium: 'text-chart-4',
  Hard:   'text-destructive',
}

export function ProblemCard({ problem }) {
  const { id, title, difficulty, category, leetcodeId } = problem

  return (
    <Link to={`/problem/${id}`} className="block group" style={{ perspective: '1500px' }}>
      <div
        className="relative cursor-pointer transition-all duration-500 ease-out"
        style={{
          aspectRatio: '1 / 1.45',
          transform: 'rotateY(-2deg) rotateX(1deg)',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.02)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'rotateY(-2deg) rotateX(1deg)' }}
      >
        {/* ── 卡片主体 ── */}
        <div className="
          absolute inset-0 overflow-hidden
          bg-card border border-border
          shadow-lg group-hover:shadow-2xl
          transition-shadow duration-300
        ">
          {/* ── 书脊折痕 ── */}
          <div
            className="absolute left-0 top-0 bottom-0 w-3 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
            }}
          />

          {/* ── 内框装饰线 ── */}
          <div
            className="absolute pointer-events-none z-[1]"
            style={{ top: 12, left: 12, right: 12, bottom: 12, border: '1px solid rgba(141, 162, 181, 0.2)' }}
          />

          {/* ── 三段式布局 ── */}
          <div
            className="relative z-[2] h-full w-full px-[12%] py-[10%]"
            style={{ display: 'grid', gridTemplateRows: '1fr auto 1fr' }}
          >
            {/* ── 顶部：分类标签 ── */}
            <div className="flex flex-col items-center justify-start pt-2 text-center">
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary/80 leading-none">
                {category}
              </span>
            </div>

            {/* ── 中间：题目标题（书名位置） ── */}
            <div className="flex items-center justify-center text-center px-1">
              <h3 className="text-[13px] font-semibold text-foreground leading-tight line-clamp-3 uppercase tracking-wide">
                {title}
              </h3>
            </div>

            {/* ── 底部：难度 + 编号（作者位置） ── */}
            <div className="flex flex-col items-center justify-end pb-2 text-center gap-2">
              {/* 装饰短线 */}
              <div className="w-4 h-px bg-primary/40" />

              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${DIFF_COLOR[difficulty]}`}>
                {difficulty}
              </span>

              <span className="text-[9px] text-muted-foreground tracking-wider">
                #{String(id).padStart(3, '0')} · LC {leetcodeId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
