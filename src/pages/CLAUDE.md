# pages/
> L2 | 父级: src/CLAUDE.md

> **设计铁律：颜色只用设计系统 Token，组件只用 shadcn/ui。**

## 成员清单
Home.jsx:          路由 /，迷你 Hero + useSearchParams 筛选 + ProblemCard 网格
ProblemDetail.jsx: 路由 /problem/:id，阅读核心：描述折叠 → 核心思路(elevated) → 关键步骤(accordion) → 代码(prism) → prev/next 导航
DesignSystem.jsx:  路由 /design-system，设计系统 showcase

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
