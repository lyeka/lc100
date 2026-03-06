/**
 * [INPUT]: react, @/lib/utils
 * [OUTPUT]: Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
 * [POS]: UI 基础层容器原语，支持 elevated（凸起）/ inset（内凹）两种微拟物变体
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cn } from "@/lib/utils"

/* ========================================
   Card 阴影配置
   elevated（凸起）：外投影 + 顶部高光 + 底部暗边
   inset（内凹）：inset 阴影模拟按压感
   ======================================== */
const CARD_SHADOW = {
  elevated: {
    rest:  '0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.04)',
    hover: '0 8px 24px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.06)',
  },
  inset: {
    rest:  'inset 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 3px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(255,255,255,0.5)',
    hover: 'inset 0 3px 10px rgba(0,0,0,0.1), inset 0 1px 4px rgba(0,0,0,0.14), inset 0 -1px 0 rgba(255,255,255,0.6)',
  },
}

function Card({ className, variant = "default", style, ...props }) {
  const [hovered, setHovered] = React.useState(false)

  const cfg = CARD_SHADOW[variant]
  const shadowStyle = cfg
    ? { boxShadow: hovered ? cfg.hover : cfg.rest, transition: 'box-shadow 0.2s ease', ...style }
    : style

  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        "flex flex-col gap-6 rounded-2xl border bg-card py-6 text-card-foreground",
        variant === "inset" && "bg-muted/40",
        className
      )}
      style={shadowStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return (
    <div data-slot="card-content" className={cn("px-6", className)} {...props} />
  )
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
