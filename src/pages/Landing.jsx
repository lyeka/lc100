/**
 * [INPUT]: react-router (Link), framer-motion (motion), @/lib/progress (useProgressStats),
 *          @/data/problems, @/data/interviews, @/data/goInterviews
 * [OUTPUT]: Landing 总目录页
 * [POS]: 路由 /，全站入口，三卷导航 + 总数统计，设计语言与 Home/AgentHome/GoHome 完全一致
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useProgressStats } from '@/lib/progress'
import { problems, categories } from '@/data/problems'
import { interviews, interviewCategories } from '@/data/interviews'
import { goInterviews, goInterviewCategories } from '@/data/goInterviews'

/* ── 常量 ── */
const ROMAN = ['I', 'II', 'III']

const TOTALS = {
  leetcode: problems.length,
  agent: interviews.length,
  go: goInterviews.length,
}

const VOLUMES = [
  {
    title: '题　库',
    subtitle: 'LeetCode Hot 100 · 算法与数据结构',
    to: '/leetcode',
    section: 'leetcode',
    categories: categories,
    total: problems.length,
  },
  {
    title: 'Agent 面试',
    subtitle: 'AI Agent · 推理架构 · 工具系统 · 多智能体',
    to: '/agent',
    section: 'agent',
    categories: interviewCategories,
    total: interviews.length,
  },
  {
    title: 'Go 面试',
    subtitle: '并发模型 · 内存管理 · 接口设计 · 性能调优',
    to: '/go',
    section: 'go',
    categories: goInterviewCategories,
    total: goInterviews.length,
  },
]

/* ── 分类预览：最多显示 5 个，超出加 … ── */
const MAX_PREVIEW = 5

function categoryPreview(cats) {
  const visible = cats.slice(0, MAX_PREVIEW)
  const suffix = cats.length > MAX_PREVIEW ? ' …' : ''
  return visible.join(' · ') + suffix
}

export function Landing() {
  const stats = useProgressStats(TOTALS)
  const totalAll = TOTALS.leetcode + TOTALS.agent + TOTALS.go
  const totalLearned = stats.leetcode.count + stats.agent.count + stats.go.count

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      {/* ════════════════════════════════════════
         标题区 — 与 Home.jsx 同款
         ════════════════════════════════════════ */}
      <div className="text-center mb-12">
        <h1 className="text-2xl tracking-[0.3em] text-foreground mb-4">
          ·　目　录　·
        </h1>
        <div className="flex items-center justify-center gap-3 text-primary/40 text-sm mb-6">
          <span>─────────</span>
          <span className="text-primary">✦</span>
          <span>─────────</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {totalAll} 篇 · 已读 {totalLearned}
        </p>
      </div>

      {/* ════════════════════════════════════════
         三卷条目
         ════════════════════════════════════════ */}
      <div className="space-y-12">
        {VOLUMES.map((vol, i) => {
          const s = stats[vol.section]
          return (
            <motion.div
              key={vol.section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={vol.to}
                className="group block py-4 px-4 -mx-4 transition-colors hover:bg-card/50"
              >
                {/* PART 标题 */}
                <div className="mb-4">
                  <div className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-1">
                    Part {ROMAN[i]}
                  </div>
                  <div className="text-lg tracking-[0.15em] text-foreground group-hover:text-primary transition-colors">
                    {vol.title}
                  </div>
                  <div className="mt-2 w-full border-t border-border" />
                </div>

                {/* 副标题 */}
                <p className="text-sm text-muted-foreground mb-3">
                  {vol.subtitle}
                </p>

                {/* 分类预览 */}
                <p className="text-xs text-muted-foreground/70 mb-4">
                  {categoryPreview(vol.categories)}
                </p>

                {/* 统计行 + 点引线 + 进度 */}
                <div className="flex items-baseline gap-3">
                  <span className="flex-none text-xs text-muted-foreground">
                    {vol.categories.length} 个分类 · {vol.total} 篇
                  </span>
                  <span className="flex-1 border-b border-dotted border-border/50 translate-y-[-4px] min-w-[20px]" />
                  <span className="flex-none text-xs text-primary/70">
                    {s.count} / {s.total}
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
