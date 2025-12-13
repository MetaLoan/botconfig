import fs from "node:fs";
import { chapters, courseStructure, getChapterList } from "./course-content.mjs";

/**
 * Telegram Bot with:
 * - MiniApp launcher
 * - Interactive learning system for crypto contract trading
 *
 * Config priority:
 * 1) ./config.json
 * 2) process.env.BOT_TOKEN / process.env.WEBAPP_URL
 */

function readConfig() {
  const fromEnv = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    WEBAPP_URL: process.env.WEBAPP_URL,
  };

  try {
    const raw = fs.readFileSync(new URL("./config.json", import.meta.url), "utf8");
    const fromFile = JSON.parse(raw);
    return { ...fromEnv, ...fromFile };
  } catch {
    return fromEnv;
  }
}

const config = readConfig();
const BOT_TOKEN = config.BOT_TOKEN;
const WEBAPP_URL = config.WEBAPP_URL;

if (!BOT_TOKEN) {
  console.error("缺少 BOT_TOKEN：请创建 config.json 或设置环境变量 BOT_TOKEN");
  process.exit(1);
}
if (!WEBAPP_URL) {
  console.error("缺少 WEBAPP_URL：请创建 config.json 或设置环境变量 WEBAPP_URL");
  process.exit(1);
}

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function tg(method, params) {
  const res = await fetch(`${API_BASE}/${method}`, {
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

function buildStartMessage() {
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
          web_app: { url: WEBAPP_URL },
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
  
  // Previous chapter button
  if (chapter.prev) {
    navigationButtons.push({
      text: "⬅️ Previous",
      callback_data: `chapter:${chapter.prev}`
    });
  }
  
  // Main menu button (always in center)
  navigationButtons.push({
    text: "📚 Menu",
    callback_data: "menu:main"
  });
  
  // Next chapter button
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

async function handleMessage(message) {
  const chatId = message.chat?.id;
  if (!chatId) return;

  const text = message.text ?? "";
  if (text.startsWith("/start")) {
    const { text: msgText, reply_markup } = buildStartMessage();
    await tg("sendMessage", {
      chat_id: chatId,
      text: msgText,
      reply_markup,
      disable_web_page_preview: true,
      parse_mode: "Markdown",
    });
    return;
  }
}

async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const data = callbackQuery.data;

  if (!chatId || !messageId || !data) return;

  try {
    // Answer callback to remove loading state
    await tg("answerCallbackQuery", {
      callback_query_id: callbackQuery.id,
    });

    let response;

    if (data === "menu:main") {
      response = buildMainMenu();
    } else if (data === "back:start") {
      response = buildStartMessage();
    } else if (data.startsWith("chapter:")) {
      const chapterId = data.replace("chapter:", "");
      response = buildChapterMessage(chapterId);
    } else {
      return; // Unknown callback
    }

    // Edit the existing message
    await tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: response.text,
      reply_markup: response.reply_markup,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.error("处理回调查询失败：", e?.message ?? e);
  }
}

async function main() {
  console.log("Bot 启动中（long polling）...");
  console.log("WEBAPP_URL =", WEBAPP_URL);
  console.log("学习系统已加载，共", courseStructure.main_menu.chapters.length, "个章节");

  let offset = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let updates;
    try {
      updates = await tg("getUpdates", {
        offset,
        timeout: 50,
        allowed_updates: ["message", "callback_query"],
      });
    } catch (e) {
      console.error("getUpdates 失败，将在 2s 后重试：", e?.message ?? e);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    for (const u of updates) {
      offset = u.update_id + 1;
      
      if (u.message) {
        try {
          await handleMessage(u.message);
        } catch (e) {
          console.error("处理消息失败：", e?.message ?? e);
        }
      }
      
      if (u.callback_query) {
        try {
          await handleCallbackQuery(u.callback_query);
        } catch (e) {
          console.error("处理回调查询失败：", e?.message ?? e);
        }
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


