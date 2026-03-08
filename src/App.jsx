/**
 * [INPUT]: react-router, @/components/Header, @/components/Footer, @/pages/*
 * [OUTPUT]: App 根组件，包含路由结构和全局布局
 * [POS]: 应用入口，定义路由树，组合 Header + 页面内容 + Footer
 *        路由：/, /leetcode, /problem/:id, /agent, /agent/:id, /go, /go/:id, /mysql, /mysql/:id, /redis, /redis/:id, /design-system
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BrowserRouter, Routes, Route } from 'react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Landing } from '@/pages/Landing'
import { Home } from '@/pages/Home'
import { ProblemDetail } from '@/pages/ProblemDetail'
import { AgentHome } from '@/pages/AgentHome'
import { AgentDetail } from '@/pages/AgentDetail'
import { GoHome } from '@/pages/GoHome'
import { GoDetail } from '@/pages/GoDetail'
import { MysqlHome } from '@/pages/MysqlHome'
import { MysqlDetail } from '@/pages/MysqlDetail'
import { RedisHome } from '@/pages/RedisHome'
import { RedisDetail } from '@/pages/RedisDetail'
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
          <Route path="/" element={<Landing />} />
          <Route path="/leetcode" element={<Home />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/agent" element={<AgentHome />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/go" element={<GoHome />} />
          <Route path="/go/:id" element={<GoDetail />} />
          <Route path="/mysql" element={<MysqlHome />} />
          <Route path="/mysql/:id" element={<MysqlDetail />} />
          <Route path="/redis" element={<RedisHome />} />
          <Route path="/redis/:id" element={<RedisDetail />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
