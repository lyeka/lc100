/**
 * [INPUT]: 面试题数据对象 { title, category, level, background?, answerPoints[], codeExample?, followUp[] }
 * [OUTPUT]: buildExplainPrompt — 面试题 ChatGPT prompt 构建器
 * [POS]: lib 层共享工具，被 AgentDetail / GoDetail / RedisDetail / MysqlDetail / KafkaDetail 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── 拼接题目上下文（解读共享） ── */
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

/* ── 解读 prompt ── */
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
