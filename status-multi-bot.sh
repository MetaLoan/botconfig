#!/bin/bash
# 查看多Bot运行状态

cd "$(dirname "$0")"

echo "📊 多Bot运行状态"
echo "================================"
echo ""

# 检查进程
if ps aux | grep -q "[n]ode bot-multi.mjs"; then
    echo "✅ Bot状态: 运行中"
    echo ""
    echo "📋 进程信息:"
    ps aux | grep "[n]ode bot-multi.mjs" | grep -v grep | awk '{printf "   PID: %s, CPU: %s%%, MEM: %s%%, 命令: %s\n", $2, $3, $4, $11}'
    echo ""
    
    # 统计配置文件数量
    CONFIG_COUNT=$(ls config*.json 2>/dev/null | grep -v config.example.json | wc -l | tr -d ' ')
    echo "🤖 配置的Bot数量: $CONFIG_COUNT 个"
    echo ""
    
    # 检查日志文件
    if [ -f "bot-multi.log" ]; then
        echo "📝 最新日志（最后 15 行）:"
        echo "---"
        tail -15 bot-multi.log | sed 's/^/   /'
        echo "---"
        echo ""
        echo "💡 查看完整日志: tail -f bot-multi.log"
    else
        echo "ℹ️  日志文件不存在"
    fi
else
    echo "❌ Bot状态: 未运行"
    echo ""
    echo "💡 启动所有Bot: ./start-multi-bot.sh -d"
fi

echo ""
echo "🔧 管理命令:"
echo "   启动: ./start-multi-bot.sh -d"
echo "   停止: ./stop-multi-bot.sh"
echo "   重启: ./restart-multi-bot.sh"
echo "   状态: ./status-multi-bot.sh"
echo ""
echo "📋 Bot列表: cat BOT_LIST.md"

