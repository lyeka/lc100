/**
 * [INPUT]: react (useState, useEffect), lucide-react (Check, ChevronDown, ExternalLink), @/components/ui/dropdown-menu
 * [OUTPUT]: CopyPromptToAI 组件 — 下拉选择 ChatGPT / Kimi / DeepSeek
 *          ChatGPT: URL 长度安全则跳转 chatgpt.com/?prompt=...；超长则 alert 并打开空白 chatgpt.com 让用户粘贴
 *          Kimi / DeepSeek: 复制 prompt 到剪贴板并打开对应 AI 首页
 * [POS]: Detail 页面操作栏，承载「AI 解读」prompt 场景
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState, useEffect } from 'react'
import { Check, ChevronDown, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* ── 支持的 AI 平台 ── */
const AI_PLATFORMS = [
  { key: 'chatgpt', label: 'ChatGPT', url: 'https://chatgpt.com/' },
  { key: 'kimi', label: 'Kimi', url: 'https://www.kimi.com/' },
  { key: 'deepseek', label: 'DeepSeek', url: 'https://chat.deepseek.com/' },
]

/* ── ChatGPT URL 长度安全阈值 ── */
const MAX_URL_LEN = 8000

export function CopyPromptToAI({
  prompt,
  label = 'AI 解读',
  icon: Icon = ExternalLink,
  ariaLabel = '选择 AI 平台打开面试题解读 prompt（新标签页）',
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  if (!prompt) return null

  const handleSelect = async (platform) => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch (err) {
      console.warn('[CopyPromptToAI] 复制失败', err)
    }
    setCopied(true)

    if (platform.key === 'chatgpt') {
      const url = `${platform.url}?prompt=${encodeURIComponent(prompt)}`
      if (url.length > MAX_URL_LEN) {
        window.alert('prompt 过长，已复制到剪贴板，请在 ChatGPT 中粘贴')
        window.open(platform.url, '_blank', 'noopener,noreferrer')
        return
      }
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.open(platform.url, '_blank', 'noopener,noreferrer')
    }
  }

  const TriggerIcon = copied ? Check : Icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 select-none text-muted-foreground/30 hover:text-muted-foreground/60 data-[state=open]:text-muted-foreground/60 outline-hidden"
      >
        <TriggerIcon size={14} />
        <span className="text-xs tracking-wider">
          {label}{copied ? ' 已复制' : ''}
        </span>
        {!copied && <ChevronDown size={12} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[8rem]">
        {AI_PLATFORMS.map((p) => (
          <DropdownMenuItem
            key={p.key}
            onClick={() => handleSelect(p)}
            className="cursor-pointer"
          >
            <span className="text-xs tracking-wider">{p.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
