const TARGET_URL = "https://academy.avatrade.com/courses/";

function isTelegramWebApp() {
  return typeof window !== "undefined" && !!window.Telegram?.WebApp;
}

function initTelegramUi() {
  if (!isTelegramWebApp()) return;

  const tg = window.Telegram.WebApp;
  tg.ready();

  // Make it feel native in Telegram
  try {
    tg.expand();
    tg.setHeaderColor?.("secondary_bg_color");
  } catch {
    // ignore
  }
}

function main() {
  const targetLink = document.getElementById("targetLink");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const hint = document.getElementById("hint");
  const frame = document.getElementById("frame");

  targetLink.href = TARGET_URL;
  targetLink.textContent = TARGET_URL;

  frame.src = TARGET_URL;

  if (isTelegramWebApp()) {
    hint.textContent = "已在 Telegram WebView 中运行。";
  } else {
    hint.textContent = "提示：你当前不在 Telegram 内打开，本页仍可预览。";
  }

  openBtn.addEventListener("click", () => {
    // “套壳”的关键：直接在当前 WebView 跳转到目标站点
    window.location.href = TARGET_URL;
  });

  closeBtn.addEventListener("click", () => {
    if (isTelegramWebApp()) {
      window.Telegram.WebApp.close();
    } else {
      window.close();
    }
  });

  initTelegramUi();
}

main();



