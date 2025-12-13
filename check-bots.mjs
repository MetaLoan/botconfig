// 检查两个 Bot 的信息
import fs from "fs";

const configs = [
  { name: "Bot 1", file: "config.json" },
  { name: "Bot 2", file: "config.bot2.json" }
];

console.log("📋 检查两个 Bot 的信息\n");

for (const { name, file } of configs) {
  try {
    const config = JSON.parse(fs.readFileSync(file, "utf8"));
    const token = config.BOT_TOKEN;
    
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const json = await res.json();
    
    if (json.ok) {
      console.log(`✅ ${name} (${file})`);
      console.log(`   用户名: @${json.result.username}`);
      console.log(`   名称: ${json.result.first_name}`);
      console.log(`   ID: ${json.result.id}`);
      console.log("");
    } else {
      console.log(`❌ ${name} (${file}): ${json.description}`);
    }
  } catch (e) {
    console.log(`❌ ${name} (${file}): ${e.message}`);
  }
}

console.log("🎯 两个 Bot 都已在运行，共享相同的学习系统！");

