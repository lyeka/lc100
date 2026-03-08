# data/
> L2 | 父级: src/CLAUDE.md

## 成员清单
problems.js:       import.meta.glob 静态加载 /leetcode-hot100-json/*.json，导出 problems(数组) / problemMap(Map) / categories(去重分类)
interviews.js:     import.meta.glob 静态加载 /agent-interview-json/*.json（每文件为数组，flatMap 展平），导出 interviews(排序数组) / interviewMap(Map<string>) / interviewCategories(按 categoryId 排序)
goInterviews.js:   import.meta.glob 静态加载 /go-interview-json/*.json（每文件为数组，flatMap 展平），导出 goInterviews(排序数组) / goInterviewMap(Map<string>) / goInterviewCategories(按 categoryId 排序)
mysqlInterviews.js: import.meta.glob 静态加载 /mysql-interview-json/*.json（每文件为数组，flatMap 展平），导出 mysqlInterviews(排序数组) / mysqlInterviewMap(Map<string>) / mysqlInterviewCategories(按 categoryId 排序)

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
