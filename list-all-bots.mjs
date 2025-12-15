// 列出所有Bot的信息
import fs from "fs";

const configFiles = fs.readdirSync('.')
  .filter(f => f.match(/^config.*\.json$/) && f !== 'config.example.json')
  .sort();

console.log(`📋 所有 ${configFiles.length} 个Bot信息\n`);
console.log("=" .repeat(80));

const bots = [];

for (const file of configFiles) {
  try {
    const config = JSON.parse(fs.readFileSync(file, 'utf8'));
    const token = config.BOT_TOKEN;
    
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const json = await res.json();
    
    if (json.ok) {
      const bot = json.result;
      bots.push({
        file,
        username: bot.username,
        name: bot.first_name,
        id: bot.id
      });
    }
  } catch (e) {
    console.log(`❌ [${file}] 获取失败`);
  }
}

// 按编号排序显示
bots.forEach((bot, idx) => {
  console.log(`${idx + 1}. @${bot.username}`);
  console.log(`   名称: ${bot.name}`);
  console.log(`   ID: ${bot.id}`);
  console.log(`   配置: ${bot.file}`);
  console.log("");
});

console.log("=" .repeat(80));
console.log(`\n✅ 总计 ${bots.length} 个Bot正在运行`);
console.log(`📊 查看日志: tail -f bot-multi.log`);
console.log(`🛑 停止所有: ./stop-multi-bot.sh`);

