/**
 * [INPUT]: react-router (Link, useLocation), @/components/ThemeSelector, @/lib/progress (useProgressStats),
 *          @/data/problems, @/data/interviews, @/data/goInterviews, @/data/mysqlInterviews, @/data/redisInterviews, @/components/ui/tooltip
 * [OUTPUT]: Header 页眉组件（纯文字导航 + · 分隔 + 主题色点）
 * [POS]: 全局布局组件，sticky 定位，古典页眉风格，进度信息藏于 Tooltip
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link, useLocation } from 'react-router'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useProgressStats } from '@/lib/progress'
import { problems } from '@/data/problems'
import { interviews } from '@/data/interviews'
import { goInterviews } from '@/data/goInterviews'
import { mysqlInterviews } from '@/data/mysqlInterviews'
import { redisInterviews } from '@/data/redisInterviews'

const TOTALS = {
  leetcode: problems.length,
  agent: interviews.length,
  go: goInterviews.length,
  mysql: mysqlInterviews.length,
  redis: redisInterviews.length,
}

const navLinks = [
  { to: '/',         label: '首页',  section: null },
  { to: '/leetcode', label: '题库',  section: 'leetcode' },
  { to: '/agent',    label: 'Agent', section: 'agent' },
  { to: '/go',       label: 'Go',    section: 'go' },
  { to: '/mysql',    label: 'MySQL', section: 'mysql' },
  { to: '/redis',    label: 'Redis', section: 'redis' },
]

export function Header() {
  const location = useLocation()
  const stats = useProgressStats(TOTALS)

  /* ── 导航激活判断：/ 精确匹配，其他 startsWith ── */
  function isActive(to) {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-6">

        {/* ── 导航链接 — · 分隔 ── */}
        <nav className="flex items-center text-sm">
          {navLinks.map(({ to, label, section }, i) => {
            const s = section ? stats[section] : null
            const linkEl = (
              <Link
                key={to}
                to={to}
                className={`transition-colors ${
                  isActive(to)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            )

            return (
              <span key={to} className="flex items-center">
                {i > 0 && <span className="mx-3 text-border select-none">·</span>}
                {s ? (
                  <Tooltip>
                    <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      {s.count} / {s.total}
                    </TooltipContent>
                  </Tooltip>
                ) : linkEl}
              </span>
            )
          })}
        </nav>

        {/* ── 主题选择器 ── */}
        <ThemeSelector />

      </div>
    </header>
  )
}
