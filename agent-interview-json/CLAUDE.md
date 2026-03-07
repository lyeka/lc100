# agent-interview-json/
> L2 | 父级: /CLAUDE.md

74 道 AI Agent 面试题，按 8 大分类拆分为独立 JSON 文件。
源数据：`agent-interview-questions.md`，由 `scripts/convert-interview-md.mjs` 转换生成。

## 成员清单

01-llm-application.json: LLM 应用工程 (10题)，Context Engineering、Message Role、Structured Output
02-agent-reasoning.json: Agent 推理与规划 (11题)，Agent Loop、Planning 策略、Reflection
03-tool-system.json: 工具系统工程 (9题)，Function Calling、Schema 设计、沙箱执行
04-memory-knowledge.json: 记忆与知识系统 (10题)，Embedding、RAG、GraphRAG
05-multi-agent.json: Multi-Agent 系统 (10题)，编排模式、MCP/A2A 协议、Handoff
06-production.json: 生产工程 (11题)，可观测性、Eval、可靠性、成本优化
07-security.json: 安全与合规 (7题)，Prompt Injection、Guardrails、PII
08-system-design.json: Agent System Design (6题)，大厂真实场景系统设计

## JSON Schema

```json
{
  "id": "Q1-0a",
  "title": "题目标题",
  "category": "分类中文名",
  "categoryId": 1,
  "level": "L2",
  "background": "可选背景说明",
  "answerPoints": ["要点1", "要点2"],
  "followUp": ["追问1", "追问2"]
}
```

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
