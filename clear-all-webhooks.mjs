// 批量清理所有Bot的Webhook
import fs from "fs";

const configFiles = fs.readdirSync('.')
  .filter(f => f.match(/^config.*\.json$/) && f !== 'config.example.json');

console.log(`🔧 清理 ${configFiles.length} 个Bot的Webhook\n`);

for (const file of configFiles) {
  try {
    const config = JSON.parse(fs.readFileSync(file, 'utf8'));
    const token = config.BOT_TOKEN;
    const name = file.replace('config.', '').replace('.json', '') || 'main';
    
    const url = `https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=true`;
    const res = await fetch(url);
    const json = await res.json();
    
    if (json.ok) {
      console.log(`✅ [${name}] Webhook已清理`);
    } else {
      console.log(`⚠️  [${name}] ${json.description}`);
    }
  } catch (e) {
    console.log(`❌ [${file}] ${e.message}`);
  }
}

console.log('\n✅ 所有Webhook已清理！');
console.log('💡 现在重启Bot: ./restart-multi-bot.sh');

