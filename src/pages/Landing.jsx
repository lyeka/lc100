/**
 * [INPUT]: react-router (Link), framer-motion (motion), @/lib/progress (useProgressStats),
 *          @/data/problems, @/data/interviews, @/data/goInterviews, @/data/mysqlInterviews, @/data/redisInterviews, @/data/kafkaInterviews
 * [OUTPUT]: Landing 总目录页 — ZIMA 博物馆画廊风格
 * [POS]: 路由 /，全站入口，Museum Frame + Hero 标题 + 画廊卡片 + 宣言统计
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useProgressStats } from '@/lib/progress'
import { problems, categories } from '@/data/problems'
import { interviews, interviewCategories } from '@/data/interviews'
import { goInterviews, goInterviewCategories } from '@/data/goInterviews'
import { mysqlInterviews, mysqlInterviewCategories } from '@/data/mysqlInterviews'
import { redisInterviews, redisInterviewCategories } from '@/data/redisInterviews'
import { kafkaInterviews, kafkaInterviewCategories } from '@/data/kafkaInterviews'

/* ── 常量 ── */
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

const TOTALS = {
  leetcode: problems.length,
  agent: interviews.length,
  go: goInterviews.length,
  mysql: mysqlInterviews.length,
  redis: redisInterviews.length,
  kafka: kafkaInterviews.length,
}

/* ── 分类预览 ── */
const MAX_PREVIEW = 5

function categoryPreview(cats) {
  const visible = cats.slice(0, MAX_PREVIEW)
  const suffix = cats.length > MAX_PREVIEW ? ' …' : ''
  return visible.join(' · ') + suffix
}

const VOLUMES = [
  {
    title: '题　库',
    subtitle: 'LeetCode Hot 100 · 算法与数据结构',
    to: '/leetcode',
    section: 'leetcode',
    categories: categories,
    preview: categoryPreview(categories),
    total: problems.length,
    image: '/1.png',
  },
  {
    title: 'Agent 面试',
    subtitle: 'AI Agent · 推理架构 · 工具系统 · 多智能体',
    to: '/agent',
    section: 'agent',
    categories: interviewCategories,
    preview: categoryPreview(interviewCategories),
    total: interviews.length,
    image: '/2.png',
  },
  {
    title: 'Go 面试',
    subtitle: '并发模型 · 内存管理 · 接口设计 · 性能调优',
    to: '/go',
    section: 'go',
    categories: goInterviewCategories,
    preview: categoryPreview(goInterviewCategories),
    total: goInterviews.length,
    image: '/3.png',
  },
  {
    title: 'MySQL 面试',
    subtitle: '存储引擎 · 索引原理 · 事务锁机制 · SQL 优化',
    to: '/mysql',
    section: 'mysql',
    categories: mysqlInterviewCategories,
    preview: categoryPreview(mysqlInterviewCategories),
    total: mysqlInterviews.length,
    image: '/4.png',
  },
  {
    title: 'Redis 面试',
    subtitle: '数据结构 · 持久化 · 高可用 · 缓存设计 · 分布式锁',
    to: '/redis',
    section: 'redis',
    categories: redisInterviewCategories,
    preview: categoryPreview(redisInterviewCategories),
    total: redisInterviews.length,
    image: '/5.png',
  },
  {
    title: 'Kafka 面试',
    subtitle: '复制机制 · 精确一次 · 消费者组 · 性能调优 · 运维',
    to: '/kafka',
    section: 'kafka',
    categories: kafkaInterviewCategories,
    preview: categoryPreview(kafkaInterviewCategories),
    total: kafkaInterviews.length,
    image: '/6.png',
  },
]

/* ── 缓出贝塞尔 ── */
const EASE_OUT = [0.16, 1, 0.3, 1]

export function Landing() {
  const stats = useProgressStats(TOTALS)
  const totalAll = TOTALS.leetcode + TOTALS.agent + TOTALS.go + TOTALS.mysql + TOTALS.redis + TOTALS.kafka
  const totalLearned = stats.leetcode.count + stats.agent.count + stats.go.count + stats.mysql.count + stats.redis.count + stats.kafka.count
  const totalCategories = categories.length + interviewCategories.length + goInterviewCategories.length + mysqlInterviewCategories.length + redisInterviewCategories.length + kafkaInterviewCategories.length

  const infoRows = [
    { label: '卷册', value: '六卷' },
    { label: '总题数', value: `${totalAll} 篇` },
    { label: '已完成', value: `${totalLearned} 篇` },
    { label: '分类', value: `${totalCategories} 个` },
  ]

  return (
    <main className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl border-2 border-border rounded-[20px]
                      bg-background/50 backdrop-blur-sm overflow-hidden">

        {/* ════════════════════════════════════════
           Hero — Agentic Interview
           ════════════════════════════════════════ */}
        <motion.section
          className="px-8 pt-20 pb-16 text-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <h1
            className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.85]
                       tracking-tighter bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--primary), var(--chart-1), var(--chart-2))',
            }}
          >
            Agentic
            <br />
            Interview
          </h1>
          <p className="mt-6 text-lg text-muted-foreground tracking-wide">
            算法 · AI Agent · Go · MySQL · Redis · Kafka — 六卷精选
          </p>
          <p className="mt-2 text-sm text-muted-foreground/70">
            {totalAll} 篇 · 已读 {totalLearned}
          </p>
        </motion.section>

        {/* ════════════════════════════════════════
           画廊 — 3 张 Unsplash 卡片
           ════════════════════════════════════════ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-16">
          {VOLUMES.map((vol, i) => {
            const s = stats[vol.section]
            return (
              <motion.div
                key={vol.section}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_OUT }}
              >
                <Link to={vol.to} className="block rounded-3xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <div className="group relative overflow-hidden rounded-3xl cursor-pointer bg-muted aspect-[3/4]">

                    {/* 图片层 */}
                    <img
                      src={vol.image}
                      alt=""
                      role="presentation"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                                 group-hover:scale-[1.08]"
                    />

                    {/* 常驻底部暗角 — 保证默认标题可读 */}
                    <div className="absolute inset-0
                                    bg-gradient-to-t from-[var(--gallery-overlay)] via-transparent to-transparent" />

                    {/* 默认标题 — 卡片底部 */}
                    <div className="absolute bottom-0 inset-x-0 p-6 z-10
                                    transition-opacity duration-300 group-hover:opacity-0">
                      <span className="text-[11px] uppercase tracking-[0.4em] text-gallery-overlay-fg" style={{ opacity: 0.7 }}>
                        Part {ROMAN[i]}
                      </span>
                      <p className="text-xl tracking-wider text-gallery-overlay-fg">
                        {vol.title}
                      </p>
                    </div>

                    {/* Hover overlay — 全覆盖暗层 + 详细信息 */}
                    <div className="absolute inset-0 z-20
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-500"
                         style={{
                           background: 'linear-gradient(to bottom, transparent 10%, var(--gallery-overlay) 60%)',
                         }}>
                      <div className="absolute bottom-0 inset-x-0 p-6
                                      translate-y-4 group-hover:translate-y-0
                                      transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-gallery-overlay-fg mb-1" style={{ opacity: 0.6 }}>
                          Part {ROMAN[i]}
                        </p>
                        <h3 className="text-xl text-gallery-overlay-fg font-medium mb-2">
                          {vol.title}
                        </h3>
                        <p className="text-sm text-gallery-overlay-fg mb-1" style={{ opacity: 0.8 }}>
                          {vol.subtitle}
                        </p>
                        <p className="text-xs text-gallery-overlay-fg mb-3" style={{ opacity: 0.6 }}>
                          {vol.preview}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gallery-overlay-fg" style={{ opacity: 0.6 }}>
                          <span>{vol.categories.length} 分类 · {vol.total} 篇</span>
                          <span>{s.count} / {s.total}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            )
          })}
        </section>

        {/* ════════════════════════════════════════
           宣言 + 统计 — Content Split
           ════════════════════════════════════════ */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* 左列：宣言 */}
          <div className="flex items-center justify-center p-12 md:p-16 md:border-r md:border-border">
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
                从困惑
                <br />
                到彼岸
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                六卷精选 · {totalAll} 道题 · 认知跃迁
              </p>
            </div>
          </div>

          {/* 右列：统计行 */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between py-4
                           border-t border-border last:border-b last:border-border"
              >
                <span className="text-sm font-medium text-foreground">{row.label}</span>
                <span className="text-sm text-muted-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  )
}
