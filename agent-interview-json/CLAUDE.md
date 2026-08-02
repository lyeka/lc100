# agent-interview-json/
> L2 | 父级: /CLAUDE.md

127 道 AI Agent 面试题，按 12 大分类拆分为独立 JSON 文件。
源数据：`/AI-Agent开发面试题集.md`（问题清单），答案为联网调研后撰写生成。

## 成员清单

01-llm-model-selection.json: LLM 原理与模型选型 (9题)，Transformer 推理流程、Self-Attention、KV Cache/MLA、模型选型、DPO/LoRA
02-agent-architecture-runtime.json: Agent 架构与运行时 (10题)，Agent 核心模块、ReAct 循环、Runtime 设计、状态机、Harness Engineering
03-prompt-context-engineering.json: Prompt 与上下文工程 (8题)，Prompt 模板、上下文采集、上下文压缩、Todo List、Prompt Cache
04-state-session-memory.json: 状态、会话与记忆系统 (9题)，短期/长期记忆、记忆存储架构、记忆隔离、记忆与 RAG 的边界
05-rag-document-retrieval.json: RAG、文档解析与检索 (18题)，文档解析、分块策略、Embedding/Reranker 选型、混合检索、RAG 评测
06-tool-skill-mcp-a2a.json: Tool、Skill、MCP 与 A2A (8题)，工具设计、Skill 机制、MCP 协议、A2A 协议、能力市场
07-multi-agent.json: Multi-Agent 协作 (11题)，架构模式、任务路由、Agent 通信、幻觉处理、协作失败恢复
08-coding-agent.json: Coding Agent 与 AI 开发流程 (14题)，Agent Loop、代码检索、单测生成、覆盖率、多人协作、人机协作
09-eval-observability.json: 评测、可观测性与自进化 (10题)，评测体系、Trace、Benchmark、自进化、Proxy Reward、Goodhart's Law
10-security-sandbox-guardrail.json: 安全、权限、沙箱与护栏 (8题)，高风险动作控制、Guardrail、凭证管理、权限扩散、沙箱设计
11-performance-cost-cloud.json: 性能、成本、稳定性与云端架构 (10题)，扩容、限流降级、延迟优化、Token 成本、云端多租户
12-project-architecture.json: 项目架构与技术决策 (12题)，项目介绍框架、技术选型、架构价值、失败案例、产品对比（回答框架+范例风格，无客观标准答案）

## JSON Schema

```json
{
  "id": "Q5-07",
  "title": "题目标题",
  "category": "分类中文名",
  "categoryId": 5,
  "level": "L2/L3",
  "background": "考察点说明。面试官会追问：\n  - 子问题1\n  - 子问题2",
  "answerPoints": ["要点1", "要点2", "要点3", "要点4"],
  "codeExample": { "code": "示例代码", "language": "python", "explanation": "代码说明" },
  "followUp": ["追问1（答：...）", "追问2"]
}
```

`id` 格式为 `Q{categoryId}-{NN}`（两位补零，从 01 起，每文件内连续）。`codeExample` 可选，约 25-35% 题目配有。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
