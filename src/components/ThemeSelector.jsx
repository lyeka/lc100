/**
 * [INPUT]: react (useState, useEffect), @/components/ui/dropdown-menu, lucide-react (Palette)
 * [OUTPUT]: ThemeSelector 主题下拉选择器
 * [POS]: Header 内嵌组件，DropdownMenu 展示 5 主题选项（色块+名称），localStorage 持久化
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

/* ── 主题配置 ── */
const THEMES = [
  { id: '',                label: '海军蓝', color: '#1a2634' },
  { id: 'theme-parchment', label: '羊皮纸', color: '#f5f0e8' },
  { id: 'theme-ivory',     label: '象牙白', color: '#fafaf8' },
  { id: 'theme-papyrus',        label: '莎草纸', color: '#ede0c8' },
  { id: 'theme-vintage-green',  label: '复古绿', color: '#1a2e1a' },
]

const STORAGE_KEY = 'lc100-theme'

function applyTheme(themeId) {
  const root = document.documentElement
  THEMES.forEach(t => { if (t.id) root.classList.remove(t.id) })
  if (themeId) root.classList.add(themeId)
}

export function ThemeSelector() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem(STORAGE_KEY) || ''
  })

  useEffect(() => {
    applyTheme(active)
    localStorage.setItem(STORAGE_KEY, active)
  }, [active])

  const current = THEMES.find(t => t.id === active) || THEMES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <span
            className="size-4 rounded-full border border-border"
            style={{ backgroundColor: current.color }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel>主题</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={active} onValueChange={setActive}>
          {THEMES.map(t => (
            <DropdownMenuRadioItem key={t.id} value={t.id} className="cursor-pointer">
              <span
                className="size-3 rounded-full border border-border"
                style={{ backgroundColor: t.color }}
              />
              {t.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
