# 📦 从 GitHub 部署指南

## 仓库地址

**GitHub**: https://github.com/MetaLoan/botconfig.git

---

## 🚀 快速部署（新机器）

### 1. 克隆仓库

```bash
git clone https://github.com/MetaLoan/botconfig.git
cd botconfig
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Bot Token

#### 方式 1：单个 Bot

创建 `config.json`：
```bash
cat > config.json << 'EOF'
{
  "BOT_TOKEN": "你的_BOT_TOKEN",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
EOF
```

#### 方式 2：多个 Bot

创建多个配置文件：
```bash
# Bot 1
cat > config.json << 'EOF'
{
  "BOT_TOKEN": "第一个_BOT_TOKEN",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
EOF

# Bot 2
cat > config.bot2.json << 'EOF'
{
  "BOT_TOKEN": "第二个_BOT_TOKEN",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
EOF
```

### 4. 启动 Bot

#### 单 Bot 模式
```bash
./start-bot.sh -d
```

#### 多 Bot 模式
```bash
./start-multi-bot.sh -d
```

### 5. 验证运行

```bash
# 单 Bot
./status-bot.sh

# 多 Bot
tail -f bot-multi.log
```

---

## 📋 配置文件说明

### ⚠️ 重要：配置文件安全

**不要提交包含真实 Token 的配置文件到 Git！**

仓库中的 `.gitignore` 已配置为忽略：
- `config.json`
- `config.*.json`（除了 `config.example.json`）
- `*.log`

### 配置文件格式

```json
{
  "BOT_TOKEN": "从 BotFather 获取的 Token",
  "WEBAPP_URL": "你的 MiniApp 或外部网站 URL"
}
```

### 示例配置

查看 `config.example.json` 作为模板。

---

## 🔧 管理命令

### 单 Bot 模式

```bash
./start-bot.sh -d      # 启动（后台）
./stop-bot.sh          # 停止
./restart-bot.sh       # 重启
./status-bot.sh        # 查看状态
tail -f bot.log        # 查看日志
```

### 多 Bot 模式

```bash
./start-multi-bot.sh -d    # 启动所有 Bot（后台）
./stop-multi-bot.sh        # 停止所有 Bot
./restart-multi-bot.sh     # 重启所有 Bot
tail -f bot-multi.log      # 查看日志
```

---

## 🌐 部署到服务器

### Linux/Ubuntu 服务器

```bash
# 1. 安装 Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 克隆仓库
git clone https://github.com/MetaLoan/botconfig.git
cd botconfig

# 3. 安装依赖
npm install

# 4. 配置 Bot（创建 config.json）
vim config.json

# 5. 使用 PM2 管理进程（推荐）
npm install -g pm2

# 单 Bot
pm2 start bot.mjs --name "telegram-bot" --env NODE_TLS_REJECT_UNAUTHORIZED=0

# 多 Bot
pm2 start bot-multi.mjs --name "telegram-multi-bot" --env NODE_TLS_REJECT_UNAUTHORIZED=0

# 6. 开机自启
pm2 startup
pm2 save
```

### macOS 本地运行

```bash
# 使用 caffeinate 防止休眠（已包含在脚本中）
./start-bot.sh -d          # 单 Bot
./start-multi-bot.sh -d    # 多 Bot
```

---

## 📚 功能特性

### ✅ 学习系统
- 10章完整的加密货币合约交易课程（英文）
- 交互式按钮导航
- Markdown 格式，阅读体验好

### ✅ 多 Bot 支持
- 可同时运行多个 Bot
- 共享课程内容
- 独立配置和管理

### ✅ 管理功能
- 自动重启脚本
- 进程冲突检测
- Mac 休眠防止
- 完整日志记录

### ✅ WebApp 集成
- 支持 Telegram MiniApp
- 可直接跳转外部网站

---

## 📖 完整文档

克隆后查看以下文档：
- `README.md` - 项目总览
- `BOT_MANAGEMENT.md` - Bot 管理详细说明
- `MULTI_BOT_GUIDE.md` - 多 Bot 配置指南
- `COURSE_INFO.md` - 课程内容说明

---

## 🔒 安全建议

1. **永远不要**把包含真实 Token 的配置文件提交到 Git
2. **定期轮换** Bot Token（在 BotFather 中重新生成）
3. **使用环境变量**（可选）：
   ```bash
   export BOT_TOKEN="your_token"
   export WEBAPP_URL="your_url"
   node bot.mjs
   ```

---

## 🆘 常见问题

### Q: 克隆后没有 config.json？

**正常！** 配置文件包含敏感信息，不在仓库中。参考 `config.example.json` 创建。

### Q: 如何更新代码？

```bash
cd botconfig
git pull origin main
./restart-bot.sh  # 或 ./restart-multi-bot.sh
```

### Q: Webhook 冲突错误？

```bash
# 删除 Webhook
node -e "
const token = 'YOUR_TOKEN';
fetch(\`https://api.telegram.org/bot\${token}/deleteWebhook?drop_pending_updates=true\`)
  .then(r => r.json())
  .then(console.log);
"
```

---

## 📞 支持

如有问题，请查看：
- 仓库 Issues: https://github.com/MetaLoan/botconfig/issues
- 文档：`BOT_MANAGEMENT.md` 和 `MULTI_BOT_GUIDE.md`

---

**部署愉快！** 🚀

