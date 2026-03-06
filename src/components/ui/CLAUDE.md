# components/ui/
> L2 | 父级: src/components/CLAUDE.md

> ⚠️ **设计铁律：所有颜色必须来自 CSS 变量（var(--primary) 等）+ color-mix 派生，禁止硬编码颜色值。**

## 微拟物设计公式
```
渐变背景：linear-gradient(135deg, var(--token) → color-mix(85%) → color-mix(70%))
三层阴影：外投影 + inset 顶部高光 rgba(255,255,255,0.2) + inset 底部暗边 rgba(0,0,0,0.1)
内凹：inset 阴影模拟按压深度
圆角：sm=rounded-xl(16px)  default=rounded-2xl(20px)  lg=rounded-3xl(24px)
微交互：active:scale-[0.97] hover:scale-[1.02]  transition-all 200ms
```

## 已升级组件（微拟物版本）
button.jsx:   渐变 + 三层阴影；variant=default/destructive/secondary/outline/ghost/link；isLoading/leftIcon/rightIcon 扩展 props
card.jsx:     variant=default（无阴影）/ elevated（凸起，外投影+高光）/ inset（内凹，inset 阴影）；hover 动态切换阴影
input.jsx:    内凹 inset 三层阴影；focus 时加深凹陷 + ring 高亮
badge.jsx:    渐变背景 + 投影；variant=default/secondary/destructive/outline/ghost

## 未升级组件（原始 shadcn/ui，按需升级）
dialog, sheet, form, select, checkbox, radio-group, switch, textarea
alert, sonner, skeleton, progress
tabs, accordion, dropdown-menu, navigation-menu
avatar, table, popover, tooltip, hover-card
scroll-area, separator, command, collapsible
label

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
