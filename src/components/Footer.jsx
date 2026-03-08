/**
 * [INPUT]: react-router (Link), @/components/ui/separator, lucide-react
 * [OUTPUT]: Footer 页脚组件
 * [POS]: 全局布局组件，出现在所有页面底部
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { Github } from 'lucide-react'

const links = [
  { to: '/', label: '题库' },
  { to: '/agent', label: 'Agent' },
  { to: '/go', label: 'Go' },
  { to: '/design-system', label: '设计系统' },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">

          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">L</span>
            </div>
            <span className="text-sm font-semibold text-foreground">LC100</span>
          </div>

          <nav className="flex items-center gap-6">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
          </a>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          LeetCode Hot 100 · Go 题解 · Amethyst Haze 设计系统
        </p>
      </div>
    </footer>
  )
}
