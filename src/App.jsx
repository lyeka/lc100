/**
 * [INPUT]: react-router, @/components/Header, @/components/Footer, @/pages/*
 * [OUTPUT]: App 根组件，包含路由结构和全局布局
 * [POS]: 应用入口，定义路由树，组合 Header + 页面内容 + Footer
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BrowserRouter, Routes, Route } from 'react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { ProblemDetail } from '@/pages/ProblemDetail'
import { DesignSystem } from '@/pages/DesignSystem'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
