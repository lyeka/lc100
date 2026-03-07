# lc100 - LeetCode Hot 100 阅读网站

React 19 + Vite 7 + TailwindCSS v4 + shadcn/ui + react-router + framer-motion + prism-react-renderer

---

> **设计铁律：一切颜色必须来自设计系统 Token，禁止硬编码任何颜色值。组件必须使用 shadcn/ui 组件库。**

---

<directory>
src/              - 应用源码
  components/     - 全局组件 (Header, Footer, ProblemCard, CodeBlock, ThemeSelector + ui/ shadcn)
  pages/          - 路由页面 (Home, ProblemDetail, DesignSystem)
  data/           - 数据层 (problems.js: import.meta.glob 加载 100 题 JSON)
  lib/            - 工具函数 (utils.js: cn())
leetcode-hot100-json/ - 100 个题解 JSON 数据源
public/           - 静态资源
</directory>

<config>
vite.config.js    - Vite 构建：@tailwindcss/vite 插件 + @ 别名（→ src/）
jsconfig.json     - 编辑器 @ 别名声明
components.json   - shadcn/ui 配置：style=default, baseColor=neutral, rsc=false
package.json      - 依赖清单，scripts: dev/build/lint/preview
index.html        - HTML 入口，挂载点 #root + 防闪烁主题预设脚本
</config>

## 路由结构
| 路径 | 页面 | 说明 |
|------|------|------|
| / | Home | 迷你 Hero + 分类/难度筛选 + 100 题网格 |
| /problem/:id | ProblemDetail | 描述(折叠) → 核心思路(突出) → 关键步骤(渐进) → Go 代码高亮 |
| /design-system | DesignSystem | 设计系统组件展示 |

## 数据 Schema
每个 JSON: `{ id, leetcodeId, title, category, difficulty, description, examples: [{ input, output, explanation? }], hint: { core, keyPoints[] }, solutions: [{ name, code, timeComplexity, spaceComplexity }] }`

## 难度颜色 Token
Easy: chart-3 (青绿) · Medium: chart-4 (琥珀) · Hard: destructive (红)

## 微拟物设计语言
Button / Card / Input / Badge 已升级为微拟物风格，详见 `src/components/ui/CLAUDE.md`

## 主题系统
4 种书页风格，CSS 变量驱动，class 加在 `<html>` 上，localStorage 持久化：
| 主题 | class | 色调 |
|------|-------|------|
| 海军蓝（默认） | _(无)_ | 深蓝 + 金 |
| 陈年羊皮纸 | `theme-parchment` | 泛黄暖纸 + 深褐 + 旧金 |
| 象牙冷白 | `theme-ivory` | 近白微暖 + 近黑 + 金 |
| 莎草纸 | `theme-papyrus` | 浓郁黄褐 + 深棕 + 古铜金 |
