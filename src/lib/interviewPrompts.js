/**
 * [INPUT]: 面试题数据对象 { title, category, level, background?, answerPoints[], codeExample?, followUp[] }
 * [OUTPUT]: buildExplainPrompt / buildAnswerPrompt / ROLE_MAP — 面试题 ChatGPT prompt 构建器
 * [POS]: lib 层共享工具，被 AgentDetail / GoDetail / RedisDetail / MysqlDetail 消费，消灭 4 份重复 buildPrompt
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── 角色映射 ── */
export const ROLE_MAP = {
  agent: '资深 AI Agent 开发工程师',
  go:    '资深 Go 语言开发工程师',
  redis: '资深 Redis 技术专家',
  mysql: '资深 MySQL 数据库工程师',
  kafka: '资深 Kafka 架构师',
}

/* ── 拼接题目上下文（解读 / 满分回答共享） ── */
function appendContext(parts, q) {
  if (q.background) parts.push('', `【背景】${q.background}`)
  if (q.answerPoints?.length) {
    parts.push('', '【参考要点】')
    q.answerPoints.forEach((p, i) => parts.push(`${i + 1}. ${p}`))
  }
  if (q.codeExample) {
    parts.push('', '【代码示例】', '```' + (q.codeExample.language || 'text'), q.codeExample.code, '```')
    if (q.codeExample.explanation) parts.push(q.codeExample.explanation)
  }
  if (q.followUp?.length) {
    parts.push('', '【追问】')
    q.followUp.forEach((p, i) => parts.push(`${i + 1}. ${p}`))
  }
}

/* ── 解读 prompt（原 buildPrompt 统一版） ── */
export function buildExplainPrompt(q) {
  const parts = [
    '请你通俗易懂的解释以下面试题，帮我理解核心概念：',
    '',
    `【题目】${q.title}`,
    `【分类】${q.category}`,
    `【难度】${q.level}`,
  ]
  appendContext(parts, q)
  return parts.join('\n')
}

/* ── 满分回答 prompt ── */
export function buildAnswerPrompt(q, role) {
  const parts = [
    `请你以一位${role}的视角，口语化回答下面这个问题。要求：像真实面试现场一样自然表达，有层次感，先给核心结论再展开，必要时结合项目经验。`,
    '',
    `【题目】${q.title}`,
    `【分类】${q.category}`,
    `【难度】${q.level}`,
  ]
  appendContext(parts, q)
  return parts.join('\n')
}
