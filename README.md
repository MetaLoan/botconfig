## 目标
把 `https://academy.avatrade.com/courses/` 作为 **Telegram MiniApp（WebApp）** 在你的 Bot 里打开：
- 用户点击 Bot 的 `/start`
- Bot 推送介绍文案
- 提供 **“打开 MiniApp”** 按钮（Telegram 内 WebView 打开）

## 目录结构
- `bot.mjs`: Telegram Bot（无需第三方依赖，使用 long polling）
- `miniapp/`: 静态 MiniApp（套壳页：按钮跳转到目标课程页，附带 iframe 预览区）
- `serve-miniapp.mjs`: 本地预览静态页面（仅用于开发预览，正式需 HTTPS）

## Step 1：准备配置（不要把 Token 提交到仓库）
在项目根目录创建 `config.json`（本文件已在 `.gitignore` 中忽略）：

```json
{
  "BOT_TOKEN": "你的 Telegram Bot Token",
  "WEBAPP_URL": "https://你的公网HTTPS域名/miniapp/"
}
```

> 你也可以用环境变量：`BOT_TOKEN` / `WEBAPP_URL`（优先级：环境变量 < config.json）

## Step 2：生成图标（可选）
如果你想自定义 MiniApp 图标，将你的 SVG logo 保存为 `miniapp/favicon.svg`，然后运行：

```bash
npm run convert:icons
```

这会自动生成所有需要的图标尺寸（16x16、32x32、180x180、192x192、512x512、1200x630）。

## Step 3：部署 MiniApp（必须是公网 HTTPS）
Telegram MiniApp 的 URL 必须是 **公网可访问的 HTTPS**，本地 `http://localhost` 不能直接用于正式 Bot 按钮。

你可以用任意静态托管（示例思路）：
- **Cloudflare Pages / Vercel / Netlify / GitHub Pages**
- 把仓库里的 `miniapp/` 目录作为站点根目录发布

部署完成后，你会得到类似：
- `https://your-domain.com/` 或 `https://your-domain.com/miniapp/`

把这个地址填到 `config.json` 的 `WEBAPP_URL`。

## Step 4：本地预览 MiniApp（可选）

```bash
npm run miniapp:dev
```

然后浏览器打开控制台输出的地址（通常是 `http://localhost:5173/`）。

## Step 5：运行 Bot

### 🚀 推荐方式：使用管理脚本

**后台运行（推荐）：**
```bash
./start-bot.sh -d
```
- 自动检测并清理旧进程
- 防止多实例冲突
- 防休眠模式
- 关闭终端后继续运行

**前台运行（调试用）：**
```bash
./start-bot.sh
```
- 实时查看日志
- 按 `Ctrl+C` 停止

### 🔧 管理命令

**单Bot模式：**
```bash
./start-bot.sh -d    # 启动（后台）
./stop-bot.sh        # 停止
./restart-bot.sh     # 重启
./status-bot.sh      # 查看状态
tail -f bot.log      # 查看日志
```

**多Bot模式：**
```bash
./start-multi-bot.sh -d    # 启动所有Bot（后台）
./stop-multi-bot.sh        # 停止所有Bot
./restart-multi-bot.sh     # 重启所有Bot
./status-multi-bot.sh      # 查看状态 ⭐
tail -f bot-multi.log      # 查看日志
```

详细说明请查看 [BOT_MANAGEMENT.md](./BOT_MANAGEMENT.md)

### 方式 2：直接命令（高级）

```bash
# 前台运行
npm start

# 防休眠运行
npm run start:awake

# 后台运行
NODE_TLS_REJECT_UNAUTHORIZED=0 caffeinate -i node bot.mjs > bot.log 2>&1 &

# 停止
pkill -f "node bot.mjs"
```

## Step 6：在 Telegram 里测试
1. 打开你的 Bot 对话框
2. 发送 `/start`
3. 点击 **“打开 MiniApp”**，应进入你的 `WEBAPP_URL` 静态页面
4. 在 MiniApp 页面点击 **“打开课程列表”**，跳转到 `academy.avatrade.com/courses/`

## 常见问题
- **Q：为什么不用 iframe 直接嵌入课程页？**  
  A：很多网站会通过 `CSP frame-ancestors` 或 `X-Frame-Options` 禁止被嵌入。为保证可用性，本 MiniApp 采用“点击跳转”作为主方案。


