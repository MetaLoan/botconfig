# 🤖🤖 多 Bot 配置指南

## 概述

现在你可以同时运行多个 Telegram Bot，所有 Bot 共享：
- ✅ 相同的学习系统（10章课程）
- ✅ 相同的交互功能
- ✅ 相同的 WebApp 链接
- ✅ 独立的配置和管理

## 🚀 快速开始

### 1. 添加新 Bot 配置

在项目目录创建新的配置文件：

```bash
# 第一个 Bot（已有）
config.json             # 或 config.main.json

# 第二个 Bot
config.bot2.json

# 第三个 Bot（可选）
config.bot3.json

# 备用 Bot（可选）
config.backup.json
```

### 2. 配置文件格式

每个配置文件内容相同：

```json
{
  "BOT_TOKEN": "你的_BOT_TOKEN",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
```

**示例 - config.bot2.json：**
```json
{
  "BOT_TOKEN": "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
```

### 3. 启动所有 Bot

```bash
./start-multi-bot.sh -d
```

**就这么简单！** 所有配置文件会被自动检测并启动。

---

## 📋 管理命令

### 启动所有 Bot（后台）
```bash
./start-multi-bot.sh -d
```

### 启动所有 Bot（前台，调试用）
```bash
./start-multi-bot.sh
```

### 停止所有 Bot
```bash
./stop-multi-bot.sh
```

### 重启所有 Bot
```bash
./restart-multi-bot.sh
```

### 查看日志
```bash
tail -f bot-multi.log
```

---

## 🔍 工作原理

### 自动检测配置

`bot-multi.mjs` 会自动扫描当前目录下所有 `config*.json` 文件（除了 `config.example.json`）并启动对应的 Bot。

**示例：**
```
目录中的文件：
- config.json          → Bot 1 (name: main)
- config.bot2.json     → Bot 2 (name: bot2)
- config.backup.json   → Bot 3 (name: backup)
- config.example.json  → 被忽略
```

### 并行运行

所有 Bot 在同一个进程中**并行**运行：
- 共享课程内容（节省内存）
- 独立处理消息（互不干扰）
- 统一日志管理（便于调试）

### 日志格式

每个 Bot 的日志都有前缀标识：

```
[main] Bot 启动中...
[bot2] Bot 启动中...
[main] WEBAPP_URL = https://...
[bot2] WEBAPP_URL = https://...
[main] 处理消息失败: ...
[bot2] getUpdates 失败...
```

---

## 📊 使用场景

### 场景 1：主 Bot + 备用 Bot

```bash
# config.json - 主 Bot
# config.backup.json - 备用 Bot

./start-multi-bot.sh -d
```

两个 Bot 同时运行，如果主 Bot 有问题，用户可以切换到备用 Bot。

### 场景 2：不同区域/语言的 Bot

```bash
# config.en.json - 英文 Bot
# config.cn.json - 中文 Bot（修改 WEBAPP_URL 到中文站）

./start-multi-bot.sh -d
```

### 场景 3：测试 + 生产环境

```bash
# config.prod.json - 生产 Bot
# config.test.json - 测试 Bot

./start-multi-bot.sh -d
```

---

## 🆚 单 Bot vs 多 Bot

### 单 Bot 模式（原有方式）

```bash
# 启动单个 Bot
./start-bot.sh -d

# 使用 config.json
```

**适合：** 只有一个 Bot 的情况

### 多 Bot 模式（新增）

```bash
# 启动所有 Bot
./start-multi-bot.sh -d

# 使用所有 config*.json
```

**适合：** 需要运行多个 Bot

---

## ⚙️ 配置示例

### 示例 1：添加第二个 Bot

**步骤：**

1. 创建配置文件：
```bash
cat > config.bot2.json << 'EOF'
{
  "BOT_TOKEN": "8888888888:AAH_your_second_bot_token_here",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
EOF
```

2. 启动：
```bash
./start-multi-bot.sh -d
```

3. 验证：
```bash
tail -20 bot-multi.log
# 应该看到两个 Bot 的启动信息
```

### 示例 2：临时禁用某个 Bot

**方法 1：** 重命名配置文件
```bash
mv config.bot2.json config.bot2.json.disabled
./restart-multi-bot.sh
```

**方法 2：** 移到其他目录
```bash
mkdir disabled-bots
mv config.bot2.json disabled-bots/
./restart-multi-bot.sh
```

---

## 🔧 高级配置

### 只启动特定 Bot

如果你想只启动某一个 Bot（不使用 bot-multi.mjs）：

```bash
# 指定配置文件启动单个 Bot
BOT_CONFIG=config.bot2.json node bot.mjs
```

或修改 `bot.mjs` 支持环境变量：
```bash
export BOT_CONFIG=config.bot2.json
./start-bot.sh -d
```

### 不同 WebApp URL

每个 Bot 可以有不同的 WEBAPP_URL：

```json
// config.bot2.json
{
  "BOT_TOKEN": "...",
  "WEBAPP_URL": "https://different-domain.com/"
}
```

---

## ❓ 常见问题

### Q: 可以同时运行单 Bot 和多 Bot 吗？

**不建议。** 会导致冲突。选择一种方式：
- 单 Bot：使用 `./start-bot.sh`
- 多 Bot：使用 `./start-multi-bot.sh`

### Q: 如何知道哪个 Bot 在处理消息？

查看日志前缀：
```bash
tail -f bot-multi.log | grep "\[bot2\]"
```

### Q: 多个 Bot 会消耗更多资源吗？

**内存：** 略微增加（共享代码，只增加连接状态）
**CPU：** 几乎没有影响（消息处理异步）
**网络：** 每个 Bot 独立轮询

### Q: 可以添加多少个 Bot？

理论上无限制，但建议不超过 **10 个**（性能和管理考虑）。

### Q: 多 Bot 模式下如何更新课程内容？

修改 `course-content.mjs` 后重启：
```bash
./restart-multi-bot.sh
```

所有 Bot 自动使用新内容。

---

## 📁 文件结构

```
/Users/leo/Documents/bot/
├── bot.mjs                     # 单 Bot 程序
├── bot-multi.mjs        ⭐️    # 多 Bot 程序（新）
├── course-content.mjs          # 课程内容（共享）
├── config.json                 # Bot 1 配置
├── config.bot2.json     ⭐️    # Bot 2 配置（新）
├── config.example.json         # 配置模板
│
├── start-bot.sh                # 单 Bot 启动
├── stop-bot.sh                 # 单 Bot 停止
├── restart-bot.sh              # 单 Bot 重启
├── status-bot.sh               # 单 Bot 状态
│
├── start-multi-bot.sh   ⭐️    # 多 Bot 启动（新）
├── stop-multi-bot.sh    ⭐️    # 多 Bot 停止（新）
├── restart-multi-bot.sh ⭐️    # 多 Bot 重启（新）
│
├── bot.log                     # 单 Bot 日志
└── bot-multi.log        ⭐️    # 多 Bot 日志（新）
```

---

## 🎯 推荐工作流

### 只有一个 Bot
```bash
./start-bot.sh -d
```

### 有多个 Bot
```bash
./start-multi-bot.sh -d
```

### 添加新 Bot
```bash
# 1. 创建配置
vim config.newbot.json

# 2. 重启（自动检测新配置）
./restart-multi-bot.sh
```

---

## 🎊 总结

**现在你可以轻松运行多个 Bot！**

- ✅ 创建多个 `config*.json` 文件
- ✅ 运行 `./start-multi-bot.sh -d`
- ✅ 所有 Bot 共享课程和功能
- ✅ 独立配置，互不干扰

需要添加第二个 Bot 吗？把 Token 告诉我，我帮你配置好！

