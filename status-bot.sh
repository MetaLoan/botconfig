#!/bin/bash
# 检查 Bot 运行状态

cd "$(dirname "$0")"

echo "📊 Telegram Bot 状态检查"
echo "================================"
echo ""

# 检查进程
if ps aux | grep -q "[n]ode bot.mjs"; then
    echo "✅ Bot 状态: 运行中"
    echo ""
    echo "📋 进程信息："
    ps aux | grep "[n]ode bot.mjs" | grep -v grep | awk '{printf "   PID: %s, CPU: %s%%, MEM: %s%%\n", $2, $3, $4}'
    echo ""
    
    # 检查日志文件
    if [ -f "bot.log" ]; then
        echo "📝 最新日志（最后 10 行）："
        echo "---"
        tail -10 bot.log | sed 's/^/   /'
        echo "---"
        echo ""
        echo "💡 查看完整日志: tail -f bot.log"
    else
        echo "ℹ️  日志文件不存在（可能是前台模式运行）"
    fi
else
    echo "❌ Bot 状态: 未运行"
    echo ""
    echo "💡 启动 Bot: ./start-bot.sh -d"
fi

echo ""
echo "🔧 管理命令："
echo "   启动: ./start-bot.sh -d"
echo "   停止: ./stop-bot.sh"
echo "   重启: ./restart-bot.sh"
echo "   状态: ./status-bot.sh"


