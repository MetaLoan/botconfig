#!/bin/bash
# 多 Bot 启动脚本

cd "$(dirname "$0")"

echo "🚀 多 Bot 启动器"
echo "================================"
echo ""

# 检查是否有正在运行的多 Bot 进程
RUNNING=$(ps aux | grep "[n]ode bot-multi.mjs" | wc -l | tr -d ' ')

if [ "$RUNNING" -gt 0 ]; then
    echo "⚠️  检测到正在运行的多 Bot 进程"
    echo "🛑 正在停止..."
    
    pkill -9 -f "node bot-multi.mjs" 2>/dev/null
    pkill -9 -f "caffeinate.*bot-multi.mjs" 2>/dev/null
    
    sleep 2
    
    REMAINING=$(ps aux | grep "[n]ode bot-multi.mjs" | wc -l | tr -d ' ')
    if [ "$REMAINING" -eq 0 ]; then
        echo "✅ 所有旧进程已清理"
    else
        echo "❌ 仍有进程未清理"
        exit 1
    fi
else
    echo "✅ 没有检测到运行中的多 Bot 进程"
fi

echo ""

# 检查配置文件
CONFIG_COUNT=$(ls config*.json 2>/dev/null | grep -v config.example.json | wc -l | tr -d ' ')

if [ "$CONFIG_COUNT" -eq 0 ]; then
    echo "❌ 没有找到配置文件"
    echo "   请创建至少一个 config*.json 文件"
    exit 1
fi

echo "📋 发现 $CONFIG_COUNT 个配置文件："
ls config*.json 2>/dev/null | grep -v config.example.json | sed 's/^/   - /'
echo ""

echo "🚀 正在启动多 Bot 实例..."
echo ""

if [ "$1" = "-d" ] || [ "$1" = "--daemon" ]; then
    echo "📋 后台模式启动"
    echo "   查看日志: tail -f bot-multi.log"
    echo "   停止: ./stop-multi-bot.sh"
    echo ""
    
    NODE_TLS_REJECT_UNAUTHORIZED=0 caffeinate -i node bot-multi.mjs > bot-multi.log 2>&1 &
    
    sleep 3
    
    if ps aux | grep -q "[n]ode bot-multi.mjs"; then
        PID=$(ps aux | grep "[n]ode bot-multi.mjs" | grep -v grep | awk '{print $2}' | head -1)
        echo "✅ 多 Bot 已成功启动！(PID: $PID)"
        echo ""
        echo "📊 实时日志（按 Ctrl+C 退出查看）："
        tail -f bot-multi.log
    else
        echo "❌ 启动失败，请检查 bot-multi.log"
        exit 1
    fi
else
    echo "📋 前台模式启动（按 Ctrl+C 停止）"
    echo ""
    
    NODE_TLS_REJECT_UNAUTHORIZED=0 caffeinate -i node bot-multi.mjs
fi

