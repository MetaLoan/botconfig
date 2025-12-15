# 📋 Bot 列表

## 运行中的 Bot (15个)

| # | Bot 用户名 | Bot 名称 | Bot ID | 配置文件 |
|---|-----------|---------|--------|---------|
| 1 | @AIQuantMaster_bot | AI QuantMaster | 8125087413 | config.bot10.json |
| 2 | @theAIProfit_bot | Omar Crypto Academy | 8259231411 | config.bot11.json |
| 3 | @realGooduck_bot | Gooduck | 8186975889 | config.bot12.json |
| 4 | @jwls_official_bot | JWLS | 7973288805 | config.bot13.json |
| 5 | @DragonMiners_bot | Mine Dragons | 7868248728 | config.bot14.json |
| 6 | @theMarsian_bot | Marsian🦹‍♂️ | 7784675491 | config.bot15.json |
| 7 | @Agentrade_bot | Agentrade | 8052970085 | config.bot2.json |
| 8 | @theQuantMind_bot | Quant Mind | 8116569133 | config.bot3.json |
| 9 | @AIAgentSOL_bot | AgentSOL | 8232291117 | config.bot4.json |
| 10 | @BTCstrategyAiBot | MANISH 🧠👉💰 | 8461909523 | config.bot5.json |
| 11 | @TonAITrader_bot | TonAI Trader | 8154053599 | config.bot6.json |
| 12 | @TONTreasuryAI_bot | TON Treasury | 8345103665 | config.bot7.json |
| 13 | @BNBstrategyBot | BNBstrategy.ai | 8476441298 | config.bot8.json |
| 14 | @theSmartTradeAI_bot | SmartTrade AI | 8297034625 | config.bot9.json |
| 15 | @futureXdotcome_bot | FutureX | 8376455677 | config.json |

---

## 快速测试链接

点击下面的链接在 Telegram 中打开对应的 Bot：

1. https://t.me/AIQuantMaster_bot
2. https://t.me/theAIProfit_bot
3. https://t.me/realGooduck_bot
4. https://t.me/jwls_official_bot
5. https://t.me/DragonMiners_bot
6. https://t.me/theMarsian_bot
7. https://t.me/Agentrade_bot
8. https://t.me/theQuantMind_bot
9. https://t.me/AIAgentSOL_bot
10. https://t.me/BTCstrategyAiBot
11. https://t.me/TonAITrader_bot
12. https://t.me/TONTreasuryAI_bot
13. https://t.me/BNBstrategyBot
14. https://t.me/theSmartTradeAI_bot
15. https://t.me/futureXdotcome_bot

---

## 所有 Bot 功能

所有 15 个 Bot 拥有相同的功能：

### ✅ 学习系统
- 10章完整的加密货币合约交易课程（英文）
- 交互式按钮导航（上一章/目录/下一章）
- 课程内容包括：
  1. Introduction to Crypto Trading
  2. Understanding Contracts
  3. Leverage & Margin Explained
  4. Long & Short Positions
  5. Risk Management
  6. Technical Analysis Basics
  7. Order Types & Execution
  8. Understanding Liquidation
  9. Trading Psychology
  10. Common Mistakes to Avoid

### ✅ WebApp 集成
- 链接到: `https://academy.avatrade.com/courses/`
- 用户可以直接在 Telegram 内或跳转到外部网站学习

---

## 管理命令

### 查看所有 Bot 状态（推荐）
```bash
./status-multi-bot.sh
```
显示：
- Bot运行状态
- 进程信息（PID、CPU、内存）
- 配置的Bot数量
- 最新日志（最后15行）

### 查看实时日志
```bash
tail -f bot-multi.log
```

### 重启所有 Bot
```bash
./restart-multi-bot.sh
```

### 停止所有 Bot
```bash
./stop-multi-bot.sh
```

### 查看进程
```bash
ps aux | grep "node bot-multi.mjs"
```

---

## 添加新 Bot

1. 创建新配置文件：
```bash
cat > config.bot16.json << 'EOF'
{
  "BOT_TOKEN": "新的_BOT_TOKEN",
  "WEBAPP_URL": "https://academy.avatrade.com/courses/"
}
EOF
```

2. 重启：
```bash
./restart-multi-bot.sh
```

新 Bot 会自动被检测并启动！

---

## 禁用某个 Bot

### 临时禁用（不删除配置）
```bash
mv config.bot5.json config.bot5.json.disabled
./restart-multi-bot.sh
```

### 重新启用
```bash
mv config.bot5.json.disabled config.bot5.json
./restart-multi-bot.sh
```

---

## 注意事项

⚠️ **重要安全提示**

1. **配置文件包含敏感 Token**
   - 永远不要提交到 Git
   - `.gitignore` 已配置忽略所有 `config*.json`

2. **定期检查 Bot 状态**
   ```bash
   tail -20 bot-multi.log
   ```

3. **Webhook 冲突**
   - 如果 Bot 之前设置过 Webhook，需要先删除
   - 使用 `/deleteWebhook` 或参考 `DEPLOYMENT.md`

---

## 系统资源

**15个 Bot 同时运行的资源占用：**
- **内存**: ~60-100 MB（共享课程内容）
- **CPU**: 几乎忽略不计（消息处理异步）
- **网络**: 每个 Bot 独立轮询（long polling）

---

## 更新日期

最后更新: 2024年12月

**总计 15 个 Bot 正在运行！** ✅

