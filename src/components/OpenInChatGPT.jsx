/**
 * [INPUT]: lucide-react (ExternalLink)
 * [OUTPUT]: OpenInChatGPT 组件 — ChatGPT 外链按钮（可配置 label/icon/ariaLabel）
 * [POS]: Detail 页面操作栏交互点，与 LearnedStamp 并排，承载「解读」和「满分回答」两种 prompt 场景
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { ExternalLink } from 'lucide-react'

/* ── URL 长度预算 ── */
const BASE_URL = 'https://chatgpt.com/?prompt='
const MAX_URL_LEN = 8000
const PROMPT_BUDGET = MAX_URL_LEN - BASE_URL.length

export function OpenInChatGPT({
  prompt,
  label = 'ChatGPT 解读',
  icon: Icon = ExternalLink,
  ariaLabel = '在 ChatGPT 中解读此题（新标签页打开）',
}) {
  if (!prompt) return null

  const encoded = encodeURIComponent(prompt)
  /* 编码后超预算则截断原文重新编码 */
  const safeEncoded = encoded.length > PROMPT_BUDGET
    ? encodeURIComponent(prompt.slice(0, 1500) + '\n\n...（内容过长已截断）')
    : encoded

  return (
    <a
      href={`${BASE_URL}${safeEncoded}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 select-none text-muted-foreground/30 hover:text-muted-foreground/60"
    >
      <Icon size={14} />
      <span className="text-xs tracking-wider">{label}</span>
    </a>
  )
}
