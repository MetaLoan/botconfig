#!/bin/bash
# 重启 Telegram Bot（快捷脚本）

cd "$(dirname "$0")"

echo "🔄 重启 Telegram Bot"
echo "================================"
echo ""

# 调用 start-bot.sh（自动清理旧进程并启动）
./start-bot.sh -d

