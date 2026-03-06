/**
 * [INPUT]: @/components/ui/* (全量), lucide-react
 * [OUTPUT]: DesignSystem 展示页（路由 /design-system）
 * [POS]: 设计系统文档页，展示颜色 token、排版、组件 showcase、微拟物升级变体对比
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

/* ─── 色板数据 ─── */
const colorTokens = [
  { name: 'background',        cls: 'bg-background border border-border',    label: 'background' },
  { name: 'foreground',        cls: 'bg-foreground',                          label: 'foreground' },
  { name: 'primary',           cls: 'bg-primary',                             label: 'primary' },
  { name: 'primary-foreground',cls: 'bg-primary-foreground border border-border', label: 'primary-fg' },
  { name: 'secondary',         cls: 'bg-secondary',                           label: 'secondary' },
  { name: 'muted',             cls: 'bg-muted',                               label: 'muted' },
  { name: 'muted-foreground',  cls: 'bg-muted-foreground',                    label: 'muted-fg' },
  { name: 'accent',            cls: 'bg-accent',                              label: 'accent' },
  { name: 'accent-foreground', cls: 'bg-accent-foreground',                   label: 'accent-fg' },
  { name: 'destructive',       cls: 'bg-destructive',                         label: 'destructive' },
  { name: 'border',            cls: 'bg-border',                              label: 'border' },
  { name: 'ring',              cls: 'bg-ring',                                label: 'ring' },
  { name: 'chart-1',           cls: 'bg-chart-1',                             label: 'chart-1' },
  { name: 'chart-2',           cls: 'bg-chart-2',                             label: 'chart-2' },
  { name: 'chart-3',           cls: 'bg-chart-3',                             label: 'chart-3' },
  { name: 'chart-4',           cls: 'bg-chart-4',                             label: 'chart-4' },
  { name: 'chart-5',           cls: 'bg-chart-5',                             label: 'chart-5' },
]

/* ─── 板块标题 ─── */
function SectionTitle({ children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground">{children}</h2>
      <Separator className="mt-3" />
    </div>
  )
}

export function DesignSystem() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-20">

      {/* 页头 */}
      <div>
        <Badge variant="secondary" className="mb-3">Amethyst Haze</Badge>
        <h1 className="text-4xl font-bold text-foreground">设计系统</h1>
        <p className="mt-2 text-muted-foreground">
          所有颜色、排版与组件均来自统一的设计 Token，禁止使用硬编码颜色值。
        </p>
      </div>

      {/* ── 色板 ── */}
      <section>
        <SectionTitle>颜色 Token</SectionTitle>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {colorTokens.map(({ name, cls, label }) => (
            <div key={name} className="flex flex-col gap-2">
              <div className={`h-14 w-full rounded-lg ${cls}`} />
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 排版 ── */}
      <section>
        <SectionTitle>排版</SectionTitle>
        <div className="space-y-4">
          <p className="text-5xl font-bold text-foreground">Display / 5xl</p>
          <p className="text-3xl font-semibold text-foreground">Heading / 3xl</p>
          <p className="text-xl font-medium text-foreground">Subheading / xl</p>
          <p className="text-base text-foreground">Body / base — 正文内容，清晰易读</p>
          <p className="text-sm text-muted-foreground">Small / sm · muted — 辅助说明文字</p>
          <p className="font-mono text-sm text-accent-foreground bg-accent px-2 py-1 rounded">
            Code / mono — inline code
          </p>
        </div>
      </section>

      {/* ── 按钮 ── */}
      <section>
        <SectionTitle>按钮</SectionTitle>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* ── 徽标 ── */}
      <section>
        <SectionTitle>徽标 Badge</SectionTitle>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* ── 卡片 ── */}
      <section>
        <SectionTitle>卡片 Card</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['基础卡片', '交互卡片', '数据卡片'].map((title, i) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>颜色来自设计系统 Token #{i + 1}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  所有间距、圆角、阴影均使用设计系统变量，确保视觉一致性。
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 表单控件 ── */}
      <section>
        <SectionTitle>表单控件</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="demo-input">文本输入</Label>
            <Input id="demo-input" placeholder="请输入内容..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-textarea">多行文本</Label>
            <Textarea id="demo-textarea" placeholder="请输入多行内容..." rows={3} />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="demo-switch" />
            <Label htmlFor="demo-switch">开关控件</Label>
          </div>
        </div>
      </section>

      {/* ── 标签页 ── */}
      <section>
        <SectionTitle>标签页 Tabs</SectionTitle>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="components">组件</TabsTrigger>
            <TabsTrigger value="tokens">Token</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 text-sm text-muted-foreground">
            设计系统总览：统一的视觉语言，一致的交互体验。
          </TabsContent>
          <TabsContent value="components" className="mt-4 text-sm text-muted-foreground">
            30+ 个 shadcn/ui 组件，覆盖常见交互场景。
          </TabsContent>
          <TabsContent value="tokens" className="mt-4 text-sm text-muted-foreground">
            颜色、间距、圆角、阴影全部来自 CSS 变量 Token。
          </TabsContent>
        </Tabs>
      </section>

      {/* ── 提示/告警 ── */}
      <section>
        <SectionTitle>提示 Alert</SectionTitle>
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>信息提示</AlertTitle>
            <AlertDescription>这是一条普通的信息提示，使用默认样式。</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>错误提示</AlertTitle>
            <AlertDescription>操作失败，请检查您的输入并重试。</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* ── 头像 / 骨架屏 / 进度条 ── */}
      <section>
        <SectionTitle>反馈组件</SectionTitle>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">头像 Avatar</p>
            <div className="flex gap-3">
              {['AH', 'LC', 'UI'].map((text) => (
                <Avatar key={text}>
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {text}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">进度条 Progress</p>
            <Progress value={33} className="h-2" />
            <Progress value={66} className="h-2" />
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">骨架屏 Skeleton</p>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </section>

      {/* ── 微拟物组件展示 ── */}
      <section>
        <SectionTitle>微拟物光影质感</SectionTitle>
        <p className="mb-8 text-sm text-muted-foreground">
          渐变背景 + 三层阴影（外投影 · 顶部高光 · 底部暗边）+ 微交互。颜色全部来自 CSS 变量 + color-mix 派生。
        </p>

        {/* Button 变体 */}
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">Button — 凸起渐变</p>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>

          {/* Badge 变体 */}
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">Badge — 渐变徽标</p>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Card 变体 */}
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">Card — 凸起 / 内凹变体</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>普通卡片，无额外阴影</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">使用 border + bg-card 基础样式。</p>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated 凸起</CardTitle>
                  <CardDescription>外投影 + 顶部高光</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Hover 时投影加深，浮起感增强。</p>
                </CardContent>
              </Card>
              <Card variant="inset">
                <CardHeader>
                  <CardTitle>Inset 内凹</CardTitle>
                  <CardDescription>inset 阴影模拟按压感</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">适合展示区域或统计面板。</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Input 对比 */}
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">Input — 内凹聚焦</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>常规状态</Label>
                <Input placeholder="点击查看聚焦效果..." />
              </div>
              <div className="space-y-2">
                <Label>表单场景</Label>
                <Input placeholder="内凹阴影 + 聚焦高亮..." />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
