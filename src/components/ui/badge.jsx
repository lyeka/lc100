/**
 * [INPUT]: react, radix-ui (Slot), class-variance-authority (cva), @/lib/utils
 * [OUTPUT]: Badge 组件、badgeVariants
 * [POS]: UI 基础层标注原语，渐变背景 + 立体投影，与 Button 共用同一微拟物设计语言
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/* ========================================
   Badge 渐变配置 - 与 Button 共用设计公式
   ======================================== */
const BADGE_SHADOW = {
  default: {
    bg:   'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 100%)',
    rest: '0 2px 6px color-mix(in srgb, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  secondary: {
    bg:   'linear-gradient(135deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 85%, black) 100%)',
    rest: '0 1px 4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  destructive: {
    bg:   'linear-gradient(135deg, var(--destructive) 0%, color-mix(in srgb, var(--destructive) 80%, black) 100%)',
    rest: '0 2px 6px color-mix(in srgb, var(--destructive) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
}

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all duration-200 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:     "text-primary-foreground",
        secondary:   "text-secondary-foreground",
        destructive: "text-destructive-foreground",
        outline:     "border border-border text-foreground",
        ghost:       "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({ className, variant = "default", asChild = false, style, ...props }) {
  const Comp = asChild ? Slot.Root : "span"
  const cfg = BADGE_SHADOW[variant]

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      style={cfg ? { background: cfg.bg, boxShadow: cfg.rest, ...style } : style}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
