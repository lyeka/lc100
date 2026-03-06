/**
 * [INPUT]: react, react-dom/client, @/components/ui/tooltip, ./index.css, ./App.jsx
 * [OUTPUT]: 无，副作用：将 App 挂载至 #root，注入 TooltipProvider
 * [POS]: 应用启动点，唯一的 DOM 挂载操作
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </StrictMode>,
)
