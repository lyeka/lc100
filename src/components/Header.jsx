/**
 * [INPUT]: react-router (Link, useLocation), @/components/ui/button, @/components/ThemeSelector, @/lib/progress (useProgressStats), @/data/problems, @/data/interviews, @/data/goInterviews, @/components/ui/tooltip
 * [OUTPUT]: Header 顶部导航组件（含墨线进度条）
 * [POS]: 全局布局组件，sticky 定位，包含品牌 logo、主导航（带进度线）、主题选择器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Layers } from 'lucide-react'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useProgressStats } from '@/lib/progress'
import { problems } from '@/data/problems'
import { interviews } from '@/data/interviews'
import { goInterviews } from '@/data/goInterviews'

const TOTALS = {
  leetcode: problems.length,
  agent: interviews.length,
  go: goInterviews.length,
}

const navLinks = [
  { to: '/',         label: '首页',  section: null },
  { to: '/leetcode', label: '题库',  section: 'leetcode' },
  { to: '/agent',    label: 'Agent', section: 'agent' },
  { to: '/go',       label: 'Go',    section: 'go' },
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">

        {/* logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-base">LC100</span>
        </Link>

        {/* 主导航 + 主题选择器 */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {navLinks.map(({ to, label, section }) => {
              const s = section ? stats[section] : null
              const linkEl = (
                <Link
                  to={to}
                  className={`flex flex-col items-center rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span>{label}</span>
                  {/* 墨线进度条 */}
                  {s && (
                    <span className="mt-0.5 h-[2px] w-full rounded-full bg-border/20 overflow-hidden">
                      <span
                        className={`block h-full rounded-full transition-all duration-500 ${
                          s.percent >= 100 ? 'bg-primary/70' : 'bg-primary/40'
                        }`}
                        style={{ width: `${s.percent}%` }}
                      />
                    </span>
                  )}
                </Link>
              )

              if (!s) return <span key={to}>{linkEl}</span>
              return (
                <Tooltip key={to}>
                  <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {s.count} / {s.total}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </nav>
          <ThemeSelector />
        </div>

      </div>
    </header>
  )
}
