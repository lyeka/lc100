/**
 * [INPUT]: react (useState), prism-react-renderer (Highlight, themes), @/components/ui/scroll-area
 * [OUTPUT]: CodeBlock 代码高亮组件
 * [POS]: Go 代码展示器，铅字图版风格：border + bg-secondary，无阴影无圆角
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export function CodeBlock({ code, language = 'go' }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative border border-border bg-secondary overflow-hidden">
      {/* 复制按钮 — 纯文字 */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {copied ? '已复制' : '复制'}
      </button>

      <ScrollArea className="w-full">
        <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="p-5 pr-14 text-base leading-relaxed font-mono overflow-x-auto">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {/* 行号 */}
                  <span className="inline-block w-8 text-right mr-4 text-muted-foreground/50 select-none text-xs">
                    {i + 1}
                  </span>
                  {line.map((token, j) => (
                    <span key={j} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
