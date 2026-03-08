/**
 * [INPUT]: 无外部依赖，纯数据模块
 * [OUTPUT]: 5 套 Prism 主题对象 (navy, parchment, ivory, papyrus, vintageGreen) + THEME_MAP + useCodeTheme hook
 * [POS]: CodeBlock 的语法高亮色彩配置，每套主题匹配对应的书页风格
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState, useEffect } from 'react'

/* ══════════════════════════════════════════════════════════
   海军蓝 — 深夜书房，冷色墨水印刷
   ══════════════════════════════════════════════════════════ */
const navy = {
  plain: { color: '#d6deeb', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'],  style: { color: '#637777', fontStyle: 'italic' } },
    { types: ['punctuation'],                              style: { color: '#7fdbca' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'], style: { color: '#f78c6c' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin'], style: { color: '#addb67' } },
    { types: ['operator', 'entity', 'url'],                style: { color: '#7fdbca' } },
    { types: ['atrule', 'attr-value', 'keyword'],          style: { color: '#c792ea' } },
    { types: ['function', 'class-name'],                   style: { color: '#82aaff' } },
    { types: ['regex', 'important', 'variable'],           style: { color: '#d6deeb' } },
  ],
}

/* ══════════════════════════════════════════════════════════
   羊皮纸 — 铁胆墨汁印刷的古籍，暖色低饱和
   ══════════════════════════════════════════════════════════ */
const parchment = {
  plain: { color: '#4a3728', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'],  style: { color: '#9b8b7a', fontStyle: 'italic' } },
    { types: ['punctuation'],                              style: { color: '#6b5a45' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'], style: { color: '#8b6914' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin'], style: { color: '#5a7a4a' } },
    { types: ['operator', 'entity', 'url'],                style: { color: '#7a6040' } },
    { types: ['atrule', 'attr-value', 'keyword'],          style: { color: '#8b4513' } },
    { types: ['function', 'class-name'],                   style: { color: '#6b4e2a' } },
    { types: ['regex', 'important', 'variable'],           style: { color: '#4a3728' } },
  ],
}

/* ══════════════════════════════════════════════════════════
   象牙白 — 现代阅读器，干净清冷，GitHub Light 风
   ══════════════════════════════════════════════════════════ */
const ivory = {
  plain: { color: '#24292e', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'],  style: { color: '#6a737d', fontStyle: 'italic' } },
    { types: ['punctuation'],                              style: { color: '#24292e' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'], style: { color: '#005cc5' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin'], style: { color: '#032f62' } },
    { types: ['operator', 'entity', 'url'],                style: { color: '#d73a49' } },
    { types: ['atrule', 'attr-value', 'keyword'],          style: { color: '#d73a49' } },
    { types: ['function', 'class-name'],                   style: { color: '#6f42c1' } },
    { types: ['regex', 'important', 'variable'],           style: { color: '#e36209' } },
  ],
}

/* ══════════════════════════════════════════════════════════
   莎草纸 — 中世纪手抄本，浓郁暖褐
   ══════════════════════════════════════════════════════════ */
const papyrus = {
  plain: { color: '#3a2518', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'],  style: { color: '#8a7a68', fontStyle: 'italic' } },
    { types: ['punctuation'],                              style: { color: '#5a4535' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'], style: { color: '#7a5c12' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin'], style: { color: '#4a6a30' } },
    { types: ['operator', 'entity', 'url'],                style: { color: '#6b4e30' } },
    { types: ['atrule', 'attr-value', 'keyword'],          style: { color: '#7a3b10' } },
    { types: ['function', 'class-name'],                   style: { color: '#5a3a18' } },
    { types: ['regex', 'important', 'variable'],           style: { color: '#3a2518' } },
  ],
}

/* ══════════════════════════════════════════════════════════
   复古绿 — 深墨绿书封，铜金装饰，磷屏余晖
   ══════════════════════════════════════════════════════════ */
const vintageGreen = {
  plain: { color: '#d6ebd6', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'],  style: { color: '#637766', fontStyle: 'italic' } },
    { types: ['punctuation'],                              style: { color: '#7fdb8a' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'], style: { color: '#f7a86c' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin'], style: { color: '#addb67' } },
    { types: ['operator', 'entity', 'url'],                style: { color: '#7fdb8a' } },
    { types: ['atrule', 'attr-value', 'keyword'],          style: { color: '#c79a5a' } },
    { types: ['function', 'class-name'],                   style: { color: '#82aaaa' } },
    { types: ['regex', 'important', 'variable'],           style: { color: '#d6ebd6' } },
  ],
}

/* ── 主题映射：app theme class → Prism theme ── */
const THEME_MAP = {
  '':                navy,
  'theme-parchment': parchment,
  'theme-ivory':     ivory,
  'theme-papyrus':        papyrus,
  'theme-vintage-green':  vintageGreen,
}

/* ── 读取当前 app 主题 ── */
function getCurrentTheme() {
  const cl = document.documentElement.classList
  if (cl.contains('theme-parchment')) return 'theme-parchment'
  if (cl.contains('theme-ivory'))     return 'theme-ivory'
  if (cl.contains('theme-papyrus'))        return 'theme-papyrus'
  if (cl.contains('theme-vintage-green'))  return 'theme-vintage-green'
  return ''
}

/* ── Hook：监听 <html> class 变化，返回对应 Prism 主题 ── */
export function useCodeTheme() {
  const [theme, setTheme] = useState(getCurrentTheme)

  useEffect(() => {
    const ob = new MutationObserver(() => setTheme(getCurrentTheme()))
    ob.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => ob.disconnect()
  }, [])

  return THEME_MAP[theme] || navy
}
