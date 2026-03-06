/**
 * [INPUT]: prism-react-renderer (Highlight, themes), @/components/ui/card, @/components/ui/button, lucide-react
 * [OUTPUT]: CodeBlock 代码高亮组件
 * [POS]: Go 代码展示器，inset Card 容器 + prism 语法高亮 + 复制按钮
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ code, language = 'go' }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card variant="inset" className="relative overflow-hidden">
      {/* 复制按钮 */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground"
        onClick={handleCopy}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </Button>

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
    </Card>
  )
}
