import fs from "node:fs";
import { chapters, courseStructure, getChapterList } from "./course-content.mjs";

/**
 * Multi-Bot Launcher
 * 支持同时运行多个 Bot 实例
 */

// 强制禁用 TLS 证书验证（解决网络环境证书问题）
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 读取所有配置文件
function loadAllConfigs() {
  const configs = [];
  const files = fs.readdirSync('.');
  
  for (const file of files) {
    if (file.match(/^config.*\.json$/) && file !== 'config.example.json') {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const config = JSON.parse(content);
        if (config.BOT_TOKEN && config.WEBAPP_URL) {
          configs.push({
            file,
            name: file.replace('config.', '').replace('.json', '') || 'main',
            ...config
          });
        }
      } catch (e) {
        console.error(`跳过无效配置文件 ${file}:`, e.message);
      }
    }
  }
  
  return configs;
}

const API_BASE = (token) => `https://api.telegram.org/bot${token}`;

async function tg(token, method, params) {
  const res = await fetch(`${API_BASE(token)}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params ?? {}),
  });
  const json = await res.json();
  if (!json.ok) {
    const msg = json?.description ? `: ${json.description}` : "";
    throw new Error(`Telegram API error ${method}${msg}`);
  }
  return json.result;
}

function buildStartMessage(webappUrl) {
  const text =
    "Welcome to the Academy of Crypto, where you can learn how to optimize and minimize your losses in trading, ensuring every trade is within controllable risk!";

  const reply_markup = {
    inline_keyboard: [
      [
        {
          text: "📚 Start Learning (In Bot)",
          callback_data: "menu:main",
        },
      ],
      [
        {
          text: "🌐 Open Full Academy",
          web_app: { url: webappUrl },
        },
      ],
    ],
  };

  return { text, reply_markup };
}

function buildMainMenu() {
  const { title, description } = courseStructure.main_menu;
  const text = `${title}\n\n${description}\n\n📖 **Select a chapter to begin:**`;
  
  const chapterButtons = getChapterList().map((ch, idx) => [{
    text: `${idx + 1}. ${ch.title.replace(/^📖|📊|⚡|📈📉|🛡️|🎯|⚠️|🧠|🚫|🔄/g, '').trim()}`,
    callback_data: `chapter:${ch.id}`
  }]);

  const reply_markup = {
    inline_keyboard: [
      ...chapterButtons,
      [{ text: "🏠 Back to Start", callback_data: "back:start" }]
    ]
  };

  return { text, reply_markup };
}

function buildChapterMessage(chapterId) {
  const chapter = chapters[chapterId];
  if (!chapter) {
    return { text: "Chapter not found.", reply_markup: { inline_keyboard: [[{ text: "📚 Main Menu", callback_data: "menu:main" }]] }};
  }

  const text = `${chapter.title}\n\n${chapter.content}`;
  
  const navigationButtons = [];
  
  if (chapter.prev) {
    navigationButtons.push({
      text: "⬅️ Previous",
      callback_data: `chapter:${chapter.prev}`
    });
  }
  
  navigationButtons.push({
    text: "📚 Menu",
    callback_data: "menu:main"
  });
  
  if (chapter.next) {
    navigationButtons.push({
      text: "Next ➡️",
      callback_data: `chapter:${chapter.next}`
    });
  }

  const reply_markup = {
    inline_keyboard: [
      navigationButtons
    ]
  };

  return { text, reply_markup };
}

async function handleMessage(token, webappUrl, message) {
  const chatId = message.chat?.id;
  if (!chatId) return;

  const text = message.text ?? "";
  if (text.startsWith("/start")) {
    const { text: msgText, reply_markup } = buildStartMessage(webappUrl);
    await tg(token, "sendMessage", {
      chat_id: chatId,
      text: msgText,
      reply_markup,
      disable_web_page_preview: true,
      parse_mode: "Markdown",
    });
    return;
  }
}

async function handleCallbackQuery(token, callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const data = callbackQuery.data;

  if (!chatId || !messageId || !data) return;

  try {
    await tg(token, "answerCallbackQuery", {
      callback_query_id: callbackQuery.id,
    });

    let response;

    if (data === "menu:main") {
      response = buildMainMenu();
    } else if (data === "back:start") {
      response = buildStartMessage(callbackQuery.webapp_url);
    } else if (data.startsWith("chapter:")) {
      const chapterId = data.replace("chapter:", "");
      response = buildChapterMessage(chapterId);
    } else {
      return;
    }

    await tg(token, "editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: response.text,
      reply_markup: response.reply_markup,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.error(`[${token.substring(0, 10)}...] 处理回调查询失败:`, e?.message ?? e);
  }
}

async function runBot(config) {
  const { name, BOT_TOKEN, WEBAPP_URL } = config;
  const prefix = `[${name}]`;
  
  console.log(`${prefix} Bot 启动中...`);
  console.log(`${prefix} WEBAPP_URL = ${WEBAPP_URL}`);

  let offset = 0;

  while (true) {
    let updates;
    try {
      updates = await tg(BOT_TOKEN, "getUpdates", {
        offset,
        timeout: 50,
        allowed_updates: ["message", "callback_query"],
      });
    } catch (e) {
      console.error(`${prefix} getUpdates 失败，将在 2s 后重试:`, e?.message ?? e);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    for (const u of updates) {
      offset = u.update_id + 1;
      
      if (u.message) {
        try {
          await handleMessage(BOT_TOKEN, WEBAPP_URL, u.message);
        } catch (e) {
          console.error(`${prefix} 处理消息失败:`, e?.message ?? e);
        }
      }
      
      if (u.callback_query) {
        try {
          await handleCallbackQuery(BOT_TOKEN, u.callback_query);
        } catch (e) {
          console.error(`${prefix} 处理回调查询失败:`, e?.message ?? e);
        }
      }
    }
  }
}

async function main() {
  const configs = loadAllConfigs();
  
  if (configs.length === 0) {
    console.error("❌ 没有找到有效的配置文件");
    console.error("   请确保至少有一个 config*.json 文件包含 BOT_TOKEN 和 WEBAPP_URL");
    process.exit(1);
  }

  console.log("🚀 多 Bot 启动器");
  console.log("================================");
  console.log(`发现 ${configs.length} 个 Bot 配置：`);
  
  for (const config of configs) {
    console.log(`  - ${config.name} (${config.file})`);
  }
  
  console.log("\n学习系统已加载，共", courseStructure.main_menu.chapters.length, "个章节\n");

  // 并行运行所有 Bot
  await Promise.all(
    configs.map(config => 
      runBot(config).catch(e => {
        console.error(`[${config.name}] 崩溃:`, e);
      })
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


