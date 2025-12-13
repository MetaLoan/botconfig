#!/bin/bash
# 停止多 Bot

cd "$(dirname "$0")"

echo "🛑 停止多 Bot..."
echo ""

RUNNING=$(ps aux | grep "[n]ode bot-multi.mjs" | wc -l | tr -d ' ')

if [ "$RUNNING" -eq 0 ]; then
    echo "ℹ️  没有检测到运行中的多 Bot 进程"
    exit 0
fi

echo "📋 发现 $RUNNING 个运行中的进程"
echo "🛑 正在停止..."

pkill -9 -f "node bot-multi.mjs" 2>/dev/null
pkill -9 -f "caffeinate.*bot-multi.mjs" 2>/dev/null

sleep 2

REMAINING=$(ps aux | grep "[n]ode bot-multi.mjs" | wc -l | tr -d ' ')

if [ "$REMAINING" -eq 0 ]; then
    echo "✅ 所有多 Bot 进程已停止"
else
    echo "⚠️  仍有 $REMAINING 个进程在运行"
    exit 1
fi

