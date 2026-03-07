/**
 * [INPUT]: react (useState), react-router (useParams, Link), @/data/problems, @/components/CodeBlock
 * [OUTPUT]: ProblemDetail 古典书页阅读页
 * [POS]: 路由 /problem/:id，全站阅读体验核心
 *        书页容器 bg-card shadow-2xl 浮于深色桌面
 *        阅读节奏：装饰线章节标题 → 描述(useState 折叠) → 金线引用核心思路 → 中文数字步骤 → 文字 tab 多解法 → 纯文字导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { useParams, Link } from 'react-router'
import { problemMap } from '@/data/problems'
import { CodeBlock } from '@/components/CodeBlock'
import { Button } from '@/components/ui/button'

/* ── 中文数字 ── */
const CN_NUM = ['一','二','三','四','五','六','七','八','九','十','十一','十二']

/* ── 难度颜色 ── */
const DIFF_COLOR = {
  Easy:   'text-chart-3',
  Medium: 'text-chart-4',
  Hard:   'text-destructive',
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

export function ProblemDetail() {
  const { id } = useParams()
  const numId = Number(id)
  const problem = problemMap.get(numId)
  const [descOpen, setDescOpen] = useState(false)
  const [activeSol, setActiveSol] = useState(0)

  /* ── 404 ── */
  if (!problem) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-lg text-muted-foreground">题目不存在</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">返回目录</Button>
        </Link>
      </main>
    )
  }

  const prev = problemMap.get(numId - 1)
  const next = problemMap.get(numId + 1)
  const totalProblems = problemMap.size

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8">

      {/* ════════════════════════════════════════
         顶部导航 — 书页之外
         ════════════════════════════════════════ */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← 目录
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {prev ? (
            <Link to={`/problem/${prev.id}`} className="hover:text-primary transition-colors">
              #{String(prev.id).padStart(3, '0')}
            </Link>
          ) : (
            <span className="opacity-30">···</span>
          )}
          <span className="text-border">/</span>
          {next ? (
            <Link to={`/problem/${next.id}`} className="hover:text-primary transition-colors">
              #{String(next.id).padStart(3, '0')}
            </Link>
          ) : (
            <span className="opacity-30">···</span>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
         书页容器 — bg-card 纸面浮于深色桌面
         ════════════════════════════════════════ */}
      <div className="bg-card shadow-2xl px-8 sm:px-16 py-12">

        {/* ── 章节标题区 ── */}
        <OrnamentalRule />
        <div className="text-center space-y-4 py-8">
          <div className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Chapter {String(problem.id).padStart(3, '0')}
          </div>
          <h1 className="text-2xl tracking-wide text-foreground">
            {problem.title}
          </h1>
          <div className="text-sm text-muted-foreground tracking-wider">
            {problem.category}
            <span className="mx-2">·</span>
            <span className={DIFF_COLOR[problem.difficulty]}>{problem.difficulty}</span>
            <span className="mx-2">·</span>
            LC #{problem.leetcodeId}
          </div>
        </div>
        <OrnamentalRule />

        {/* ── 题目描述 — useState 折叠 ── */}
        <div className="mt-8">
          <button
            onClick={() => setDescOpen(!descOpen)}
            className="mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="text-xs">{descOpen ? '▾' : '▸'}</span>
            题目描述
          </button>
          {descOpen && (
            <div className="mt-4 whitespace-pre-line text-sm text-foreground/80 leading-loose px-4">
              {problem.description}
            </div>
          )}
        </div>

        <Divider />

        {/* ── 核心思路 — 左侧金色竖线引用体 ── */}
        <section>
          <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
            核 心 思 路
          </h2>
          <div className="border-l-2 border-primary/30 pl-6 mx-4 sm:mx-8">
            <p className="text-sm text-foreground/90 leading-loose">
              {problem.hint.core}
            </p>
          </div>
        </section>

        <Divider />

        {/* ── 关键步骤 — 中文数字 ── */}
        <section>
          <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
            关 键 步 骤
          </h2>
          <ol className="space-y-3 px-4 sm:px-8">
            {problem.hint.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-none text-primary/70 mt-px">
                  {CN_NUM[i] || i + 1}、
                </span>
                <span className="text-foreground/85 leading-relaxed">{point}</span>
              </li>
            ))}
          </ol>
        </section>

        <Divider />

        {/* ── 解法 — 文字 tab 切换 ── */}
        <section>
          <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
            解　法
          </h2>

          {/* 多解法文字选择器 */}
          {problem.solutions.length > 1 && (
            <div className="flex items-center justify-center gap-1 mb-6 text-sm">
              {problem.solutions.map((sol, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && <span className="mx-2 text-muted-foreground/40">·</span>}
                  <button
                    onClick={() => setActiveSol(i)}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeSol === i
                        ? 'text-foreground border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {sol.name}
                  </button>
                </span>
              ))}
            </div>
          )}

          <SolutionBlock solution={problem.solutions[activeSol]} />
        </section>

        {/* ── 底部导航 ── */}
        <div className="mt-12 border-t border-border pt-6">
          <nav className="flex items-center justify-between text-sm">
            {prev ? (
              <Link
                to={`/problem/${prev.id}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                ← #{String(prev.id).padStart(3, '0')} {prev.title}
              </Link>
            ) : <div />}
            {next ? (
              <Link
                to={`/problem/${next.id}`}
                className="text-muted-foreground hover:text-primary transition-colors text-right"
              >
                #{String(next.id).padStart(3, '0')} {next.title} →
              </Link>
            ) : <div />}
          </nav>
          <div className="text-center text-xs text-muted-foreground/50 mt-4">
            {numId} / {totalProblems}
          </div>
        </div>

      </div>
    </main>
  )
}

/* ════════════════════════════════════════
   单个解法：名称 + 代码 + 复杂度
   ════════════════════════════════════════ */
function SolutionBlock({ solution }) {
  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-muted-foreground">
        {solution.name}
      </div>
      <CodeBlock code={solution.code} />
      <div className="text-center text-xs text-muted-foreground tracking-wider">
        时间 {solution.timeComplexity}　·　空间 {solution.spaceComplexity}
      </div>
    </div>
  )
}
