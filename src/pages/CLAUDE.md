# pages/
> L2 | 父级: src/CLAUDE.md

> **设计铁律：颜色只用设计系统 Token，组件只用 shadcn/ui。**

## 成员清单
Home.jsx:          路由 /，古典目录页：按分类分组(PART 罗马数字) + 点引线目录行 + 筛选
ProblemDetail.jsx: 路由 /problem/:id，古典书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → useState 折叠描述+示例 → 左金线引用核心思路 → 中文数字步骤 → 文字 tab 多解法 → 纯文字导航
DesignSystem.jsx:  路由 /design-system，设计系统 showcase

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
