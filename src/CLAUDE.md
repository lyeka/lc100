# src/
> L2 | 父级: /CLAUDE.md

> **设计铁律：颜色只用设计系统 Token，组件只用 shadcn/ui。**

## 成员清单
main.jsx:   应用启动点，ReactDOM.createRoot + TooltipProvider
App.jsx:    路由根组件，BrowserRouter + Layout + Routes（/, /problem/:id, /design-system）
index.css:  全局样式，Tailwind + shadcn + Amethyst Haze 主题变量

## 子目录

### data/
problems.js:    import.meta.glob 加载 100 题 JSON，导出 problems / problemMap / categories
interviews.js:  import.meta.glob 加载 74 题 Agent 面试 JSON（flatMap），导出 interviews / interviewMap / interviewCategories
goInterviews.js: import.meta.glob 加载 40 题 Go 面试 JSON（flatMap），导出 goInterviews / goInterviewMap / goInterviewCategories

### components/
Header.jsx:     顶部导航（题库 + 设计系统）
Footer.jsx:     页脚
ProblemCard.jsx: 题目卡片（Card elevated），首页网格单元
CodeBlock.jsx:  Go 代码高亮（prism-react-renderer + Card inset + 复制按钮）
Hero.jsx:       旧版首屏 Hero（已不被引用，待清理）
ui/             shadcn/ui 原子组件

### pages/
Home.jsx:          路由 /，迷你 Hero + 分类/难度筛选 + 题目网格
ProblemDetail.jsx: 路由 /problem/:id，阅读核心
AgentHome.jsx:     路由 /agent，Agent 面试题古典目录页（8 分类 + 等级筛选）
AgentDetail.jsx:   路由 /agent/:id，Agent 面试题书页阅读（背景 → 要点 → 追问）
GoHome.jsx:        路由 /go，Go 面试题古典目录页（6 分类 + 等级筛选）
GoDetail.jsx:      路由 /go/:id，Go 面试题书页阅读（背景 → 要点 → 代码示例 → 追问）
DesignSystem.jsx:  路由 /design-system，组件展示

### lib/
utils.js:    cn() 类名合并
progress.js: 学习进度 store（useSyncExternalStore + localStorage），导出 useProgress / useProgressStats

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
