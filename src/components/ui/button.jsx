/**
 * [INPUT]: react, radix-ui (Slot), class-variance-authority (cva), lucide-react (Loader2), @/lib/utils
 * [OUTPUT]: Button 组件、buttonVariants
 * [POS]: UI 基础层核心交互原语，全站按钮统一入口，微拟物渐变 + 三层阴影设计
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/* ========================================
   阴影配置 - 三层结构：外投影 + 顶部高光 + 底部暗边
   所有颜色通过 CSS 变量 + color-mix 派生，禁止硬编码
   ======================================== */
const SHADOW = {
  default: {
    bg:    'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 85%, black) 50%, color-mix(in srgb, var(--primary) 70%, black) 100%)',
    rest:  '0 4px 12px color-mix(in srgb, var(--primary) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
    hover: '0 6px 20px color-mix(in srgb, var(--primary) 45%, transparent), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)',
  },
  destructive: {
    bg:    'linear-gradient(135deg, var(--destructive) 0%, color-mix(in srgb, var(--destructive) 85%, black) 50%, color-mix(in srgb, var(--destructive) 70%, black) 100%)',
    rest:  '0 4px 12px color-mix(in srgb, var(--destructive) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
    hover: '0 6px 20px color-mix(in srgb, var(--destructive) 45%, transparent), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)',
  },
  secondary: {
    bg:    'linear-gradient(135deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 90%, black) 50%, color-mix(in srgb, var(--secondary) 80%, black) 100%)',
    rest:  '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.05)',
    hover: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.08)',
  },
  outline: {
    bg:    'transparent',
    rest:  '0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
    hover: '0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
  },
}

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap text-sm font-medium",
    "transition-all duration-200 outline-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "active:scale-[0.97] hover:scale-[1.02]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "rounded-2xl text-primary-foreground",
        destructive: "rounded-2xl text-destructive-foreground",
        secondary:   "rounded-2xl text-secondary-foreground",
        outline:     "rounded-2xl border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30",
        ghost:       "rounded-2xl hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs:      "h-6 gap-1 rounded-xl px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:      "h-8 gap-1.5 rounded-xl px-3",
        default: "h-9 px-5 py-2 rounded-2xl",
        lg:      "h-10 px-6 rounded-2xl",
        xl:      "h-12 px-10 rounded-2xl text-base",
        icon:    "size-9 rounded-2xl",
        "icon-sm": "size-8 rounded-xl",
        "icon-lg": "size-10 rounded-2xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

/* ── 需要自定义阴影的 variant 集合 ── */
const STYLED = new Set(['default', 'destructive', 'secondary', 'outline'])

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  style,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"
  const [hovered, setHovered] = React.useState(false)

  const cfg = SHADOW[variant]
  const combinedStyle = cfg ? {
    background: cfg.bg,
    boxShadow: hovered ? cfg.hover : cfg.rest,
    ...style,
  } : style

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={props.ref}
      disabled={isLoading || props.disabled}
      style={combinedStyle}
      onMouseEnter={(e) => { setHovered(true); props.onMouseEnter?.(e) }}
      onMouseLeave={(e) => { setHovered(false); props.onMouseLeave?.(e) }}
      {...props}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </Comp>
  )
}

export { Button, buttonVariants }
