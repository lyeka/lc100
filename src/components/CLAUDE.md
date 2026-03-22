# components/
> L2 | 父级: src/CLAUDE.md

> **设计铁律：颜色只用设计系统 Token，禁止硬编码。**

## 成员清单
Header.jsx:        页眉，sticky，纯文字导航（首页·题库·Agent·Go·MySQL·Redis·Kafka）+ Tooltip 进度 + ThemeSelector 色点
Footer.jsx:        版记，居中布局：✦ 装饰线 + 导航链接（·分隔，含 MySQL/Redis/Kafka）+ 内容统计
LearnedStamp.jsx:  印章式学习标记按钮，framer-motion 动画，被 Detail 页面操作栏消费
OpenInChatGPT.jsx: ChatGPT 外链按钮（可配置 label/icon/ariaLabel），接收 prompt 字符串，被 Detail 页面操作栏消费（解读 + 满分回答）
ProblemCard.jsx:   书籍封面风格题目卡片，3D 透视倾斜 + 书脊折痕 + 内框线，hover 展平放大
CodeBlock.jsx:     Go 代码高亮，铅字图版风格：border + bg-secondary，语法色跟随书页主题联动（via useCodeTheme）
ThemeSelector.jsx: 下拉式主题选择器（Navy/Parchment/Ivory/Papyrus/VintageGreen），DropdownMenu + localStorage 持久化
codeThemes.js:     5 套 Prism 语法高亮主题对象 + useCodeTheme hook（MutationObserver 监听 html class）
Hero.jsx:          旧版 Hero（未被引用，待清理）

### ui/ — shadcn/ui 原子组件
详见 ui/CLAUDE.md

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
