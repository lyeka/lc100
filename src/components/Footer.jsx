/**
 * [INPUT]: react-router (Link), @/data/problems, @/data/interviews, @/data/goInterviews
 * [OUTPUT]: Footer 版记组件（居中装饰线 + 导航 + 统计）
 * [POS]: 全局布局组件，古典版记风格，所有页面底部
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router'
import { problems } from '@/data/problems'
import { interviews } from '@/data/interviews'
import { goInterviews } from '@/data/goInterviews'

const links = [
  { to: '/',             label: '首页' },
  { to: '/leetcode',     label: '题库' },
  { to: '/agent',        label: 'Agent' },
  { to: '/go',           label: 'Go' },
  { to: '/design-system', label: '设计系统' },
]

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10">

        {/* ── 装饰线 ── */}
        <div className="flex items-center justify-center gap-3 text-primary/40 text-sm mb-6 select-none">
          <span>─────────</span>
          <span className="text-primary">✦</span>
          <span>─────────</span>
        </div>

        {/* ── 导航链接 — 居中 · 分隔 ── */}
        <nav className="flex items-center justify-center text-sm text-muted-foreground mb-4">
          {links.map(({ to, label }, i) => (
            <span key={to} className="flex items-center">
              {i > 0 && <span className="mx-2 text-border select-none">·</span>}
              <Link to={to} className="transition-colors hover:text-foreground">
                {label}
              </Link>
            </span>
          ))}
        </nav>

        {/* ── 统计 ── */}
        <p className="text-center text-xs text-muted-foreground">
          题库 {problems.length} · Agent {interviews.length} · Go {goInterviews.length}
        </p>

      </div>
    </footer>
  )
}
