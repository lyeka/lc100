/**
 * [INPUT]: react-router (useParams, Link), @/data/goInterviews, @/components/ui/button, @/components/CodeBlock, @/components/LearnedStamp
 * [OUTPUT]: GoDetail 古典书页阅读页
 * [POS]: 路由 /go/:id，Go 面试题阅读体验核心
 *        书页容器 bg-card shadow-2xl 浮于深色桌面
 *        阅读节奏：装饰线章节标题 → 背景说明(可选) → 参考要点(中文数字) → 代码示例(可选) → 追问(可选) → 纯文字导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useParams, Link } from 'react-router'
import { goInterviews, goInterviewMap } from '@/data/goInterviews'
import { LearnedStamp } from '@/components/LearnedStamp'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/CodeBlock'

/* ── 中文数字 ── */
const CN_NUM = ['一','二','三','四','五','六','七','八','九','十','十一','十二']

/* ── 等级颜色 ── */
const LEVEL_COLOR = {
  'L2':    'text-chart-3',
  'L2/L3': 'text-chart-4',
  'L3':    'text-destructive',
}

/* ── 装饰线 ── */
function OrnamentalRule() {
  return (
    <div className="flex items-center justify-center gap-3 text-muted-foreground/30 select-none">
      <span className="h-px w-16 bg-muted-foreground/20" />
      <span className="text-xs">✦</span>
      <span className="h-px w-16 bg-muted-foreground/20" />
    </div>
  )
}

/* ── 古典分隔符 ── */
function Divider() {
  return (
    <div className="py-6 text-center text-muted-foreground/40 tracking-[0.5em] text-sm select-none">
      ·　·　·
    </div>
  )
}

export function GoDetail() {
  const { id } = useParams()
  const question = goInterviewMap.get(id)

  /* ── 404 ── */
  if (!question) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-lg text-muted-foreground">题目不存在</p>
        <Link to="/go">
          <Button variant="outline" className="mt-4">返回 Go 目录</Button>
        </Link>
      </main>
    )
  }

  /* ── 前后题导航（基于数组索引）── */
  const idx = goInterviews.findIndex(q => q.id === id)
  const prev = idx > 0 ? goInterviews[idx - 1] : null
  const next = idx < goInterviews.length - 1 ? goInterviews[idx + 1] : null

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8">

      {/* ════════════════════════════════════════
         顶部导航 — 书页之外
         ════════════════════════════════════════ */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/go" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Go 目录
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {prev ? (
            <Link to={`/go/${prev.id}`} className="hover:text-primary transition-colors">
              {prev.id}
            </Link>
          ) : (
            <span className="opacity-30">···</span>
          )}
          <span className="text-border">/</span>
          {next ? (
            <Link to={`/go/${next.id}`} className="hover:text-primary transition-colors">
              {next.id}
            </Link>
          ) : (
            <span className="opacity-30">···</span>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
         书页容器
         ════════════════════════════════════════ */}
      <div className="bg-card shadow-2xl px-8 sm:px-16 py-12">

        {/* ── 章节标题区 ── */}
        <OrnamentalRule />
        <div className="text-center space-y-4 py-8">
          <div className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Question {question.id}
          </div>
          <h1 className="text-2xl tracking-wide text-foreground">
            {question.title}
          </h1>
          <div className="text-sm text-muted-foreground tracking-wider">
            {question.category}
            <span className="mx-2">·</span>
            <span className={LEVEL_COLOR[question.level] || 'text-muted-foreground'}>
              {question.level}
            </span>
          </div>
        </div>
        <OrnamentalRule />
        <LearnedStamp section="go" id={id} total={goInterviews.length} />
        {question.background && (
          <>
            <div className="mt-8">
              <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
                背 景 说 明
              </h2>
              <div className="border-l-2 border-primary/30 pl-6 mx-4 sm:mx-8">
                <p className="text-sm text-foreground/90 leading-loose whitespace-pre-line">
                  {question.background}
                </p>
              </div>
            </div>
            <Divider />
          </>
        )}

        {/* ── 参考要点 — 中文数字编号 ── */}
        {question.answerPoints.length > 0 && (
          <section className={question.background ? '' : 'mt-8'}>
            <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
              参 考 要 点
            </h2>
            <ol className="space-y-3 px-4 sm:px-8">
              {question.answerPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-none text-primary/70 mt-px">
                    {CN_NUM[i] || i + 1}、
                  </span>
                  <span className="text-foreground/85 leading-relaxed whitespace-pre-line">
                    {point}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── 代码示例（可选）── */}
        {question.codeExample && (
          <>
            <Divider />
            <section>
              <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
                代 码 示 例
              </h2>
              <div className="px-4 sm:px-8">
                <CodeBlock code={question.codeExample.code} language={question.codeExample.language || 'go'} />
                {question.codeExample.explanation && (
                  <p className="mt-4 text-sm text-foreground/70 leading-relaxed italic border-l-2 border-primary/30 pl-4">
                    {question.codeExample.explanation}
                  </p>
                )}
              </div>
            </section>
          </>
        )}

        {/* ── 追问（可选）── */}
        {question.followUp && question.followUp.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
                追　问
              </h2>
              <ol className="space-y-3 px-4 sm:px-8">
                {question.followUp.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex-none text-muted-foreground mt-px">
                      {i + 1}.
                    </span>
                    <span className="text-foreground/70 leading-relaxed italic">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </>
        )}

        {/* ── 底部导航 ── */}
        <div className="mt-12 border-t border-border pt-6">
          <nav className="flex items-center justify-between text-sm">
            {prev ? (
              <Link
                to={`/go/${prev.id}`}
                className="text-muted-foreground hover:text-primary transition-colors max-w-[45%] truncate"
              >
                ← {prev.id} {prev.title}
              </Link>
            ) : <div />}
            {next ? (
              <Link
                to={`/go/${next.id}`}
                className="text-muted-foreground hover:text-primary transition-colors text-right max-w-[45%] truncate"
              >
                {next.id} {next.title} →
              </Link>
            ) : <div />}
          </nav>
          <div className="text-center text-xs text-muted-foreground/50 mt-4">
            {idx + 1} / {goInterviews.length}
          </div>
        </div>

      </div>
    </main>
  )
}
