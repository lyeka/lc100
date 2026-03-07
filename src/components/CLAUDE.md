# components/
> L2 | 父级: src/CLAUDE.md

> **设计铁律：颜色只用设计系统 Token，禁止硬编码。**

## 成员清单
Header.jsx:      顶部导航栏，sticky，品牌 logo + 「题库」「设计系统」导航
Footer.jsx:      页脚，品牌 + 导航链接 + GitHub 图标
ProblemCard.jsx: 书籍封面风格题目卡片，3D 透视倾斜 + 书脊折痕 + 内框线，hover 展平放大
CodeBlock.jsx:   Go 代码高亮，铅字图版风格：border + bg-secondary，prism 语法高亮 + 行号 + 纯文字复制按钮
Hero.jsx:        旧版 Hero（未被引用，待清理）

### ui/ — shadcn/ui 原子组件
详见 ui/CLAUDE.md

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
