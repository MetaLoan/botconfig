#!/bin/bash
# Telegram Bot 启动脚本（防止 Mac 休眠 + 自动重启）

cd "$(dirname "$0")"

echo "🔄 Telegram Bot 启动脚本"
echo "================================"
echo ""

# 检查是否有正在运行的 Bot 进程
RUNNING_BOTS=$(ps aux | grep "[n]ode bot.mjs" | wc -l | tr -d ' ')

if [ "$RUNNING_BOTS" -gt 0 ]; then
    echo "⚠️  检测到 $RUNNING_BOTS 个正在运行的 Bot 进程"
    echo "🛑 正在停止所有 Bot 进程..."
    
    # 停止所有 bot.mjs 和 caffeinate 进程
    pkill -9 -f "node bot.mjs" 2>/dev/null
    pkill -9 -f "caffeinate.*bot.mjs" 2>/dev/null
    
    # 等待进程完全结束
    sleep 2
    
    # 再次检查
    REMAINING=$(ps aux | grep "[n]ode bot.mjs" | wc -l | tr -d ' ')
    if [ "$REMAINING" -eq 0 ]; then
        echo "✅ 所有旧进程已清理"
    else
        echo "❌ 仍有 $REMAINING 个进程未清理，请手动检查"
        exit 1
    fi
else
    echo "✅ 没有检测到运行中的 Bot 进程"
fi

echo ""
echo "🚀 正在启动新的 Bot 实例..."
echo "   - 防休眠模式（caffeinate）"
echo "   - 日志输出到 bot.log"
echo ""

# 检查运行模式（前台 or 后台）
if [ "$1" = "-d" ] || [ "$1" = "--daemon" ]; then
    echo "📋 后台模式启动"
    echo "   查看日志: tail -f bot.log"
    echo "   停止 Bot: ./stop-bot.sh 或 pkill -f 'node bot.mjs'"
    echo ""
    
    # 后台运行
    NODE_TLS_REJECT_UNAUTHORIZED=0 caffeinate -i node bot.mjs > bot.log 2>&1 &
    
    sleep 2
    
    # 验证启动
    if ps aux | grep -q "[n]ode bot.mjs"; then
        PID=$(ps aux | grep "[n]ode bot.mjs" | grep -v grep | awk '{print $2}' | head -1)
        echo "✅ Bot 已成功启动！(PID: $PID)"
        echo ""
        echo "📊 实时日志（按 Ctrl+C 退出日志查看，Bot 继续运行）："
        tail -f bot.log
    else
        echo "❌ Bot 启动失败，请检查 bot.log"
        exit 1
    fi
else
    echo "📋 前台模式启动（按 Ctrl+C 停止）"
    echo ""
    
    # 前台运行
    NODE_TLS_REJECT_UNAUTHORIZED=0 caffeinate -i node bot.mjs
fi


