/**
 * 🇫🇷 2026 法國旅行 Web App — 旗艦手機端核心驅動引擎
 * 支援單手切換、今日即時高光、憑證金庫、私房口袋庫與自駕指南
 */

// ==========================================
// 1. 全程 23 天結構化行程資料庫 (Single Source)
// ==========================================
const itineraryData = [
  {
    date: '9/15',
    weekday: '二',
    title: '台北 (TPE) ➔ 巴黎 (CDG) 啟程啟航',
    tag: '跨國飛行',
    summary: '搭乘長榮航空 BR87 直飛巴黎，迎接 23 天浪漫法蘭西之旅！',
    keynote: {
      code: 'BR87 (23:30出發)',
      codeLabel: '航班編號',
      spot: '桃園國際機場 T2 ➔ 巴黎戴高樂 T1',
      hotel: '機上 (Overnight Flight)',
      mapQuery: 'Taoyuan International Airport'
    },
    items: [
      { time: '20:30', title: '抵達桃園機場第二航廈', desc: '辦理長榮航空報到手續、託運行李、通過安檢。', badges: ['機票已訂', '長榮航空'], map: 'Taiwan Taoyuan International Airport Terminal 2' },
      { time: '23:30', title: '長榮航空 BR87 班機起飛', desc: '直飛巴黎戴高樂機場 (CDG)，飛行時間約 14 小時，機上好好休息養精蓄銳。', badges: ['直飛航班'], map: '' }
    ]
  },
  {
    date: '9/16',
    weekday: '三',
    title: '抵達巴黎 ➔ B&B Check-in ➔ 13區漫步',
    tag: '初見巴黎',
    summary: '07:30 抵達戴高樂機場，申辦 Navigo 週卡，入住 13 區 B&B 飯店。',
    keynote: {
      code: 'BB22426149',
      codeLabel: '巴黎飯店訂單號 (9晚)',
      spot: 'B&B HOTEL Paris Italie Porte de Choisy',
      hotel: 'B&B HOTEL Paris Italie (已付款 €921.80)',
      mapQuery: 'B&B HOTEL Paris Italie Porte de Choisy'
    },
    items: [
      { time: '07:30', title: '平安降落巴黎戴高樂機場 (CDG)', desc: '出關提領大行李，於機場車站櫃檯申辦 Navigo 週卡（需貼 1 吋大頭照）。', badges: ['備大頭照', 'Navigo 1-5圈'], map: 'Paris Charles de Gaulle Airport' },
      { time: '11:00', title: '搭乘 RER B 轉地鐵前往 13 區飯店', desc: '抵達 B&B HOTEL Paris Italie Porte de Choisy 寄放行李或提早入住。', badges: ['代碼: BB22426149'], map: 'B&B HOTEL Paris Italie Porte de Choisy' },
      { time: '14:00', title: '13 區中國城 ＆ 義大利廣場周邊悠閒漫步', desc: '品嚐熱騰騰的道地越南河粉 (Pho 14)，採購水果飲料，回飯店調時差休整。', badges: ['美食探索'], map: 'Place d Italie Paris' }
    ]
  },
  {
    date: '9/17',
    weekday: '四',
    title: '11:00 試穿婚紗 ➔ 奧賽美術館 ➔ 協和廣場',
    tag: '婚紗準備',
    summary: '左岸試穿婚紗禮服，下午漫步奧賽美術館欣賞梵谷與莫內名作。',
    keynote: {
      code: '門禁2734 / 電梯1869',
      codeLabel: '婚紗店通關代碼',
      spot: 'The Bride Paris (22 rue de l\'Odeon)',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: '22 rue de l Odeon Paris'
    },
    items: [
      { time: '11:00', title: 'The Bride Paris 挑選與試穿婚紗', desc: '地址：22 rue de l\'Odeon (6區)。大門密碼【2734】，電梯密碼【1869】。試穿 3 套禮服並定裝。', badges: ['門禁: 2734', '電梯: 1869', '已預約'], map: '22 rue de l Odeon Paris' },
      { time: '14:00', title: '奧賽美術館 (Musée d\'Orsay)', desc: '持博物館通票入場，欣賞大鐘樓天窗、梵谷《星夜》、莫內《睡蓮》與雷諾瓦名作。', badges: ['博物館通票'], map: 'Musee d Orsay Paris' },
      { time: '17:30', title: '協和廣場 ＆ 杜樂麗花園漫步', desc: '遠眺埃及方尖碑與艾菲爾鐵塔遠景，享受巴黎初秋微風。', badges: ['免費景點'], map: 'Place de la Concorde Paris' }
    ]
  },
  {
    date: '9/18',
    weekday: '五',
    title: '先賢祠 ➔ 盧森堡公園 ➔ 莎士比亞書店',
    tag: '左岸文藝',
    summary: '漫步拉丁區文藝核心，走進居禮夫人與雨果長眠的先賢祠。',
    keynote: {
      code: '持 PMP 通票',
      codeLabel: '入場方式',
      spot: '先賢祠 (Panthéon) ＆ 莎士比亞書店',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: 'Pantheon Paris'
    },
    items: [
      { time: '09:30', title: '先賢祠 (Panthéon) 偉人殿堂', desc: '仰望傅科擺與巨大穹頂，參觀伏爾泰、盧梭、雨果、大仲馬、居禮夫人地下墓穴。', badges: ['博物館通票'], map: 'Pantheon Paris' },
      { time: '12:00', title: '盧森堡公園 (Jardin du Luxembourg)', desc: '坐在綠色鐵椅曬太陽，看著噴泉旁玩小帆船的孩子，享受最道地的巴黎慢生活。', badges: ['必去花園'], map: 'Jardin du Luxembourg Paris' },
      { time: '15:00', title: '莎士比亞書店 ＆ 塞納河畔舊書攤', desc: '走進面對聖母院的傳奇英文老書店，買書蓋專屬紀念藏書章。', badges: ['私房口袋'], map: 'Shakespeare and Company Paris' }
    ]
  },
  {
    date: '9/19',
    weekday: '六',
    title: '龐畢度中心 ➔ 瑪黑區漫步 ➔ 婚紗前夜養膚',
    tag: '現代文藝',
    summary: '登龐畢度透明水管電梯俯瞰巴黎全景，瑪黑區選品店採購，晚上早睡！',
    keynote: {
      code: '明晨 04:00 開工',
      codeLabel: '明日拍攝備忘',
      spot: '瑪黑區小巷 ＆ 龐畢度頂樓',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: 'Centre Pompidou Paris'
    },
    items: [
      { time: '10:00', title: '龐畢度現代藝術中心 (Centre Pompidou)', desc: '搭乘外露紅色手扶梯直達 6 樓觀景台，俯瞰聖心堂與艾菲爾鐵塔。', badges: ['博物館通票'], map: 'Centre Pompidou Paris' },
      { time: '13:00', title: '瑪黑區 (Le Marais) 歷史街區漫步', desc: '穿梭古老拱廊孚日廣場 (Place des Vosges)，品嚐 L\'As du Fallafel 猶太口袋餅。', badges: ['美食街區'], map: 'Place des Vosges Paris' },
      { time: '19:00', title: '提早返回飯店・敷面膜養膚早睡', desc: '整理明日婚紗便鞋與道具，設定 03:45 鬧鐘，備戰明日日出婚紗大片！', badges: ['早睡養膚'], map: '' }
    ]
  },
  {
    date: '9/20',
    weekday: '日',
    title: '💍 巴黎蜜月婚紗大片拍攝日！',
    tag: '重頭戲',
    summary: '04:00 專業化妝師梳畫，07:00 日出開拍艾菲爾鐵塔、羅浮宮與塞納河！',
    keynote: {
      code: '04:00 梳畫 / 07:00 開拍',
      codeLabel: '今日拍攝時間',
      spot: '夏佑宮鐵塔 ➔ 羅浮宮 ➔ 亞歷山大三世橋',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: 'Place du Trocadero Paris'
    },
    items: [
      { time: '04:00', title: '飯店內造型師梳畫與著裝', desc: '化妝師抵達飯店進行專業日出新娘妝髮，換穿第一套主婚紗。', badges: ['專業梳畫'], map: '' },
      { time: '07:00', title: '第一站：夏佑宮 (Trocadéro) 日出鐵塔空景', desc: '趁清晨無人晨光，拍下艾菲爾鐵塔與廣場最乾淨壯麗的經典大片！', badges: ['日出機位', '必拍神照'], map: 'Place du Trocadero Paris' },
      { time: '09:00', title: '第二站：羅浮宮金字塔 ＆ 迴廊古典婚紗', desc: '玻璃金字塔倒影、卡魯塞爾凱旋門、古典石雕拱廊。', badges: ['經典大片'], map: 'Pyramide du Louvre Paris' },
      { time: '11:00', title: '第三站：亞歷山大三世橋 ＆ 塞納河畔水岸', desc: '金碧輝煌的飛馬雕像、塞納河石造護岸，完美定格巴黎極致浪漫！', badges: ['大功告成'], map: 'Pont Alexandre III Paris' }
    ]
  },
  {
    date: '9/21',
    weekday: '一',
    title: '聖禮拜堂 ➔ 橘園睡蓮 ➔ 16:00 Chez Janou',
    tag: '印象睡蓮',
    summary: '晨光穿透聖禮拜堂彩繪玻璃，沉浸橘園 360 度睡蓮，享用小酒館燉肉。',
    keynote: {
      code: '16:00 已訂位',
      codeLabel: 'Chez Janou 預約',
      spot: '聖禮拜堂 ➔ 橘園美術館 ➔ 瑪黑區',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: 'Chez Janou Paris'
    },
    items: [
      { time: '09:30', title: '聖禮拜堂 (Sainte-Chapelle) 彩繪玻璃', desc: '15 米高、1113 幕聖經故事彩繪玻璃窗，晨光穿透宛如走進萬花筒！', badges: ['需預約09:30', '博物館通票'], map: 'Sainte Chapelle Paris' },
      { time: '13:30', title: '橘園美術館 (Musée de l\'Orangerie)', desc: '坐在專屬橢圓形展廳中央，360 度沉浸在莫內巨幅《睡蓮全景畫》中。', badges: ['博物館通票', '需約時段'], map: 'Musee de l Orangerie Paris' },
      { time: '16:00', title: '⭐Chez Janou 南法普羅旺斯傳統小酒館', desc: '✅ 已預訂 16:00！必吃招牌法式油封鴨、香煎干貝與傳奇「整盆無限續加巧克力慕斯」！', badges: ['✅已訂位', '私房名店'], map: 'Chez Janou Paris' }
    ]
  },
  {
    date: '9/22',
    weekday: '二',
    title: '巴黎聖母院內部 ➔ 西堤島 ➔ 塞納河日落遊船',
    tag: '聖母院浴火重生',
    summary: '走進重建後全新開放的巴黎聖母院，傍晚搭乘遊船欣賞塞納河兩岸夕陽。',
    keynote: {
      code: '官方 App 預約',
      codeLabel: '聖母院入場',
      spot: '巴黎聖母院 (Notre-Dame) ＆ 塞納河遊船',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: 'Cathedrale Notre Dame de Paris'
    },
    items: [
      { time: '10:00', title: '巴黎聖母院 (Cathédrale Notre-Dame) 參觀', desc: '瞻仰浴火重生的哥德式巨木穹頂、神聖玫瑰花窗與管風琴。', badges: ['免費入場', 'App預約'], map: 'Cathedrale Notre Dame de Paris' },
      { time: '14:00', title: '西堤島古監獄 ＆ 新橋 (Pont Neuf)', desc: '漫步巴黎最古老的新橋，坐在太子廣場長椅享用冰淇淋。', badges: ['博物館通票'], map: 'Pont Neuf Paris' },
      { time: '18:00', title: '塞納河觀光遊船 (Bateaux-Mouches / Vedettes)', desc: '航行塞納河，看金色夕陽將聖母院、羅浮宮與奧賽美術館染成粉紫色。', badges: ['浪漫夕陽'], map: 'Vedettes du Pont Neuf Paris' }
    ]
  },
  {
    date: '9/23',
    weekday: '三',
    title: '杜樂麗花園 ➔ 羅浮宮三寶 ➔ 金字塔夜景',
    tag: '羅浮宮深度遊',
    summary: '從地下卡魯塞爾避開排隊，深度鑑賞勝利女神、蒙娜麗莎與維納斯！',
    keynote: {
      code: 'V260781545820',
      codeLabel: '羅浮宮預約代碼',
      spot: '地下卡魯塞爾購物廊入口 (Galerie du Carrousel)',
      hotel: 'B&B HOTEL Paris Italie',
      mapQuery: 'Pyramide du Louvre Paris'
    },
    items: [
      { time: '13:30', title: '地下卡魯塞爾購物廊 (Galerie du Carrousel) 入口', desc: '避開地面金字塔長隊，直接由倒金字塔地下通道快速通關安檢！', badges: ['避人潮秘技'], map: 'Carrousel du Louvre Paris' },
      { time: '14:00', title: '⭐羅浮宮博物館 (Musée du Louvre) 鎮館三寶', desc: '直奔達文西《蒙娜麗莎》、薩莫色雷斯的《勝利女神》、《米洛的維納斯》。', badges: ['已預約門票', '鎮館三寶'], map: 'Musee du Louvre Paris' },
      { time: '19:30', title: '羅浮宮金字塔夜間點燈倒影', desc: '貝聿銘玻璃金字塔打上溫暖金光，在無風水池旁拍下極致對稱倒影神照。', badges: ['夜景必拍'], map: 'Pyramide du Louvre Paris' }
    ]
  },
  {
    date: '9/24',
    weekday: '四',
    title: '楓丹白露宮 ➔ 巴比松畫家村 ➔ 巴黎整裝',
    tag: '皇家森林',
    summary: '探訪拿破崙深愛的楓丹白露宮馬蹄形階梯，晚上收大行李備戰明日高鐵自駕！',
    keynote: {
      code: '明晨 06:48 高鐵',
      codeLabel: '明日高鐵代碼: 4WCP2R',
      spot: '楓丹白露宮 ＆ 拿破崙告別階梯',
      hotel: 'B&B HOTEL Paris Italie (最後1晚)',
      mapQuery: 'Chateau de Fontainebleau'
    },
    items: [
      { time: '09:00', title: '搭乘 Transilien R 線前往楓丹白露 (Fontainebleau)', desc: '巴黎里昂車站出發，持 Navigo 週卡免費搭乘，40 分鐘直達。', badges: ['Navigo可用'], map: 'Chateau de Fontainebleau' },
      { time: '10:30', title: '楓丹白露宮內部與皇家森林花園', desc: '參觀拿破崙退位小客廳、教宗套房與弗朗索瓦一世畫廊。', badges: ['博物館通票'], map: 'Chateau de Fontainebleau' },
      { time: '18:00', title: '返回巴黎打包 2 大行李・確認明日 Sixt 取車證件', desc: '備齊護照、台灣駕照正本、國際駕照、實體信用卡與 4 位數 PIN 碼。', badges: ['自駕證件檢查'], map: '' }
    ]
  },
  {
    date: '9/25',
    weekday: '五',
    title: '🚄 高鐵 ➔ 雷恩取車 ➔ 聖馬洛 ➔ 康卡勒生蠔 ➔ 聖米山',
    tag: '自駕啟程',
    summary: '06:48 高鐵直奔雷恩取休旅車，登上聖馬洛古城大貝島，入住聖米山 Mercure！',
    keynote: {
      code: '取車密碼【6060】',
      codeLabel: '雷恩停車場電梯碼',
      spot: '雷恩 Sixt ➔ 聖馬洛城牆 ➔ 康卡勒港',
      hotel: 'Hôtel Mercure Mont Saint-Michel (QQDDDWJZ)',
      mapQuery: 'Hotel Mercure Mont Saint Michel'
    },
    items: [
      { time: '06:48', title: 'SNCF 高鐵 TGV 出發 (Paris ➔ Rennes)', desc: '✅ 已購票 (代碼: 4WCP2R)。06:48 蒙帕納斯站出發，08:15 準時抵達雷恩。', badges: ['TGV: 4WCP2R'], map: 'Gare Montparnasse Paris' },
      { time: '08:30', title: '⭐雷恩火車站 Sixt 取車 (Peugeot 3008 休旅)', desc: '北出口下手扶梯至櫃檯，至 Effia 停車場輸入密碼【6060】上 7 樓取車（刷扣€300押金/全車錄影）。', badges: ['Sixt: 9738701348', '密碼: 6060'], map: 'Gare de Rennes' },
      { time: '10:30', title: '聖馬洛古城 (Saint-Malo) 漫步海景城牆', desc: '停 Q-Park 停車場，走古城牆 (Remparts) 遠眺國家碉堡，買焦糖奶油酥。', badges: ['海景城牆'], map: 'Intra-Muros Saint-Malo' },
      { time: '13:30', title: '大貝島 (Grand Bé) 乾潮徒步跨海', desc: '⭐ 迎合 13:54 乾潮最低水位！走乾燥石道探訪夏多布里昂墓。', badges: ['乾潮 13:54'], map: 'Grand Be Saint-Malo' },
      { time: '15:30', title: '康卡勒 (Cancale) 港邊現開生蠔市場', desc: '在生蠔市場購買產地現開生蠔，坐在防波堤上看海現擠檸檬享用！', badges: ['私房生蠔'], map: 'Marche aux Huitres Cancale' },
      { time: '18:15', title: '入住 Hôtel Mercure Mont Saint-Michel', desc: '輸入道閘密碼進入 Caserne 管制區，停飯店專屬免費停車場。', badges: ['✅訂單: QQDDDWJZ', '含早餐'], map: 'Hotel Mercure Mont Saint Michel' },
      { time: '19:15', title: '庫埃農河水壩 (Barrage) 賞滿潮落日夜景', desc: '⭐ 19:26 滿潮倒影 ＋ 19:50 夕陽 ＋ 20:00 外牆點燈第一名機位！', badges: ['滿潮 19:26', '必拍神位'], map: 'Barrage sur le Couesnon' },
      { time: '20:30', title: '⭐Restaurant Le Pré Salé 頂級黑面鹽沼羊肉晚餐', desc: '就在 Mercure 飯店旁，享用法國國寶級 AOP 鹽沼草飼羊肉法餐！', badges: ['鹽沼羊大餐'], map: 'Restaurant Le Pre Sale' }
    ]
  },
  {
    date: '9/26',
    weekday: '六',
    title: '🏰 聖米山晨光包島 ➔ La Ferme 羊肉 ➔ 草原拍羊 ➔ 翁夫勒夕陽',
    tag: '聖米山大滿貫',
    summary: '07:30 首班車滿潮包島，14:00 農莊羊肉大餐，草甸拍黑面羊，翁夫勒老港野餐！',
    keynote: {
      code: '道閘密碼【645504】',
      codeLabel: 'La Ferme 專屬道閘碼',
      spot: '聖米歇爾山 ➔ La Roche Torin ➔ 翁夫勒老港',
      hotel: 'B&B HOTEL Honfleur (BB22633724)',
      mapQuery: 'La Ferme Saint-Michel Mont-Saint-Michel'
    },
    items: [
      { time: '07:30', title: '搭第 1 班接駁車進島・晨光無人包島漫步', desc: '⭐ 07:45 滿潮(係數87)！戴耳機開 VoiceMap (兌換碼【0B6CBA60】) 聽官方離線導覽。', badges: ['滿潮 07:45', 'VoiceMap: 0B6CBA60'], map: 'Mont-Saint-Michel' },
      { time: '09:00', title: '修道院 (Abbaye) 開門第 1 批深度參觀', desc: '門票於 KKday 當場手機直接購買即可（即買即出電子票免排隊，掃碼入場）。', badges: ['KKday現場手機買', '空中迴廊'], map: 'Abbaye du Mont-Saint-Michel' },
      { time: '14:00', title: '⭐La Ferme Saint-Michel 頂級鹽沼羊午餐', desc: '✅ 已預約 14:00！道閘密碼【645504】，停餐廳私人車位，保管 Ticket，離場刷付 10€。享用炭烤羊排＋燉羊肩肉！', badges: ['✅已訂位', '道閘: 645504', '電話: 0233584679'], map: 'La Ferme Saint-Michel Mont-Saint-Michel' },
      { time: '15:45', title: '⭐La Roche Torin（羅什托蘭海角）拍黑面羊大景', desc: '廣袤草甸旁拍攝成群黑面鹽沼羊低頭吃草與聖米歇爾山遠景國家地理級大片！', badges: ['拍羊秘境', '免費大景'], map: 'Pointe de la Roche Torin Courtils' },
      { time: '19:25', title: '翁夫勒 E.Leclerc 超市採購晚餐 ＆ Check-in', desc: '採購烤全雞與冰蘋果酒，B&B HOTEL Honfleur 入住 (代碼: BB22633724 / 現場付 €70.98)。', badges: ['代碼: BB22633724', '免費停車'], map: 'B&B HOTEL Honfleur' },
      { time: '19:46', title: '⭐翁夫勒老港 (Vieux Bassin) 看夕陽倒影 ＆ 野餐', desc: '⭐ 19:46 日落！坐在水岸長椅看粉紫夕陽染紅木帆船石屋，享受烤雞法棍大餐與 20:00 暖黃街燈夜景！', badges: ['夕陽 19:46', '老港野餐'], map: 'Vieux Bassin Honfleur' }
    ]
  },
  {
    date: '9/27',
    weekday: '日',
    title: '翁夫勒 ➔ 諾曼第大橋 ➔ 象鼻海岸 ➔ 20:00 盧昂百年老餐廳',
    tag: '白堊雙象絕壁',
    summary: '自駕橫跨諾曼第大橋，健行象鼻海岸阿瓦爾懸崖，20:00 盧昂 1345 年古老餐廳晚餐！',
    keynote: {
      code: 'ID: 790B-8602-147D-CA61',
      codeLabel: 'La Couronne 訂位代碼',
      spot: '象鼻海岸阿瓦爾懸崖 ➔ 盧昂大教堂 ➔ 舊市集廣場',
      hotel: '盧昂市區飯店 (待預訂 1 晚)',
      mapQuery: 'La Couronne Rouen'
    },
    items: [
      { time: '09:00', title: '翁夫勒日間老港 ＆ 聖凱瑟琳全木造教堂', desc: '欣賞全法最大雙中殿木造教堂（翻轉船底木造天花板）。', badges: ['木造教堂'], map: 'Eglise Sainte-Catherine Honfleur' },
      { time: '10:30', title: '自駕橫跨「諾曼第大橋 (Pont de Normandie)」', desc: '走 A29 高速公路橫跨塞納河出海口之巨型斜張橋（過橋費約 5.80€）。', badges: ['過橋費 5.80€'], map: 'Pont de Normandie' },
      { time: '13:00', title: '⭐象鼻海岸 (Étretat) 雙象絕壁健行', desc: '攀登左側阿瓦爾懸崖看巨象吸水海蝕門與針形岩；右側阿蒙懸崖水手聖母教堂。', badges: ['阿瓦爾懸崖', '海蝕門'], map: 'Falaise d Aval Etretat' },
      { time: '16:30', title: '自駕前往歷史首府盧昂 (Rouen) Check-in', desc: '一路沿塞納河谷推進，抵達盧昂市區飯店 Check-in 卸行李。', badges: ['歷史古都'], map: 'Rouen France' },
      { time: '20:00', title: '⭐La Couronne 1345 百年老餐廳燭光晚餐', desc: '✅ 已預約 20:00！(TheFork ID: 790B-8602-147D-CA61)。創於 1345 年全法最古老小酒館，品嚐傳統諾曼第法餐！', badges: ['✅已訂位', 'TheFork: 790B-8602-147D-CA61', '創於1345年'], map: 'La Couronne Rouen' }
    ]
  },
  {
    date: '9/28',
    weekday: '一',
    title: '盧昂都市深度漫活 ➔ 莫內真跡 ➔ 傍晚住吉維尼/Vernon',
    tag: '印象首府',
    summary: '走進莫內筆下的盧昂大教堂，登天文大時鐘樓頂，盧昂美術館賞莫內真跡！',
    keynote: {
      code: '常設展免費',
      codeLabel: '盧昂美術館',
      spot: '盧昂大教堂 ➔ 大時鐘 ➔ 莫內真跡 ➔ Vernon',
      hotel: '吉維尼 / 韋爾農 (Vernon) 周邊飯店 (待訂 1 晚)',
      mapQuery: 'Cathedrale Notre-Dame de Rouen'
    },
    items: [
      { time: '09:00', title: '盧昂聖母大教堂 (Cathédrale Notre-Dame) 深度參觀', desc: '莫內繪製 30 多幅名作的本尊，感受極致挑高穹頂與神聖光影。', badges: ['莫內名畫地標'], map: 'Cathedrale Notre-Dame de Rouen' },
      { time: '10:30', title: '文藝復興大時鐘街 ＆ 鐘樓登頂俯瞰', desc: '登上金色天文大時鐘樓頂，360 度俯瞰童話哥德尖塔與半木結構屋頂。', badges: ['360度俯瞰'], map: 'Le Gros-Horloge Rouen' },
      { time: '13:45', title: '⭐盧昂美術館 (Musée des Beaux-Arts)', desc: '親眼瞻仰莫內《盧昂大教堂》系列油畫真跡與卡拉瓦喬大師名作。', badges: ['莫內真跡', '免費常設展'], map: 'Musee des Beaux-Arts de Rouen' },
      { time: '17:30', title: '自駕 A13 前往吉維尼 / 韋爾農 (Vernon) 入住', desc: '約 72km / 55 分鐘，抵達塞納河畔小鎮飯店 Check-in，享用鄉村晚餐。', badges: ['塞納河畔'], map: 'Vernon France' }
    ]
  },
  {
    date: '9/29',
    weekday: '二',
    title: '🌸 莫內睡蓮花園 ➔ 塞納河老磨坊 ➔ 凡爾賽宮周邊',
    tag: '睡蓮花園',
    summary: '09:30 第一批進莫內睡蓮花園，百年玫瑰花園午餐，探訪斷橋懸空老磨坊！',
    keynote: {
      code: '2624364336390402463',
      codeLabel: '莫內花園門票訂單號',
      spot: '莫內故居 ＆ 日本拱橋睡蓮池',
      hotel: '凡爾賽宮周邊飯店 (待預訂 1 晚)',
      mapQuery: 'Fondation Claude Monet Giverny'
    },
    items: [
      { time: '09:15', title: '抵達吉維尼小鎮 ＆ 停入免費大停車場', desc: '停 Parking du Verger，步行 3 分鐘至莫內之家入口。', badges: ['免費停車'], map: 'Parking du Verger Giverny' },
      { time: '09:30', title: '⭐吉維尼：莫內之家與睡蓮花園深度參觀', desc: '✅ 門票已購 (訂單號: 2624364336390402463・已存 data/)！一開門直衝水上花園拍無人晨光倒影日本橋與睡蓮池。', badges: ['✅門票已購27€', 'Order: 2624364336390402463'], map: 'Fondation Claude Monet Giverny' },
      { time: '12:00', title: 'Restaurant Baudy 百年玫瑰花園法式午餐', desc: '在昔日塞尚、雷諾瓦、羅丹等印象派大師聚會的百年老餐廳露天花園用餐。', badges: ['大師聚會所'], map: 'Restaurant Baudy Giverny' },
      { time: '13:45', title: '拍照秘境：韋爾農懸空老磨坊 (Vieux Moulin)', desc: '建在塞納河中世紀斷橋殘墩上的木造懸空古磨坊，莫內畫作本尊。', badges: ['拍照秘境'], map: 'Vieux Moulin de Vernon' },
      { time: '17:00', title: '自駕前往凡爾賽宮周邊飯店 Check-in', desc: '入住凡爾賽宮周邊飯店，早睡備戰明日凡爾賽鏡廳衝刺！', badges: ['備戰凡爾賽'], map: 'Versailles France' }
    ]
  },
  {
    date: '9/30',
    weekday: '三',
    title: '👑 凡爾賽宮鏡廳衝刺 ➔ 18:00 迪士尼還車 ➔ 入住迪士尼',
    tag: '鏡廳衝刺',
    summary: '09:00 第一場直衝二樓鏡廳拍無人空景，15:30 出發直奔迪士尼準時還車！',
    keynote: {
      code: '18:00 前還車',
      codeLabel: 'Sixt 還車期限',
      spot: '凡爾賽宮鏡廳 ➔ 迪士尼 Chessy 車站',
      hotel: 'Zenitude Hôtel-Résidences Chessy (3 晚)',
      mapQuery: 'Chateau de Versailles'
    },
    items: [
      { time: '08:30', title: '抵達凡爾賽宮正門停車 ＆ 準備安檢', desc: '停 Place d\'Armes 停車場，提前抵達金黃大門排隊等候 09:00 開門。', badges: ['提前排隊'], map: 'Place d Armes Versailles' },
      { time: '09:00', title: '⭐凡爾賽宮「鏡廳衝刺法」深度參觀', desc: '一開門直衝二樓鏡廳拍無人金碧輝煌空景！參觀國王套房與皇家大花園。', badges: ['鏡廳衝刺法', '第一場入場'], map: 'Galerie des Glaces Versailles' },
      { time: '15:30', title: '⚠️準時啟程直奔巴黎迪士尼 Chessy (走外環高架)', desc: '走 A86 ➔ A4 外環高架，預留 2 小時應對平日下班車潮，完全免進巴黎市區！', badges: ['預留2小時'], map: '' },
      { time: '17:35', title: '迪士尼站外加油站加滿油 (Full Tank)', desc: '於車站外 2 公里處將油箱加滿，保留加油發票供還車查驗。', badges: ['加滿油箱'], map: 'Gare de Marne-la-Vallee Chessy' },
      { time: '18:00', title: '🏁 Chessy Gare Sixt 順利還車！', desc: '拍照記錄儀表板里程與油量，櫃檯交付鑰匙，完美完成 6 天諾曼第自駕！', badges: ['✅還車完成', 'Sixt: 9738701348'], map: 'Gare de Marne-la-Vallee Chessy' },
      { time: '18:30', title: 'Zenitude 飯店 Check-in ＆ 迪士尼小鎮慶祝夜', desc: '入住 Zenitude Hôtel-Résidences Chessy，晚上漫步 Disney Village 吃大餐慶祝！', badges: ['宿迪士尼', '入住3晚'], map: 'Zenitude Hotel-Residences Chessy' }
    ]
  },
  {
    date: '10/1',
    weekday: '四',
    title: '🎢 巴黎迪士尼主樂園 (Parc Disneyland) 全日制霸！',
    tag: '迪士尼主園',
    summary: '開園直衝巨雷山與太空山，觀賞 19:00 大遊行與夢幻無人機城堡煙火秀！',
    keynote: {
      code: '19:00 遊行 / 閉園煙火',
      codeLabel: '必看重頭戲',
      spot: '睡美人城堡 ➔ 巨雷山 ➔ 太空山',
      hotel: 'Zenitude Hôtel-Résidences Chessy',
      mapQuery: 'Disneyland Paris'
    },
    items: [
      { time: '08:30', title: '入園先衝熱門三大設施', desc: '直奔 Frontierland「巨雷山 (Big Thunder Mountain)」與 Discoveryland「星戰太空山」。', badges: ['開園先攻'], map: 'Disneyland Paris' },
      { time: '19:00', title: '迪士尼百萬巨星歡樂大遊行 (Disney Stars on Parade)', desc: '主街 (Main Street U.S.A.) 兩側卡位，看米奇米妮與噴火巨龍花車！', badges: ['必看遊行'], map: 'Main Street USA Disneyland Paris' },
      { time: '22:00', title: '⭐Disney Illuminations 睡美人城堡無人機煙火秀', desc: '無人機空中編隊 ＋ 城堡雷射投影 ＋ 震撼煙火，此生必看夢幻大秀！', badges: ['城堡煙火秀', '無人機編隊'], map: 'Sleeping Beauty Castle Disneyland Paris' }
    ]
  },
  {
    date: '10/2',
    weekday: '五',
    title: '🎬 華特迪士尼影城 (Walt Disney Studios Park)',
    tag: '漫威與皮克斯',
    summary: '先攻料理鼠王 4D 冒險、驚魂古塔自由落體與復仇者聯盟漫威基地！',
    keynote: {
      code: '料理鼠王 4D / 漫威基地',
      codeLabel: '影城必玩設施',
      spot: '料理鼠王 ➔ 驚魂古塔 ➔ 漫威復仇者聯盟',
      hotel: 'Zenitude Hôtel-Résidences Chessy (最後1晚)',
      mapQuery: 'Walt Disney Studios Park'
    },
    items: [
      { time: '09:00', title: '料理鼠王 4D 冒險 (Ratatouille: The Adventure)', desc: '化身小小小米，在巴黎廚房地板展開 3D 穿梭狂奔！', badges: ['影城第一名'], map: 'Walt Disney Studios Park' },
      { time: '11:00', title: '驚魂古塔 (The Twilight Zone Tower of Terror)', desc: '好萊塢老飯店鬧鬼電梯，超刺激無預警多次垂直墜落！', badges: ['心跳加速'], map: 'Walt Disney Studios Park' },
      { time: '14:00', title: '復仇者聯盟基地 (Avengers Campus)', desc: '蜘蛛人 3D 射蛛絲互動體驗 ＋ 鋼鐵人超光速雲霄飛車！', badges: ['漫威宇宙'], map: 'Avengers Campus Disneyland Paris' }
    ]
  },
  {
    date: '10/3',
    weekday: '六',
    title: '迪士尼退房 ➔ 巴黎市區 Check-in ➔ 聖馬丁運河 ➔ 瑪黑購物',
    tag: '重返巴黎',
    summary: '重返巴黎市區飯店入住，漫步聖馬丁運河鐵橋，瑪黑區香氛服飾選品！',
    keynote: {
      code: '巴黎市區飯店 3 晚',
      codeLabel: '住宿安排',
      spot: '聖馬丁運河 ➔ 瑪黑區選品店 ➔ 孚日廣場',
      hotel: '巴黎市區飯店 (待預訂 3 晚)',
      mapQuery: 'Canal Saint-Martin Paris'
    },
    items: [
      { time: '10:30', title: '搭乘 RER A 線返回巴黎市區', desc: '直達巴黎市區飯店 Check-in 卸行李。', badges: ['RER A線'], map: 'Paris France' },
      { time: '14:00', title: '聖馬丁運河 (Canal Saint-Martin) 文青漫步', desc: '《艾蜜莉的異想世界》打水漂鐵橋，周邊獨立咖啡館與文創選品店。', badges: ['文青街區'], map: 'Canal Saint-Martin Paris' },
      { time: '17:00', title: '瑪黑區香氛選品 (Diptyque / Buly 1803 / Le Labo)', desc: '採購巴黎經典香氛、護手霜與伴手禮。', badges: ['香氛購物'], map: 'Le Marais Paris' }
    ]
  },
  {
    date: '10/4',
    weekday: '日',
    title: '蒙馬特高地 ➔ 聖心堂 ➔ 愛牆 ➔ 歌劇院區拉法葉百貨',
    tag: '巴黎俯瞰',
    summary: '登蒙馬特全城最高點聖心堂，愛牆拍照，雙磨坊咖啡館，拉法葉穹頂採購！',
    keynote: {
      code: '粉紅玻璃花房',
      codeLabel: '午餐推薦: Pink Mamma',
      spot: '聖心堂俯瞰 ➔ 愛牆 ➔ 拉法葉頂樓天台',
      hotel: '巴黎市區飯店',
      mapQuery: 'Basilique du Sacre-Coeur Paris'
    },
    items: [
      { time: '09:30', title: '聖心堂 (Basilique du Sacré-Cœur) 俯瞰全巴黎', desc: '坐在白色大教堂前階梯，俯瞰晨光下的巴黎全景天際線。', badges: ['全城制高點'], map: 'Basilique du Sacre-Coeur Paris' },
      { time: '11:00', title: '愛牆 (Mur des Je t\'aime) ＆ 雙磨坊咖啡館', desc: '由 250 種語言寫滿「我愛你」的深藍瓷磚牆，打卡《艾蜜莉》雙磨坊咖啡館。', badges: ['浪漫打卡'], map: 'Le Mur des Je t aime Paris' },
      { time: '12:30', title: '⭐Pink Mamma 頂樓玻璃花房義式午餐', desc: '四層樓絕美花房餐廳，品嚐招牌現刨松露手工麵與佛羅倫斯大牛排！', badges: ['私房口袋名店'], map: 'Pink Mamma Paris' },
      { time: '15:00', title: '拉法葉百貨 (Galeries Lafayette) 拜占庭玻璃穹頂', desc: '登頂樓免費露天觀景台拍巴黎歌劇院與艾菲爾鐵塔，採購精品伴手禮。', badges: ['穹頂天台', '退稅採購'], map: 'Galeries Lafayette Paris' }
    ]
  },
  {
    date: '10/5',
    weekday: '一',
    title: '莎士比亞書店 ➔ 巴黎左岸漫活 ➔ 整理行李與核對退稅單',
    tag: '漫活打包',
    summary: '花神咖啡館露天座喝熱可可，聖日耳曼大道漫步，晚間統一整理退稅單！',
    keynote: {
      code: '先退稅再託運！',
      codeLabel: '明日機場口訣',
      spot: '花神咖啡館 ➔ 聖日耳曼大道 ➔ 整理退稅單',
      hotel: '巴黎市區飯店',
      mapQuery: 'Cafe de Flore Paris'
    },
    items: [
      { time: '10:00', title: '⭐花神咖啡館 (Café de Flore) 晨光露天座', desc: '坐在綠色露天座點一杯濃郁熱巧克力與雙蛋可頌，享受左岸文化氣息。', badges: ['左岸地標'], map: 'Cafe de Flore Paris' },
      { time: '14:00', title: '聖日耳曼大道精品小巷 ＆ 奇美跳蚤尋寶', desc: '悠閒漫步巴黎街頭，買馬卡龍 (Pierre Hermé) 與最後紀念品。', badges: ['悠閒慢活'], map: 'Boulevard Saint-Germain Paris' },
      { time: '19:00', title: '⚠️統一整理退稅單 (Tax Free) ＆ 打包秤重', desc: '核對所有退稅單條碼清晰度，分好手提與託運商品，設定明日 06:00 鬧鐘！', badges: ['退稅單核對', '行李打包'], map: '' }
    ]
  },
  {
    date: '10/6',
    weekday: '二',
    title: 'CDG 戴高樂機場 PABLO 掃描退稅 ➔ 11:20 BR88 返台',
    tag: '返程歸國',
    summary: '07:00 抵達戴高樂機場，PABLO 機器掃碼退稅，搭乘長榮 BR88 班機返台！',
    keynote: {
      code: 'BR88 (11:20起飛)',
      codeLabel: '返台航班',
      spot: '戴高樂機場 T1 ➔ PABLO 退稅機',
      hotel: '機上 (Overnight Flight)',
      mapQuery: 'Paris Charles de Gaulle Airport Terminal 1'
    },
    items: [
      { time: '07:00', title: '抵達戴高樂機場第一航廈 (CDG T1)', desc: '提前 4 小時抵達，直奔 PABLO 退稅機掃描退稅單條碼（綠燈免海關，紅燈走海關窗口）。', badges: ['PABLO退稅機', '先退稅再託運'], map: 'Paris Charles de Gaulle Airport Terminal 1' },
      { time: '08:30', title: '長榮航空櫃檯託運行李 ＆ 出境安檢', desc: '確認退稅單已投郵筒（若需退信用卡），順利出境免稅店採購最後伴手禮。', badges: ['行李託運'], map: '' },
      { time: '11:20', title: '長榮航空 BR88 班機起飛返台', desc: '告別美麗的法蘭西，帶著滿滿蜜月回憶與大片平安歸國！', badges: ['平安歸國'], map: '' }
    ]
  },
  {
    date: '10/7',
    weekday: '三',
    title: '06:30 平安抵達台灣桃園國際機場 (TPE)',
    tag: '甜蜜回家',
    summary: '06:30 降落桃園機場，提領行李平安返家，完美結束 23 天法國之旅！',
    keynote: {
      code: '06:30 降落 TPE',
      codeLabel: '抵台時間',
      spot: '桃園國際機場 T2 ➔ 溫暖的家',
      hotel: '溫暖的家',
      mapQuery: 'Taiwan Taoyuan International Airport'
    },
    items: [
      { time: '06:30', title: '班機準時降落桃園國際機場', desc: '通過檢疫出關，提領行李，平安返家！', badges: ['圓滿結束'], map: 'Taiwan Taoyuan International Airport' }
    ]
  }
];

// ==========================================
// 2. 全程 9 筆住宿清單資料庫 (Hotels Vault)
// ==========================================
const hotelsData = [
  {
    name: 'B&B HOTEL Paris Italie Porte de Choisy 3 étoiles',
    city: '巴黎 13 區',
    dates: '9/16 (三) ~ 9/24 (四) · 9 晚',
    code: 'BB22426149',
    price: '€921.80 (含稅費 / 已全額付款)',
    payment: '已付款',
    checkin: '14:00',
    checkout: '12:00',
    address: 'Porte de Choisy, 13區 巴黎',
    phone: '+33 1 46 70 12 12',
    highlight: true
  },
  {
    name: 'Hôtel Mercure Mont Saint-Michel',
    city: '聖米歇爾山 (La Caserne 管制區內)',
    dates: '9/25 (五) ~ 9/26 (六) · 1 晚',
    code: 'QQDDDWJZ',
    price: '€195.50 (含雙人自助早餐 / 已全額付款)',
    payment: '已付款',
    checkin: '15:00 (9/23-24 收道閘碼)',
    checkout: '12:00 (可免費寄放行李)',
    address: 'Route du Mont Saint-Michel, 50170',
    phone: '+33 2 33 60 14 18',
    highlight: true
  },
  {
    name: 'B&B HOTEL Honfleur',
    city: '翁夫勒 (Honfleur)',
    dates: '9/26 (六) ~ 9/27 (日) · 1 晚',
    code: 'BB22633724',
    price: '€70.98 (現場付款 / 附專屬免費停車場)',
    payment: '現場付款',
    checkin: '14:00',
    checkout: '12:00',
    address: 'Chemin du Banc, 14600 La Rivière-Saint-Sauveur',
    phone: '08 92 78 80 44',
    highlight: true
  },
  {
    name: '盧昂市區飯店 (歷史老城區)',
    city: '盧昂 (Rouen)',
    dates: '9/27 (日) ~ 9/28 (一) · 1 晚',
    code: '待預訂',
    price: '待定 (建議選附停車場飯店)',
    payment: '未付款',
    checkin: '15:00',
    checkout: '11:00',
    address: '盧昂大教堂與大時鐘周邊',
    phone: '',
    highlight: false
  },
  {
    name: '吉維尼 / 韋爾農 (Vernon) 周邊飯店',
    city: '吉維尼 / 韋爾農',
    dates: '9/28 (一) ~ 9/29 (二) · 1 晚',
    code: '待預訂',
    price: '待定',
    payment: '未付款',
    checkin: '15:00',
    checkout: '11:00',
    address: 'Vernon / Giverny 周邊',
    phone: '',
    highlight: false
  },
  {
    name: '凡爾賽宮周邊飯店',
    city: '凡爾賽 (Versailles)',
    dates: '9/29 (二) ~ 9/30 (三) · 1 晚',
    code: '待預訂',
    price: '待定',
    payment: '未付款',
    checkin: '15:00',
    checkout: '11:00',
    address: '凡爾賽宮步行或開車 10 分鐘內',
    phone: '',
    highlight: false
  },
  {
    name: 'Zenitude Hôtel-Résidences Chessy',
    city: '巴黎迪士尼 (Chessy / Marne-la-Vallée)',
    dates: '9/30 (三) ~ 10/2 (五) · 3 晚',
    code: '待確認訂房代碼',
    price: '已預訂',
    payment: '已預訂',
    checkin: '15:00',
    checkout: '11:00',
    address: 'Chessy 迪士尼接駁區',
    phone: '',
    highlight: true
  },
  {
    name: '巴黎市區飯店 (左岸 / 13區 / 市區)',
    city: '巴黎市區',
    dates: '10/3 (六) ~ 10/5 (一) · 3 晚',
    code: '待預訂',
    price: '待定',
    payment: '未付款',
    checkin: '14:00',
    checkout: '12:00',
    address: '巴黎市區地鐵站周邊',
    phone: '',
    highlight: false
  }
];

// ==========================================
// 3. 門票・車票與通關憑證資料庫 (Passes Vault)
// ==========================================
const ticketsData = [
  {
    name: '吉維尼莫內花園門票 (Fondation Claude Monet)',
    type: '門票憑證',
    date: '9/29 (二) 09:30 入場',
    code: 'Order Ref: 2624364336390402463',
    price: '€27.00 (2人門票・已付款)',
    desc: 'PDF 電子票已存放在 data/Tickets_2624364336390402463.pdf，09:30 開門直衝日本橋睡蓮池！',
    actionText: '打開 PDF 門票',
    actionUrl: 'data/Tickets_2624364336390402463.pdf',
    isCopyable: true,
    copyValue: '2624364336390402463'
  },
  {
    name: '聖米歇爾山官方語音導覽 (VoiceMap)',
    type: '語音導覽',
    date: '9/26 (六) 07:30 漫步使用',
    code: '兌換碼: 0B6CBA60',
    price: '餐廳贈送 (免費 2 次下載)',
    desc: '下載 VoiceMap App ➔ Visit codes ➔ 輸入【0B6CBA60】下載離線音檔，自備耳機漫步！',
    actionText: '下載 VoiceMap App',
    actionUrl: 'https://apps.apple.com/fr/app/voicemap-les-guides-tours/id852027939',
    isCopyable: true,
    copyValue: '0B6CBA60'
  },
  {
    name: '盧昂 La Couronne 1345 百年老餐廳',
    type: '餐廳訂位',
    date: '9/27 (日) 20:00 晚餐',
    code: 'TheFork ID: 790B-8602-147D-CA61',
    price: '已確認預約 (2 位成人)',
    desc: '創立於 1345 年全法最古老小酒館，位於聖女貞德舊市集廣場 31 號。',
    actionText: '📍 Google 導航',
    actionUrl: 'https://www.google.com/maps/search/?api=1&query=La+Couronne+Rouen',
    isCopyable: true,
    copyValue: '790B-8602-147D-CA61'
  },
  {
    name: 'La Ferme Saint-Michel 黑面鹽沼羊午餐',
    type: '餐廳訂位',
    date: '9/26 (六) 14:00 午餐',
    code: '道閘密碼: 645504',
    price: '已確認預約 (Chin Yu)',
    desc: '道閘輸入密碼【645504】進場停餐廳專屬車位，保管 Ticket，離場機器刷付 10€ 通行費。',
    actionText: '📍 Google 導航',
    actionUrl: 'https://www.google.com/maps/search/?api=1&query=La+Ferme+Saint-Michel+Mont+Saint-Michel',
    isCopyable: true,
    copyValue: '645504'
  },
  {
    name: 'SNCF 高鐵 TGV (巴黎蒙帕納斯 ➔ 雷恩)',
    type: '火車車票',
    date: '9/25 (五) 06:48 - 08:15',
    code: '訂位代碼: 4WCP2R',
    price: '€68.00 (2人票・已購)',
    desc: '06:48 Paris Montparnasse 準時發車，08:15 抵達 Rennes 雷恩站準備取車。',
    actionText: '查看車票截圖',
    actionUrl: 'data/SNCF_ticket_9_25.png',
    isCopyable: true,
    copyValue: '4WCP2R'
  },
  {
    name: 'Sixt 諾曼第自駕租車 (Peugeot 3008 休旅)',
    type: '租車憑證',
    date: '9/25 08:30 雷恩取 ➔ 9/30 18:00 迪士尼還',
    code: '訂單代碼: 9738701348',
    price: '€624.46 (零自付全險・已付清)',
    desc: '雷恩 Effia 停車場 0 樓電梯輸入密碼【6060】上 7 樓取車。9/30 Chessy 還車。',
    actionText: '撥打 Sixt 專線',
    actionUrl: 'tel:+33170976111',
    isCopyable: true,
    copyValue: '9738701348'
  },
  {
    name: '聖米歇爾山修道院門票 (Abbaye)',
    type: '景點門票',
    date: '9/26 (六) 09:00 第一批入場',
    code: 'KKday 當場手機買即可',
    price: '即買即出電子票',
    desc: '無需提前綁死時段，當場以手機在 KKday 線上直接購買，掃描 QR Code 快速通關！',
    actionText: '🛒 KKday 即買即用',
    actionUrl: 'https://www.kkday.com/zh-tw/product/249775?cid=2298',
    isCopyable: false
  }
];

// ==========================================
// 4. 私房店家與靈感口袋名單 (Pocket Places)
// ==========================================
const pocketPlacesData = [
  {
    name: 'Le Procope (普羅可布咖啡館)',
    city: '巴黎 6 區 (左岸)',
    category: 'food',
    catLabel: '☕ 傳奇百年法餐',
    specialty: '全巴黎最古老咖啡館(1686年)・拿破崙帽子真跡・傳統油封鴨/生蠔拼盤',
    address: '13 Rue de l\'Ancienne Comédie, 75006 Paris',
    hours: '12:00 - 00:00 (全年無休)',
    mapUrl: 'https://maps.app.goo.gl/dy5QtARPd9ZAst1B9',
    note: '伏爾泰/盧梭/拿破崙常客・左岸文藝歷史殿堂'
  },
  {
    name: 'Pink Mamma',
    city: '巴黎 9 區 (歌劇院/蒙馬特)',
    category: 'food',
    catLabel: '🍝 絕美玻璃花房',
    specialty: '頂樓玻璃溫室花房採光極美・招牌現刨松露手工麵・佛羅倫斯大牛排・巨盆提拉米蘇',
    address: '20bis Rue de Douai, 75009 Paris',
    hours: '12:00-14:30, 18:45-22:45',
    mapUrl: 'https://maps.app.goo.gl/WPyntVFKJbjxni5h9',
    note: 'IG爆紅四層樓網美名店・建議提早官網預約頂樓 Glass Roof'
  },
  {
    name: 'Marché aux Huîtres Cancale (生蠔市場)',
    city: '布列塔尼 (康卡勒)',
    category: 'seafood',
    catLabel: '🦪 產地現開生蠔',
    specialty: '產地現開 1-4 號新鮮生蠔・野生海膽・蠔殼直接丟回海灘',
    address: 'Place de la Chapelle, 35260 Cancale',
    hours: '09:00 - 19:00 (每日營業)',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Marche+aux+Huitres+Cancale',
    note: '坐在堤防邊看海現擠檸檬吃生蠔・銅板價神級享受'
  },
  {
    name: 'Maison Georges Larnicol',
    city: '布列塔尼 (聖馬洛)',
    category: 'coffee',
    catLabel: '🥐 百年焦糖奶油酥',
    specialty: 'Kouign-amann 焦糖奶油酥・法式蛋白霜・精緻手工黑巧克力',
    address: '6 Rue Saint-Vincent, 35400 Saint-Malo',
    hours: '09:00 - 19:30',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Maison+Georges+Larnicol+Saint-Malo',
    note: 'MOF 法國最佳工藝師名店・聖馬洛古城必買伴手禮'
  },
  {
    name: 'La Couronne 1345',
    city: '諾曼第 (盧昂)',
    category: 'food',
    catLabel: '🥩 全法最古老餐廳',
    specialty: '全法最古老小酒館(創於1345年)・傳統諾曼第燉肉・蘋果白蘭地',
    address: '31 Place du Vieux-Marché, 76000 Rouen',
    hours: '12:00-14:00, 19:00-22:00',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Couronne+Rouen',
    note: '✅ 9/27 20:00 已預約 (TheFork ID: 790B-8602-147D-CA61)'
  },
  {
    name: 'Confiserie Jeanne d\'Arc',
    city: '諾曼第 (盧昂)',
    category: 'market',
    catLabel: '🍬 百年特產蘋果糖',
    specialty: '盧昂特產「糖蘋果 (Sucre de Pomme)」・焦糖奶油糖',
    address: '43 Rue Rollon, 76000 Rouen',
    hours: '09:30 - 19:00 (週日一休)',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Confiserie+Jeanne+d+Arc+Rouen',
    note: '諾曼第歷史最悠久蘋果糖老店・伴手禮首選'
  },
  {
    name: 'Restaurant Baudy',
    city: '諾曼第 (吉維尼)',
    category: 'food',
    catLabel: '🍷 百年玫瑰花園',
    specialty: '蘋果酒燉豬肉・法式鹹派・百年玫瑰花園露天座',
    address: '81 Rue Claude Monet, 27620 Giverny',
    hours: '11:45-15:00, 19:00-21:30 (週一休)',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurant+Baudy+Giverny',
    note: '昔日塞尚、雷諾瓦、羅丹等印象派大師聚會老店'
  },
  {
    name: 'Vieux Moulin de Vernon (懸空老磨坊)',
    city: '諾曼第 (韋爾農)',
    category: 'photo',
    catLabel: '📸 塞納河斷橋磨坊',
    specialty: '建在中世紀斷橋殘墩上的木造懸空古磨坊・莫內多幅名畫本尊',
    address: 'Rue Pierre Bonnard, 27200 Vernon',
    hours: '全天開放 (戶外觀景)',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vieux+Moulin+de+Vernon',
    note: '塞納河畔絕美倒影拍照機位'
  },
  {
    name: 'Café de Flore (花神咖啡館)',
    city: '巴黎 6 區 (左岸)',
    category: 'coffee',
    catLabel: '☕ 左岸靈魂咖啡',
    specialty: '雙蛋火腿可頌・濃郁熱巧克力・綠色露天座看巴黎街景',
    address: '172 Bd Saint-Germain, 75006 Paris',
    hours: '07:30 - 01:30',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+de+Flore+Paris',
    note: '薩特與西蒙波娃故居・巴黎文化地標'
  },
  {
    name: 'Marché d\'Aligre (阿利格爾市集)',
    city: '巴黎 12 區 (巴士底周邊)',
    category: 'market',
    catLabel: '🛍️ 在地百年跳蚤市集',
    specialty: '露天蔬果・起司冷肉熟食・二手古董首飾與黑膠唱片',
    address: 'Place d\'Aligre, 75012 Paris',
    hours: '07:30 - 13:30 (週一休)',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Marche+d+Aligre+Paris',
    note: '巴黎在地人最愛百年市集・生活感十足'
  }
];

// ==========================================
// 5. 狀態管理與變數
// ==========================================
let currentSelectedDate = '9/26'; // 預設聚焦自駕高光日 (可自由切換)
let currentTab = 'timeline';

// ==========================================
// 6. 核心渲染函數
// ==========================================

// (1) 渲染橫向日期膠囊
function renderDateCarousel() {
  const container = document.getElementById('dateCarousel');
  if (!container) return;

  container.innerHTML = itineraryData.map(day => {
    const isActive = day.date === currentSelectedDate ? 'active' : '';
    const hasBooking = day.keynote && day.keynote.code ? 'has-booking' : '';
    return `
      <div class="date-pill ${isActive} ${hasBooking}" data-date="${day.date}">
        <span class="pill-weekday">${day.weekday}</span>
        <span class="pill-day">${day.date}</span>
        <span class="pill-badge-dot"></span>
      </div>
    `;
  }).join('');

  // 綁定點擊事件
  container.querySelectorAll('.date-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const selectedDate = pill.getAttribute('data-date');
      selectDate(selectedDate);
    });
  });
}

// (2) 選擇指定日期
function selectDate(dateStr) {
  currentSelectedDate = dateStr;

  // 更新膠囊樣式並滾動居中
  const pills = document.querySelectorAll('.date-pill');
  pills.forEach(pill => {
    if (pill.getAttribute('data-date') === dateStr) {
      pill.classList.add('active');
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      pill.classList.remove('active');
    }
  });

  // 切換至每日行程頁
  switchTab('timeline');

  // 重新渲染今日高光膠囊與時間軸
  renderKeynoteCard(dateStr);
  renderTimeline(dateStr);
}

// (3) 渲染今日即時重點高光膠囊
function renderKeynoteCard(dateStr) {
  const container = document.getElementById('keynoteCard');
  if (!container) return;

  const day = itineraryData.find(d => d.date === dateStr) || itineraryData[0];
  const keynote = day.keynote;

  container.innerHTML = `
    <div class="keynote-header">
      <span class="keynote-badge">📌 ${day.date} (${day.weekday}) 當日焦點</span>
      <span class="keynote-countdown">${day.tag}</span>
    </div>
    <h2 class="keynote-title">${day.title}</h2>
    <p class="keynote-summary">${day.summary}</p>
    
    <div class="keynote-grid">
      <div class="keynote-pill">
        <span class="pill-label">${keynote.codeLabel || '重要代碼/密碼'}</span>
        <div class="pill-value">
          <span class="code-highlight">${keynote.code}</span>
          ${keynote.code ? `<button class="btn-copy-mini" onclick="copyToClipboard('${keynote.code.replace(/[^a-zA-Z0-9]/g, '')}', '${keynote.codeLabel}')">複製</button>` : ''}
        </div>
      </div>

      <div class="keynote-pill">
        <span class="pill-label">今晚入住飯店</span>
        <div class="pill-value" style="font-size: 0.82rem; line-height: 1.2;">
          <span>${keynote.hotel}</span>
        </div>
      </div>

      <div class="keynote-pill keynote-pill-full">
        <span class="pill-label">核心目標與導航</span>
        <div class="pill-value" style="font-size: 0.85rem;">
          <span>${keynote.spot}</span>
        </div>
      </div>
    </div>

    <div class="keynote-actions">
      ${keynote.mapQuery ? `
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(keynote.mapQuery)}" target="_blank" class="btn-action-primary">
          <span>📍 Google 導航</span>
        </a>
      ` : ''}
      <button class="btn-action-secondary" onclick="switchTab('vault')">
        <span>🏨 查看訂房憑證</span>
      </button>
    </div>
  `;
}

// (4) 渲染時間軸卡片列表
function renderTimeline(dateStr, searchKeyword = '') {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  let daysToRender = [];
  if (searchKeyword.trim()) {
    // 搜尋模式：列出符合關鍵字的所有項目
    const kw = searchKeyword.toLowerCase();
    itineraryData.forEach(day => {
      const matchedItems = day.items.filter(item => 
        item.title.toLowerCase().includes(kw) || 
        item.desc.toLowerCase().includes(kw) ||
        (day.keynote && day.keynote.code && day.keynote.code.toLowerCase().includes(kw))
      );
      if (matchedItems.length > 0 || day.title.toLowerCase().includes(kw)) {
        daysToRender.push({ ...day, items: matchedItems.length > 0 ? matchedItems : day.items });
      }
    });
  } else {
    // 單日模式
    const day = itineraryData.find(d => d.date === dateStr);
    if (day) daysToRender.push(day);
  }

  if (daysToRender.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <p style="font-size: 2rem; margin-bottom: 8px;">🔍</p>
        <p>找不到符合「${searchKeyword}」的行程或憑證</p>
      </div>
    `;
    return;
  }

  container.innerHTML = daysToRender.map(day => `
    <div class="timeline-header-card">
      <div class="th-date-row">
        <span class="th-date-title">${day.date} (${day.weekday}) · ${day.title}</span>
        <span class="th-tag">${day.tag}</span>
      </div>
      <p class="th-summary">${day.summary}</p>
    </div>

    <div class="timeline-list">
      ${day.items.map(item => `
        <div class="timeline-item">
          <div class="tl-bullet">⏱</div>
          <div class="tl-content-card">
            ${item.time ? `<span class="tl-time-badge">${item.time}</span>` : ''}
            <h3 class="tl-title">${item.title}</h3>
            <p class="tl-desc">${item.desc}</p>
            
            ${item.badges && item.badges.length > 0 ? `
              <div class="tl-badges-row">
                ${item.badges.map(b => {
                  let cls = 'status-info';
                  if (b.includes('已預約') || b.includes('已購') || b.includes('✅')) cls = 'status-ok';
                  if (b.includes('密碼') || b.includes('代碼') || b.includes('645504') || b.includes('6060')) cls = 'code-tag';
                  if (b.includes('注意') || b.includes('需約') || b.includes('自備')) cls = 'status-warn';
                  return `<span class="badge-pill ${cls}">${b}</span>`;
                }).join('')}
              </div>
            ` : ''}

            ${item.map ? `
              <div class="tl-action-bar">
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}" target="_blank" class="btn-tl-mini">
                  <span>📍 開啟導航</span>
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `).join('<div style="margin: 28px 0; border-bottom: 1px dashed var(--border-subtle);"></div>');
}

// (5) 渲染住宿與憑證金庫
function renderHotelVault() {
  const container = document.getElementById('hotelVaultGrid');
  if (!container) return;

  container.innerHTML = hotelsData.map(hotel => `
    <div class="vault-ticket-card ${hotel.highlight ? 'highlight' : ''}">
      <div class="vault-card-header">
        <div>
          <h3 class="vault-hotel-name">${hotel.name}</h3>
          <span style="font-size: 0.78rem; color: var(--gold);">${hotel.city}</span>
        </div>
        <span class="vault-date-badge">${hotel.payment}</span>
      </div>

      <div class="vault-info-row">
        <span>入住時段：</span>
        <strong>${hotel.dates}</strong>
      </div>
      <div class="vault-info-row">
        <span>入住 / 退房時間：</span>
        <span>Check-in: ${hotel.checkin} ｜ Check-out: ${hotel.checkout}</span>
      </div>
      <div class="vault-info-row">
        <span>預訂金額：</span>
        <span>${hotel.price}</span>
      </div>

      ${hotel.code ? `
        <div class="vault-code-box">
          <span class="code-title">訂單代碼 / 訂房編號</span>
          <span class="code-text">${hotel.code}</span>
          ${hotel.code !== '待預訂' && hotel.code !== '待確認訂房代碼' ? `
            <button class="btn-copy-mini" onclick="copyToClipboard('${hotel.code}', '訂房代碼')">複製</button>
          ` : ''}
        </div>
      ` : ''}

      <div class="vault-info-row" style="margin-top: 8px;">
        <span>地址：</span>
        <span>${hotel.address}</span>
      </div>

      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + hotel.address)}" target="_blank" class="btn-tl-mini" style="flex: 1; justify-content: center;">
          <span>📍 導航至飯店</span>
        </a>
        ${hotel.phone ? `
          <a href="tel:${hotel.phone.replace(/[^0-9+]/g, '')}" class="btn-tl-mini" style="flex: 1; justify-content: center;">
            <span>📞 撥打電話</span>
          </a>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// (6) 渲染票券與憑證金庫
function renderTicketVault() {
  const container = document.getElementById('ticketVaultGrid');
  if (!container) return;

  container.innerHTML = ticketsData.map(ticket => `
    <div class="vault-ticket-card highlight">
      <div class="vault-card-header">
        <div>
          <h3 class="vault-hotel-name">${ticket.name}</h3>
          <span style="font-size: 0.78rem; color: var(--purple-monet);">${ticket.type}</span>
        </div>
        <span class="badge-pill status-ok">${ticket.price}</span>
      </div>

      <div class="vault-info-row">
        <span>適用日期：</span>
        <strong>${ticket.date}</strong>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-muted); margin: 6px 0;">${ticket.desc}</p>

      ${ticket.code ? `
        <div class="vault-code-box">
          <span class="code-title">憑證編號 / 專屬代碼</span>
          <span class="code-text" style="font-size: 0.95rem;">${ticket.code}</span>
          ${ticket.isCopyable ? `
            <button class="btn-copy-mini" onclick="copyToClipboard('${ticket.copyValue}', '憑證代碼')">複製</button>
          ` : ''}
        </div>
      ` : ''}

      <div style="margin-top: 10px;">
        <a href="${ticket.actionUrl}" target="_blank" class="btn-action-primary" style="padding: 8px 14px; font-size: 0.82rem; width: 100%;">
          <span>${ticket.actionText}</span>
        </a>
      </div>
    </div>
  `).join('');
}

// (7) 渲染私房口袋名單
function renderPocketPlaces(filterCategory = 'all') {
  const container = document.getElementById('pocketCardGrid');
  if (!container) return;

  const filtered = filterCategory === 'all' 
    ? pocketPlacesData 
    : pocketPlacesData.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(place => `
    <div class="pocket-card">
      <div class="pocket-card-top">
        <div>
          <h3 class="pocket-name">${place.name}</h3>
          <span style="font-size: 0.75rem; color: var(--text-dim);">${place.city}</span>
        </div>
        <span class="pocket-category">${place.catLabel}</span>
      </div>

      <p class="pocket-specialty">⭐ 招牌必點：${place.specialty}</p>
      <div class="pocket-address">📍 ${place.address}</div>
      <div class="pocket-hours">🕒 營業：${place.hours}</div>

      <div class="pocket-footer">
        <span class="pocket-note">${place.note}</span>
        <a href="${place.mapUrl}" target="_blank" class="btn-action-primary" style="padding: 6px 12px; font-size: 0.78rem;">
          <span>📍 Google 導航</span>
        </a>
      </div>
    </div>
  `).join('');
}

// (8) 底部導覽切換
function switchTab(tabId) {
  currentTab = tabId;

  // 更新導覽列狀態
  document.querySelectorAll('.nav-tab-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 切換視圖容器
  document.querySelectorAll('.tab-view').forEach(view => {
    if (view.id === `view-${tabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// (9) 一鍵複製並彈出 Toast
function copyToClipboard(text, name = '內容') {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✅ 已複製【${text}】(${name})`);
  }).catch(() => {
    showToast(`✅ 已複製【${text}】`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// (10) 深淺色主題切換
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  
  const btn = document.getElementById('btnToggleTheme');
  if (btn) btn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  
  localStorage.setItem('france_theme', newTheme);
}

// ==========================================
// 7. 初始化與事件監聽
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 讀取主題紀錄
  const savedTheme = localStorage.getItem('france_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('btnToggleTheme');
  if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  // 渲染各模組
  renderDateCarousel();
  renderKeynoteCard(currentSelectedDate);
  renderTimeline(currentSelectedDate);
  renderHotelVault();
  renderTicketVault();
  renderPocketPlaces('all');

  // 綁定底部導覽點擊
  document.querySelectorAll('.nav-tab-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // 綁定主題切換按鈕
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // 綁定搜尋切換與即時輸入
  const searchToggleBtn = document.getElementById('btnToggleSearch');
  const searchDrawer = document.getElementById('searchDrawer');
  const searchInput = document.getElementById('searchInput');

  if (searchToggleBtn && searchDrawer) {
    searchToggleBtn.addEventListener('click', () => {
      searchDrawer.classList.toggle('active');
      if (searchDrawer.classList.contains('active')) {
        searchInput.focus();
      } else {
        searchInput.value = '';
        renderTimeline(currentSelectedDate);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value;
      switchTab('timeline');
      renderTimeline(currentSelectedDate, keyword);
    });
  }

// ==========================================
// 0. 特定人士授權白名單與門禁 (Access Control)
// ==========================================
const ALLOWED_EMAILS = [
  'skunkqq@gmail.com',
  'sasadako.wu@gmail.com'
];
const PASSCODE = '2026';

function checkAuthStatus() {
  const savedAuth = localStorage.getItem('france_auth_user');
  const overlay = document.getElementById('accessGateOverlay');
  const badge = document.getElementById('userAuthBadge');
  
  if (savedAuth && ALLOWED_EMAILS.includes(savedAuth.toLowerCase().trim())) {
    if (overlay) overlay.classList.add('unlocked');
    if (badge) {
      badge.classList.add('show');
      const nickname = savedAuth.includes('skunkqq') ? 'Chin Yu' : 'Sadako';
      badge.textContent = `👤 ${nickname}`;
    }
  } else {
    if (overlay) overlay.classList.remove('unlocked');
    if (badge) badge.classList.remove('show');
  }
}

function selectQuickEmail(email) {
  const input = document.getElementById('gateEmailInput');
  if (input) input.value = email;
}

function handleAccessSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('gateEmailInput');
  const passcodeInput = document.getElementById('gatePasscodeInput');
  const errorMsg = document.getElementById('gateErrorMsg');
  
  const email = emailInput ? emailInput.value.toLowerCase().trim() : '';
  const passcode = passcodeInput ? passcodeInput.value.trim() : '';
  
  if (!ALLOWED_EMAILS.includes(email)) {
    if (errorMsg) errorMsg.textContent = '❌ 存取受限：此 Email 未在專屬受邀白名單中';
    return;
  }
  
  if (passcode !== PASSCODE) {
    if (errorMsg) errorMsg.textContent = '❌ 通關密碼錯誤，請輸入 2026';
    return;
  }
  
  // 驗證成功
  localStorage.setItem('france_auth_user', email);
  if (errorMsg) errorMsg.textContent = '';
  
  const overlay = document.getElementById('accessGateOverlay');
  if (overlay) overlay.classList.add('unlocked');
  
  const nickname = email.includes('skunkqq') ? 'Chin Yu' : 'Sadako';
  const badge = document.getElementById('userAuthBadge');
  if (badge) {
    badge.classList.add('show');
    badge.textContent = `👤 ${nickname}`;
  }
  
  showToast(`✨ Bienvenue, ${nickname}! 旅程已解鎖`);
}

function lockApp() {
  localStorage.removeItem('france_auth_user');
  const overlay = document.getElementById('accessGateOverlay');
  const badge = document.getElementById('userAuthBadge');
  if (overlay) overlay.classList.remove('unlocked');
  if (badge) badge.classList.remove('show');
  showToast('🔒 已鎖定網站');
}

  // 初始化時檢查身分驗證
  checkAuthStatus();

  // 綁定鎖定按鈕
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', lockApp);
  }

  // 綁定私房口袋名單 Filter Chip
  const pocketFilterBtns = document.querySelectorAll('.filter-chip');
  pocketFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pocketFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderPocketPlaces(cat);
    });
  });
});
