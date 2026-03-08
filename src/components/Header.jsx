/**
 * [INPUT]: react-router (Link, useLocation), @/components/ui/button, @/components/ThemeSelector
 * [OUTPUT]: Header 顶部导航组件
 * [POS]: 全局布局组件，sticky 定位，包含品牌 logo、主导航、主题选择器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Layers } from 'lucide-react'
import { ThemeSelector } from '@/components/ThemeSelector'

const navLinks = [
  { to: '/', label: '题库' },
  { to: '/agent', label: 'Agent' },
  { to: '/go', label: 'Go' },
  { to: '/design-system', label: '设计系统' },
]

export function Header() {
  const location = useLocation()

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
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive(to)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <ThemeSelector />
        </div>

      </div>
    </header>
  )
}
