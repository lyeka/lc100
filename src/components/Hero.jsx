/**
 * [INPUT]: framer-motion, lucide-react, @/components/ui/button, @/components/ui/badge
 * [OUTPUT]: Hero 首屏区块组件
 * [POS]: 首页核心视觉组件，展示主标题、描述和 CTA，被 pages/Home.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router'

/* ─── 动画变体 ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
}

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">

      {/* 背景光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-2/3 top-2/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* 徽标 */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
      >
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Amethyst Haze 设计系统
        </Badge>
      </motion.div>

      {/* 主标题 */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.1}
        className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl"
      >
        用设计系统
        <span className="text-primary"> 构建一致的</span>
        <br />
        用户体验
      </motion.h1>

      {/* 副标题 */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.2}
        className="mt-6 max-w-xl text-lg text-muted-foreground"
      >
        基于 shadcn/ui + Tailwind CSS v4 的组件库，每一个颜色、间距、圆角
        都来自统一的设计 token，保证视觉语言的一致性。
      </motion.p>

      {/* CTA 按钮组 */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.3}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link to="/design-system">
          <Button size="lg" className="gap-2">
            浏览设计系统
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Button size="lg" variant="outline">
          查看文档
        </Button>
      </motion.div>

      {/* 统计数字 */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.4}
        className="mt-20 flex flex-wrap items-center justify-center gap-12 text-center"
      >
        {[
          { value: '30+', label: '设计组件' },
          { value: '2', label: '颜色模式' },
          { value: '100%', label: '类型安全' },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-3xl font-bold text-primary">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
