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
    `你是一位${role}，拥有 5 年以上实战经验，正在参加技术面试。面试官问了你以下问题，请你像真人在面试现场一样口头回答。`,
    '',
    '要求：',
    '1. 用真实的口头表达方式——就像你坐在面试官对面在说话，不是在写文章。可以用"嗯，这个问题..."、"简单来说就是..."、"打个比方..."、"我之前项目里遇到过..."这类自然的口语过渡',
    '2. 以下方的参考要点为核心骨架来组织回答，大部分要点是准确的。但如果你发现某些要点已经落后于最新技术发展，或者有遗漏的重要知识点，请主动补充和修正，以最新、最准确的理解来回答',
    '3. 回答要有层次感：先用一两句话说清楚核心结论，再展开细节',
    '4. 语气自信但不傲慢，像一个有实战经验的人在分享自己的理解，不要像在背教科书',
    '',
    `【题目】${q.title}`,
    `【分类】${q.category}`,
    `【难度】${q.level}`,
  ]
  appendContext(parts, q)
  return parts.join('\n')
}
