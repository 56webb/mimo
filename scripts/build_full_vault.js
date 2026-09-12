/**
 * 2026 法國旅行 Web App 全資訊金庫編譯腳本
 * 功能：讀取本機全部最新 CSV、TXT，整合 23 天每日時間軸、8 家全程飯店憑證、最新票券代碼、私房店家（含六大百貨）
 * 進行 AES-256-CBC 加密並注入 js/app.js 與 data/encrypted_vault.json
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_JS_PATH = path.join(ROOT_DIR, 'js', 'app.js');
const VAULT_JSON_PATH = path.join(ROOT_DIR, 'data', 'encrypted_vault.json');
const SCRATCH_VAULT_PATH = path.join(ROOT_DIR, 'scratch_decrypted_vault.json');

console.log('🚀 開始編譯 2026 法國旅行全資訊最新金庫...');

// 1. 讀取現有解密金庫作為基底
let baseData = { pocketPlacesData: [] };
  if (fs.existsSync(SCRATCH_VAULT_PATH)) {
    baseData = JSON.parse(fs.readFileSync(SCRATCH_VAULT_PATH, "utf8"));
  } else if (fs.existsSync(VAULT_JSON_PATH)) {
    const vJson = JSON.parse(fs.readFileSync(VAULT_JSON_PATH, "utf8"));
    const salt = Buffer.from(vJson.salt, "base64");
    const iv = Buffer.from(vJson.iv, "base64");
    const key = crypto.pbkdf2Sync("8890", salt, 100000, 32, "sha256");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let dec = decipher.update(vJson.ciphertext, "base64", "utf8");
    dec += decipher.final("utf8");
    baseData = JSON.parse(dec);
  }

// ==========================================
// 1. 仔細構建 23 天完整每日行程 (itineraryData)
// ==========================================
const itineraryData = [
  {
    date: "9/15",
    weekday: "二",
    title: "台北 (TPE) ➔ 巴黎 (CDG) 啟程啟航",
    tag: "啟程飛行",
    summary: "23:30 搭乘長榮航空 BR87 直飛巴黎，機上充分休息迎接蜜月之旅！",
    keynote: {
      code: "BR87 (23:30)",
      codeLabel: "長榮航空直飛班機",
      spot: "桃園國際機場 (TPE) 第二航廈",
      hotel: "機上 (Overnight Flight)",
      mapQuery: "Taoyuan International Airport"
    },
    items: [
      {
        time: "20:30",
        title: "抵達桃園機場 T2 辦理報到與行李託運",
        desc: "出發前再次確認護照正本、國際駕照、網卡/eSIM、轉接頭與海外信用卡 4 位數 PIN 碼。提早 3 小時至長榮航空櫃檯辦理登機手續。",
        badges: ["護照證件", "國際駕照", "信用卡PIN碼"],
        map: "Taoyuan International Airport"
      },
      {
        time: "23:30",
        title: "長榮航空 BR87 準時起飛直飛巴黎",
        desc: "飛行時間約 14 小時 25 分鐘，機上安心睡眠調時差，養足精神迎接巴黎晨光！",
        badges: ["長榮直飛", "航程14.5小時", "安心補眠"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/16",
    weekday: "三",
    title: "抵達巴黎 ➔ 13區 B&B 寄行李 ➔ 瑪黑區散步調時差",
    tag: "初見巴黎",
    summary: "07:55 降落巴黎 CDG，搭 RER B 直達 13 區 B&B 寄行李，午後悠閒漫步瑪黑區！",
    keynote: {
      code: "BB22425685",
      codeLabel: "B&B 訂房代碼 (3晚)",
      spot: "戴高樂機場 ➔ 13區 B&B ➔ 瑪黑區",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy 3 étoiles",
      mapQuery: "B&B HOTEL Paris Italie Porte de Choisy"
    },
    items: [
      {
        time: "07:55",
        title: "長榮 BR87 平安抵達巴黎戴高樂機場 (CDG T1)",
        desc: "下機後跟隨 Sortie / Baggage 標誌通過海關查驗，領取行李（預留約 60~90 分鐘）。",
        badges: ["07:55抵達", "CDG T1", "海關通關"],
        map: "Charles de Gaulle Airport Terminal 1"
      },
      {
        time: "09:30",
        title: "購買 Navigo 週卡 ＆ 搭乘 RER B 線直奔市區",
        desc: "於機場車站購買實體 Navigo 週卡（儲值 1-5 圈週票約 30.75€，涵蓋 RER 機場線與後續楓丹白露火車），搭乘 RER B 線至市區轉地鐵 7 號線至 Porte de Choisy 站。",
        badges: ["Navigo週卡", "RER B線", "地鐵7號線"],
        map: "Gare Aeroport Charles de Gaulle 1"
      },
      {
        time: "11:30",
        title: "B&B HOTEL 寄放行李 ＆ 主動告知同房連住",
        desc: "抵達 B&B HOTEL Paris Italie Porte de Choisy 3 étoiles。主動向櫃檯出示 3 筆連續訂單代碼（BB22425685、BB22425273、BB22426149），請櫃檯直接安排同房連住免換房，寄放 2 個大行李。",
        badges: ["訂單: BB22425685", "連住9晚免換房", "寄放行李"],
        map: "B&B HOTEL Paris Italie Porte de Choisy"
      },
      {
        time: "13:00",
        title: "飯店周邊法式小酒館享用抵法第一餐",
        desc: "品嚐道地法式油封鴨或烤牛排薯條，喝一杯黑咖啡驅散長途飛行疲憊。",
        badges: ["道地法餐", "熱咖啡休整"],
        map: ""
      },
      {
        time: "15:00",
        title: "瑪黑區 (Le Marais) 悠閒漫步 ＆ 孚日廣場",
        desc: "漫步巴黎最古老唯美的孚日廣場 (Place des Vosges)，欣賞文藝復興紅磚拱廊，品嚐 Amorino 小天使花朵冰淇淋。",
        badges: ["孚日廣場", "小天使冰淇淋", "瑪黑文青巷"],
        map: "Place des Vosges Paris"
      },
      {
        time: "19:00",
        title: "返回 13 區 B&B 入住整理 ＆ 早睡調時差",
        desc: "回飯店正式領房卡 Check-in，熱水淋浴，21:00 準時就寢調整時差，迎接明日婚紗試穿！",
        badges: ["正式Check-in", "熱水澡", "早睡調時差"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/17",
    weekday: "四",
    title: "⛪ 09:00 聖禮拜堂晨光彩窗 ➔ 11:00 The Bride 試婚紗 ➔ 左岸雙叟午餐",
    tag: "晨光彩窗＋試婚紗",
    summary: "09:00 第一批參觀聖禮拜堂欣賞晨光彩繪玻璃（已預約），步行 15 分鐘接續 11:00 The Bride 試婚紗，午後漫步聖日耳曼左岸與雙叟咖啡館！",
    keynote: {
      code: "09:00聖禮拜堂 / 11:00試婚紗",
      codeLabel: "預約憑證與門禁",
      spot: "西堤島聖禮拜堂 ➔ The Bride 婚紗店 ➔ 雙叟咖啡館",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第2晚)",
      mapQuery: "8 boulevard du Palais 75001 Paris"
    },
    items: [
      {
        time: "08:15",
        title: "自飯店搭乘地鐵前往西堤島聖禮拜堂",
        desc: "搭乘地鐵 7 號至 Châtelet 轉 4 號至 Cité 站，車程約 25 分鐘，出站步行 2 分鐘直達聖禮拜堂入口。",
        badges: ["地鐵Cité站", "Navigo全包", "西堤島"],
        map: "8 boulevard du Palais 75001 Paris"
      },
      {
        time: "09:00",
        title: "⭐【聖禮拜堂 Sainte-Chapelle】早晨第一批！極致晨光彩繪玻璃",
        desc: "訂單【2618864216850403140】(票號 759304466060400 等)。早晨第 1 批晨光穿透 15 面高達 15 米的 13 世紀彩繪玻璃窗，色彩燦爛奪目！避開午後排隊人潮。憑證存 data/0917_聖禮拜堂_預約入場時段憑證_4人.pdf。",
        badges: ["✅已預約09:00", "第一批晨光彩窗", "西堤島必看", "訂單2618864216850403140"],
        map: "8 boulevard du Palais 75001 Paris"
      },
      {
        time: "10:00",
        title: "出館漫步跨聖米歇爾橋前往 6 區婚紗工作室",
        desc: "沿塞納河畔舊書攤漫步跨橋進入拉丁區與聖日耳曼商圈，步行僅需 15 分鐘 (1.1 公里) 直達 The Bride Paris，時間充裕動線極順暢！",
        badges: ["順路步行15分", "塞納河舊書攤", "跨聖米歇爾橋"],
        map: "22 rue de l Odeon 75006 Paris"
      },
      {
        time: "11:00",
        title: "⭐The Bride Paris 試穿婚紗（準時 11:00 抵達）",
        desc: "地點：22 rue de l'Odeon, 75006 Paris。門禁 Code: 2734 / 電梯 Code: 1869 (電梯搭至 1/2 樓右側門)。穿著無痕膚色內衣並攜帶 NuBra，化淡妝試穿。試穿選定修改後當天即可帶走，9/20 拍攝完當天歸還。",
        badges: ["11:00試穿", "門禁: 2734", "電梯: 1869", "免費修改帶走"],
        map: "22 rue de l Odeon 75006 Paris"
      },
      {
        time: "12:45",
        title: "⭐雙叟咖啡館 (Les Deux Magots) 露台午餐 ＆ 花神合影",
        desc: "自工作室步行 7 分鐘直達！1885 年傳奇咖啡館，坐二樓露台俯瞰教堂廣場，品嚐熱火腿起司三明治與烤蘋果塔，對門花神咖啡館合影拍照。",
        badges: ["雙叟二樓露台", "烤火腿三明治", "對門花神拍照"],
        map: "Les Deux Magots Paris"
      },
      {
        time: "14:30",
        title: "聖日耳曼德佩區漫步 ＆ 盧森堡公園綠椅日光浴",
        desc: "漫步左岸林蔭大道，在盧森堡公園梅第奇噴泉旁經典綠色鐵椅坐下，享受法式優雅陽光。下午將修改好的白紗帶回飯店高處懸掛防皺。",
        badges: ["聖日耳曼左岸", "盧森堡公園", "婚紗回房懸掛"],
        map: "Jardin du Luxembourg Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/18",
    weekday: "五",
    title: "楓丹白露宮（Château de Fontainebleau）宮殿與大花園漫步",
    tag: "皇家宮殿",
    summary: "搭火車走訪拿破崙深愛的楓丹白露宮，漫步馬蹄大階梯與幽靜大花園！",
    keynote: {
      code: "Transilien R (Navigo包)",
      codeLabel: "交通指南 (里昂車站直達)",
      spot: "楓丹白露宮 ➔ 鯉魚池 ➔ 第安娜花園",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第3晚)",
      mapQuery: "Chateau de Fontainebleau"
    },
    items: [
      {
        time: "09:30",
        title: "搭乘 Transilien R 線直達 Fontainebleau-Avon",
        desc: "自巴黎里昂車站 (Gare de Lyon) 出發直達 Fontainebleau-Avon 站（約 40 分鐘，Navigo 1-5 圈週卡全包免購票），出站搭 1 號公車直達宮殿大門。",
        badges: ["Transilien R線", "Navigo免費", "車程40分"],
        map: "Gare de Lyon Paris"
      },
      {
        time: "10:30",
        title: "⭐楓丹白露宮大套房參觀（拿破崙告別馬蹄階梯）",
        desc: "門票約 €14。參觀弗朗索瓦一世文藝復興長廊、奢華舞廳、拿破崙一世博物館與教宗套房，感受跨越八百年的法國君主風華。",
        badges: ["馬蹄階梯", "拿破崙大套房", "文藝復興長廊"],
        map: "Chateau de Fontainebleau"
      },
      {
        time: "13:30",
        title: "楓丹白露大花園、鯉魚池與森林步道漫步",
        desc: "宮殿花園完全免費開放，相較凡爾賽宮更加寧靜典雅。沿著巨大鯉魚池與第安娜花園野餐散步，享受午後清新微風。",
        badges: ["鯉魚池", "第安娜花園", "免費大公園"],
        map: "Jardin de Diane Fontainebleau"
      },
      {
        time: "17:00",
        title: "搭火車返抵巴黎市區 ＆ 13 區越式河粉晚餐",
        desc: "搭乘 R 線返回市區，於 13 區品嚐熱騰騰道地牛肉河粉 (Pho)，溫暖飽足。",
        badges: ["13區越式河粉", "悠閒晚間"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/19",
    weekday: "六",
    title: "🏛️ 歐洲遺產日：10:30 巴黎市政廳內部參觀 ➔ 瑪黑漫步 ➔ 拍婚紗前夜總準備",
    tag: "歐洲遺產日",
    summary: "歐洲遺產日限定開放！10:30 參觀巴黎市政廳內部金碧輝煌節慶大廳與市長辦公室（已獲邀請函），午後瑪黑區漫步，傍晚清點整理婚紗配件、備妥現金 €2500，21:00 早睡養膚迎接明日婚紗開拍！",
    keynote: {
      code: "10:30 入場 (T3508E / T3509E)",
      codeLabel: "市政廳預約邀請函",
      spot: "巴黎市政廳 ➔ 3 Rue de Lobau ➔ 瑪黑商圈",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第4晚)",
      mapQuery: "3 rue de Lobau 75004 Paris"
    },
    items: [
      {
        time: "10:15",
        title: "抵達巴黎市政廳專屬入口・排隊安檢",
        desc: "搭乘地鐵 7 號轉 1 號至 Hôtel de Ville 站，步行 2 分鐘抵達 3 Rue de Lobau 專屬入口排隊安檢。",
        badges: ["提早15分安檢", "3 Rue de Lobau", "地鐵Hôtel de Ville"],
        map: "3 rue de Lobau 75004 Paris"
      },
      {
        time: "10:30",
        title: "⭐【歐洲遺產日】巴黎市政廳 (Hôtel de Ville) 內部宮殿深度參觀",
        desc: "一年一度歐洲遺產日限定開放！出示手機或紙本 PDF 條碼。雙人票號【T3508E1837513O264872 / T3509E1837513O264872】(條碼: 66030217949317 / 66030217958945)。走進極致奢華的「節慶大廳 (Salle des Fêtes)」，水晶巨燈與金箔浮雕壁畫媲美凡爾賽鏡廳！憑證存 data/0919_巴黎市政廳_歐洲遺產日參觀憑證.pdf。",
        badges: ["✅已獲邀請函", "票號T3508E/T3509E", "媲美凡爾賽鏡廳", "節慶大廳"],
        map: "Hotel de Ville Paris"
      },
      {
        time: "12:15",
        title: "市政廳對面巴詩威百貨 (BHV Marais) 午餐 ＆ 瑪黑區漫步",
        desc: "參觀完過馬路至巴詩威百貨 (Le BHV Marais) 享用輕食午餐，逛法式生活居家與廚具專區，或在瑪黑區巷弄悠閒漫步。",
        badges: ["巴詩威百貨", "BHV Marais", "瑪黑老街散步"],
        map: "Le BHV Marais Paris"
      },
      {
        time: "14:30",
        title: "法國興業銀行總行百年玻璃穹頂 (或回飯店休整充電)",
        desc: "可順遊 29 Boulevard Haussmann 奧斯曼旗艦總行仰望彩色玻璃巨型穹頂，或提早回飯店休息保存明日婚紗拍攝體力。",
        badges: ["興業銀行百年穹頂", "彈性休整"],
        map: "Societe Generale 29 Boulevard Haussmann Paris"
      },
      {
        time: "16:00",
        title: "返回飯店整理婚紗拍攝道具 ＆ 自備配件",
        desc: "清點道具：平底好走便鞋、保暖披肩外套、新娘無痕 NuBra、新郎黑色西裝皮鞋與襯衫、透明雨傘備用。",
        badges: ["檢查拍攝備品", "便鞋與披肩", "NuBra與西裝"],
        map: ""
      },
      {
        time: "17:00",
        title: "⚠️ 備妥拍攝尾款歐元現鈔【€2,500 歐元】",
        desc: "攝影工作室現場不提供刷卡！出發前清點備妥 2,500 歐元現鈔，放置於安全防盜包中備用。",
        badges: ["⚠️備妥現鈔€2500", "防盜包保管", "現場無刷卡"],
        map: ""
      },
      {
        time: "21:00",
        title: "早睡養膚！設定明日清晨 03:45 鬧鐘",
        desc: "晚餐吃清淡低鈉食物避免水腫，敷保濕面膜，21:00 前熄燈就寢迎接明日浪漫難忘的巴黎日出婚紗拍攝！",
        badges: ["早睡養膚", "03:45雙重鬧鐘", "日出開拍"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/20",
    weekday: "日",
    title: "💍 巴黎蜜月婚紗拍攝日（日出開拍）",
    tag: "蜜月婚紗",
    summary: "清晨梳化，日出開拍！專車接送至鐵塔、羅浮宮、亞歷山大三世橋拍攝一生回憶！",
    keynote: {
      code: "04:00梳化 / 07:00開拍",
      codeLabel: "婚紗拍攝時間表",
      spot: "艾菲爾鐵塔 ➔ 羅浮宮 ➔ 亞歷山大三世橋",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第5晚)",
      mapQuery: "Pont Alexandre III Paris"
    },
    items: [
      {
        time: "04:00",
        title: "起床洗漱 ＆ 專業造型師進行髮妝造型梳化",
        desc: "造型師準時上門梳畫，打造精緻唯美新娘髮妝與西服整理。",
        badges: ["04:00梳化", "精緻造型", "新娘妝容"],
        map: ""
      },
      {
        time: "07:00",
        title: "⭐晨光日出開拍：艾菲爾鐵塔 (夏樂宮與戰神廣場)",
        desc: "攝影團隊專車接送。把握清晨柔和金光與無人空景，在夏樂宮露台與艾菲爾鐵塔合影，留下晨光下的經典紀念！",
        badges: ["鐵塔日出", "夏樂宮無人空景", "專車接送"],
        map: "Place du Trocadero Paris"
      },
      {
        time: "09:30",
        title: "羅浮宮金字塔 ＆ 皇家宮殿 (Palais Royal) 黑白柱",
        desc: "於貝聿銘玻璃金字塔前定格現代與古典交融，隨後至皇家宮殿中庭經典布倫黑白條紋柱取景。",
        badges: ["羅浮宮金字塔", "皇家宮殿黑白柱", "經典法式構圖"],
        map: "Palais Royal Paris"
      },
      {
        time: "12:00",
        title: "亞歷山大三世橋 (Pont Alexandre III) ＆ 塞納河畔",
        desc: "在全巴黎最華麗的金翼天使橋頭與路燈下拍攝電影感構圖，背景遠眺榮軍院金色圓頂與塞納河。",
        badges: ["亞歷山大三世橋", "金翼飛馬", "電影質感場景"],
        map: "Pont Alexandre III Paris"
      },
      {
        time: "16:00",
        title: "拍攝圓滿完成！專車歸還禮服 ＆ 慶功大餐好好犒賞自己",
        desc: "專車歸還婚紗禮服。回飯店卸妝換上舒適衣服，前往預約餐廳大啖牛排與甜點，慶祝婚紗圓滿大成功！",
        badges: ["婚紗歸還", "慶功大餐", "圓滿成功"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/21",
    weekday: "一",
    title: "08:30 還婚紗 ➔ 左岸晨光咖啡 ➔ 聖禮拜堂 ➔ 橘園 ➔ 16:00 Chez Janou",
    tag: "婚紗歸還・文藝巴黎",
    summary: "08:30 準時還婚紗一身輕！聖日耳曼左岸享用可頌咖啡，沉浸聖禮拜堂與橘園睡蓮，晚間大啖 Chez Janou 巨盆巧克力！",
    keynote: {
      code: "08:30 還婚紗 / 16:00 Chez Janou",
      codeLabel: "重要預約時段",
      spot: "The Bride Paris ➔ 聖日耳曼左岸 ➔ 聖禮拜堂 ➔ 橘園 ➔ Chez Janou",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第6晚)",
      mapQuery: "Chez Janou Paris"
    },
    items: [
      {
        time: "08:30",
        title: "⭐The Bride Paris 準時歸還婚紗（卸下重裝一身輕！）",
        desc: "07:45 攜帶婚紗禮服從 13 區 B&B HOTEL 出發搭地鐵至 Odéon 站，08:30 準時點交歸還至工作室（22 Rue de l'Odéon，門禁: 2734 / 電梯: 1869）。點交完成一身輕鬆！",
        badges: ["08:30已約定", "門禁2734", "電梯1869", "卸裝一身輕"],
        map: "22 Rue de l'Odeon Paris"
      },
      {
        time: "09:00",
        title: "聖日耳曼德佩左岸晨光咖啡與悠閒早餐",
        desc: "歸還婚紗後步行 5 分鐘至雙叟咖啡館 (Les Deux Magots) 或花神咖啡館 (Café de Flore) 露天座，在初秋巴黎晨光中享用法式現烤可頌與熱拿鐵，享受完全放鬆的悠閒時光。",
        badges: ["左岸咖啡館", "現烤可頌", "晨光放鬆"],
        map: "Les Deux Magots Paris"
      },
      {
        time: "11:00",
        title: "⭐聖禮拜堂 (Sainte-Chapelle) 極致彩繪玻璃",
        desc: "博物館通票開通！登二樓仰望 15 扇高達 15 米的 13 世紀中世紀彩繪玻璃窗，陽光穿透如身處巨型萬花筒珠寶盒。（建議預約 11:00 或 11:30 場次）",
        badges: ["博物館通票首日", "中世紀彩繪玻璃", "陽光透射"],
        map: "Sainte-Chapelle Paris"
      },
      {
        time: "12:00",
        title: "巴黎古監獄 (Conciergerie) 瑪麗王后囚室",
        desc: "順道參觀隔壁古監獄，中世紀壯觀哥德式衛兵大廳，走訪法國大革命瑪麗安東尼王后最後囚禁處。",
        badges: ["古監獄", "瑪麗王后囚室", "哥德衛兵大廳"],
        map: "Conciergerie Paris"
      },
      {
        time: "14:00",
        title: "橘園美術館 (Musée de l'Orangerie) 莫內睡蓮",
        desc: "走進兩間橢圓形純白展廳，360 度沉浸在莫內八幅巨大《睡蓮 (Nymphéas)》全景畫的平靜光影中。（官網需預約 14:00 場次）",
        badges: ["360度睡蓮", "橢圓展廳", "莫內巨作", "需預約14:00"],
        map: "Musee de l Orangerie Paris"
      },
      {
        time: "16:00",
        title: "⭐Chez Janou 瑪黑區南法小酒館（已預訂 16:00 專屬席）",
        desc: "品嚐人氣招牌：香煎干貝牛肝菌燉飯、普羅旺斯焗蝸牛、油封鴨肉，最後店員送上整盆無限挖的招牌「巨盆巧克力慕斯 (Mousse au Chocolat)」！",
        badges: ["✅ 16:00已訂位", "焗烤蝸牛", "無限挖巧克力慕斯"],
        map: "Chez Janou Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/22",
    weekday: "二",
    title: "奧塞美術館 ➔ 聖母院內部 ➔ 先賢祠 ➔ 17:30 Polène樂蓬馬歇專櫃 ➔ 油封鴨晚餐",
    tag: "印象派殿堂",
    summary: "欣賞奧塞美術館莫內與梵谷名畫，走進聖母院內部，登上先賢祠遠眺，傍晚前往樂蓬馬歇專櫃免排長隊買 Polène 包包並合併退稅！",
    keynote: {
      code: "博物館通票第2日",
      codeLabel: "票券使用",
      spot: "奧塞美術館 ➔ 聖母院 ➔ 先賢祠 ➔ Polène樂蓬馬歇",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第7晚)",
      mapQuery: "Le Bon Marche Paris"
    },
    items: [
      {
        time: "09:30",
        title: "⭐奧塞美術館 (Musée d'Orsay) 印象派大師真跡",
        desc: "昔日舊火車站改建！直奔 5 樓印象派長廊：梵谷《自畫像》《羅納河上的星夜》、莫內《撐傘的女人》、雷諾瓦《煎餅磨坊的舞會》、米勒《拾穗》，在巨大時鐘後方拍照！",
        badges: ["奧塞火車站", "梵谷星夜", "雷諾瓦舞會", "大時鐘窗景"],
        map: "Musee d Orsay Paris"
      },
      {
        time: "13:30",
        title: "巴黎聖母院 (Cathédrale Notre-Dame de Paris) 內部參觀",
        desc: "浴火重生後全新開放！仰望玫瑰花窗與莊嚴宏偉的中世紀石造中殿，感受奇蹟般的修復成果。（手機 Notre-Dame App 預約 14:35 場次）",
        badges: ["2024全新開放", "玫瑰花窗", "哥德經典"],
        map: "Notre-Dame de Paris"
      },
      {
        time: "15:30",
        title: "先賢祠 (Panthéon) ＆ La Crèma 手工冰淇淋",
        desc: "參觀傅科擺與地下陵墓（雨果、大仲馬、居里夫人安息處）。出門順道品嚐 2026 爆紅的 La Crèma 現烤甜筒全植物生巧克力 Gelato！",
        badges: ["先賢祠", "傅科擺", "La Crèma手工冰淇淋"],
        map: "Pantheon Paris"
      },
      {
        time: "17:30",
        title: "⭐Polène 左岸樂蓬馬歇專櫃（Le Bon Marché 0樓）",
        desc: "全巴黎排隊時間最短的門市（通常 5-10 分鐘即可進櫃看包）！購買後可順道逛百年貴婦超市 (La Grande Épicerie)，並在百貨退稅服務台合併累計退稅（營業至 19:45）。",
        badges: ["免大排長隊", "全系列包款", "百貨合併退稅"],
        map: "Le Bon Marche Paris"
      },
      {
        time: "19:30",
        title: "拉丁區巷弄小酒館享用高 CP 值傳統法式油封鴨晚餐",
        desc: "外皮酥脆金黃、肉質軟嫩多汁的傳統油封鴨腿佐香煎馬鈴薯，漫步塞納河畔欣賞初秋巴黎夜景。",
        badges: ["傳統油封鴨", "高 CP 值", "塞納河夜景"],
        map: "Quartier Latin Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/23",
    weekday: "三",
    title: "Polène 香榭旗艦店朝聖 ➔ 羅浮宮全日深度遊 ➔ 金字塔夜景",
    tag: "世界之最",
    summary: "早晨朝聖 Polène 旗艦店買包，走地下卡魯塞爾通道 12:30 進羅浮宮，親睹三寶與拿破崙套房，週三夜間開放至 21:00！",
    keynote: {
      code: "V260782031751 (訂單: C262540015444)",
      codeLabel: "羅浮宮門票訂單號",
      spot: "Polène旗艦店 ➔ 地下卡魯塞爾 ➔ 羅浮宮 ➔ 玻璃金字塔",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第8晚)",
      mapQuery: "Louvre Museum Paris"
    },
    items: [
      {
        time: "10:00",
        title: "⭐ Polène Paris 香榭旗艦店朝聖買包（開門第一批）",
        desc: "2 Rond-Point des Champs-Élysées。全球最大雙層藝廊空間，10:00 開門免排隊挑選經典手工小牛皮包款，現場開立退稅單！",
        badges: ["Polène香榭旗艦店", "凱特王妃同款", "開門免排隊"],
        map: "Polene Paris Champs Elysees"
      },
      {
        time: "11:30",
        title: "搭地鐵至地下卡魯塞爾商場（包包寄放免費置物櫃）",
        desc: "搭乘地鐵 1 號線 7 分鐘直達羅浮宮站。走進地下倒金字塔商場，包包戰利品直接放進免費置物櫃，享用輕食咖啡墊胃。",
        badges: ["地下商場", "免費置物櫃", "輕食墊胃"],
        map: "Carrousel du Louvre Paris"
      },
      {
        time: "12:30",
        title: "⭐ 羅浮宮 12:30 入場・三大鎮館之寶巡禮 ＆ 拿破崙三世套房",
        desc: "門票已預約（訂單號: C262540015444 / 銷售序號: V260782031751，已存 data/0923_羅浮宮_雙人門票預約憑證.pdf）。由倒金字塔旁的地下通道進入，避開地表大金字塔冗長隊伍，快速通過安檢！鎖定德農館《勝利女神》➔ 《蒙娜麗莎》➔ 敘利館《維納斯》➔ 黎塞留館《拿破崙三世套房》。",
        badges: ["12:30預約場次", "地下通道快速安檢", "Ref: V260782031751"],
        map: "Musee du Louvre Paris"
      },
      {
        time: "20:00",
        title: "走出羅浮宮拍攝玻璃金字塔科幻金光夜景",
        desc: "週三夜間開放至 21:00！出館時華燈初上，貝聿銘玻璃金字塔在夜色中散發溫暖金黃光芒，與古典宮殿互相映照，畫面典雅動人。",
        badges: ["週三夜間開放", "金字塔夜景", "迷人夜色"],
        map: "Pyramide du Louvre Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/24",
    weekday: "四",
    title: "聖心堂・Pink Mamma午餐・歌劇院導覽・外帶晚餐早睡",
    tag: "巴黎經典",
    summary: "聖心堂俯瞰全城，12:00 Pink Mamma午餐，17:00 歌劇院夜導，外帶晚餐早睡迎明日高鐵！",
    keynote: {
      code: "op07092026-932770962",
      codeLabel: "歌劇院導覽憑證號",
      spot: "聖心堂 ➔ 12:00 Pink Mamma ➔ 17:00 歌劇院夜導 ➔ 外帶晚餐",
      hotel: "B&B HOTEL Paris Italie (市區最後1晚)",
      mapQuery: "Palais Garnier"
    },
    items: [
      {
        time: "09:30",
        title: "聖心堂 (Basilique du Sacré-Cœur) 俯瞰全巴黎天際線",
        desc: "搭地鐵 12 號線前往蒙馬特高地，坐在白色大教堂前階梯俯瞰晨光下的巴黎全景，隨後下山至「愛牆 (Mur des Je t'aime)」打卡拍照。",
        badges: ["聖心堂俯瞰", "蒙馬特高地", "愛牆拍照"],
        map: "Basilique du Sacre-Coeur Paris"
      },
      {
        time: "11:45",
        title: "⭐皮加勒超人氣餐廳：Pink Mamma 享用 12:00 午餐",
        desc: "自愛牆沿石階緩下坡步行 10 分鐘即達皮加勒區。四層樓復古玻璃花房餐廳，品嚐人氣招牌現刨黑松露手工寬麵與柴燒窯烤披薩！",
        badges: ["12:00人氣午餐", "招牌松露義大利麵", "四層樓玻璃花房"],
        map: "Pink Mamma Paris"
      },
      {
        time: "13:45",
        title: "奧斯曼大道商圈漫步 ＆ 百貨巡禮 / 咖啡小憩",
        desc: "午餐後沿 Rue Blanche 緩步逛街下坡（步行約 15-18 分鐘）抵達歌劇院與奧斯曼商圈，逛老佛爺百貨、春天百貨，悠閒喝咖啡休息。",
        badges: ["奧斯曼大道", "老佛爺百貨", "午後咖啡休整"],
        map: "Galeries Lafayette Paris"
      },
      {
        time: "16:30",
        title: "⚠️ 提前 30 分抵達歌劇院報到！(夏爾加尼葉雕像後方入口)",
        desc: "因嚴格反恐安檢務必 16:30 前抵達！入口位於 rue Scribe 與 rue Auber 轉角之「夏爾·加尼葉雕像」後方專屬入口，手機出示 Email 電子憑證 (訂單號: op07092026-932770962) 兌換入場。",
        badges: ["⚠️ 16:30 提前到場", "雕像後方專屬入口", "出示電子憑證"],
        map: "Place de l Opera 75009 Paris"
      },
      {
        time: "17:00",
        title: "⭐巴黎加尼葉歌劇院閉館夜間導覽 (The Mysteries of the Palais Garnier)",
        desc: "✅ 已購雙人票 84€！90 分鐘專屬英文閉館夜間導覽。避開白天擁擠散客，獨享金碧輝煌大階梯空景與大休息廳，走進專屬包廂仰望夏卡爾巨幅天頂畫！",
        badges: ["✅ 閉館導覽已付 84€", "Ref: op07092026-932770962", "夏卡爾天頂畫"],
        map: "Palais Garnier"
      },
      {
        time: "18:30",
        title: "外帶晚餐回飯店 ＆ 整理明日諾曼第自駕大行李",
        desc: "因明日清晨需搭乘 06:48 高鐵，今晚直接執行外帶晚餐：可順道至後方老佛爺美食館 (La Maison Le Gourmet) 外帶現烤布列塔尼烤雞＋馬鈴薯，或於 13 區買燒臘便當。回飯店邊吃邊整理大行李，檢查 Sixt 租車文件與 PIN 碼，21:30 準時早睡！",
        badges: ["外帶熟食回飯店", "收拾自駕行李", "核對租車文件", "21:30 早睡"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/25",
    weekday: "五",
    title: "高鐵 ➔ 雷恩取車 ➔ 聖馬洛 ➔ 康卡勒生蠔 ➔ 聖米山 Mercure",
    tag: "自駕起跑",
    summary: "06:48 高鐵抵雷恩領車，走訪聖馬洛海盜城與康卡勒生蠔，入住聖米山管制區 Mercure！",
    keynote: {
      code: "車庫電梯碼: 6060",
      codeLabel: "雷恩 Effia 停車場",
      spot: "雷恩高鐵站 ➔ 聖馬洛古城 ➔ 康卡勒 ➔ 聖米山",
      hotel: "Hôtel Mercure Mont Saint-Michel (QQDDDWJZ)",
      mapQuery: "Hotel Mercure Mont Saint-Michel"
    },
    items: [
      {
        time: "06:48",
        title: "巴黎 Montparnasse 搭乘 SNCF TGV 高鐵前往雷恩 (Rennes)",
        desc: "車票已購（訂位代號: 4WCP2R，2人共 68€）。06:48 準時發車，08:15 抵達布列塔尼首府雷恩高鐵站。",
        badges: ["TGV高鐵 4WCP2R", "車程1.5小時", "巴黎➔雷恩"],
        map: "Gare Montparnasse Paris"
      },
      {
        time: "08:30",
        title: "Sixt 雷恩取車（Peugeot 3008 休旅車 · 預訂號: 9738701348）",
        desc: "出雷恩北站手扶梯直達 Sixt 櫃檯。出示護照、台灣駕照正本、國際駕照與實體信用卡。前往 Effia 車庫，於 0 樓電梯面板輸入密碼【6060】搭至 7 樓取車！後車廂拉好遮物簾，開啟 CarPlay 導航啟程！",
        badges: ["Sixt: 9738701348", "車庫密碼: 6060", "零自付額全險", "Peugeot 3008"],
        map: "Sixt Rennes Gare TGV"
      },
      {
        time: "10:30",
        title: "聖馬洛古城 (Saint-Malo) ＆ 登城牆遠眺英吉利海峽",
        desc: "停入 Q-Park Saint-Vincent 地下停車場。漫步花崗岩海盜城堡，登上防禦城牆遠眺汪洋與海潮。購買現烤焦糖奶油酥 (Kouign-Amann)。",
        badges: ["海盜古城", "海景城牆", "焦糖奶油酥"],
        map: "Saint-Malo France"
      },
      {
        time: "13:30",
        title: "康卡勒海灣 (Cancale) 生蠔市場現開現吃",
        desc: "停入海港停車場，走至生蠔小攤現買一打新鮮生蠔（約 6~9€），擠上檸檬汁坐在石堤上邊看海天一色邊享用鮮美海味，將生蠔殼丟回灘塗！",
        badges: ["生蠔市場", "現開現吃", "產地直送"],
        map: "Marche aux Huitres Cancale"
      },
      {
        time: "17:00",
        title: "入住 Hôtel Mercure Mont Saint-Michel (管制區內已付款)",
        desc: "開車抵達 La Caserne 管制區道閘，輸入飯店發送之 6 位數車輛通行碼抬桿進場。停妥專屬停車場後切勿再開車出道閘！回房稍事休息。",
        badges: ["管制區專屬道閘", "含雙人早餐", "Ref: QQDDDWJZ"],
        map: "Hotel Mercure Mont Saint-Michel"
      },
      {
        time: "20:30",
        title: "庫埃農河水壩遠眺聖米山夜景 ＆ 飯店休整",
        desc: "晚間漫步至庫埃農河水壩欣賞聖米歇爾山金光亮起的夢幻夜景，享受寧靜晚風，飯店休整。",
        badges: ["水壩夜景", "金色聖米山", "夜間漫步"],
        map: "Barrage sur le Couesnon"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/26",
    weekday: "六",
    title: "聖米山晨光包島 ➔ 14:00 La Ferme羊肉 ➔ 草原拍羊 ➔ 翁夫勒夕陽",
    tag: "大潮奇景",
    summary: "晨光無人包島，修道院漫步，14:00 大啖黑面鹽沼羊排，秘境草原拍羊，入住翁夫勒！",
    keynote: {
      code: "道閘螢幕密碼: 645504",
      codeLabel: "La Ferme 羊肉餐廳道閘碼",
      spot: "聖米山修道院 ➔ 14:00 La Ferme ➔ 秘境草原 ➔ 翁夫勒",
      hotel: "B&B HOTEL Honfleur (BB22633724)",
      mapQuery: "La Ferme Saint-Michel"
    },
    items: [
      {
        time: "07:30",
        title: "搭免費接駁車直奔聖米歇爾山岩山（無人晨光包島）",
        desc: "趁大批觀光團湧入前搶先登島！打開 VoiceMap 語音導覽 App (輸入兌換碼【0B6CBA60】)，戴上耳機走過古老中世紀蜿蜒石板巷。",
        badges: ["晨光包島", "免費接駁車", "導覽碼: 0B6CBA60"],
        map: "Mont Saint-Michel France"
      },
      {
        time: "09:00",
        title: "⭐聖米歇爾山修道院 (Abbaye du Mont-Saint-Michel) 深度參觀",
        desc: "登上全島頂端，參觀壯麗的羅曼與哥德式修道院、空中迴廊庭院與修道士大廳，俯瞰廣袤無垠的沙洲海灣與潮汐全景。",
        badges: ["世界文化遺產", "空中迴廊", "潮汐海灣"],
        map: "Abbaye du Mont Saint-Michel"
      },
      {
        time: "12:00",
        title: "返回 Mercure 飯店退房 ＆ 行李寄放櫃檯",
        desc: "退房後將大行李免費寄存於飯店櫃檯行李房 (Bagagerie)，輕裝前往餐廳。",
        badges: ["12:00退房", "免費寄行李"],
        map: ""
      },
      {
        time: "14:00",
        title: "⭐La Ferme Saint-Michel 黑面鹽沼羊排午餐（已預訂 14:00）",
        desc: "於管制區道閘鍵盤/觸控螢幕輸入密碼【645504】進場停車。品嚐著名由大西洋海水鹽分牧草餵養、肉質細嫩無騷味的「黑面鹽沼羊 (Agneau de pré-salé)」！",
        badges: ["✅ 14:00已訂位", "道閘碼: 645504", "黑面鹽沼羊排"],
        map: "La Ferme Saint-Michel"
      },
      {
        time: "15:30",
        title: "沿 D275 草原秘境觀賞黑面羊群 ＆ 自駕前往翁夫勒",
        desc: "取回大行李上車。行經 D275 公路遠眺開闊草甸上的黑面羊群與遠方聖米山同框。隨後行駛 A84 / A13 高速公路前往翁夫勒 (約 2 小時)。",
        badges: ["草原拍羊秘境", "A84/A13高速", "前往翁夫勒"],
        map: "Honfleur France"
      },
      {
        time: "18:30",
        title: "翁夫勒舊港 (Vieux Bassin) 漫步夕陽 ＆ 入住 B&B HOTEL",
        desc: "漫步 17 世紀古老港灣，欣賞五彩窄版木石倒影與帆船夕陽。入住 B&B HOTEL Honfleur（訂單: BB22633724，附免費停車場）。",
        badges: ["翁夫勒舊港", "帆船夕陽", "B&B Honfleur 免費停車"],
        map: "B&B HOTEL Honfleur"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/27",
    weekday: "日",
    title: "翁夫勒 ➔ 諾曼第大橋 ➔ 象鼻海岸 ➔ 盧昂 ➔ 20:00 La Couronne 百年法餐",
    tag: "白堊懸崖",
    summary: "跨越諾曼第大橋，漫步象鼻海岸絕壁步道，自駕至盧昂，大啖 1345 年全法最古老法餐！",
    keynote: {
      code: "790B-8602-147D-CA61",
      codeLabel: "La Couronne 訂位代碼",
      spot: "諾曼第大橋 ➔ 象鼻海岸 ➔ 盧昂 ➔ La Couronne",
      hotel: "Grand Hôtel de la Seine (連住2晚免搬行李！)",
      mapQuery: "La Couronne Rouen"
    },
    items: [
      {
        time: "09:30",
        title: "參觀翁夫勒聖凱瑟琳木造教堂 ＆ 跨越諾曼第大橋",
        desc: "參觀全法國最大、由中世紀造船工匠純木建造的聖凱瑟琳教堂。隨後開車跨越宏偉的諾曼第斜張大橋 (Pont de Normandie，過橋費約 5.8€)。",
        badges: ["全木造教堂", "諾曼第斜張大橋", "過橋費約5.8€"],
        map: "Pont de Normandie"
      },
      {
        time: "10:45",
        title: "⭐象鼻海岸 (Étretat) 白堊紀壯麗懸崖步道",
        desc: "停入 Grand Val 停車場。沿著阿瓦爾懸崖 (Falaise d'Aval) 步道登頂，俯瞰象鼻穿入大海與高聳針峰海蝕柱，讚嘆莫內畫筆下大自然的鬼斧神工！",
        badges: ["阿瓦爾象鼻懸崖", "海蝕針峰", "莫內畫作地標"],
        map: "Falaise d Aval Etretat"
      },
      {
        time: "16:30",
        title: "自駕前往歷史古都盧昂 ＆ 入住 Grand Hôtel de la Seine",
        desc: "行駛 A150 高速公路至盧昂市區，入住塞納河畔水岸飯店 Grand Hôtel de la Seine（訂單號: K2N3SI，連住 2 晚免搬行李！停入飯店地下停車場約 12€/24h）。",
        badges: ["連住2晚免搬行李", "Ref: K2N3SI", "飯店私人地下車庫"],
        map: "Grand Hotel de la Seine Rouen"
      },
      {
        time: "20:00",
        title: "⭐La Couronne 1345 百年老餐廳燭光晚餐（已預訂 20:00 專屬席）",
        desc: "步行至聖女貞德舊市集廣場 31 號。創立於 1345 年全法國最古老的小酒館，品嚐傳統諾曼第法式料理，佐香醇諾曼第蘋果白蘭地 (Calvados)！",
        badges: ["✅ 20:00已預約", "全法最古老1345年小酒館", "Ref: 790B-8602"],
        map: "La Couronne Rouen"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/28",
    weekday: "一",
    title: "盧昂歷史首府深度慢活 ＆ 美術館莫內真跡（免換房續住）",
    tag: "文化慢活",
    summary: "大教堂深度參觀，登天文大時鐘樓俯瞰老城，盧昂美術館賞莫內真跡，續住第2晚超輕鬆！",
    keynote: {
      code: "續住免換房！",
      codeLabel: "輕鬆免收行李",
      spot: "盧昂大教堂 ➔ 大時鐘登頂 ➔ 盧昂美術館 ➔ 聖馬克盧老街",
      hotel: "Grand Hôtel de la Seine (第2晚)",
      mapQuery: "Rouen Cathedral"
    },
    items: [
      {
        time: "09:00",
        title: "盧昂聖母大教堂 (Cathédrale Notre-Dame de Rouen) 深度參觀",
        desc: "走進莫內描繪了 30 多幅名作的宏偉哥德式大教堂內部，仰望全法國最高的教堂尖塔與彩繪玻璃神聖光影。",
        badges: ["莫內筆下教堂", "全法最高尖塔", "哥德極致"],
        map: "Rouen Cathedral"
      },
      {
        time: "10:30",
        title: "文藝復興大時鐘街 ＆ 金色天文鐘樓登頂俯瞰",
        desc: "漫步大時鐘街，登上 14 世紀鍍金天文鐘樓頂端，360 度俯瞰盧昂童話般的哥德尖塔與半木結構歪斜屋頂全景。",
        badges: ["鍍金天文鐘", "360度老城俯瞰", "童話木架屋"],
        map: "Le Gros-Horloge Rouen"
      },
      {
        time: "13:45",
        title: "⭐盧昂美術館 (Musée des Beaux-Arts) 名畫鑑賞",
        desc: "常設展免費入場！親睹莫內《盧昂大教堂》系列油畫真跡與卡拉瓦喬、傑利柯等大師名作，館藏極為豐富典雅。",
        badges: ["莫內教堂真跡", "常設展免費", "卡拉瓦喬大師名畫"],
        map: "Musee des Beaux-Arts Rouen"
      },
      {
        time: "15:45",
        title: "聖馬克盧半木老街漫步 ＆ 買盧昂特產蘋果糖",
        desc: "漫步全城最古老半木結構街區，品嚐百年老店「糖蘋果 (Sucre de Pomme)」與諾曼第蘋果派，享受優閒午後時光。",
        badges: ["半木老街", "糖蘋果百年老店", "塞納河水岸散步"],
        map: "Eglise Saint-Maclou Rouen"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/29",
    weekday: "二",
    title: "盧昂出發 ➔ 10:00 莫內睡蓮花園 ➔ 韋爾農老磨坊 ➔ 凡爾賽商場採買",
    tag: "印象睡蓮",
    summary: "08:30 退房，10:00 莫內睡蓮池快速通關，百年玫瑰餐廳午餐，老磨坊留影，入住凡爾賽！",
    keynote: {
      code: "2624364336390402463",
      codeLabel: "莫內花園門票訂單號 (10:00入場)",
      spot: "莫內花園 (10:00) ➔ 韋爾農老磨坊 ➔ 凡爾賽商場",
      hotel: "B&B HOTEL Versailles Le Chesnay 3 étoiles (BB22648830)",
      mapQuery: "Fondation Claude Monet Giverny"
    },
    items: [
      {
        time: "08:30",
        title: "盧昂飯店退房 ＆ 行李全數上車出發走 A13 高速公路",
        desc: "大行李鎖入後車廂拉上遮物簾，08:45 出發行駛 A13 高速公路一路向東南直奔吉維尼 (約 72 公里 / 預留 50 分鐘)。",
        badges: ["08:30退房", "大行李鎖後車廂", "A13高速公路"],
        map: ""
      },
      {
        time: "09:35",
        title: "抵達吉維尼停入 Parking du Verger 大停車場 (免費)",
        desc: "停入官方免費大草坪停車場，步行 3 分鐘至 Sente Leroy 專屬通道，準備 10:00 準時快速通關進園。",
        badges: ["完全免費停車", "步行3分鐘", "準備入場"],
        map: "Parking du Verger Giverny"
      },
      {
        time: "10:00",
        title: "⭐吉維尼莫內花園與故居（Door n°1 bis 快速通關入場）",
        desc: "門票已預約（時段 10:00 · 訂單號: 2624364336390402463，已存 data/0929_吉維尼莫內花園_雙人電子門票.pdf）。由 Door n°1 bis 快速通關掃描進園，直奔水上花園拍攝晨光倒影日本橋與睡蓮池，漫步故居粉綠色畫室廚房。",
        badges: ["✅ 10:00已購票", "Door n°1 bis 快速通道", "倒影日本橋", "睡蓮池"],
        map: "Fondation Claude Monet Giverny"
      },
      {
        time: "12:15",
        title: "吉維尼百年玫瑰花園法式午餐：Restaurant Baudy",
        desc: "在昔日塞尚、雷諾瓦、羅丹等印象派大師聚會的百年老餐廳享用午餐，漫步後方繁花盛開的古老玫瑰山坡花園。",
        badges: ["百年大師聚會所", "露天玫瑰花園", "傳統諾曼第法餐"],
        map: "Restaurant Baudy Giverny"
      },
      {
        time: "13:45",
        title: "韋爾農懸空老磨坊 (Vieux Moulin de Vernon) 留影漫步",
        desc: "順道自駕前往 Vernon（約 5 分鐘），欣賞建在中世紀塞納河古斷橋橋墩上的木造懸空古磨坊，如童話繪本走出的場景！",
        badges: ["懸空中世紀老磨坊", "莫內畫作取景地", "免費停車"],
        map: "Le Vieux Moulin Vernon"
      },
      {
        time: "17:00",
        title: "入住 B&B HOTEL Versailles Le Chesnay ＆ 逛商場採買",
        desc: "入住飯店（訂單號: BB22648830，現場待付 121.06€）。下樓走路 3 分鐘即達 Westfield Parly 2 大型商場！逛老佛爺百貨 (~20:30) 與 Monoprix 大超市 (~21:00) 採買隔日凡爾賽早餐與水果優格！",
        badges: ["Ref: BB22648830", "步行3分到商場", "老佛爺百貨", "Monoprix大超市"],
        map: "B&B HOTEL Versailles Le Chesnay"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "9/30",
    weekday: "三",
    title: "凡爾賽皇后門 12€ 停整天 ➔ 鏡廳衝刺 ➔ 特里亞農 ➔ 18:30 迪士尼還車",
    tag: "凡爾賽盛宴",
    summary: "皇后門12€停整天，09:00衝無人鏡廳，大運河午餐，特里亞農，傍晚迪士尼順利還車！",
    keynote: {
      code: "200517457 (門票+午餐)",
      codeLabel: "凡爾賽宮門票憑證號",
      spot: "凡爾賽宮 ➔ La Petite Venise ➔ 特里亞農 ➔ 迪士尼還車",
      hotel: "Residhome Val d'Europe (03092026-1901357)",
      mapQuery: "Chateau de Versailles"
    },
    items: [
      {
        time: "08:15",
        title: "B&B 退房 ＆ 行李鎖入後車廂前往凡爾賽宮「皇后門」",
        desc: "享用昨晚超市買的水果優格早餐，08:15 退房。導航至「Grille de la Reine (皇后門)」，現場繳費 12.00€ 一口價停整天（停在林蔭停車區，現省 15.6€ 停車費，整天免移車！）。",
        badges: ["皇后門 12€ 停整天", "省下大筆停車費", "大行李鎖後車廂"],
        map: "Grille de la Reine Versailles"
      },
      {
        time: "08:35",
        title: "晨光漫步 10 分鐘至主殿正門 ＆ 09:00 第一場排隊安檢",
        desc: "門票已購（訂單號: 200517457 · 票號: 1988144322/1747818662）。由 Entrée A (Pavillon Dufour) 掃描進場。",
        badges: ["✅ 已購 09:00 第一場", "Entrée A 專屬通道", "Ref: 200517457"],
        map: "Chateau de Versailles Entree A"
      },
      {
        time: "09:00",
        title: "⭐凡爾賽宮「鏡廳衝刺法」搶拍無人空景 ＆ 國王大套房",
        desc: "一開門直衝 2 樓細賞晨光灑落的鏡廳 (Galerie des Glaces)！（📸 取景建議：落地窗與鏡面中央 2x 側光；⚠️ 館內嚴禁自拍棒）。隨後深度參觀國王寢宮、王后套房與加冕廳。",
        badges: ["鏡廳無人空景", "2x側光機位", "國王寢宮", "加冕廳"],
        map: "Galerie des Glaces Versailles"
      },
      {
        time: "12:00",
        title: "⭐La Petite Venise 綠意古蹟庭園午餐（已購套餐券 70€）",
        desc: "集合地點：大運河畔租船處對面。已購雙人預約套餐（訂單號: 200517457 · 票號: 1315255964/1641052700）。雙人點法：一人前菜+主菜、一人主菜+甜點+咖啡！推：紅酒牛頰肉寬麵、黑松露披薩、提拉米蘇！",
        badges: ["✅ 12:00已付餐券", "大運河畔古蹟餐廳", "黑松露披薩", "牛頰寬麵"],
        map: "La Petite Venise Versailles"
      },
      {
        time: "13:15",
        title: "特里亞農宮 (Trianon) ＆ 瑪麗王后童話農莊深度參觀",
        desc: "參觀大特里亞農宮粉紅大理石迴廊、小特里亞農與瑪麗王后童話農莊（水車磨坊與愛之神廟）。買國王菜園蘋果玫瑰茶 (Nina's Paris)。",
        badges: ["粉紅大理石迴廊", "瑪麗童話農莊", "水車磨坊"],
        map: "Le Hameau de la Reine Versailles"
      },
      {
        time: "15:30",
        title: "啟程直奔迪士尼 Chessy 站（特里亞農旁直接上車！）",
        desc: "車子就停在特里亞農林蔭旁！直接上車開出公園，行駛 A86/A4 外環高架避開市區塞車，預留 2 小時直奔迪士尼。",
        badges: ["公園旁直接上車", "外環避開塞車", "前往迪士尼"],
        map: ""
      },
      {
        time: "17:35",
        title: "TotalEnergies Relais Chessy 加油站加滿油 (Full Tank)",
        desc: "在距離還車站 2 公里處將油箱加滿 (Full Tank)，保留加油收據供還車查驗。",
        badges: ["加滿油箱", "保留加油收據"],
        map: "TotalEnergies Relais Chessy"
      },
      {
        time: "18:00",
        title: "🏁 Chessy Gare Marne-la-Vallée Sixt 順利還車！",
        desc: "停入車站 Effia 車庫 Sixt 專屬車位（租車單號: 9738701348）。拍照記錄儀表板里程與滿油，櫃檯交付鑰匙，圓滿完成 6 天諾曼第自駕壯遊！",
        badges: ["🏁 順利還車", "Sixt: 9738701348", "6天自駕圓滿達成"],
        map: "Sixt Chessy Gare Marne-la-Vallee"
      },
      {
        time: "18:30",
        title: "入住 Residhome Val d'Europe ＆ 迪士尼小鎮慶祝之夜",
        desc: "入住 RER 站對面 Residhome Val d'Europe（3 晚已付款，訂單號: 03092026-1901357）。晚上漫步 Disney Village 喝啤酒吃大餐慶祝！",
        badges: ["連住3晚已付款", "Ref: 03092026-1901357", "Disney Village慶祝"],
        map: "Residhome Val d'Europe"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/1",
    weekday: "四",
    title: "童話冒險：巴黎迪士尼主樂園（Disneyland Park）全日制霸",
    tag: "夢幻童話",
    summary: "開園先攻巨雷山與太空山，觀賞夢幻大遊行，夜間欣賞睡美人城堡無人機煙火秀！",
    keynote: {
      code: "RER A (1站2分)",
      codeLabel: "交通指南 (Val d'Europe ➔ Chessy)",
      spot: "巴黎迪士尼樂園全日遊玩",
      hotel: "Residhome Val d'Europe (第2晚)",
      mapQuery: "Disneyland Paris"
    },
    items: [
      {
        time: "08:30",
        title: "搭乘 RER A 線 1 站直達迪士尼樂園門口",
        desc: "出飯店門口即是 Val d'Europe 車站，搭乘 1 站（2分鐘/2€）直達 Marne-la-Vallée Chessy 樂園門口，提早排隊安檢等候開園！",
        badges: ["RER A線 1站2分", "提早安檢", "入園衝刺"],
        map: "Disneyland Paris"
      },
      {
        time: "09:30",
        title: "開園衝刺：巨雷山雲霄飛車 ＆ 星際大戰太空山",
        desc: "開園第一批直衝邊域世界巨雷山 (Big Thunder Mountain)，感受穿梭紅石峽谷的礦車快感！隨後前往探索世界衝刺星際大戰太空山 (Hyperspace Mountain)。",
        badges: ["巨雷山雲霄飛車", "星際大戰太空山", "加勒比海盜"],
        map: "Big Thunder Mountain Disneyland Paris"
      },
      {
        time: "17:30",
        title: "觀賞迪士尼巨星夢幻大遊行 (Disney Stars on Parade)",
        desc: "提早在美國小鎮大街 (Main Street, U.S.A.) 佔好第一排視野，觀賞噴火巨龍與眾多迪士尼經典角色的華麗大遊行！",
        badges: ["巨星大遊行", "噴火巨龍", "美國小鎮大街"],
        map: "Main Street USA Disneyland Paris"
      },
      {
        time: "21:30",
        title: "⭐睡美人城堡夜間無人機燈光秀 ＆ 璀璨城堡煙火",
        desc: "全日最高潮！數百架無人機在夜空中拼出立體魔法圖騰，搭配城堡水幕投影、雷射與璀璨煙火，相當值得駐足欣賞的精彩演出！",
        badges: ["無人機燈光秀", "城堡夜間煙火", "終生難忘感動"],
        map: "Sleeping Beauty Castle Disneyland Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/2",
    weekday: "五",
    title: "電影特效：華特迪士尼影城（Walt Disney Studios Park）",
    tag: "漫威英雄",
    summary: "開園先攻料理鼠王 4D 冒險與驚魂古塔自由落體，暢玩漫威復仇者聯盟園區！",
    keynote: {
      code: "料理鼠王4D / 驚魂古塔",
      codeLabel: "影城先攻推薦",
      spot: "華特迪士尼影城全日遊玩",
      hotel: "Residhome Val d'Europe (第3晚)",
      mapQuery: "Walt Disney Studios Park"
    },
    items: [
      {
        time: "08:30",
        title: "入園直衝：料理鼠王 4D 旋轉冒險 (Ratatouille)",
        desc: "戴上 3D 眼鏡縮小為小米視角，在老巴黎廚房與餐廳地板穿梭躲避主廚追捕，香味與水氣特效身歷其境！",
        badges: ["料理鼠王4D", "縮小老鼠視角", "法式美味冒險"],
        map: "Ratatouille Walt Disney Studios"
      },
      {
        time: "10:30",
        title: "好萊塢驚魂古塔 (The Twilight Zone Tower of Terror)",
        desc: "走進陰森荒廢的古老飯店搭乘失控電梯，體驗心臟驟停的多次無重力自由落體墜落，俯瞰整座影城美景！",
        badges: ["驚魂古塔自由落體", "無重力墜落", "刺激心跳"],
        map: "The Twilight Zone Tower of Terror"
      },
      {
        time: "13:30",
        title: "漫威復仇者聯盟園區 (Avengers Campus)",
        desc: "暢玩蜘蛛人蛛網冒險 (WEB SLINGERS: A Spider-Man Adventure)，與鋼鐵人、奇異博士即時互動拍照！",
        badges: ["蜘蛛人網戰", "漫威復仇者", "英雄拍照"],
        map: "Avengers Campus Paris"
      },
      {
        time: "16:30",
        title: "欣賞《米奇與魔術師》舞台劇 ＆ 迪士尼周邊伴手禮採購",
        desc: "觀賞榮獲國際大獎的百老匯等級歌舞劇，隨後採購巴黎迪士尼限定米奇玩偶、髮箍與紀念品。",
        badges: ["米奇與魔術師劇院", "迪士尼限定周邊", "滿載而歸"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/3",
    weekday: "六",
    title: "迪士尼退房 ➔ 巴黎 13 區 B&B Check-in ➔ 市區悠閒逛街",
    tag: "重返巴黎",
    summary: "退房搭 RER A 返回巴黎市區，入住熟悉的 13 區 B&B，午後前往商圈漫步逛街！",
    keynote: {
      code: "BB22759202",
      codeLabel: "B&B 訂房代碼 (2晚)",
      spot: "迪士尼退房 ➔ 13區 B&B ➔ 巴黎商圈逛街",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第9晚)",
      mapQuery: "B&B HOTEL Paris Italie Porte de Choisy"
    },
    items: [
      {
        time: "11:00",
        title: "Residhome 退房 ＆ 搭乘 RER A 線返回巴黎市區",
        desc: "悠閒收拾行囊退房，搭乘 RER A 線直達巴黎市中心，轉乘地鐵 7 號線直奔 13 區 B&B HOTEL。",
        badges: ["11:00退房", "RER A線", "重返巴黎市區"],
        map: "Gare Val d Europe"
      },
      {
        time: "12:30",
        title: "入住 B&B HOTEL Paris Italie ＆ 卸下行李",
        desc: "回到熟悉的第一家飯店辦理 Check-in（訂單代碼: BB22759202，2 晚已付款），將行李安放房內，一身輕裝！",
        badges: ["✅ 2晚已付款", "Ref: BB22759202", "熟悉親切"],
        map: "B&B HOTEL Paris Italie Porte de Choisy"
      },
      {
        time: "14:00",
        title: "巴黎市區熱門商圈漫步逛街 ＆ 咖啡下午茶",
        desc: "前往瑪黑區、聖馬丁運河或拉丁區特色選品店逛街尋寶，找間街角露天咖啡座品嚐黑咖啡與可頌，享受花都悠閒生活步調。",
        badges: ["商圈漫步", "街角咖啡座", "悠閒採買"],
        map: "Canal Saint-Martin Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/4",
    weekday: "日",
    title: "巴黎各大商圈全日悠閒逛街 ＆ 伴手禮採買（彈性安排凱旋門）",
    tag: "精品採購",
    summary: "全日輕鬆漫步商圈，老佛爺/樂蓬馬歇買 Bordier 奶油免費真空，彈性安排凱旋門！",
    keynote: {
      code: "Bordier 手工奶油免費真空",
      codeLabel: "伴手禮保鮮密技",
      spot: "巴黎各大商圈 ➔ 樂蓬馬歇/老佛爺 ➔ 凱旋門",
      hotel: "B&B HOTEL Paris Italie Porte de Choisy (第10晚)",
      mapQuery: "Le Bon Marche Paris"
    },
    items: [
      {
        time: "10:00",
        title: "彈性安排：登凱旋門 (Arc de Triomphe) 俯瞰星芒大道",
        desc: "可彈性登上凱旋門頂端露天平台，360 度俯瞰以凱旋門為中心的 12 條星芒放射狀林蔭大道與艾菲爾鐵塔全貌。",
        badges: ["凱旋門頂端", "12條星芒大道", "香榭麗舍"],
        map: "Arc de Triomphe Paris"
      },
      {
        time: "13:30",
        title: "⭐樂蓬馬歇 (Le Bon Marché) 或老佛爺美食館採買伴手禮",
        desc: "前往世界第一家百貨樂蓬馬歇或老佛爺美食館 (La Maison Le Gourmet)！必買：法國頂級手工奶油 Maison Bordier（香草、海鹽、煙燻海藻，專櫃免費抽真空包裝！帶回飯店冰箱冷藏）、鵝肝、松露醬與巴黎頂級果醬。",
        badges: ["Bordier奶油免費真空", "頂級伴手禮", "樂蓬馬歇百貨"],
        map: "La Grande Epicerie de Paris"
      },
      {
        time: "16:00",
        title: "漫步瑪黑文青選品店 ＆ 孚日廣場草坪小憩",
        desc: "採買精緻香氛、文創刺繡包與法式伴手禮，在孚日廣場草地上吹著秋風享受愜意假期。",
        badges: ["文青選品店", "孚日廣場草坪", "放鬆漫活"],
        map: "Place des Vosges Paris"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/5",
    weekday: "一",
    title: "12:00 退房直奔戴高樂機場 Radisson Blu 入住 ➔ 逛機場 Aéroville 商場 / OUTLET",
    tag: "無壓機場",
    summary: "12:00 退房帶大行李搭 RER B 直奔機場飯店卸行李，輕裝逛 Aéroville 商場與退稅整理！",
    keynote: {
      code: "272MC6F7",
      codeLabel: "Radisson Blu 訂房代碼",
      spot: "13區退房 ➔ CDG 機場 Radisson Blu ➔ Aéroville 商場",
      hotel: "Radisson Blu CDG Airport Terminal Hotel Paris",
      mapQuery: "Radisson Blu Hotel Paris Charles de Gaulle Airport"
    },
    items: [
      {
        time: "12:00",
        title: "13 區 B&B 退房 ＆ 攜帶所有大行李搭 RER B 直奔機場",
        desc: "悠閒享用午餐並於 12:00 退房，直接攜帶所有大行李搭乘 RER B 線直達戴高樂機場 Terminal 3 樞紐站（Roissypôle）。",
        badges: ["12:00退房", "RER B直達機場", "大行李同行"],
        map: "Gare Aeroport Charles de Gaulle 1"
      },
      {
        time: "13:30",
        title: "抵達 Radisson Blu 機場飯店辦理 Check-in 卸下大行李",
        desc: "入住 Radisson Blu CDG Airport Terminal Hotel（訂單代碼: 272MC6F7，已付款確認）。將所有大件行李卸在房間，一身輕鬆無負擔！",
        badges: ["✅ 機場飯店已付款", "Ref: 272MC6F7", "大行李先就位", "一身輕鬆"],
        map: "Radisson Blu Hotel Paris Charles de Gaulle Airport"
      },
      {
        time: "15:00",
        title: "輕裝前往機場旁大型購物商場：Aéroville 逛街購物與晚餐",
        desc: "搭乘短程接駁車前往機場旁的巨型商場 Aéroville！包含眾多歐洲時尚品牌、折扣 OUTLET、大型超市 Auchan 與美食餐廳，進行出境前最後血拼與享用晚餐。",
        badges: ["Aéroville巨型商場", "OUTLET折扣", "出境前最後採購", "美食餐廳"],
        map: "Aeroville Shopping Center Roissy"
      },
      {
        time: "19:30",
        title: "返回飯店休整 ＆ 核對退稅單據與行李最終秤重打包",
        desc: "核對全部免稅商品與退稅單 PABLO 條碼。將真空包裝奶油放入保冷袋，分好託運與手提行李。出門即是免費 CDGVAL 機場電車（4分鐘直達 T1 長榮航廈），免除明日清晨趕路的塞車焦慮！",
        badges: ["核對PABLO退稅條碼", "行李打包秤重", "免塞車焦慮", "CDGVAL免費電車直達T1"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1520939817895-060bdef4ad1b?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/6",
    weekday: "二",
    title: "提前 4 小時抵達 CDG 航廈 ➔ PABLO 電子退稅 ➔ 11:20 BR88 返台",
    tag: "順利返航",
    summary: "07:30 搭 CDGVAL 4分直達 T1，07:45 辦妥 PABLO 退稅再託運，11:20 搭長榮 BR88 返台！",
    keynote: {
      code: "BR88 (11:20)",
      codeLabel: "長榮直飛返台班機",
      spot: "CDG Terminal 1 ➔ PABLO 退稅機 ➔ 長榮櫃檯",
      hotel: "機上 (Overnight Flight)",
      mapQuery: "Charles de Gaulle Airport Terminal 1"
    },
    items: [
      {
        time: "07:30",
        title: "搭乘 CDGVAL 免費電車 4 分鐘直達 Terminal 1",
        desc: "飯店門口即是 Roissypôle 車站，搭乘免費 CDGVAL 電車僅需 4 分鐘直達 Terminal 1（長榮航空航廈），完全不受路面交通塞車影響！",
        badges: ["CDGVAL免費電車", "車程僅4分鐘", "直達T1航廈"],
        map: "CDGVAL Terminal 1"
      },
      {
        time: "07:45",
        title: "⚠️ 辦理 PABLO 電子退稅（務必退稅完成後才去託運行李！）",
        desc: "至 T1 出境層 PABLO 機台掃描退稅單條碼：顯示綠色打勾 🟢 即成功，將單據裝入信封投入信箱；若顯示紅色 🔴 立即前往旁邊海關人工櫃檯出示商品審核蓋章。",
        badges: ["PABLO電子掃描", "綠燈🟢免排隊", "先退稅再託運！"],
        map: "Aeroport de Paris Charles de Gaulle Detaxe PABLO"
      },
      {
        time: "08:30",
        title: "長榮航空櫃檯辦理登機報到與行李託運",
        desc: "完成退稅後前往長榮航空櫃檯託運大行李，領取登機證，通過安檢與邊防出境查驗。",
        badges: ["長榮登機報到", "行李託運", "安檢通關"],
        map: "Eva Air Check In CDG Terminal 1"
      },
      {
        time: "11:20",
        title: "搭乘長榮航空 BR88 班機起飛直飛台北",
        desc: "航程約 13 小時 20 分鐘，享受機上餐點與電影娛樂，帶著滿滿美好回憶平安返家！",
        badges: ["長榮航空 BR88", "11:20 起飛", "平安返航"],
        map: ""
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80"
  },
  {
    date: "10/7",
    weekday: "三",
    title: "06:40 平安抵達台灣桃園國際機場 (TPE)",
    tag: "甜蜜歸賦",
    summary: "06:40 抵達桃園國際機場，領取行李，圓滿完成 23 天甜蜜難忘的法國蜜月自駕之旅！",
    keynote: {
      code: "06:40 平安抵達",
      codeLabel: "抵台時間",
      spot: "桃園國際機場 (TPE) 第二航廈",
      hotel: "溫暖的家",
      mapQuery: "Taoyuan International Airport"
    },
    items: [
      {
        time: "06:40",
        title: "長榮航空 BR88 平安降落桃園機場 (TPE)",
        desc: "通關查驗、領取行李，檢查行李完好無損，攜帶真空包裝 Bordier 奶油與所有戰利品平安返家！",
        badges: ["06:40 降落桃園", "圓滿成功", "回顧美照"],
        map: "Taoyuan International Airport"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80"
  }
];

// ==========================================
// 2. 仔細構建 8 家全程真實住宿預訂清單 (hotelsData)
// ==========================================
const hotelsData = [
  {
    name: "B&B HOTEL Paris Italie Porte de Choisy 3 étoiles",
    city: "巴黎 13 區",
    dates: "9/16 (三) ~ 9/25 (五) · 連續 9 晚",
    nights: 9,
    code: "BB22425685 / BB22425273 / BB22426149",
    platform: "B&B HOTELS 官網",
    price: "€1,363.26 (9 晚合計已付清)",
    payment: "已付款",
    checkIn: "14:00",
    checkOut: "12:00",
    address: "Porte de Choisy, 13區 巴黎",
    phone: "+33 1 46 70 12 12",
    parking: "周邊公共停車 / 地鐵站旁",
    breakfast: "無 (周邊小酒館/咖啡館享用法式早餐)",
    highlight: true,
    status: "✅ 已確認 (3段連續預訂)",
    mapQuery: "B&B HOTEL Paris Italie Porte de Choisy",
    payNote: "分 3 筆預約：9/16~19(BB22425685・€454.71) + 9/19~21(BB22425273・€267.51) + 9/21~25(BB22426149・€641.04)。Check-in 時請告知櫃檯同房連住不換房！"
  },
  {
    name: "Hôtel Mercure Mont Saint-Michel",
    city: "聖米歇爾山 (La Caserne 管制區內)",
    dates: "9/25 (五) ~ 9/26 (六) · 1 晚",
    nights: 1,
    code: "QQDDDWJZ",
    platform: "Accor 官網 (skunkqq@gmail.com)",
    price: "€195.50 (已線上全額付清)",
    payment: "已付款",
    checkIn: "15:00",
    checkOut: "12:00 (可免費寄存行李)",
    address: "Route du Mont Saint-Michel, 50170 Le Mont-Saint-Michel",
    phone: "+33 2 33 60 14 18",
    parking: "管制區專屬停車場 (9/24收道閘碼抬桿，停妥後請勿開出)",
    breakfast: "含雙人法式自助早餐 (SAVER RATE)",
    highlight: true,
    status: "✅ 已確認預訂 (1 晚已付款)",
    mapQuery: "Hotel Mercure Mont Saint-Michel",
    payNote: "訂單人：Chin yu Chang。入住前一日收簡訊/Email 獲取 6 位數道閘通行碼。免費接駁車站就在門口！"
  },
  {
    name: "B&B HOTEL Honfleur",
    city: "翁夫勒 (Honfleur)",
    dates: "9/26 (六) ~ 9/27 (日) · 1 晚",
    nights: 1,
    code: "BB22633724",
    platform: "B&B HOTELS 官網 (skunkqq@gmail.com)",
    price: "€70.98 (現場待付)",
    payment: "現場付款",
    checkIn: "14:00",
    checkOut: "12:00",
    address: "Chemin du Banc, 14600 La Rivière-Saint-Sauveur",
    phone: "+33 8 92 78 80 44",
    parking: "飯店私人免費專屬停車場",
    breakfast: "無 (舊港老街品嚐烘焙熱可頌)",
    highlight: true,
    status: "✅ 已確認預訂 (1 晚)",
    mapQuery: "B&B HOTEL Honfleur",
    payNote: "入住前 2 天 (10:00起) 可於 B&B 官網線上快速 Check-in。現場刷付 €70.98。"
  },
  {
    name: "Grand Hôtel de la Seine (盧昂塞納河大飯店)",
    city: "盧昂 (Rouen)",
    dates: "9/27 (日) ~ 9/29 (二) · 連續 2 晚 (免搬行李！)",
    nights: 2,
    code: "K2N3SI",
    platform: "Grand Hôtel 官網 (訂單人: chin yu chang)",
    price: "約 €170.00 (€85/晚 · 現場刷卡)",
    payment: "現場付款",
    checkIn: "15:00",
    checkOut: "12:00",
    address: "14 Quai Gaston Boulet, 76000 Rouen",
    phone: "+33 2 35 15 25 25",
    parking: "飯店私人地下停車場 (約 12€/24h · 限高1.95m)",
    breakfast: "無 (步行 5 分鐘享用大教堂旁人氣烘焙坊)",
    highlight: true,
    status: "✅ 已確認預訂 (2 晚現場刷卡)",
    mapQuery: "Grand Hotel de la Seine Rouen",
    payNote: "訂單人：chin yu chang。塞納河水岸飯店，步行 8~10 分鐘即達舊市集廣場與 La Couronne 1345 百年老店！"
  },
  {
    name: "B&B HOTEL Versailles Le Chesnay 3 étoiles",
    city: "凡爾賽 (Le Chesnay)",
    dates: "9/29 (二) ~ 9/30 (三) · 1 晚",
    nights: 1,
    code: "BB22648830",
    platform: "B&B HOTELS 官網 (skunkqq@gmail.com)",
    price: "€121.06 (現場待付)",
    payment: "現場付款",
    checkIn: "14:00",
    checkOut: "12:00",
    address: "44 Avenue Dutartre, 78150 Le Chesnay-Rocquencourt",
    phone: "+33 8 92 78 81 12",
    parking: "飯店專屬私人停車場",
    breakfast: "無 (隔壁商場買水果優格可頌)",
    highlight: true,
    status: "✅ 已確認預訂 (1 晚現場付款)",
    mapQuery: "B&B HOTEL Versailles Le Chesnay",
    payNote: "下樓走路 3 分鐘即達 Westfield Parly 2 商場！老佛爺百貨至 20:30、Monoprix 超市至 21:00 採買隔日凡爾賽早餐！"
  },
  {
    name: "Residhome Val d'Europe (近迪士尼公寓飯店)",
    city: "迪士尼 / Val d'Europe (Montévrain)",
    dates: "9/30 (三) ~ 10/3 (六) · 連續 3 晚",
    nights: 3,
    code: "03092026-1901357",
    platform: "Residhome 官網 (訂單人: Chin yu Chang)",
    price: "€345.60 (3晚全額付清) + 現場稅 39€",
    payment: "已付款",
    checkIn: "15:00",
    checkOut: "12:00 (退房時間寬裕)",
    address: "3, place Jean Monnet, 77144 MONTEVRAIN",
    phone: "+33 1 60 31 74 74",
    parking: "飯店附設停車場 / 車站周邊公共停車",
    breakfast: "無 (Studio 附設獨立廚房、微波爐、電磁爐、冰箱可自煮)",
    highlight: true,
    status: "✅ 已確認預訂 (3 晚已付款)",
    mapQuery: "Residhome Val d Europe",
    payNote: "訂單人：Chin yu Chang。出門就是 RER A 線 Val d'Europe 站！搭 1 站 2 分鐘直達迪士尼門口。步行 3-5 分鐘到 Val d'Europe 巨型商場 (Auchan) 與 La Vallée Village Outlet！"
  },
  {
    name: "B&B HOTEL Paris Italie Porte de Choisy 3 étoiles",
    city: "巴黎 13 區",
    dates: "10/3 (六) ~ 10/5 (一) · 連續 2 晚",
    nights: 2,
    code: "BB22759202",
    platform: "B&B HOTELS 官網 (skunkqq@gmail.com)",
    price: "€229.89 (2 晚合計已付清)",
    payment: "已付款",
    checkIn: "14:00",
    checkOut: "12:00",
    address: "Porte de Choisy, 13區 巴黎",
    phone: "+33 1 46 70 12 12",
    parking: "周邊公共停車 / 地鐵站旁",
    breakfast: "無 (周邊美味小酒館與烘焙坊)",
    highlight: true,
    status: "✅ 已確認預訂 (2 晚已付款)",
    mapQuery: "B&B HOTEL Paris Italie Porte de Choisy",
    payNote: "訂單人：Chin yu Chang。重返熟悉的第一家飯店，出入市區各大商圈漫步採買最便利。"
  },
  {
    name: "Radisson Blu CDG Airport Terminal Hotel Paris",
    city: "戴高樂機場 Terminal 3 (Roissypôle)",
    dates: "10/5 (一) ~ 10/6 (二) · 1 晚",
    nights: 1,
    code: "272MC6F7",
    platform: "Radisson 官網 (訂單人: Chin yu Chang)",
    price: "€164.16 (已預訂確認)",
    payment: "已付款",
    checkIn: "15:00 (13:30可寄行李)",
    checkOut: "12:00",
    address: "3 Bis Rue De la Haye, 93290 Tremblay-en-France",
    phone: "+33 1 70 03 11 63",
    parking: "機場專用停車場",
    breakfast: "無 (航廈免稅區/機上餐食)",
    highlight: true,
    status: "✅ 已確認預訂 (1 晚已付款)",
    mapQuery: "Radisson Blu Hotel Paris Charles de Gaulle Airport",
    payNote: "坐落於戴高樂機場樞紐 Roissypôle (Terminal 3)，門口搭免費 CDGVAL 機場電車 4 分鐘直達 Terminal 1（長榮航廈）！近 Aéroville 大型購物中心，最後採買無壓力！"
  }
];

// ==========================================
// 3. 仔細校正門票憑證清單 (ticketsData)
// ==========================================
const ticketsData = [
  {
    type: "⛪ 聖禮拜堂預約",
    title: "聖禮拜堂入場時段預約憑證 (Sainte-Chapelle · 4人預約)",
    datetime: "2026/09/17 (四) 09:00 - 10:00 入場",
    status: "✅ 已確認預約 (0€ 預約時段)",
    code: "759304466060400 (訂單: 2618864216850403140)",
    file: "0917_聖禮拜堂_預約入場時段憑證_4人.pdf",
    note: "4 人預約入場時段。地址：8 boulevard du Palais, 75001 Paris (地鐵 Cité 站)。票號：759304466060400 / 60511 / 60690 / 60781。檔案存於 data/0917_聖禮拜堂_預約入場時段憑證_4人.pdf（購買證明存 data/0917_聖禮拜堂_預約購票證明收據.pdf）。",
    mapQuery: "8 boulevard du Palais 75001 Paris"
  },
  {
    type: "🏛️ 歐洲遺產日特展",
    title: "巴黎市政廳內部宮殿深度參觀 (Visitez l’Hôtel de Ville · 雙人免費邀請函)",
    datetime: "2026/09/19 (六) 10:30 入場 (請於 10:15 抵達安檢)",
    status: "✅ 已確認預約 (雙人邀請函)",
    code: "T3508E / T3509E (條碼: 66030217949317)",
    file: "0919_巴黎市政廳_歐洲遺產日參觀憑證.pdf",
    note: "歐洲遺產日（Journées du Patrimoine 2026）限定開放！出示手機 PDF 或列印紙本條碼。專屬入口地址：3 Rue de Lobau, 75004 Paris（地鐵 1/7 號線 Hôtel de Ville 站步行 2 分鐘）。參觀奢華金箔節慶大廳、市長辦公室與精緻天花板壁畫。檔案存於 data/0919_巴黎市政廳_歐洲遺產日參觀憑證.pdf。",
    mapQuery: "3 Rue de Lobau 75004 Paris"
  },
  {
    type: "🍽️ 人氣名店訂位",
    title: "Chez Janou 瑪黑區南法小酒館 (已預約 16:00 專屬席)",
    datetime: "2026/09/21 (一) 16:00 準時入座",
    status: "✅ 已確認預約 (專屬席)",
    code: "Chez Janou 16:00",
    file: "",
    note: "瑪黑區超人氣南法小酒館！招牌必點：普羅旺斯焗烤蝸牛、香煎干貝牛肝菌燉飯、油封鴨肉，以及整盆無限挖的「招牌巨盆巧克力慕斯」！",
    mapQuery: "Chez Janou Paris"
  },
  {
    type: "🖼️ 羅浮宮門票",
    title: "羅浮宮博物館全日深度參觀門票 (Musée du Louvre · 雙人)",
    datetime: "2026/09/23 (三) 12:30 入場（週三夜間開放至 21:00）",
    status: "✅ 已預訂確認",
    code: "V260782031751 (訂單: C262540015444)",
    file: "0923_羅浮宮_雙人門票預約憑證.pdf",
    note: "已存 data/0923_羅浮宮_雙人門票預約憑證.pdf。建議走卡魯塞爾地下通道 (Carrousel du Louvre) 進館避開地面排隊人潮！週三夜間開放至 21:00，出館欣賞科幻金字塔夜景。",
    mapQuery: "Carrousel du Louvre Paris"
  },
  {
    type: "🎭 歌劇院夜導",
    title: "加尼葉歌劇院閉館夜間導覽 (The Mysteries of the Palais Garnier · 雙人)",
    datetime: "2026/09/24 (四) 16:30 集合 ➔ 17:00 英文導覽",
    status: "✅ 已全額付清 (84€)",
    code: "op07092026-932770962",
    file: "",
    note: "免列印紙本。16:30 提早 30 分抵達，位於 rue Scribe 與 rue Auber 轉角之「夏爾·加尼葉雕像」後方專屬入口進場，出示 Email 電子憑證換票。現場嚴禁大行李。",
    mapQuery: "Palais Garnier"
  },
  {
    type: "🚅 高鐵車票",
    title: "SNCF TGV 高鐵 (巴黎蒙帕納斯 ➔ 雷恩)",
    datetime: "2026/09/25 (五) 06:48 - 08:15",
    status: "✅ 已購票 (68€ 雙人)",
    code: "4WCP2R",
    file: "0925_SNCF高鐵_巴黎至雷恩雙人車票.png",
    note: "06:48 Paris Montparnasse 準時發車，08:15 抵達 Rennes 雷恩站準備取車。截圖存於 data/0925_SNCF高鐵_巴黎至雷恩雙人車票.png。",
    mapQuery: "Gare Montparnasse"
  },
  {
    type: "🚗 租車憑證",
    title: "Sixt 諾曼第自駕租車 (Peugeot 3008 休旅)",
    datetime: "2026/09/25 08:30 雷恩取 ➔ 09/30 18:30 迪士尼還",
    status: "✅ 已付清 (624.46€ 零自付全險)",
    code: "9738701348",
    file: "",
    note: "雷恩北站 Effia 車庫 0 樓電梯密碼【6060】上 7 樓取車。9/30 迪士尼 Chessy 站 Sixt 櫃檯滿油還車。",
    mapQuery: "Gare de Rennes"
  },
  {
    type: "🎧 語音導覽",
    title: "聖米歇爾山官方語音導覽 (VoiceMap)",
    datetime: "2026/09/26 (六) 07:30 漫步使用",
    status: "✅ 免費兌換",
    code: "0B6CBA60",
    file: "",
    note: "下載 VoiceMap App ➔ Visit codes ➔ 輸入【0B6CBA60】下載離線音檔，自備耳機漫步修道院岩山！",
    mapQuery: "Mont Saint-Michel France"
  },
  {
    type: "🍽️ 景觀餐廳訂位",
    title: "La Ferme Saint-Michel 黑面鹽沼羊午餐",
    datetime: "2026/09/26 (六) 14:00 午餐",
    status: "✅ 已確認預約 (Chin Yu)",
    code: "645504",
    file: "",
    note: "道閘螢幕輸入密碼【645504】進場停餐廳專屬車位，保管 Ticket，離場機器刷付 10€ 通行費。",
    mapQuery: "La Ferme Saint-Michel"
  },
  {
    type: "🍽️ 百年老店訂位",
    title: "盧昂 La Couronne 1345 百年老餐廳 (法式晚餐)",
    datetime: "2026/09/27 (日) 20:00 晚餐",
    status: "✅ 已確認預約 (2 位成人)",
    code: "790B-8602-147D-CA61",
    file: "",
    note: "創立於 1345 年全法最古老小酒館，位於聖女貞德舊市集廣場 31 號。享用傳統諾曼第法餐配蘋果白蘭地。",
    mapQuery: "La Couronne Rouen"
  },
  {
    type: "🌸 景點門票",
    title: "吉維尼莫內花園門票 (Fondation Claude Monet · 雙人)",
    datetime: "2026/09/29 (二) 10:00 入場",
    status: "✅ 已購票 (27€)",
    code: "2624364336390402463",
    file: "0929_吉維尼莫內花園_雙人電子門票.pdf",
    note: "已存放 data/0929_吉維尼莫內花園_雙人電子門票.pdf。10:00 時段由 Door n°1 bis 快速通關掃描進園，直奔水上花園拍倒影日本橋與睡蓮池。",
    mapQuery: "Fondation Claude Monet Giverny"
  },
  {
    type: "🏰 皇宮全通票",
    title: "凡爾賽宮全通票 (Passport with Timed Entry · 雙人)",
    datetime: "2026/09/30 (三) 09:00 第一場入場",
    status: "✅ 已購票 (70€)",
    code: "200517457",
    file: "0930_凡爾賽宮_全通票與大運河午餐憑證.pdf",
    note: "已存放 data/0930_凡爾賽宮_全通票與大運河午餐憑證.pdf。由 Entrée A (Pavillon Dufour) 掃描入場，一開門直衝 2 樓拍無人鏡廳！包含特里亞農宮與大花園 (票號: 1988144322, 1747818662)。",
    mapQuery: "Chateau de Versailles"
  },
  {
    type: "🍽️ 皇家古蹟午餐",
    title: "La Petite Venise 凡爾賽大運河古蹟午餐 (雙人套餐)",
    datetime: "2026/09/30 (三) 12:00 專屬預約席",
    status: "✅ 已預約已付款 (70€)",
    code: "200517457",
    file: "0930_凡爾賽宮_全通票與大運河午餐憑證.pdf",
    note: "集合地點：大運河畔租船處對面 (point de location de la Petite Venise, au bord du Grand Canal)。雙人點法：一人前菜+主菜、一人主菜+甜點+咖啡！推：紅酒燉牛頰肉寬麵、松露披薩、提拉米蘇 (票號: 1315255964, 1641052700)。",
    mapQuery: "La Petite Venise Versailles France"
  }
];

// ==========================================
// 4. 仔細構建私房口袋名單 (pocketPlacesData)，含六大經典百貨
// ==========================================
// 讀取 CSV 的全部店家
const csvText = fs.readFileSync(path.join(ROOT_DIR, '2026_私房口袋名單.csv'), 'utf8');
const csvLines = csvText.trim().split('\n');
const header = csvLines[0].split(',');

const parsedCsvStores = [];
for (let i = 1; i < csvLines.length; i++) {
  const line = csvLines[i].trim();
  if (!line) continue;
  // 簡易 CSV 切割（處理逗號）
  const parts = line.split(',');
  if (parts.length >= 7) {
    parsedCsvStores.push({
      category: parts[0].trim(),
      categoryLabel: parts[1].trim(),
      name: parts[2].trim(),
      tag: parts[0].trim(),
      desc: parts[3].trim(),
      address: parts[4].trim(),
      highlight: parts[5].trim(),
      mapQuery: parts.slice(6).join(',').trim()
    });
  }
}

// 整合原有口袋清單與 CSV 清單，去重
const pocketPlacesMap = new Map();

// 先放入原有 baseData.pocketPlacesData
(baseData.pocketPlacesData || []).forEach(p => {
  const key = (p.name || '').trim().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
  if (!key) return;
  // 確保沒有違規詞
  p.desc = (p.desc || '').replace(/屏幕/g, '螢幕').replace(/視頻/g, '影片').replace(/音頻/g, '音訊');
  p.highlight = (p.highlight || '').replace(/屏幕/g, '螢幕').replace(/視頻/g, '影片').replace(/音頻/g, '音訊');
  pocketPlacesMap.set(key, p);
});

// 再補入 CSV 的最新內容
parsedCsvStores.forEach(s => {
  const key = (s.name || '').trim().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
  if (!key) return;
  if (!pocketPlacesMap.has(key)) {
    pocketPlacesMap.set(key, s);
  } else {
    // 覆蓋為最新內容
    const existing = pocketPlacesMap.get(key);
    Object.assign(existing, s);
  }
});

// 確保新增的六大百貨全部存在
const flagshipMalls = [
  {
    category: "mall",
    categoryLabel: "🏬 百貨購物",
    name: "Galeries Lafayette Paris Haussmann (老佛爺百貨奧斯曼旗艦店)",
    tag: "mall",
    desc: "1893年創立的拜占庭巨型彩色玻璃穹頂！頂樓8樓有免費360度露天觀景平台（看鐵塔夕陽最美），3樓有免費9米懸空 Glasswalk 玻璃步道。",
    address: "40 Boulevard Haussmann, 75009 Paris (地鐵 Chaussée d'Antin - La Fayette 站直達)",
    highlight: "⏰ 週一至週六 09:30-20:30 (週日 11:00-20:00) ｜ 頂樓免費露天觀景台、穹頂 Glasswalk 免費預約、美食館 Bordier 奶油免費抽真空",
    mapQuery: "Galeries Lafayette Paris Haussmann"
  },
  {
    category: "mall",
    categoryLabel: "🏬 百貨購物",
    name: "Printemps Haussmann (巴黎春天百貨旗艦店)",
    tag: "mall",
    desc: "1865年創立的新藝術風格歷史建築，與老佛爺相鄰。女裝館7樓有 7ème Ciel 免費觀景露台，避開老佛爺人潮俯瞰巴黎全景！",
    address: "64 Boulevard Haussmann, 75009 Paris (地鐵 Havre - Caumartin 站)",
    highlight: "⏰ 週一至週六 10:00-20:00 (週日 11:00-20:00) ｜ 7樓免費觀景露台、頂級精品退稅、新藝術穹頂圓廳",
    mapQuery: "Printemps Haussmann Paris"
  },
  {
    category: "mall",
    categoryLabel: "🏬 百貨購物",
    name: "Le Bon Marché Rive Gauche (樂蓬馬歇百貨 ＆ 頂級大超市)",
    tag: "mall",
    desc: "世界第一家現代百貨公司！左岸最優雅奢華地標，招牌白色交錯手扶梯與玻璃天窗極具美感。隔壁 La Grande Épicerie 為全巴黎最頂級美食超市！",
    address: "24 Rue de Sèvres, 75007 Paris (地鐵 Sèvres - Babylone 站直達)",
    highlight: "⏰ 週一至週六 10:00-19:45 (週日 11:00-19:45) ｜ 必買：Bordier 手工奶油(專櫃免費抽真空)、松露醬、鵝肝醬、頂級果醬伴手禮",
    mapQuery: "Le Bon Marche Rive Gauche Paris"
  },
  {
    category: "mall",
    categoryLabel: "🏬 百貨購物",
    name: "La Samaritaine (莎瑪麗丹百貨・新橋旗艦店)",
    tag: "mall",
    desc: "1870年創立，LVMH耗時16年斥資7.5億歐元重生！頂樓115米天井1910年金色孔雀壁畫、16,000片手工金色橡樹葉琺瑯大樓梯(周杰倫《最偉大的作品》取景)、B1全歐最大美妝香氛、Loulou法式幽默文創選品、頂樓露台餐廳看鐵塔塞納河夕陽。",
    address: "9 Rue de la Monnaie, 75001 Paris (新橋 Pont Neuf 旁)",
    highlight: "⏰ 週一至週六 10:00-20:00，週日 11:00-19:00 ｜ 頂層金箔孔雀壁畫、16,000片琺瑯大階梯、免購物免費參觀看景、人比老佛爺少90%",
    mapQuery: "La Samaritaine Paris"
  },
  {
    category: "mall",
    categoryLabel: "🏬 百貨購物",
    name: "Le BHV Marais (巴詩威瑪黑百貨)",
    tag: "mall",
    desc: "巴黎市政廳正對面的經典百貨，巴黎在地人的生活居家選品天堂！地下室為全巴黎最齊全的五金廚具工具館，頂樓 Le Perchoir 景觀酒吧氛圍極佳。",
    address: "52 Rue de Rivoli, 75004 Paris (地鐵 Hôtel de Ville 站)",
    highlight: "⏰ 週一至週六 10:00-20:00 (週日 11:00-19:00) ｜ 居家選品、法式廚具小家電、文具、瑪黑區核心地段",
    mapQuery: "Le BHV Marais Paris"
  },
  {
    category: "mall",
    categoryLabel: "🏬 百貨購物",
    name: "Beaugrenelle Paris (博格內爾購物中心)",
    tag: "mall",
    desc: "艾菲爾鐵塔西側塞納河畔現代化玻璃帷幕大型購物商場，動線寬敞舒適，集結眾多潮流品牌與法式餐廳，避雨採買首選。",
    address: "12 Rue Linois, 75015 Paris (地鐵 Charles Michels 站)",
    highlight: "⏰ 週一至週六 10:00-20:30 (週日 11:00-19:00) ｜ 現代化購物環境、FNAC、Marks & Spencer 食品館",
    mapQuery: "Beaugrenelle Paris"
  }
];

flagshipMalls.forEach(m => {
  const key = (m.name || '').trim().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
  if (key) pocketPlacesMap.set(key, m);
});

// 蒙馬特聖心堂周邊頂級甜點烘焙名店
const montmartreBakeries = [
  {
    category: "bakery",
    categoryLabel: "🥐 甜點烘焙",
    name: "Pain Pain (蒙馬特現代精緻法式甜點沙龍)",
    tag: "bakery",
    desc: "聖心堂山腳下深藍高雅裝潢的頂級烘焙甜點沙龍！被評為蒙馬特第一甜點。必吃：開心果閃電泡芙 (Éclair Pistache)、藍莓塔、白桃可頌、焦脆可麗露。",
    address: "88 Rue des Martyrs, 75018 Paris (聖心堂步行約 7 分鐘)",
    highlight: "⏰ 週二至週六 07:30–20:00，週日 07:30–19:30 (週一公休) ｜ 必吃：開心果閃電泡芙、藍莓水果塔、現烤可麗露",
    mapQuery: "Pain Pain 88 Rue des Martyrs Paris"
  },
  {
    category: "bakery",
    categoryLabel: "🥐 甜點烘焙",
    name: "Le Grenier à Pain - Abbesses (兩屆巴黎最佳長棍/可頌冠軍)",
    tag: "bakery",
    desc: "位在愛牆與地鐵 Abbesses 站旁，榮獲兩屆巴黎最佳長棍冠軍！甜點水準極高，必吃：法式草莓千層酥 (Millefeuille Fraise)、杏仁可頌、傳統巧克力閃電泡芙。",
    address: "38 Rue des Abbesses, 75018 Paris (聖心堂步行約 6 分鐘)",
    highlight: "⏰ 週四至週一 07:00–19:30 (週二、週三公休) ｜ 必吃：法式草莓千層酥、金黃酥脆杏仁可頌、傳統閃電泡芙",
    mapQuery: "Le Grenier a Pain Abbesses Paris"
  },
  {
    category: "bakery",
    categoryLabel: "🥐 甜點烘焙",
    name: "Les Petits Mitrons (蒙馬特傳奇手工焦糖酥皮水果塔)",
    tag: "bakery",
    desc: "蒙馬特在地老饕私藏手工水果塔神店！櫃內擺滿現烤焦糖酥皮水果塔，必吃：焦糖無花果塔 (Tarte aux Figues)、金黃杏桃塔、焦糖蘋果塔。",
    address: "26 Rue Lepic, 75018 Paris (聖心堂步行約 9 分鐘)",
    highlight: "⏰ 週四至週二 08:30–19:00 (週三公休) ｜ 必吃：現烤焦糖無花果塔、金黃杏桃塔、焦糖蘋果塔",
    mapQuery: "Les Petits Mitrons Paris"
  }
];

montmartreBakeries.forEach(b => {
  const key = (b.name || '').trim().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
  if (key) pocketPlacesMap.set(key, b);
});

// 巴黎傳奇名店 (雙叟咖啡館 & 藍色列車古蹟餐廳)
const iconicDining = [
  {
    category: "coffee",
    categoryLabel: "☕ 傳奇咖啡",
    name: "Les Deux Magots (雙叟咖啡館・左岸傳奇文學咖啡)",
    tag: "coffee",
    desc: "1885年創立，巴黎左岸雙雄之一，雙叟文學獎發源地！海明威、沙特、畢卡索常客。二樓露台看聖日耳曼德佩教堂廣場最美。必點：Croque-Monsieur 火腿起司三明治、烤蘋果塔、熱巧克力。",
    address: "6 Place Saint-Germain des Prés, 75006 Paris (花神咖啡館對門)",
    highlight: "⏰ 每天 07:30–01:00 (無休・夜間營業至凌晨1點) ｜ 必吃：法式火腿起司三明治、經典烤蘋果塔、熱巧克力 ｜ 9/17 試婚紗或 9/21 還婚紗順遊",
    mapQuery: "Les Deux Magots 6 Place Saint-Germain des Pres Paris"
  },
  {
    category: "food",
    categoryLabel: "🥩 古蹟法餐",
    name: "Le Train Bleu (藍色列車・火車站裡的凡爾賽宮)",
    tag: "food",
    desc: "1900年萬國博覽會創立國家歷史古蹟！里昂車站1樓大廳，挑高11公尺、41幅壯麗壁畫、水晶吊燈紅絲絨椅宛如凡爾賽宮。必吃：法式魚湯、烤羊腿、橙酒現烤舒芙蕾。平日午間套餐 €48 超划算。",
    address: "Gare de Lyon, Place Louis Armand Hall 1, 75012 Paris (里昂車站 1 樓大廳)",
    highlight: "⏰ 午餐 11:30–14:15，晚餐 19:00–22:30 (無休) ｜ 必吃：法式魚湯、烤羊腿、橙皮酒舒芙蕾 ｜ 9/18 楓丹白露宮去回順遊 ｜ 需 Smart casual",
    mapQuery: "Le Train Bleu Gare de Lyon Paris"
  }
];

iconicDining.forEach(d => {
  const key = (d.name || '').trim().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
  if (key) pocketPlacesMap.set(key, d);
});

const pocketPlacesData = Array.from(pocketPlacesMap.values());

console.log(`📊 資料整理彙整結果：`);
console.log(`- 每日時間軸 (itineraryData): ${itineraryData.length} 天 (涵蓋 9/15 - 10/7)`);
console.log(`- 住宿清單 (hotelsData): ${hotelsData.length} 家完整住宿`);
console.log(`- 票券清單 (ticketsData): ${ticketsData.length} 筆憑證`);
console.log(`- 私房口袋庫 (pocketPlacesData): ${pocketPlacesData.length} 處私房好店與百貨`);

// ==========================================
// 5. 進行 AES-256-CBC 加密
// ==========================================
let geminiApiKey = process.env.GEMINI_API_KEY || "";
const secretPath = path.join(ROOT_DIR, 'vault_secret.json');
if (fs.existsSync(secretPath)) {
  try {
    const sJson = JSON.parse(fs.readFileSync(secretPath, 'utf8'));
    geminiApiKey = sJson.geminiApiKey || geminiApiKey;
  } catch (e) {}
}

const finalData = {
  itineraryData,
  hotelsData,
  ticketsData,
  pocketPlacesData,
  geminiApiKey
};

function sanitizeTaiwanTerms(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/當日高光/g, '今日重點')
    .replace(/今日高光/g, '今日重點')
    .replace(/高光/g, '重點')
    .replace(/手沖天花板/g, '頂級手沖咖啡')
    .replace(/咖啡天花板/g, '頂級精品咖啡')
    .replace(/美學天花板/g, '典雅美學典範')
    .replace(/皮包天花板/g, '頂級小眾皮件')
    .replace(/天花板！/g, '頂級首選！')
    .replace(/婚紗大片/g, '蜜月婚紗')
    .replace(/絕美大片/g, '經典合影')
    .replace(/晨光大片/g, '晨光美景')
    .replace(/電影感大片/g, '電影質感場景')
    .replace(/自然神作/g, '大自然的鬼斧神工')
    .replace(/神作/g, '經典之作')
    .replace(/寶藏小巷/g, '幽靜小巷')
    .replace(/微型寶藏/g, '精緻私房')
    .replace(/寶藏/g, '私房精選')
    .replace(/爆款/g, '熱銷人氣款')
    .replace(/速刷/g, '快速入場')
    .replace(/拍照神地/g, '拍照好去處')
    .replace(/拍照打卡機位/g, '拍照取景角度')
    .replace(/拍照打卡/g, '合影留念')
    .replace(/打卡拍照/g, '合影留念')
    .replace(/打卡/g, '留影')
    .replace(/屏幕/g, '螢幕')
    .replace(/視頻/g, '影片')
    .replace(/音頻/g, '音訊')
    .replace(/打印/g, '列印')
    .replace(/激光/g, '雷射')
    .replace(/內存/g, '記憶體')
    .replace(/巡遊/g, '大遊行')
    .replace(/節瓜/g, '櫛瓜')
    .replace(/過山車/g, '雲霄飛車')
    .replace(/跳樓機/g, '大怒神')
    .replace(/性價比/g, 'CP值')
    .replace(/極度出片/g, '拍照超有美感')
    .replace(/出片帶有/g, '洗出來的照片帶有')
    .replace(/出片/g, '超好拍')
    .replace(/膠卷/g, '底片')
    .replace(/龍蝦卷/g, '龍蝦堡')
    .replace(/避坑/g, '注意事項')
    .replace(/加油發票/g, '加油收據')
    .replace(/托運/g, '託運');
}

const finalJsonStr = sanitizeTaiwanTerms(JSON.stringify(finalData));

// 提取現有 salt 與 iv
let appJsContent = fs.readFileSync(APP_JS_PATH, 'utf8');
const vaultMatch = appJsContent.match(/const ENCRYPTED_VAULT = (\{[\s\S]*?\});/);
let saltBuf, ivBuf;

if (vaultMatch) {
  const oldVault = eval('(' + vaultMatch[1] + ')');
  saltBuf = Buffer.from(oldVault.salt, 'base64');
  ivBuf = Buffer.from(oldVault.iv, 'base64');
} else {
  saltBuf = crypto.randomBytes(16);
  ivBuf = crypto.randomBytes(16);
}

const key = crypto.pbkdf2Sync('8890', saltBuf, 100000, 32, 'sha256');
const cipher = crypto.createCipheriv('aes-256-cbc', key, ivBuf);
let encrypted = cipher.update(finalJsonStr, 'utf8', 'base64');
encrypted += cipher.final('base64');

const updatedVault = {
  salt: saltBuf.toString('base64'),
  iv: ivBuf.toString('base64'),
  ciphertext: encrypted
};

// ==========================================
// 6. 寫回 data/encrypted_vault.json
// ==========================================
fs.writeFileSync(VAULT_JSON_PATH, JSON.stringify(updatedVault, null, 2), 'utf8');
console.log(`✅ 已寫入 data/encrypted_vault.json (密文長度: ${encrypted.length})`);

// ==========================================
// 7. 寫回 js/app.js 的 ENCRYPTED_VAULT 常數
// ==========================================
appJsContent = appJsContent.replace(
  /const ENCRYPTED_VAULT = \{[\s\S]*?\};/,
  'const ENCRYPTED_VAULT = ' + JSON.stringify(updatedVault, null, 2) + ';'
);

// 檢查並修正 app.js 裡面的 renderPocketPlaces，確保不會出現 undefined
// 修正 pocketCard 渲染屬性
appJsContent = appJsContent.replace(
  /\<span class="pocket-cat-badge"\>\$\{p\.city\} · \$\{p\.type\}\<\/span\>/g,
  '<span class="pocket-cat-badge">${p.city || p.categoryLabel || ""} · ${p.type || p.tag || ""}</span>'
);
appJsContent = appJsContent.replace(
  /\<div class="pocket-cat-badge-plain"\>\$\{p\.city\} · \$\{p\.type\}\<\/div\>/g,
  '<div class="pocket-cat-badge-plain">${p.city || p.categoryLabel || ""} · ${p.type || p.tag || ""}</div>'
);
appJsContent = appJsContent.replace(
  /\<span class="mo-text"\>\$\{p\.mustOrder\}\<\/span\>/g,
  '<span class="mo-text">${p.mustOrder || p.highlight || ""}</span>'
);
appJsContent = appJsContent.replace(
  /\<span class="pocket-hours"\>⏱ \$\{p\.hours\}\<\/span\>/g,
  '<span class="pocket-hours">⏱ ${p.hours || p.address || ""}</span>'
);

// 修正禁用詞「屏幕」->「螢幕」等
appJsContent = appJsContent.replace(/道閘屏幕/g, '道閘螢幕');

fs.writeFileSync(APP_JS_PATH, appJsContent, 'utf8');
console.log(`✅ 已成功注入 js/app.js 並修復口袋卡片欄位相容性！`);

// ==========================================
// 8. 驗證金庫解密測試
// ==========================================
const testDecipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuf);
let testDecrypted = testDecipher.update(updatedVault.ciphertext, 'base64', 'utf8');
testDecrypted += testDecipher.final('utf8');
const testObj = JSON.parse(testDecrypted);

console.log(`🎉 驗證成功！解密物件包含：`);
console.log(`- itineraryData: ${testObj.itineraryData.length} 天`);
console.log(`- 9/24 標題: ${testObj.itineraryData.find(d => d.date === '9/24').title}`);
console.log(`- 10/4 標題: ${testObj.itineraryData.find(d => d.date === '10/4').title}`);
console.log(`- 10/5 標題: ${testObj.itineraryData.find(d => d.date === '10/5').title}`);
console.log(`- 10/5 飯店: ${testObj.itineraryData.find(d => d.date === '10/5').keynote.hotel}`);
console.log(`- 9/29 莫內花園時間: ${testObj.ticketsData.find(t => t.code === '2624364336390402463').datetime}`);
console.log(`- hotelsData: ${testObj.hotelsData.length} 家`);
console.log(`- ticketsData: ${testObj.ticketsData.length} 筆`);
console.log(`- pocketPlacesData: ${testObj.pocketPlacesData.length} 處`);
