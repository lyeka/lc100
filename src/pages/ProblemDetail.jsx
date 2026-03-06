/**
 * [INPUT]: react-router (useParams, Link), @/data/problems, @/components/CodeBlock,
 *          @/components/ui/button, tabs, accordion, lucide-react
 * [OUTPUT]: ProblemDetail 古典书籍章节阅读页
 * [POS]: 路由 /problem/:id，全站阅读体验核心
 *        阅读节奏：章节标题 → 描述(折叠) → · · · → 核心思路(引用体) → · · · → 关键步骤(中文数字) → · · · → 代码 → 导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useParams, Link } from 'react-router'
import { problemMap } from '@/data/problems'
import { CodeBlock } from '@/components/CodeBlock'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/* ── 中文数字 ── */
const CN_NUM = ['一','二','三','四','五','六','七','八','九','十','十一','十二']

/* ── 难度颜色 ── */
const DIFF_COLOR = {
  Easy:   'text-chart-3',
  Medium: 'text-chart-4',
  Hard:   'text-destructive',
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

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">

      {/* ════════════════════════════════════════
         顶部导航
         ════════════════════════════════════════ */}
      <div className="flex items-center justify-between mb-8">
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
         章节标题区 — 居中，仪式感
         ════════════════════════════════════════ */}
      <div className="border-y border-border py-10 mb-8">
        <div className="text-center space-y-4">
          {/* CHAPTER 编号 */}
          <div className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Chapter {String(problem.id).padStart(3, '0')}
          </div>

          {/* 标题 */}
          <h1 className="text-2xl tracking-wide text-foreground">
            {problem.title}
          </h1>

          {/* 元信息 */}
          <div className="text-sm text-muted-foreground tracking-wider">
            {problem.category}
            <span className="mx-2">·</span>
            <span className={DIFF_COLOR[problem.difficulty]}>{problem.difficulty}</span>
            <span className="mx-2">·</span>
            LC #{problem.leetcodeId}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
         题目描述 — 折叠（复习者通常已知题意）
         ════════════════════════════════════════ */}
      <Accordion type="single" collapsible>
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="py-3 text-sm text-muted-foreground hover:text-foreground justify-center gap-2">
            题目描述
          </AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-line text-sm text-foreground/80 leading-loose px-4">
              {problem.description}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Divider />

      {/* ════════════════════════════════════════
         核心思路 — 引用体排版
         ════════════════════════════════════════ */}
      <section>
        <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
          核 心 思 路
        </h2>
        <div className="px-8 sm:px-12">
          <p className="text-sm text-foreground/90 leading-loose text-center">
            <span className="text-primary/50">「</span>
            {problem.hint.core}
            <span className="text-primary/50">」</span>
          </p>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════
         关键步骤 — 中文数字，直接展示
         ════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════
         代码实现
         ════════════════════════════════════════ */}
      <section>
        <h2 className="text-center text-sm tracking-[0.3em] text-foreground mb-6">
          解　法
        </h2>

        {problem.solutions.length === 1 ? (
          <SolutionBlock solution={problem.solutions[0]} />
        ) : (
          <Tabs defaultValue="0">
            <TabsList className="mx-auto w-fit">
              {problem.solutions.map((sol, i) => (
                <TabsTrigger key={i} value={String(i)}>{sol.name}</TabsTrigger>
              ))}
            </TabsList>
            {problem.solutions.map((sol, i) => (
              <TabsContent key={i} value={String(i)} className="mt-4">
                <SolutionBlock solution={sol} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>

      {/* ════════════════════════════════════════
         底部导航
         ════════════════════════════════════════ */}
      <div className="mt-12 border-t border-border pt-6">
        <nav className="flex items-center justify-between">
          {prev ? (
            <Link to={`/problem/${prev.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="size-4" />
              <span>#{String(prev.id).padStart(3, '0')} {prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/problem/${next.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <span>#{String(next.id).padStart(3, '0')} {next.title}</span>
              <ChevronRight className="size-4" />
            </Link>
          ) : <div />}
        </nav>
      </div>
    </main>
  )
}

/* ════════════════════════════════════════
   单个解法：名称 + 代码 + 复杂度（居中）
   ════════════════════════════════════════ */
function SolutionBlock({ solution }) {
  return (
    <div className="space-y-4">
      {/* 解法名 */}
      <div className="text-center text-sm text-muted-foreground">
        {solution.name}
      </div>

      {/* 代码 */}
      <CodeBlock code={solution.code} />

      {/* 复杂度 — 居中，小号 */}
      <div className="text-center text-xs text-muted-foreground tracking-wider">
        时间 {solution.timeComplexity}　·　空间 {solution.spaceComplexity}
      </div>
    </div>
  )
}
