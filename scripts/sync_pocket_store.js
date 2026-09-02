/**
 * 法國旅行秘書通用同步腳本
 * 用法: 傳入 stores 陣列，自動完成 CSV、MD、TXT、Web App 金庫加密與驗證
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_DIR = path.resolve(__dirname, '..');
const CSV_FILE = path.join(BASE_DIR, '2026_私房口袋名單.csv');
const MD_FILE = path.join(BASE_DIR, '2026_私房口袋名單.md');
const TXT_FILE = path.join(BASE_DIR, '2026_法國行程規劃.txt');
const APP_JS_FILE = path.join(BASE_DIR, 'js', 'app.js');

function syncStores(stores) {
  if (!Array.isArray(stores) || stores.length === 0) {
    console.error('請提供有效的 stores 陣列！');
    process.exit(1);
  }

  console.log(`🚀 開始同步 ${stores.length} 間私房店家/景點資料...`);

  // 1. 更新 CSV
  let csvContent = fs.readFileSync(CSV_FILE, 'utf8').trim();
  stores.forEach(s => {
    const key = s.name.split(' ')[0];
    if (!csvContent.includes(key)) {
      csvContent += `\n${s.category},${s.categoryLabel},${s.name},${s.desc.replace(/,/g, '，')},${s.address.replace(/,/g, '，')},${s.highlight.replace(/,/g, '，')},${s.mapQuery}`;
    }
  });
  fs.writeFileSync(CSV_FILE, csvContent + '\n', 'utf8');
  console.log('✅ CSV 檔案更新完成');

  // 2. 更新 MD
  let mdContent = fs.readFileSync(MD_FILE, 'utf8');
  stores.forEach(s => {
    const key = s.name.split(' ')[0];
    if (!mdContent.includes(key)) {
      const storeMd = `### ${s.name}【${s.tag}】\n- **特色簡介**：${s.desc}\n- **詳細地址**：${s.address}\n- **營業與必點**：${s.highlight}\n- **Google Maps 導航**：\`${s.mapQuery}\`\n\n`;
      mdContent += storeMd;
    }
  });
  fs.writeFileSync(MD_FILE, mdContent, 'utf8');
  console.log('✅ Markdown 檔案更新完成');

  // 3. 更新 TXT
  let txtContent = fs.readFileSync(TXT_FILE, 'utf8');
  let txtAdded = '';
  stores.forEach(s => {
    const key = s.name.split(' ')[0];
    if (!txtContent.includes(key)) {
      txtAdded += `  - ${s.name}：${s.desc} (${s.highlight})\n`;
    }
  });
  if (txtAdded) {
    txtContent = txtContent.replace(
      '【 💡 實用旅遊小撇步 (Tips) 】\n--------------------------------------------------------------------------------\n',
      '【 💡 實用旅遊小撇步 (Tips) 】\n--------------------------------------------------------------------------------\n* 📍 私房口袋新增：\n' + txtAdded + '\n'
    );
    fs.writeFileSync(TXT_FILE, txtContent, 'utf8');
    console.log('✅ 行程規劃 TXT 檔案更新完成');
  }

  // 4. 更新 Web App 加密金庫
  let appJs = fs.readFileSync(APP_JS_FILE, 'utf8');
  const vaultMatch = appJs.match(/const ENCRYPTED_VAULT = (\{[\s\S]*?\});/);
  if (!vaultMatch) {
    console.error('❌ 找不到 ENCRYPTED_VAULT！');
    process.exit(1);
  }

  const vault = eval('(' + vaultMatch[1] + ')');
  const salt = Buffer.from(vault.salt, 'base64');
  const iv = Buffer.from(vault.iv, 'base64');
  const key = crypto.pbkdf2Sync('8890', salt, 100000, 32, 'sha256');

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(vault.ciphertext, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  const data = JSON.parse(decrypted);

  stores.forEach(s => {
    const exists = data.pocketPlacesData.find(p => p.name.includes(s.name.split(' ')[0]));
    if (!exists) {
      data.pocketPlacesData.push({
        category: s.category,
        categoryLabel: s.categoryLabel,
        name: s.name,
        tag: s.tag,
        desc: s.desc,
        address: s.address,
        highlight: s.highlight,
        mapQuery: s.mapQuery
      });
    }
  });

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');

  vault.ciphertext = encrypted;
  appJs = appJs.replace(/const ENCRYPTED_VAULT = \{[\s\S]*?\};/, 'const ENCRYPTED_VAULT = ' + JSON.stringify(vault, null, 2) + ';');

  fs.writeFileSync(APP_JS_FILE, appJs, 'utf8');
  console.log('✅ Web App 加密金庫已成功更新並重新加密！');
}

module.exports = { syncStores };
