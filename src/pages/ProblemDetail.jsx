/**
 * [INPUT]: react-router (useParams, Link), @/data/problems, @/components/CodeBlock,
 *          @/components/ui/card, badge, button, tabs, accordion, separator, lucide-react
 * [OUTPUT]: ProblemDetail 题目详情页
 * [POS]: 路由 /problem/:id，全站阅读体验核心
 *        阅读节奏：标题 → 描述(折叠) → 核心思路(突出) → 关键步骤(渐进) → 代码(高亮) → 导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useParams, Link } from 'react-router'
import { problems, problemMap } from '@/data/problems'
import { CodeBlock } from '@/components/CodeBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ListOrdered,
  Clock,
  HardDrive,
} from 'lucide-react'

/* ── 难度颜色 ── */
const DIFF = {
  Easy:   'bg-chart-3/15 text-chart-3 border border-chart-3/30',
  Medium: 'bg-chart-4/15 text-chart-4 border border-chart-4/30',
  Hard:   'bg-destructive/15 text-destructive border border-destructive/30',
}

export function ProblemDetail() {
  const { id } = useParams()
  const numId = Number(id)
  const problem = problemMap.get(numId)

  /* ── 404 ── */
  if (!problem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-lg text-muted-foreground">题目不存在</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">返回题库</Button>
        </Link>
      </main>
    )
  }

  const prev = problemMap.get(numId - 1)
  const next = problemMap.get(numId + 1)

  return (
    <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">

      {/* ════════════════════════════════════════
         顶部导航：返回 + 上下题
         ════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="size-4" />
            题库
          </Button>
        </Link>
        <div className="flex items-center gap-1">
          {prev ? (
            <Link to={`/problem/${prev.id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="size-4" />
                #{String(prev.id).padStart(3, '0')}
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="sm" disabled className="gap-1">
              <ChevronLeft className="size-4" />
            </Button>
          )}
          {next ? (
            <Link to={`/problem/${next.id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                #{String(next.id).padStart(3, '0')}
                <ChevronRight className="size-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="sm" disabled className="gap-1">
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
         标题区：题号 · 标题 + 难度 + 分类 + LC 编号
         ════════════════════════════════════════ */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          #{String(problem.id).padStart(3, '0')} · {problem.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge className={DIFF[problem.difficulty]}>{problem.difficulty}</Badge>
          <Badge variant="outline">{problem.category}</Badge>
          <span className="text-xs text-muted-foreground">
            LeetCode #{problem.leetcodeId}
          </span>
        </div>
      </div>

      <Separator />

      {/* ════════════════════════════════════════
         题目描述 — 默认折叠（复习者通常已知题意）
         ════════════════════════════════════════ */}
      <Accordion type="single" collapsible>
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            题目描述
          </AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-line text-sm text-foreground/90 leading-relaxed">
              {problem.description}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ════════════════════════════════════════
         核心思路 — 最大视觉权重，elevated Card
         这是用户来这个网站的原因
         ════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="size-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">核心思路</h2>
        </div>
        <Card variant="elevated" className="border-primary/20">
          <CardContent className="pt-5">
            <p className="text-sm text-foreground leading-relaxed">
              {problem.hint.core}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ════════════════════════════════════════
         关键步骤 — Accordion 渐进展开
         ════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <ListOrdered className="size-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">关键步骤</h2>
        </div>
        <Accordion type="single" collapsible defaultValue="steps">
          <AccordionItem value="steps" className="border-none">
            <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:text-foreground">
              {problem.hint.keyPoints.length} 个步骤
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-2 text-sm text-foreground/90">
                {problem.hint.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-none text-xs font-mono text-primary mt-0.5">
                      {i + 1}.
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
         代码实现 — Tabs 切换多解法 + CodeBlock 高亮
         ════════════════════════════════════════ */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">解法</h2>

        {problem.solutions.length === 1 ? (
          /* 单解法：直接展示 */
          <SolutionBlock solution={problem.solutions[0]} />
        ) : (
          /* 多解法：Tabs 切换 */
          <Tabs defaultValue="0">
            <TabsList>
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

      <Separator />

      {/* ════════════════════════════════════════
         底部导航：prev / next
         ════════════════════════════════════════ */}
      <nav className="flex items-center justify-between py-4">
        {prev ? (
          <Link to={`/problem/${prev.id}`} className="group">
            <div className="text-xs text-muted-foreground mb-1">上一题</div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              <ChevronLeft className="size-4" />
              #{String(prev.id).padStart(3, '0')} {prev.title}
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/problem/${next.id}`} className="group text-right">
            <div className="text-xs text-muted-foreground mb-1">下一题</div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              #{String(next.id).padStart(3, '0')} {next.title}
              <ChevronRight className="size-4" />
            </div>
          </Link>
        ) : <div />}
      </nav>

    </main>
  )
}

/* ════════════════════════════════════════
   单个解法区块：名称 + 复杂度 + 代码
   ════════════════════════════════════════ */
function SolutionBlock({ solution }) {
  return (
    <div className="space-y-3">
      {/* 解法名 + 复杂度 */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="font-medium text-foreground">{solution.name}</span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="size-3.5" />
          <span>时间 {solution.timeComplexity}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <HardDrive className="size-3.5" />
          <span>空间 {solution.spaceComplexity}</span>
        </div>
      </div>

      {/* 代码 */}
      <CodeBlock code={solution.code} />
    </div>
  )
}
