#!/bin/bash
# 停止 Telegram Bot

cd "$(dirname "$0")"

echo "🛑 停止 Telegram Bot..."
echo ""

# 检查是否有正在运行的进程
RUNNING=$(ps aux | grep "[n]ode bot.mjs" | wc -l | tr -d ' ')

if [ "$RUNNING" -eq 0 ]; then
    echo "ℹ️  没有检测到运行中的 Bot 进程"
    exit 0
fi

echo "📋 发现 $RUNNING 个运行中的进程："
ps aux | grep "[n]ode bot.mjs" | grep -v grep

echo ""
echo "🛑 正在停止..."

# 停止进程
pkill -9 -f "node bot.mjs" 2>/dev/null
pkill -9 -f "caffeinate.*bot.mjs" 2>/dev/null

sleep 2

# 验证
REMAINING=$(ps aux | grep "[n]ode bot.mjs" | wc -l | tr -d ' ')

if [ "$REMAINING" -eq 0 ]; then
    echo "✅ 所有 Bot 进程已停止"
else
    echo "⚠️  仍有 $REMAINING 个进程在运行"
    echo "   手动停止: pkill -9 -f 'node bot.mjs'"
    exit 1
fi


