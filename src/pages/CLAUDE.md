# pages/
> L2 | 父级: src/CLAUDE.md

> **设计铁律：颜色只用设计系统 Token，组件只用 shadcn/ui。**

## 成员清单
Landing.jsx:       路由 /，ZIMA 画廊风格总目录：Museum Frame 容器 → Hero "Agentic Interview" 渐变标题 → 5张画廊卡片(hover overlay + 文字滑入) → 宣言+统计 Content Split
Home.jsx:          路由 /leetcode，LeetCode 古典目录页：按分类分组(PART 罗马数字) + 点引线目录行 + 筛选
ProblemDetail.jsx: 路由 /problem/:id，古典书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → useState 折叠描述+示例 → 左金线引用核心思路 → 中文数字步骤 → 文字 tab 多解法 → 纯文字导航
AgentHome.jsx:     路由 /agent，Agent 面试题古典目录页：12 大分类(PART 罗马数字) + 点引线目录行 + L2/L2-L3/L3 等级筛选
AgentDetail.jsx:   路由 /agent/:id，Agent 面试题书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → 金线引用背景说明(可选) → 中文数字参考要点 → CodeBlock 代码示例(可选) → 追问(可选) → 纯文字导航
GoHome.jsx:        路由 /go，Go 面试题古典目录页：6 大分类(PART 罗马数字) + 点引线目录行 + L2/L2-L3/L3 等级筛选
GoDetail.jsx:      路由 /go/:id，Go 面试题书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → 金线引用背景说明(可选) → 中文数字参考要点 → CodeBlock 代码示例(可选) → 追问(可选) → 纯文字导航
MysqlHome.jsx:     路由 /mysql，MySQL 面试题古典目录页：6 大分类(PART 罗马数字) + 点引线目录行 + L2/L2-L3/L3 等级筛选
MysqlDetail.jsx:   路由 /mysql/:id，MySQL 面试题书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → 金线引用背景说明(可选) → 中文数字参考要点 → CodeBlock SQL 代码示例(可选) → 追问(可选) → 纯文字导航
RedisHome.jsx:     路由 /redis，Redis 面试题古典目录页：8 大分类(PART 罗马数字) + 点引线目录行 + L2/L2-L3/L3 等级筛选
RedisDetail.jsx:   路由 /redis/:id，Redis 面试题书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → 金线引用背景说明(可选) → 中文数字参考要点 → CodeBlock 代码示例(可选) → 追问(可选) → 纯文字导航
KafkaHome.jsx:     路由 /kafka，Kafka 面试题古典目录页：8 大分类(PART 罗马数字) + 点引线目录行 + L2/L2-L3/L3 等级筛选
KafkaDetail.jsx:   路由 /kafka/:id，Kafka 面试题书页阅读：bg-card shadow-2xl 纸页容器 → 装饰线章节标题 → 金线引用背景说明(可选) → 中文数字参考要点 → CodeBlock 代码示例(可选) → 追问(可选) → 纯文字导航
DesignSystem.jsx:  路由 /design-system，设计系统 showcase

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
