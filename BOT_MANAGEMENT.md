# 🤖 Bot 管理脚本使用指南

## 快速命令

### 🚀 启动 Bot

**前台模式（日志直接显示）：**
```bash
./start-bot.sh
```
- 按 `Ctrl+C` 停止 Bot
- 适合调试和查看实时日志

**后台模式（推荐日常使用）：**
```bash
./start-bot.sh -d
# 或
./start-bot.sh --daemon
```
- Bot 在后台运行
- 日志输出到 `bot.log`
- 关闭终端后继续运行

---

### 🛑 停止 Bot

```bash
./stop-bot.sh
```
- 停止所有正在运行的 Bot 进程
- 自动清理 caffeinate 进程

---

### 🔄 重启 Bot

```bash
./restart-bot.sh
```
- 自动停止旧进程
- 启动新实例（后台模式）
- 适合更新配置/代码后使用

---

## 功能说明

### start-bot.sh 特性

✅ **自动检测并清理旧进程**
- 启动前检查是否有 Bot 在运行
- 自动停止所有旧进程
- 确保只有一个实例运行

✅ **防止多实例冲突**
- 避免 "terminated by other getUpdates" 错误
- 清理僵尸进程

✅ **防休眠模式**
- 使用 `caffeinate` 防止 Mac 休眠
- Bot 运行期间系统不会自动睡眠

✅ **两种运行模式**
- 前台：直接查看日志，Ctrl+C 停止
- 后台：服务器式运行，关闭终端后继续

---

## 使用场景

### 场景 1：首次启动
```bash
./start-bot.sh -d
```

### 场景 2：修改代码/配置后重启
```bash
./restart-bot.sh
```

### 场景 3：调试问题（查看实时日志）
```bash
./start-bot.sh
# 实时查看输出，按 Ctrl+C 停止
```

### 场景 4：检查 Bot 是否在运行
```bash
ps aux | grep "[n]ode bot.mjs"
# 或
./stop-bot.sh  # 会显示运行状态
```

### 场景 5：查看后台 Bot 日志
```bash
tail -f bot.log
# 按 Ctrl+C 退出日志查看（Bot 继续运行）
```

### 场景 6：完全停止 Bot
```bash
./stop-bot.sh
```

---

## 常见问题

### Q: 如何确认 Bot 正在运行？
```bash
ps aux | grep "[n]ode bot.mjs"
```
看到进程就是在运行。

### Q: 后台模式启动后如何查看日志？
```bash
tail -f bot.log
```

### Q: 如何在不停止 Bot 的情况下退出日志查看？
按 `Ctrl+C` 只会退出 `tail -f`，Bot 继续在后台运行。

### Q: 修改了课程内容或配置，如何生效？
```bash
./restart-bot.sh
```

### Q: 出现 "Conflict: terminated by other getUpdates" 错误？
说明有多个 Bot 实例在运行。运行：
```bash
./stop-bot.sh
./start-bot.sh -d
```

### Q: 重启 Mac 后 Bot 会自动启动吗？
不会。需要手动运行 `./start-bot.sh -d`

如需开机自动启动，可以：
1. 系统设置 → 用户与群组 → 登录项
2. 添加 `start-bot.sh` 到登录项
3. 或使用 launchd 创建服务（高级）

---

## 脚本文件说明

| 文件 | 功能 |
|------|------|
| `start-bot.sh` | 启动 Bot（自动清理旧进程） |
| `stop-bot.sh` | 停止 Bot |
| `restart-bot.sh` | 重启 Bot（stop + start） |
| `bot.log` | Bot 运行日志（后台模式） |

---

## 日常推荐工作流

**1. 启动 Bot（后台）**
```bash
./start-bot.sh -d
```

**2. 需要时查看日志**
```bash
tail -20 bot.log  # 查看最后 20 行
tail -f bot.log   # 实时追踪
```

**3. 修改代码后重启**
```bash
./restart-bot.sh
```

**4. 关机前停止（可选）**
```bash
./stop-bot.sh
```

---

## 进阶：查看 Bot 状态

创建一个 `status-bot.sh`：
```bash
#!/bin/bash
if ps aux | grep -q "[n]ode bot.mjs"; then
    echo "✅ Bot 正在运行"
    ps aux | grep "[n]ode bot.mjs" | grep -v grep
    echo ""
    echo "📊 最新日志："
    tail -5 bot.log
else
    echo "❌ Bot 未运行"
fi
```

---

**现在你的 Bot 管理已经非常方便了！** 🎉


