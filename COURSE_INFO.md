# 📚 Crypto Contract Trading Course

## 课程概述

一套完整的加密货币合约交易教学系统，直接集成在 Telegram Bot 内，用户无需离开 Telegram 即可学习。

## 课程结构（10章）

### 📖 Chapter 1: Introduction to Crypto Trading
- 什么是合约交易
- 与现货交易的区别
- 衍生品基础概念
- 永续合约 vs 期货合约

### 🔄 Chapter 2: Understanding Contracts
- 现货 vs 合约交易对比
- 永续合约详解
- 季度/月度期货
- 期权合约入门
- 合约规格说明

### ⚡ Chapter 3: Leverage & Margin Explained
- 杠杆原理
- 初始保证金 vs 维持保证金
- 全仓 vs 逐仓保证金
- 杠杆倍数选择（2x-125x）
- 实际案例计算

### 📈📉 Chapter 4: Long & Short Positions
- 做多（Long）策略
- 做空（Short）策略
- 入场和出场点位
- 仓位管理（2%规则）
- 多仓位策略

### 🛡️ Chapter 5: Risk Management
- 资金管理黄金法则
- 止损订单设置
- 风险回报比（最低1:2）
- 分散投资策略
- 杠杆控制
- 账户管理

### 📊 Chapter 6: Technical Analysis Basics
- 趋势线识别
- 支撑位与阻力位
- 经典图表形态
- 核心技术指标：
  - 移动平均线（MA）
  - 相对强弱指标（RSI）
  - MACD
  - 布林带
  - 成交量分析
- 多时间框架分析

### 🎯 Chapter 7: Order Types & Execution
- 市价单 vs 限价单
- 止损单设置
- 止损限价单
- 止盈单
- 跟踪止损
- OCO订单（一取消全）
- 冰山订单
- 只挂单（Post-Only）
- 订单执行策略

### ⚠️ Chapter 8: Understanding Liquidation
- 什么是强平
- 强平价格计算
- 强平过程
- 防止强平的方法
- 爆仓费用
- 连环爆仓
- 应急措施

### 🧠 Chapter 9: Trading Psychology
- 交易者情绪周期
- 常见心理陷阱：
  - FOMO（错失恐惧）
  - 复仇交易
  - 过度自信
  - 分析瘫痪
  - 确认偏误
  - 损失厌恶
- 交易者思维培养
- 压力管理
- 纪律建立

### 🚫 Chapter 10: Common Mistakes to Avoid
- 25个常见错误及解决方案
- 按级别分类：
  - 新手错误（过度杠杆、无止损等）
  - 中级错误（复仇交易、移动止损等）
  - 高级错误（忽视市场结构等）
  - 心理错误（情绪交易等）
  - 账户管理错误
  - 技术错误

## 使用方式

### 在 Telegram 中：

1. **打开你的 Bot**（`@cryptozerodotcom_bot`）

2. **发送 `/start`** 会看到两个按钮：
   - 📚 **Start Learning (In Bot)** - 在 Bot 内学习
   - 🌐 **Open Full Academy** - 打开完整网站

3. **点击 "Start Learning"** 进入课程目录

4. **选择章节** 开始学习

5. **使用导航按钮**：
   - ⬅️ **Previous** - 上一章
   - 📚 **Menu** - 返回目录
   - **Next** ➡️ - 下一章

## 课程特点

### ✅ 内容深度
- 每章 500-1000 字详细讲解
- 实际案例和计算
- 实用技巧和清单
- 专业级别的知识体系

### ✅ 交互式学习
- 在 Telegram 内完成所有学习
- 按钮导航，操作简单
- 随时中断，随时继续
- 支持 Markdown 格式，阅读体验好

### ✅ 结构化课程
- 从基础到进阶
- 10章系统学习路径
- 每章独立又相互关联
- 适合不同水平的交易者

## 课程内容亮点

### 实用工具
- 仓位计算公式
- 强平价格计算器
- 风险管理清单
- 交易前检查清单

### 真实案例
- 具体数字的盈亏计算
- 不同杠杆的对比
- 历史爆仓事件分析

### 错误避免
- 25+ 常见错误
- 每个错误的解决方案
- 从失败中学习

## 技术实现

### Bot 功能
- 消息处理（/start 命令）
- 回调查询处理（按钮点击）
- 动态消息编辑
- Markdown 渲染

### 课程系统
- 模块化章节内容（`course-content.mjs`）
- 自动导航生成
- 章节前后关联
- 易于扩展和维护

## 未来扩展

可以轻松添加：
- 更多章节
- 章节测验
- 学习进度追踪
- 证书颁发
- 交易模拟器链接
- 社区讨论群组

## 维护说明

### 添加新章节
1. 在 `course-content.mjs` 的 `chapters` 对象中添加新章节
2. 在 `courseStructure.main_menu.chapters` 数组中添加章节 ID
3. 设置 `prev` 和 `next` 链接
4. 重启 Bot

### 修改现有内容
1. 编辑 `course-content.mjs` 中对应章节的 `content` 字段
2. 保存后重启 Bot 即可生效

---

**现在用户可以在 Telegram Bot 内完整学习加密货币合约交易！** 🎓



