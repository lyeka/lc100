/**
 * [INPUT]: react 的 useSyncExternalStore
 * [OUTPUT]: useProgress hook、useProgressStats hook — 学习进度响应式状态
 * [POS]: lib 层的进度追踪核心，被 LearnedStamp / Header / Home 等消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useSyncExternalStore, useCallback } from 'react'

/* ── 常量 ── */
const STORAGE_KEY = 'lc100-progress'
const EMPTY = { leetcode: [], agent: [], go: [], mysql: [], redis: [], kafka: [] }

/* ── 内部状态 ── */
let listeners = new Set()
let cache = null          // { raw: object, sets: { leetcode: Set, ... } }

/* ── 从 raw 对象构建 cache（原子操作，保证 getSnapshot 引用稳定性）── */
function buildCache(raw) {
  return {
    raw,
    sets: {
      leetcode: new Set(raw.leetcode || []),
      agent:    new Set(raw.agent || []),
      go:       new Set(raw.go || []),
      mysql:    new Set(raw.mysql || []),
      redis:    new Set(raw.redis || []),
      kafka:    new Set(raw.kafka || []),
    },
  }
}

function read() {
  if (cache) return cache
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    cache = buildCache(stored ? JSON.parse(stored) : EMPTY)
  } catch {
    cache = buildCache(EMPTY)
  }
  return cache
}

/* ── 写入：同步重建 cache 后再通知，避免 getSnapshot 引用不一致 ── */
function write(raw) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  cache = buildCache(raw)
  listeners.forEach(l => l())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return read()
}

/* ── 跨 tab 同步（HMR 防重复注册）── */
let _storageListenerBound = false
if (typeof window !== 'undefined' && !_storageListenerBound) {
  _storageListenerBound = true
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      cache = null
      read()                          // 立即重建 cache
      listeners.forEach(l => l())
    }
  })
}

/* ── Hook: 单 section 进度 ── */
export function useProgress(section, total) {
  const store = useSyncExternalStore(subscribe, getSnapshot)
  const set = store.sets[section]
  const count = set.size

  const isLearned = useCallback((id) => store.sets[section].has(id), [store, section])

  const toggle = useCallback((id) => {
    /* 直接从 localStorage 读最新值，避免 cache 可能的竞态 */
    let raw
    try {
      raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || EMPTY
    } catch { raw = EMPTY }
    const arr = raw[section] || []
    const idx = arr.indexOf(id)
    const next = { ...raw, [section]: idx >= 0 ? arr.filter(x => x !== id) : [...arr, id] }
    write(next)
  }, [section])

  return { isLearned, toggle, count, total, percent: total ? Math.round(count / total * 100) : 0 }
}

/* ── Hook: 全局进度统计（供 Header）── */
export function useProgressStats(totals) {
  const store = useSyncExternalStore(subscribe, getSnapshot)
  const stat = (section) => {
    const count = store.sets[section].size
    const total = totals[section] || 0
    return { count, total, percent: total ? Math.round(count / total * 100) : 0 }
  }
  return { leetcode: stat('leetcode'), agent: stat('agent'), go: stat('go'), mysql: stat('mysql'), redis: stat('redis'), kafka: stat('kafka') }
}
