/**
 * [INPUT]: react, @/lib/utils
 * [OUTPUT]: Input 表单输入组件
 * [POS]: UI 基础层表单原语，内凹 inset 阴影模拟按压感，focus 时加深凹陷强调聚焦
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cn } from "@/lib/utils"

/* ── 内凹阴影：三层 inset = 深度感 + 底部高光 ── */
const SHADOW_REST  = 'inset 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 2px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(255,255,255,0.5)'
const SHADOW_FOCUS = 'inset 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 3px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.6), 0 0 0 3px color-mix(in srgb, var(--ring) 25%, transparent)'

function Input({ className, type, style, ...props }) {
  const [focused, setFocused] = React.useState(false)

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-input bg-input/60 px-3 py-1",
        "text-base md:text-sm text-foreground placeholder:text-muted-foreground",
        "transition-[box-shadow,border-color] duration-200 outline-none",
        "selection:bg-primary selection:text-primary-foreground",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      style={{
        boxShadow: focused ? SHADOW_FOCUS : SHADOW_REST,
        borderColor: focused ? 'var(--ring)' : undefined,
        ...style,
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
      {...props}
    />
  )
}

export { Input }
