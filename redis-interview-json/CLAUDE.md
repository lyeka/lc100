# redis-interview-json/
> L2 | 父级: /CLAUDE.md

Redis 面试题，按知识域拆分为独立 JSON 文件。

## 成员清单

01-data-structures.json:  categoryId=1，数据结构与编码原理（8 题）：SDS/dict/ziplist/listpack/quicklist/skiplist/intset/Rax
02-memory-expiry.json:    categoryId=2，过期策略与内存管理（7 题）：惰性删除/定期删除/jemalloc/碎片整理/淘汰策略/COW/Redis vs Memcached
03-persistence.json:      categoryId=3，持久化机制
04-high-availability.json: categoryId=4，高可用架构
05-cache-design.json:     categoryId=5，缓存设计与一致性（7 题）：穿透击穿雪崩/双写一致性/延迟双删Canal/热点Key/布隆过滤器/多级缓存/预热降级
06-lock-transaction.json: categoryId=6，分布式锁与事务（7 题）：SETNX原子性/Redlock争议/Watchdog续期/WATCH乐观锁/Lua原子性/可重入公平锁/事务无回滚
07-performance.json:      categoryId=7，性能优化与线程模型（7 题）：单线程IO多路复用/6.0多线程IO/Pipeline与MGET/BigKey治理/SLOWLOG延迟监控/连接池TCP调优/KEYS与SCAN
08-applications.json:     categoryId=8，应用场景与数据建模（8 题）：ZSet排行榜/滑动窗口限流/延迟队列/HyperLogLog基数/Bitmap签到/GEO地理位置/消息队列三方案/秒杀系统

## 数据 Schema

```json
{
  "id": "R1-01",
  "title": "题目标题",
  "category": "分类中文名",
  "categoryId": 1,
  "level": "L2",
  "background": "可选背景说明",
  "answerPoints": ["要点1", "要点2"],
  "codeExample": { "code": "...", "language": "c", "explanation": "..." },
  "followUp": ["追问1", "追问2"]
}
```

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
