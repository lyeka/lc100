/**
 * [INPUT]: lucide-react (ExternalLink)
 * [OUTPUT]: OpenInChatGPT 组件 — 一键在 ChatGPT 中打开问题的外链按钮
 * [POS]: Detail 页面的辅助交互点，与 LearnedStamp 并排，被 ProblemDetail / AgentDetail / GoDetail 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { ExternalLink } from 'lucide-react'

/* ── URL 长度预算 ── */
const BASE_URL = 'https://chatgpt.com/?q='
const MAX_URL_LEN = 8000
const PROMPT_BUDGET = MAX_URL_LEN - BASE_URL.length

export function OpenInChatGPT({ prompt }) {
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
      aria-label="在 ChatGPT 中解读此题（新标签页打开）"
      className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 select-none text-muted-foreground/30 hover:text-muted-foreground/60"
    >
      <ExternalLink size={14} />
      <span className="text-xs tracking-wider">ChatGPT 解读</span>
    </a>
  )
}
