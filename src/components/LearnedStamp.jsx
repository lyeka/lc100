/**
 * [INPUT]: framer-motion (motion), lucide-react (BookmarkCheck), @/lib/progress (useProgress)
 * [OUTPUT]: LearnedStamp 组件 — 印章式学习标记按钮
 * [POS]: Detail 页面的学习标记主触点，被 ProblemDetail / AgentDetail / GoDetail 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { BookmarkCheck } from 'lucide-react'
import { useProgress } from '@/lib/progress'

export function LearnedStamp({ section, id, total }) {
  const { isLearned, toggle } = useProgress(section, total)
  const learned = isLearned(id)

  return (
    <div className="flex justify-center py-4">
      <motion.button
        onClick={() => toggle(id)}
        whileTap={{ scale: 0.85 }}
        animate={{ scale: learned ? [1.08, 1] : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-pressed={learned}
        aria-label={learned ? '取消已学标记' : '标记为已学'}
        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 select-none ${
          learned
            ? 'text-primary'
            : 'text-muted-foreground/30 hover:text-muted-foreground/60'
        }`}
      >
        <BookmarkCheck
          size={18}
          className={`transition-all duration-300 ${learned ? 'fill-primary/20' : ''}`}
        />
        <span className="text-xs tracking-wider">
          {learned ? '已学' : '标记已学'}
        </span>
      </motion.button>
    </div>
  )
}
