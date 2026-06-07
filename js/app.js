document.addEventListener('DOMContentLoaded', () => {
  // ===== Google 試算表發佈網址 =====
  const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKsRU4MxrVDOZOUosa5bUMDZG8w9kHqy_iPEKrGD6dB9Q_8SJcfPr7pT9hVLXJuUXbO6Z0o0TsX5Ns/pub?output=csv';

  // ===== 狀態管理與防錯處理 =====
  let initialNotes = JSON.parse(localStorage.getItem('franceTripNotes'));
  if (!Array.isArray(initialNotes)) initialNotes = [];

  let initialTodos = JSON.parse(localStorage.getItem('franceTripTodos'));
  if (!Array.isArray(initialTodos)) initialTodos = [];

  const state = {
    notes: initialNotes,
    todos: initialTodos
  };

  function saveTodos() {
    localStorage.setItem('franceTripTodos', JSON.stringify(state.todos));
  }

  // ===== 行程資料 (預設 Fallback 行程 - 與最新試算表對齊) =====
  let itineraryData = [
    { date: '9/15', time: '23:30', location: '桃園', type: 'transit', desc: '準備出發，飛往巴黎', detail: '記得攜帶護照、網卡、轉接頭。建議提前 3 小時抵達機場。' },
    { date: '9/16', time: '07:55', location: '戴高樂', type: 'transit', desc: '抵達戴高樂，前往購物村', detail: '辦理入境手續、領取行李，購買交通票券或加值。第一晚入住 Zenitude Hôtel-Résidences Chessy，下午逛河谷購物村 (La Vallée Village)。' },
    { date: '9/17', location: '迪士尼', type: 'disney', desc: '迪士尼雙園遊玩', detail: '入住 Zenitude Hôtel-Résidences Chessy (第 2 晚)。建議下載 Disneyland Paris App 掌握排隊時間，預約餐廳。晚上別錯過煙火與無人機燈光秀！💡可對照後半部「四、 巴黎迪士尼限定法國製紀念品」清單去精品商店尋寶！' },
    { date: '9/18', location: '迪士尼', type: 'disney', desc: '迪士尼雙園 ➔ 巴黎市區', detail: '入住 Zenitude Hôtel-Résidences Chessy (第 3 晚)。繼續攻略未完成的設施或看遊行，可到專屬商店尋找法國製聯名小物。傍晚返回巴黎市區辦理入住。' },
    { date: '9/19', location: '巴黎', type: 'paris', desc: '巴黎市區觀光 (通票Day1)', detail: '初探巴黎，博物館通票六天開通第一天！可安排羅浮宮、塞納河畔漫步或艾菲爾鐵塔。' },
    { date: '9/20', location: '巴黎', type: 'paris', desc: '巴黎深度遊 (通票Day2)', detail: '使用博物館通票。可安排奧塞美術館、蒙馬特高地、聖心堂。' },
    { date: '9/21', location: '巴黎', type: 'paris', desc: '巴黎深度遊 (通票Day3)', detail: '使用博物館通票。可安排凱旋門、香榭麗舍大道、精品購物。' },
    { date: '9/22', location: '巴黎', type: 'paris', desc: '巴黎深度遊 (通票Day4)', detail: '使用博物館通票。可安排瑪黑區特色小店、龐畢度中心。' },
    { date: '9/23', location: '巴黎', type: 'paris', desc: '巴黎 ➔ 諾曼地/凡爾賽一日遊', detail: '使用博物館通票。上：凡爾賽宮 莫內花園 盧昂 埃特爾塔 諾曼地。凡爾賽宮一日遊，感受皇家奢華。' },
    { date: '9/24', location: '巴黎', type: 'paris', desc: '巴黎 ➔ 羅亞爾河城堡一日遊', detail: '使用博物館通票。下：楓丹白露 香波爾城堡 子爵。晚上住蒙帕納斯車站附近，以利明早搭車。' },
    { date: '9/25', location: '聖馬洛', type: 'michel', desc: '🟢 Day1 高鐵直達海盜古城，慢活探索首日', detail: '🚄 <strong>SNCF 跨城火車 (Paris Montparnasse ➔ Rennes)</strong><br>• 班次：✅ <strong>已訂票 06:48</strong> (訂位代碼：<strong>4WCP2R</strong>，2 人共 68.00 €)<br>• 08:00 抵達雷恩後直接轉乘 TER 火車前往聖馬洛。<br><br>💡 <strong>今日行程規劃：</strong><br>• 09:00 - 12:00：抵達聖馬洛寄放行李，登上壯觀的舊城牆 (Les Remparts) 欣賞翡翠海岸無敵海景。<br>• 12:00 - 14:00：悠閒午餐，在舊城區小巷找薄餅店品嚐蕎麥煎餅與蘋果酒 (Cidre)。<br>• 14:00 之後：逛舊城區 (Intra-Muros) 石板路弄，若逢退潮可由沙灘徒步至大貝島 (Grand Bé)。<br><br><strong>🌊 今日潮汐資訊 (9/25)</strong><br>🔸 滿潮 (Pleine mer)：07:08、19:26 (大潮係數 77/82)<br>🔹 乾潮 (Basse mer)：01:34、13:54' },
    { date: '9/26', location: '聖米歇爾', type: 'michel', desc: '🟢 Day2 取車出發 ➔ 康卡勒生蠔 ➔ 聖米歇爾山', detail: '🚗 <strong>今日自駕取車與停車全攻略：</strong><br>• 09:30 - 10:15：散步至聖馬洛火車站租車櫃檯取車。⚠️ <strong>週六取車最安全</strong>，SIXT、Avis 等週六正常營業（週日多全面公休）。若想回舊城晃晃，請停 <strong>Parking Paul Féval</strong>（含全車人免費接駁車票）。<br><br>🚗 <strong>康卡勒停車密技：</strong><br>• 直接導航海堤附近的 <strong>Place de la République</strong> 或 <strong>Port de la Houle</strong>。<br>• 若海堤車位滿了，往山坡開 3 分鐘有社區免費停車場，再走路下坡到生蠔市集。<br><br>🚗 <strong>聖米歇爾山停車密技（重要！）：</strong><br>• 絕對不要直接跟著導航走。抵達外圍閘門時，走 <strong>「Hôtels / Résidents」專用車道</strong>，輸入飯店給的 <strong>6 位數 Code</strong>，欄杆升起後停進 <strong>P3 專用停車場</strong>，再換乘免費接駁車進山。<br><br>💡 <strong>今日行程：</strong><br>• 10:30 - 13:00：康卡勒現開生蠔（週末照常營業）。<br>• 14:00 之後：參觀聖山頂部修道院，傍晚等待聖山點燈。<br>• 🛒 <strong>重要防呆：</strong>傍晚務必找大型超市 (Carrefour/E.Leclerc) 買齊礦泉水、水果、零食！明天週日超市下午 12:30 後全面公休。<br><br><strong>🌊 今日潮汐資訊 (9/26)</strong><br>🔸 滿潮 (Pleine mer)：07:45、20:02 (大潮係數 87/92)<br>🔹 乾潮 (Basse mer)：02:15、14:35' },
    { date: '9/27', location: '翁夫勒', type: 'michel', desc: '🟡 Day3 最美半木屋童話村 ➔ 印象派明信片港口', detail: '🚗 <strong>今日自駕與停車全攻略：</strong><br>• 早上 10:00 出發，開車 1.5 小時至奧日地區伯夫龍，再 45 分鐘至翁夫勒。<br><br>🚗 <strong>翁夫勒停車密技：</strong><br>• 舊港周邊是<strong>單行道地獄</strong>，切勿硬鑽。請直接導航 <strong>Parking du Centre (Plage)</strong> 或 <strong>Parking de l\'Est</strong> 大型露天停車場，步行 5 分鐘到港區，省去 20 分鐘冤枉路。<br><br>💡 <strong>今日行程：</strong><br>• 11:30 - 13:00：造訪彩色半木構造法國最美村莊【奧日地區伯夫龍 Beuvron-en-Auge】。💡 <strong>週日用餐提醒：</strong>部分餐廳週日公休或只開中午，抵達請立刻先點餐！<br>• 13:00 - 13:45：輕鬆開車前往翁夫勒（車程約 45 分鐘）。<br>• 14:00 之後：翁夫勒舊港 (Vieux Bassin) 慢活午後，藝術畫廊週日正常營業，夜晚在港邊賞帆船倒影、享用諾曼第海鮮晚餐。' },
    { date: '9/28', location: '維爾農', type: 'paris', desc: '🟠 Day4 巨象斷崖 ➔ 魯昂大教堂（避開血拼） ➔ 維爾農老水車', detail: '🚗 <strong>今日自駕路線：翁夫勒→諾曼第大橋→埃特雷塔(45分)→魯昂(1h15m)→維爾農(1h)</strong><br><br>🚗 <strong>埃特雷塔停車密技：</strong><br>• 首選 <strong>Parking de la Falaise d\'Aval</strong>（走上去就是西側斷崖），但通常 09:30 前就全滿。<br>• 若已滿，不要在小鎮裡繞，立刻果斷改停 <strong>Parking du Grand Val</strong>（車位較多），步行 15 分鐘到海邊。<br><br>🚗 <strong>魯昂停車密技：</strong><br>• 直接導航地下停車場 <strong>Parking Indigo Rouen Cathédrale</strong> 或 <strong>Parking Espace Palais</strong>，電梯上來直接就是舊城區心臟。<br><br>💡 <strong>今日行程：</strong><br>• 09:45 - 12:30：埃特雷塔 (Étretat) 白堊斷崖漫步，爬上斷崖頂端體驗莫內寫生視野。<br>• 13:45 - 16:00：魯昂聖母大教堂（莫內名畫主角）+ 大時鐘 (Gros-Horloge)。⚠️ <strong>週一效應：</strong>獨立小店/甜點店多公休，純觀光不購物。<br>• 💡 <strong>晚餐注意：</strong>很多餐廳週一、週二雙休，請提前 Google Maps 確認並訂位。<br>• 傍晚至維爾農，在塞納河畔漫步遠眺老水車。' },
    { date: '9/29', location: '巴黎', type: 'paris', desc: '🔵 Day5 莫內睡蓮名畫實景 ➔ 巴黎西郊無痛還車', detail: '💡 <strong>今日行程：</strong><br>• 10:00 - 12:30：【壓軸亮點：吉維尼莫內之家與花園】🟢 <strong>最棒的拍照日：</strong>週二早上人少、不含週末觀光團。請提前 1-2 個月在官網預約 <strong>10:00 入場電子票 (e-ticket)</strong>，現場不售票。欣賞日本橋、睡蓮池、莫內故居。<br>• 12:30 - 14:30：吉維尼小鎮法式午餐與咖啡。<br>• 14:30 - 16:00：開車約 1 小時至拉德芳斯。<br>• ⚠️ <strong>國道繳費防呆 (Flux Libre 新制)：</strong>開過 A13 高速公路後，務必於 72 小時內上網 <strong>(sanef.com)</strong> 輸入車牌繳費，否則回國收高額罰單！<br><br>🚗 <strong>拉德芳斯還車密技（重要！）：</strong><br>• 拉德芳斯是 3D 立體地下迷宮。請認清合約上的還車停車場名稱（如 <strong>Parking Centre / Westfield Les 4 Temps</strong>）。<br>• 接近拉德芳斯時，眼睛盯著路上的 <strong>「Retour Location / Car Rental Return」</strong>，跟著地下專用車道走。開錯層數導航會斷訊！<br>• 還車後在原地轉乘<strong>地鐵 1 號線或 RER A 線</strong>進巴黎市中心，完美收官！' },
    { date: '9/30', location: '巴黎', type: 'paris', desc: '巴黎慢活自由行', detail: '保留彈性的空白天，漫步巴黎街角。' },
    { date: '10/1', location: '巴黎', type: 'paris', desc: '巴黎深度遊', detail: '拉丁區、萬神殿、盧森堡公園、花神咖啡館。' },
    { date: '10/2', location: '巴黎', type: 'paris', desc: '巴黎深度遊', detail: '塞納河畔漫步、左岸咖啡、莎士比亞書店。' },
    { date: '10/3', location: '巴黎', type: 'paris', desc: '巴黎深度遊', detail: '塞納河遊船晚餐，欣賞巴黎閃耀夜景。' },
    { date: '10/4', location: '巴黎', type: 'paris', desc: '巴黎深度遊', detail: '自由活動，體驗 Picard 冷凍食品或逛當地市集。' },
    { date: '10/5', location: '巴黎', type: 'paris', desc: '巴黎最後巡禮', detail: '確認行李重量，整理退稅單據。最後的美食饗宴。' },
    { date: '10/6', time: '11:20', location: '戴高樂', type: 'transit', desc: '前往機場準備搭機', detail: '建議提前 4 小時抵達機場辦理退稅手續，排隊人潮通常很多。' },
    { date: '10/7', time: '06:40', location: '桃園', type: 'transit', desc: '平安抵達台灣', detail: '旅途結束，帶著滿滿的回憶回家！' }
  ];


  // ===== 旅遊小撇步資料 (含解析資料) =====
  const tipsData = {
    '交通與通訊': [
      { icon: '🎫', title: '交通票券 (Navigo)', content: 'Navigo 週卡 (22.8歐+卡費5歐) 可無限搭乘1-5圈，需自備1吋大頭照。加值時間為週一至四，週末買青年票。另有 Navigo Easy 可用手機加值。' },
      { icon: '📱', title: '網路與導航', content: '推薦下載 Citymapper，提供詳細地鐵與公車轉乘資訊，並會顯示有無電梯，搬行李必備！' }
    ],
    '自駕與停車': [
      { icon: '🅿️', title: '自駕停車線條標誌', content: '白色虛線+PAYANT：付費停車格，需立刻去路邊Horodateur點單機買時段並將收據置於擋風玻璃內備查。白色虛線+LIVRAISON：卸貨格，週日/國定假日可免費停；雙實線卸貨格則任何時間皆嚴禁停放(會被拖吊)。藍線(Zone Bleue)：限時免費，需放置停車計時轉盤(Disque de stationnement)，租車時可查副駕駛座手套箱。' },
      { icon: '🏢', title: '中大型城市停車策略', content: '中大型城市(如雷恩、魯昂、拉德芳斯)路邊車位難停且有限停 2 小時規定。強烈建議直接導航搜尋當地的 Indigo 或 EFFIA 連鎖地下停車場，進場抽卡、出場前去自動繳費機(Caisse Auto)刷卡、插卡出場，安全、位置大且不限時。' },
      { icon: '📱', title: '必備停車 App 與繳費', content: '手機下載 EasyPark 或 PayByPhone，路邊停車可線上選時間、扣款與遠端加時，逛街忘我也能遠端延長。⚠️ 自駕 A13 高速公路實施 Flux Libre (無柵欄感應門架)，通過後務必 72 小時內自行上網 (sanef.com) 輸入車牌繳費，否則回國收高額罰單！' }
    ],
    '🚗 諾曼第5天行程停車密技': [
      { icon: '🟢', title: 'Day2｜康卡勒 Cancale 生蠔市集', content: '直接導航海堤附近的 Place de la République 或 Port de la Houle 付費停車格。若靠近海堤的格子滿了，往山坡上開 3 分鐘會有社區的免費公有停車場，再走路下坡到生蠔市集。' },
      { icon: '🟢', title: 'Day2｜聖米歇爾山 Mont Saint-Michel', content: '絕對不要直接跟著導航走！抵達外圍閘門時，走「Hôtels / Résidents」專用車道，在機器輸入飯店給你的 6 位數 Code，欄杆升起後停進靠近接駁車站的 P3 專用停車場，再換乘免費接駁車進山。' },
      { icon: '🟡', title: 'Day3｜翁夫勒 Honfleur 舊港', content: '舊港周邊是單行道地獄，別硬鑽！直接導航 Parking du Centre (Plage) 或 Parking de l\'Est 這兩個露天大型停車場，步行到港區只要 5 分鐘，省去至少 20 分鐘的繞圈冤枉路。' },
      { icon: '🟠', title: 'Day4｜埃特雷塔 Étretat 斷崖', content: '海灘正後方的 Parking de la Falaise d\'Aval 位置最完美，但通常 09:30 前就全滿。如果滿了，不要在小鎮裡繞，立刻果斷右轉開去 Parking du Grand Val（車位較多），步行 15 分鐘到海邊。' },
      { icon: '🟠', title: 'Day4｜魯昂 Rouen 舊城', content: '不要浪費時間在路邊，直接導航地下停車場 Parking Indigo Rouen Cathédrale 或 Parking Espace Palais，電梯上來直接就是舊城區心臟地帶。⚠️ 週一獨立小店/甜點店多公休，純觀光不購物。' },
      { icon: '🔵', title: 'Day5｜拉德芳斯 La Défense 還車', content: '拉德芳斯是個巨大 3D 地下迷宮！認清合約寫的還車停車場名稱（如 Parking Centre / Westfield Les 4 Temps）。接近時眼睛盯著路上的「Retour Location / Car Rental Return」指標，跟著地下專用車道走。一旦開錯層數導航會斷訊！還車後在原地轉地鐵 1 號線或 RER A 線進巴黎。' }
    ],
    '安全與須知': [
      { icon: '💰', title: '安全與防竊', content: '貴重物品不露白，包包拉鍊拉上並往前背。若有陌生人搭訕填問卷或幫忙買票，請直接無視快步走過。' },
      { icon: '🗣️', title: '禮貌用語', content: '開口前務必先說 Bonjour (您好)，服務結束後說 Merci (謝謝)，這在法國是非常重要的基本禮貌！' }
    ],
    '景點與文化': [
      { icon: '🏛️', title: '博物館免費日', content: '每月第一週日多數博物館免費 (如：奧塞、龐畢度)。羅浮宮每週二休館，每月第一週六晚上免費。請提前上官網預約。' }
    ]
  };

  // ===== 美食與景點推薦 (來自解析資料) =====
  const recommendationsData = {
    '平價美食與餐廳': [
      { icon: '🥖', title: 'Au Paradis du Gourmand', content: '冠軍長棍麵包 (1.2歐)、烤雞。地址: 156 rue Raymond Losserand' },
      { icon: '🍲', title: 'La Petite Hostellerie', content: '聖母院旁高CP值餐廳。10歐套餐 (前菜+主餐+甜點)，推洋蔥湯、紅酒燉牛肉。' },
      { icon: '🧊', title: 'Picard 冷凍食品', content: '法國到處都有，大推 Paella Valenciana 海鮮飯 (5.4歐)。' }
    ],
    '人氣海鮮與特色小吃': [
      { icon: '🦐', title: 'Pedra Alta', content: 'CP值極高的葡式海鮮盤 (約48.4歐)，適合2-3人分享，吃不完可打包。' },
      { icon: '🥙', title: 'L\'As du Fallafel', content: '瑪黑區薔薇街的猶太口袋餅，素食丸子口味 (6歐)。' },
      { icon: '🥐', title: 'Pierre Hermé', content: '推薦玫瑰可頌與馬卡龍！(限特定分店，如: 72 Rue Bonaparte)' }
    ],
    '特殊體驗': [
      { icon: '🌊', title: '聖米歇爾山潮汐', content: '已整合 2026 年潮汐表，大潮日有機會看到奇景「Mascaret (潮湧)」。' }
    ]
  };

  // ===== 資料整合紀錄 =====
  const dataRegistry = [
    { file: 'st_michel_tide_2026.pdf', url: 'data/st_michel_tide_2026.pdf', added: '2026-04-26', integrated: '2026-04-26', summary: '聖米歇爾山 2026 潮汐表與大潮資訊' },
    { file: 'rennes_st_michel_bus_2026.pdf', url: 'data/rennes_st_michel_bus_2026.pdf', added: '2026-04-26', integrated: '2026-04-26', summary: '2026 年雷恩與聖米歇爾山接駁巴士時刻表' },
    { file: 'SNCF_ticket_9_25.png', url: 'data/SNCF_ticket_9_25.png', added: '2026-04-26', integrated: '2026-04-26', summary: 'SNCF 跨城火車票訂票憑證 (巴黎 ➔ 雷恩)：06:48 出發，訂位代碼 4WCP2R' },
    { file: 'paris_safety_tips.jpg', url: 'data/paris_safety_tips.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '巴黎旅遊禮儀與安全防竊守則' },
    { file: 'paris_food_cheap.jpg', url: 'data/paris_food_cheap.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '平價美食: 冠軍麵包店、Picard、Top Sushi' },
    { file: 'paris_food_hostellerie.jpg', url: 'data/paris_food_hostellerie.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '平價餐廳: La Petite Hostellerie (聖母院旁)' },
    { file: 'paris_food_popular.jpg', url: 'data/paris_food_popular.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '人氣餐廳: OSMOZ, Leon 淡菜, Pedra Alta, 可麗餅' },
    { file: 'paris_dessert_must_eat.jpg', url: 'data/paris_dessert_must_eat.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '必吃點心: L\'As du Fallafel, Pierre Herme' },
    { file: 'paris_museum_hours.jpg', url: 'data/paris_museum_hours.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '巴黎各大博物館營業時間與免費參觀日整理' },
    { file: 'paris_navigo_pass.jpg', url: 'data/paris_navigo_pass.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '交通攻略: Navigo Pass 週卡使用規則與範圍' },
    { file: 'paris_transit_tips.jpg', url: 'data/paris_transit_tips.jpg', added: '2026-04-10', integrated: '2026-04-26', summary: '交通攻略: Navigo Easy、週末青年票、Citymapper' }
  ];

  // ===== 景點知識庫與避坑攻略 (方案 B + D) =====
  const attractionWiki = {
    '迪士尼': {
      title: '🎢 巴黎迪士尼雙園攻略',
      mapQuery: 'Disneyland+Paris',
      wiki: `
        <strong>🏰 園區簡介：</strong>巴黎迪士尼包含主樂園 (Disneyland Park) 和影城 (Walt Disney Studios Park)。這是全歐洲唯一的迪士尼，充滿精緻的法式童話色彩。<br>
        <strong>⏰ 雙園遊玩黃金順序：</strong>建議早上開園<strong>先攻 Walt Disney Studios</strong>！因為這裡有最新的「漫威復仇者聯盟基地」與「料理鼠王 (Ratatouille)」3D 冒險，且此園區通常較早關門。傍晚後移往 Disneyland Park 玩巨雷山、太空山，並留在城堡前觀看全球唯一的法式無人機燈光秀與絕美煙火！<br>
        <strong>🛍️ 尋找「法國製 (Fabriqué en France)」聯名好物：</strong><br>
        • Longchamp x 迪士尼聯名摺疊包（米奇在巴黎鐵塔旁）。<br>
        • Saint James x 迪士尼聯名條紋海魂衫（布列塔尼純棉手工製造）。<br>
        • 園區內有香水之都 Grasse 製造的官方訂製香水。避免一般量產玩偶，請多常留意背後標籤！
      `
    },
    '戴高樂': {
      title: '✈ 戴高樂機場生存指南',
      mapQuery: 'Charles+de+Gaulle+Airport',
      wiki: `
        <strong>💰 終極退稅 (Détaxe) 避坑：</strong><br>
        • 離境當天<strong>務必提早 4 小時抵達機場</strong>！退稅排隊人潮極多。<br>
        • 託運前先去尋找「PABLO 自動退稅機」（有繁體中文介面），掃描所有退稅單上的條碼。<br>
        • <strong>綠燈 🟢</strong>：代表退稅成功，可以直接去退稅信箱投遞單據，或等待信用卡退稅（約 2-4 週，退稅率 12%）。<br>
        • <strong>紅燈 🔴</strong>：代表需要海關人工審核。這時必須攜帶「購買的未開封商品、護照、登機證」前往隔壁海關櫃檯排隊人工蓋章，審核通過後才能拿到退稅！所以<strong>絕對不要先託運行李</strong>！
      `
    },
    '羅浮宮': {
      title: '🏛️ 羅浮宮快速參觀與尋寶祕訣',
      mapQuery: 'Louvre+Museum',
      wiki: `
        <strong>🚇 避開地面排隊的「秘密通道」：</strong><br>
        羅浮宮金字塔正門排隊排最長。推薦走地下的<strong>「卡魯塞爾購物廊 (Galerie du Carrousel) 入口」</strong>，直接從地鐵 Palais Royal - Musée du Louvre 站地下連通道走進購物廊，那裡的安檢排隊人數通常只有地面的四分之一！<br>
        <strong>🏃 鎮館三寶快速攻略路線：</strong><br>
        進館後直衝：<br>
        1. <strong>薩莫色雷斯的勝利女神</strong> (德農館 Denon Wing，大樓梯頂端)。<br>
        2. <strong>蒙娜麗莎 (Mona Lisa)</strong> (德農館 1 樓 711 展廳)。看完後迅速沿指示牌前往：<br>
        3. <strong>米洛的維納斯 (Venus de Milo)</strong> (敘利館 Sully Wing 1 樓)。<br>
        • <em>地頭蛇建議：</em>羅浮宮每週二閉館。每週五晚上有夜間延長開放至 21:45，此時遊客較少，漫步羅浮宮極具氣氛。
      `
    },
    '奧塞': {
      title: '🎨 奧塞美術館極致美學之旅',
      mapQuery: 'Musee+d+Orsay',
      wiki: `
        <strong>💡 展區分佈與必看金三角：</strong><br>
        奧塞是由舊火車站改建而成的殿堂，收藏了全球最頂級的印象派大師傑作。<br>
        • <strong>直奔五樓</strong>：精華中的精華！梵谷的《隆河的星夜》與《自畫像》、莫內的《藍色睡蓮》、雷諾瓦的《煎餅磨坊的舞會》都在這裡。<br>
        • <strong>必拍網美景點</strong>：五樓盡頭的「巨型車站舊時鐘」，可以透過鏤空面盤拍出巴黎與聖心堂的背光剪影，極美！<br>
        • <strong>二樓</strong>：羅丹的雕塑、莫內後期的立體大作、以及梵谷的多幅晚期作品。
      `
    },
    '凡爾賽': {
      title: '🏰 凡爾賽宮金碧輝煌的秘密',
      mapQuery: 'Palace+of+Versailles',
      wiki: `
        <strong>🏃 避開人海的「鏡廳衝刺法」：</strong><br>
        凡爾賽宮每天有上萬遊客。最聰明的路線是<strong>「一開門直接忽略前面的房間，直奔二樓最底部的鏡廳 (Galerie des Glaces)」</strong>！這時鏡廳空無一人，您可以拍到最完美、陽光穿透水晶吊燈倒映在 357 面鏡子上的壯麗空景。拍完後再慢條斯理地回頭參觀國王與王后套房。<br>
        <strong>🌲 花園與大運河：</strong><br>
        花園占地極廣，徒步會非常累，強烈建議在入口處租借電動高爾夫球車 (Golf Cart) 或搭乘小火車 (Little Train) 參觀莫內大特里亞農宮與農莊。<br>
        ⚠️ <em>重要：</em>即使持有博物館通票，也必須提前在官網預約免費場次，且遲到會被拒絕入場！
      `
    },
    '聖米歇爾': {
      title: '⛪ 聖米歇爾山超大潮汐與朝盛指南',
      mapQuery: 'Mont+Saint-Michel',
      wiki: `
        <strong>🌊 大潮汐係數 (Coefficient de Marée) 解讀：</strong><br>
        我們 9/25-27 待在此地。9/27 的大潮係數高達 95/97 (超大潮！)。當係數超過 90 時，海水會徹底淹沒聯外橋樑，聖米歇爾山會在日落時分變身為一座完全與世隔絕的「孤立海上仙山」，景觀極度震撼！<br>
        <strong>🧗 「下山走大街，上山走城牆」：</strong><br>
        聖米歇爾山內的主街 (Grande Rue) 狹窄且極度擁擠。地頭蛇的聰明路線是：上山時避開主街，<strong>直接沿著兩旁的古老防衛城牆 (Remparts) 拾級而上</strong>，不僅涼爽、視野開闊，還能俯瞰整片沙洲大潮，完全避開人潮！<br>
        <strong>🍳 普拉嬤嬤烘蛋 (La Mère Poulard) 誠實建議：</strong><br>
        店內一份烘蛋定價高達 40-60 歐元！如果您只是想嚐鮮，可以選擇側面的「外帶窗口」，點一份手拿版的烘蛋，價格只要內用的三分之一，省錢又解饞！
      `
    },
    '雷恩': {
      title: '🛍️ 布列塔尼首府雷恩散步攻略',
      mapQuery: 'Rennes+France',
      wiki: `
        <strong>🏰 彩木屋與中世紀老城：</strong><br>
        雷恩是前往聖米歇爾山與北法聖馬洛的交通樞紐。老城區內保留了極多 15-17 世紀、色彩繽紛的<strong>「半木構造彩木屋 (Maisons à pans de bois)」</strong>，漫步在鋪滿鵝卵石的巷弄，彷彿走入中世紀童話世界。<br>
        <strong>☕ 必嚐布列塔尼傳統美食：</strong><br>
        來到此地，一定要品嚐正宗的「蕎麥鹹薄餅 (Galette)」搭配當地特產的「蘋果氣泡酒 (Cidre)」，這是布列塔尼旅人的最高享受！
      `
    },
    '聖馬洛': {
      title: '🌊 聖馬洛海盜城牆與超大潮之旅',
      mapQuery: 'St.+Malo+France',
      wiki: `
        <strong>🏰 兩公里防衛古城牆環行 (Remparts)：</strong><br>
        聖馬洛 (Saint-Malo) 是一座被巨型花崗岩城牆重重包圍的古老海盜城。強烈建議**沿著環城牆步行一圈（約 2 公里）**，右手邊是浩瀚大西洋，左手邊是古樸的花崗岩石屋，海風拂面，極有史詩感。<br>
        <strong>🌊 全歐洲最壯觀的潮差景觀：</strong><br>
        這裡的潮差高達十幾公尺！乾潮時，您可以直接徒步走到海中的「國家堡壘 (Fort National)」；但在幾小時後的滿潮時，剛才的陸地會完全被驚濤駭浪淹沒。9/27 適逢 97 超大潮，漲潮時巨浪拍擊石牆濺起數十公尺高的浪花，是令人屏息的自然奇觀。<br>
        🥞 <strong>海盜城特色甜點</strong>：必買 Kouign-Amann（布列塔尼奶油焦糖酥餅），極為香甜酥脆！
      `
    }
  };

  // ===== Undo Toast 共用函式 =====
  // 傳入: label(描述文字), onCommit(時間到後正式刪除), onUndo(按復原後還原)
  function showUndoToast(label, onCommit, onUndo) {
    const DELAY = 60 * 1000; // 60 秒
    const container = document.getElementById('undoToastContainer');

    // 建立 toast 元素
    const toast = document.createElement('div');
    toast.className = 'undo-toast';
    toast.innerHTML = `
      <div class="undo-toast-msg">
        <span class="undo-toast-label">已刪除</span>
        <span class="undo-toast-title">${label}</span>
      </div>
      <span class="undo-countdown">60</span>
      <button type="button" class="undo-btn">↩ 復原</button>
      <div class="undo-toast-progress"></div>
    `;
    container.appendChild(toast);

    // 倒數顯示
    let remaining = 60;
    const countdownEl = toast.querySelector('.undo-countdown');
    const ticker = setInterval(() => {
      remaining--;
      countdownEl.textContent = remaining;
      if (remaining <= 0) clearInterval(ticker);
    }, 1000);

    // 時間到 → 正式刪除
    const commitTimer = setTimeout(() => {
      clearInterval(ticker);
      dismissToast(toast);
      onCommit();
    }, DELAY);

    // 復原按鈕
    toast.querySelector('.undo-btn').addEventListener('click', () => {
      clearTimeout(commitTimer);
      clearInterval(ticker);
      dismissToast(toast);
      onUndo();
    });

    function dismissToast(el) {
      el.classList.add('toast-hiding');
      setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
    }
  }

  // ===== 訂位資料 =====
  const bookings = [
    {
      category: 'transit',
      icon: '🚄',
      status: 'confirmed',
      title: 'SNCF 跨城火車',
      subtitle: 'Paris Montparnasse → Rennes',
      date: '2026/09/25 (週五)',
      time: '06:48 出發',
      confirmCode: '4WCP2R',
      price: '68.00 €',
      passengers: '2 人 (Chang)',
      note: '請提前 30 分鐘到月台，攜帶護照備查。車程約 1.5–2 小時。'
    }
  ];

  // ===== 初始化功能 =====
  initNavbar();
  initCountdown();
  renderRecommendations();
  renderTips();
  renderBookings();
  renderRegistry();
  initNotes();
  initBackToTop();

  // 非同步載入 Google 試算表行程並動態渲染行事曆與待辦總表
  fetchAndRenderItinerary();

  // ===== 導覽列功能 =====
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Scroll Spy
      let current = '';
      const sections = document.querySelectorAll('.section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ===== 倒數計時 =====
  function initCountdown() {
    const countdownEl = document.getElementById('countdownDays');
    // 設定出發日期 2026/09/15
    const departureDate = new Date('2026-09-15T23:30:00');
    
    function updateCountdown() {
      const now = new Date();
      const diffTime = departureDate - now;
      
      if (diffTime > 0) {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        countdownEl.textContent = diffDays;
      } else {
        countdownEl.textContent = '0';
        countdownEl.style.color = '#10b981'; // 出發啦！
      }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // 每小時更新
  }

  // ===== 渲染行事曆 =====
  function renderCalendar() {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    itineraryData.forEach(itemData => {
      const cell = document.createElement('div');
      cell.className = `calendar-cell has-data cal-type-${itemData.type}`;
      
      const timeHtml = itemData.time ? `<span class="calendar-time">${itemData.time}</span>` : '';
      
      // 加上表情符號圖示
      const icons = {
        transit: '✈️',
        paris: '🗼',
        disney: '🏰',
        belgium: '🍫',
        michel: '⛪'
      };
      const icon = icons[itemData.type] || '📍';

      // 計算這天有沒有未完成的待辦事項
      const uncompletedTodos = state.todos.filter(t => t.date === itemData.date && !t.completed);
      const badgeHtml = uncompletedTodos.length > 0 ? `<div class="calendar-todo-badge">${uncompletedTodos.length}</div>` : '';

      cell.innerHTML = `
        ${badgeHtml}
        <div class="calendar-date">
          <span>${itemData.date}</span>
          ${timeHtml}
        </div>
        <div class="calendar-item">
          ${icon} ${itemData.location}
        </div>
      `;

      // 點擊事件
      cell.addEventListener('click', () => openModal(itemData));
      grid.appendChild(cell);
    });

    container.appendChild(grid);
  }

  // ===== 共用渲染展開式清單函式 =====
  function renderAccordion(containerId, dataMap) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    container.className = 'accordion-container';

    Object.entries(dataMap).forEach(([category, items]) => {
      const details = document.createElement('details');
      details.className = 'accordion-item';
      
      const summary = document.createElement('summary');
      summary.className = 'accordion-header';
      summary.innerHTML = `<span class="accordion-title-text">${category}</span><span class="accordion-icon">▼</span>`;
      
      const content = document.createElement('div');
      content.className = 'accordion-content';
      
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'accordion-card';
        div.innerHTML = `
          <div class="acc-icon">${item.icon}</div>
          <div class="acc-text">
            <h4 class="acc-title">${item.title}</h4>
            <p class="acc-desc">${item.content}</p>
          </div>
        `;
        content.appendChild(div);
      });
      
      details.appendChild(summary);
      details.appendChild(content);
      container.appendChild(details);
    });
  }

  // ===== 渲染推薦 =====
  function renderRecommendations() {
    renderAccordion('recommendationsGrid', recommendationsData);
  }

  // ===== 渲染小撇步 =====
  function renderTips() {
    renderAccordion('tipsGrid', tipsData);
  }

  // ===== 渲染訂位總覽 =====
  function renderBookings() {
    const container = document.getElementById('bookingsContainer');
    if (!container) return;
    container.innerHTML = '';

    const categoryMeta = {
      transit:    { label: '交通', color: '#0284c7', bg: '#e0f2fe' },
      hotel:      { label: '住宿', color: '#7c3aed', bg: '#ede9fe' },
      attraction: { label: '景點', color: '#d97706', bg: '#fef3c7' }
    };

    // 依分類分組
    const groups = {};
    bookings.forEach(b => {
      if (!groups[b.category]) groups[b.category] = [];
      groups[b.category].push(b);
    });

    const categoryOrder = ['transit', 'hotel', 'attraction'];
    const categoryIcons = { transit: '🚄', hotel: '🏨', attraction: '🎡' };

    categoryOrder.forEach(cat => {
      const items = groups[cat];
      if (!items) return;

      const meta = categoryMeta[cat];

      const groupEl = document.createElement('div');
      groupEl.className = 'booking-group';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'booking-group-header';
      groupHeader.innerHTML = `
        <span class="booking-cat-icon">${categoryIcons[cat]}</span>
        <span class="booking-cat-label">${meta.label}</span>
        <span class="booking-cat-count">${items.length} 筆</span>
      `;
      groupEl.appendChild(groupHeader);

      const cardsWrap = document.createElement('div');
      cardsWrap.className = 'booking-cards';

      items.forEach(b => {
        const card = document.createElement('div');
        card.className = 'booking-card';

        const statusHtml = b.status === 'confirmed'
          ? '<span class="booking-status confirmed">✅ 已確認</span>'
          : '<span class="booking-status pending">⏳ 待確認</span>';

        card.innerHTML = `
          <div class="booking-left">
            <div class="booking-icon" style="background:${meta.bg}; color:${meta.color};">${b.icon}</div>
          </div>
          <div class="booking-body">
            <div class="booking-top-row">
              <div>
                <div class="booking-title">${b.title}</div>
                <div class="booking-subtitle">${b.subtitle}</div>
              </div>
              ${statusHtml}
            </div>
            <div class="booking-details">
              <div class="booking-detail-item">
                <span class="booking-detail-label">📅 日期</span>
                <span class="booking-detail-val">${b.date}</span>
              </div>
              ${b.time ? `<div class="booking-detail-item">
                <span class="booking-detail-label">🕐 時間</span>
                <span class="booking-detail-val">${b.time}</span>
              </div>` : ''}
              ${b.confirmCode ? `<div class="booking-detail-item">
                <span class="booking-detail-label">🎫 訂位代碼</span>
                <span class="booking-detail-val booking-code">${b.confirmCode}</span>
              </div>` : ''}
              ${b.price ? `<div class="booking-detail-item">
                <span class="booking-detail-label">💰 金額</span>
                <span class="booking-detail-val">${b.price}</span>
              </div>` : ''}
              ${b.passengers ? `<div class="booking-detail-item">
                <span class="booking-detail-label">👤 乘客</span>
                <span class="booking-detail-val">${b.passengers}</span>
              </div>` : ''}
            </div>
            ${b.note ? `<div class="booking-note">💡 ${b.note}</div>` : ''}
          </div>
        `;
        cardsWrap.appendChild(card);
      });

      groupEl.appendChild(cardsWrap);
      container.appendChild(groupEl);
    });

    // 若無任何訂位
    if (bookings.length === 0) {
      container.innerHTML = `
        <div class="booking-empty">
          <div style="font-size: 3rem; margin-bottom: 16px;">🎫</div>
          <p style="color: var(--c-text-muted);">還沒有任何訂位紀錄，快去搶票吧！</p>
        </div>
      `;
    }
  }

  // ===== 渲染資料整合紀錄 =====
  function renderRegistry() {
    const tbody = document.getElementById('registryTableBody');
    
    dataRegistry.forEach(row => {
      const el = document.createElement('tr');
      el.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
      
      el.innerHTML = `
        <td style="padding: 12px; font-family: monospace; font-size: 0.9rem;">
          <a href="${row.url}" target="_blank" style="color: var(--c-primary-light); text-decoration: underline;">
            ${row.file}
          </a>
        </td>
        <td style="padding: 12px; font-size: 0.9rem;">${row.added}</td>
        <td style="padding: 12px; font-size: 0.9rem; color: var(--c-primary-light);">${row.integrated}</td>
        <td style="padding: 12px; font-size: 0.95rem;">${row.summary}</td>
      `;
      tbody.appendChild(el);
    });
  }

  // ===== 備忘錄系統 =====
  function initNotes() {
    const titleInput = document.getElementById('noteTitleInput');
    const textarea = document.getElementById('noteContentInput');
    const categorySelect = document.getElementById('noteCategorySelect');
    const saveBtn = document.getElementById('noteSaveBtn');
    
    const imageInput = document.getElementById('noteImageInput');
    const imagePreviewContainer = document.getElementById('noteImagePreviewContainer');
    const imagePreview = document.getElementById('noteImagePreview');
    const removeImageBtn = document.getElementById('removeImageBtn');
    let currentImageBase64 = null;

    // 初始渲染
    renderNotes();

    // 處理圖片的共用函式
    function processImageFile(file, previewEl, containerEl, callback) {
      if (!file || !file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // 壓縮圖片避免撐爆 localStorage
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const base64 = canvas.toDataURL('image/jpeg', 0.6);
          previewEl.src = base64;
          containerEl.style.display = 'block';
          if (callback) callback(base64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    // 處理圖片上傳與壓縮 (主表單 - 點擊上傳)
    if (imageInput) {
      imageInput.addEventListener('change', function(e) {
        processImageFile(e.target.files[0], imagePreview, imagePreviewContainer, (b64) => {
          currentImageBase64 = b64;
        });
      });
    }

    // 處理圖片貼上 (主表單 - Cmd+V)
    if (textarea) {
      textarea.addEventListener('paste', function(e) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
          const item = items[index];
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            const file = item.getAsFile();
            processImageFile(file, imagePreview, imagePreviewContainer, (b64) => {
              currentImageBase64 = b64;
            });
            // 不使用 preventDefault()，讓如果同時貼上文字與圖片時，文字依然能貼上
          }
        }
      });
    }

    if (removeImageBtn) {
      removeImageBtn.addEventListener('click', () => {
        currentImageBase64 = null;
        imageInput.value = '';
        imagePreviewContainer.style.display = 'none';
        imagePreview.src = '';
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const content = textarea.value.trim();
        const category = categorySelect.options[categorySelect.selectedIndex];
        
        if (!title && !content && !currentImageBase64) {
          alert('請輸入備忘錄標題、內容或圖片！');
          return;
        }

        const newNote = {
          id: Date.now().toString(),
          title: title || '無標題備忘',
          content: content,
          categoryVal: category.value,
          categoryText: category.text,
          date: new Date().toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          image: currentImageBase64
        };

        state.notes.unshift(newNote); // 加到最前面
        saveNotes();
        renderNotes();
        
        // 清空輸入框
        titleInput.value = '';
        textarea.value = '';
        currentImageBase64 = null;
        if (imageInput) imageInput.value = '';
        if (imagePreviewContainer) imagePreviewContainer.style.display = 'none';
        if (imagePreview) imagePreview.src = '';
      });
    }

    // 支援 Auto Enter 功能 (單行標題按 Enter 直接送出，多行內容按 Cmd+Enter 或 Ctrl+Enter 送出)
    if (titleInput) {
      titleInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (saveBtn) saveBtn.click();
        }
      });
    }

    if (textarea) {
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          if (saveBtn) saveBtn.click();
        }
      });
    }
  }

  function renderNotes() {
    const list = document.getElementById('notesList');
    list.innerHTML = '';

    if (state.notes.length === 0) {
      list.innerHTML = `
        <div class="notes-empty" id="notesEmpty" style="display: block;">
          <div class="empty-icon">📋</div>
          <p>還沒有備忘錄</p>
          <p class="empty-sub">開始記錄你的旅遊重點吧！</p>
        </div>
      `;
      return;
    }
    
    // 類別顏色對應
    const catColors = {
      'general': 'var(--c-primary-light)',
      'todo': 'var(--c-michel)',
      'booking': 'var(--c-disney)',
      'packing': 'var(--c-belgium)',
      'emergency': 'var(--c-secondary)'
    };

    state.notes.forEach(note => {
      const el = document.createElement('div');
      el.className = 'note-item';
      el.style.borderLeftColor = catColors[note.categoryVal] || 'var(--c-primary-light)';
      
      el.innerHTML = `
        <div class="note-item-header">
          <div class="note-item-title">
            <span>${note.categoryText.split(' ')[0]}</span> ${note.title}
          </div>
          <div class="note-item-meta">${note.date}</div>
        </div>
        ${note.image ? `<img src="${note.image}" class="note-image-display" style="margin-top: 10px; margin-bottom: 10px; width: 100%; border-radius: 8px; border: 1px solid var(--c-border); max-height: 300px; object-fit: contain;">` : ''}
        <div class="note-item-content">${escapeHTML(note.content)}</div>
        <div class="note-item-actions">
          <button type="button" class="note-action-btn delete" data-id="${note.id}">刪除</button>
        </div>
      `;

      list.appendChild(el);
    });

    // 綁定刪除事件
    document.querySelectorAll('.note-action-btn.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        // 先從 state 移除，保存備份
        const deletedNote = state.notes.find(n => n.id === id);
        const deletedIndex = state.notes.findIndex(n => n.id === id);
        if (!deletedNote) return;
        state.notes = state.notes.filter(n => n.id !== id);
        renderNotes(); // 立即更新畫面

        // 顯示 Undo Toast
        showUndoToast(
          deletedNote.title || '無標題備忘',
          () => { saveNotes(); }, // 60秒後正式儲存
          () => { // 按復原
            state.notes.splice(deletedIndex, 0, deletedNote);
            saveNotes();
            renderNotes();
          }
        );
      });
    });
  }

  function saveNotes() {
    localStorage.setItem('franceTripNotes', JSON.stringify(state.notes));
  }

  // ===== 待辦總表系統 =====
  function renderMasterTodoList() {
    const container = document.getElementById('todoMasterContainer');
    if (!container) return;
    
    container.innerHTML = '';

    if (state.todos.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 40px; background: rgba(255,255,255,0.05); border-radius: var(--radius-lg);">
          <h3 style="color: var(--c-text-muted); margin-bottom: 10px;">目前沒有任何待辦事項</h3>
          <p style="color: var(--c-text-muted); font-size: 0.95rem;">點擊上方「行事曆」的日期卡片，即可為每一天新增專屬待辦事項！</p>
        </div>
      `;
      return;
    }

    // 將 todo 依照日期分組
    const groupedTodos = {};
    state.todos.forEach(todo => {
      if (!groupedTodos[todo.date]) {
        groupedTodos[todo.date] = [];
      }
      groupedTodos[todo.date].push(todo);
    });

    // 取得所有有待辦的日期並排序 (依照字串簡易排序 9/15 -> 10/1 可能有問題，但此行程剛好 9 月在前 10 月在後，簡易補零排序)
    const sortedDates = Object.keys(groupedTodos).sort((a, b) => {
      const [m1, d1] = a.split('/').map(Number);
      const [m2, d2] = b.split('/').map(Number);
      if (m1 !== m2) return m1 - m2;
      return d1 - d2;
    });

    sortedDates.forEach(dateStr => {
      const todosForDate = groupedTodos[dateStr];
      // 未完成排前面
      todosForDate.sort((a, b) => a.completed - b.completed);
      
      const itemData = itineraryData.find(i => i.date === dateStr);
      const locationBadge = itemData ? `<span class="todo-date-location">${itemData.location}</span>` : '';

      const groupEl = document.createElement('div');
      groupEl.className = 'todo-date-group';
      
      let html = `
        <div class="todo-date-header">
          <span>📅 ${dateStr}</span>
          ${locationBadge}
        </div>
        <div class="todo-list-container">
      `;

      todosForDate.forEach(todo => {
        html += `
          <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" class="todo-checkbox master-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHTML(todo.text)}</span>
            <button type="button" class="todo-delete-btn master-delete-btn" data-id="${todo.id}">🗑️</button>
          </div>
        `;
      });

      html += `</div>`;
      groupEl.innerHTML = html;
      container.appendChild(groupEl);
    });

    // 綁定事件
    document.querySelectorAll('.master-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const todo = state.todos.find(t => t.id === e.target.dataset.id);
        if (todo) {
          todo.completed = e.target.checked;
          saveTodos();
          renderMasterTodoList(); // 重新渲染總表以重排
          renderCalendar(); // 更新紅點
        }
      });
    });

    document.querySelectorAll('.master-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        if (!id) return;
        // 先從 state 移除，保存備份
        const deletedTodo = state.todos.find(t => t.id === id);
        const deletedIndex = state.todos.findIndex(t => t.id === id);
        if (!deletedTodo) return;
        state.todos = state.todos.filter(t => t.id !== id);
        renderMasterTodoList();
        renderCalendar();

        // 顯示 Undo Toast
        showUndoToast(
          deletedTodo.text,
          () => { saveTodos(); }, // 60秒後正式儲存
          () => { // 按復原
            state.todos.splice(deletedIndex, 0, deletedTodo);
            saveTodos();
            renderMasterTodoList();
            renderCalendar();
          }
        );
      });
    });
  }

  // ===== Modal 互動 =====
  function openModal(itemData) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    const timeStr = itemData.time ? ` · ${itemData.time}` : '';

    let wikiHtml = '';
    const matchedKey = Object.keys(attractionWiki).find(key => 
      (itemData.location && itemData.location.includes(key)) || 
      (itemData.desc && itemData.desc.includes(key)) || 
      (itemData.detail && itemData.detail.includes(key))
    );
    
    if (matchedKey) {
      const wiki = attractionWiki[matchedKey];
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${wiki.mapQuery}`;
      wikiHtml = `
        <!-- 景點百科與地圖導航 (方案 B + D) -->
        <div class="modal-wiki-box">
          <div class="wiki-box-header">
            <span class="wiki-box-icon">🗼</span>
            <span class="wiki-box-title">${wiki.title}</span>
          </div>
          <div class="wiki-box-body">${wiki.wiki}</div>
          <div class="wiki-box-footer">
            <a href="${mapsLink}" target="_blank" class="wiki-nav-btn">
              <span class="nav-btn-icon">🗺️</span>
              <span class="nav-btn-text">導航至 ${matchedKey}</span>
            </a>
          </div>
        </div>
      `;
    }
    
    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-date">📅 ${itemData.date} ${timeStr}</div>
        <h2 class="modal-title">${itemData.location}</h2>
      </div>
      <div class="modal-body">
        <p style="font-size: 1.2rem; color: var(--c-text); margin-bottom: 20px;"><strong>📍 計畫：</strong>${itemData.desc}</p>
        <p><strong>💡 詳細資訊：</strong><br>${itemData.detail}</p>
        
        ${wikiHtml}
        
        <!-- 單日待辦事項區塊 -->
        <div style="margin-top: 30px; padding: 15px; background: rgba(0,0,0,0.04); border: 1px solid var(--c-border); border-radius: var(--radius-md);">
          <h4 style="margin-bottom: 15px; color: var(--c-accent); display: flex; align-items: center; gap: 8px;">
            ☑️ 本日專屬待辦
          </h4>
          <div id="modalTodoList" class="todo-list-container">
            <!-- 動態渲染待辦 -->
          </div>
          <div class="todo-input-wrapper">
            <input type="text" id="modalTodoInput" class="todo-input" placeholder="新增待辦事項 (如：預約餐廳、買票)...">
            <button id="addModalTodoBtn" class="todo-add-btn">新增</button>
          </div>
        </div>

        <!-- 快速筆記區塊 -->
        <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.03); border: 1px solid var(--c-border); border-radius: var(--radius-md);">
          <h4 style="margin-bottom: 10px; color: var(--c-text);">快速筆記區</h4>
          <textarea id="quickNote" placeholder="點此輸入針對此行程的特定筆記，或直接按 Cmd+V 貼上圖片..." style="width:100%; min-height:80px; background: #fff; border:1px solid var(--c-border); color: var(--c-text); padding:10px; border-radius:4px; margin-bottom:10px;"></textarea>
          
          <div class="file-upload-wrapper" style="margin-bottom: 12px;">
            <label for="quickNoteImage" class="upload-btn" style="padding: 4px 10px; font-size: 0.85rem;">📷 附加圖片 (可直接貼上)</label>
            <input type="file" id="quickNoteImage" accept="image/*" style="display: none;">
            <div id="quickNotePreviewContainer" style="display: none; margin-top: 10px; position: relative;">
              <img id="quickNotePreview" src="" style="width: 100%; border-radius: 4px; max-height: 200px; object-fit: contain; border: 1px solid var(--c-border);">
              <button type="button" id="removeQuickNoteImage" style="position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-weight: bold;">✕</button>
            </div>
          </div>

          <button id="saveQuickNoteBtn" style="padding:6px 12px; background:var(--c-primary-light); color:white; border:none; border-radius:4px; font-size:0.9rem; cursor: pointer;">儲存筆記</button>
        </div>
      </div>
    `;
    
    overlay.classList.add('active');

    // --- 待辦事項邏輯 ---
    function renderModalTodos() {
      const listContainer = document.getElementById('modalTodoList');
      listContainer.innerHTML = '';
      
      const dayTodos = state.todos.filter(t => t.date === itemData.date);
      
      // 未完成排前面，已完成排後面
      dayTodos.sort((a, b) => a.completed - b.completed);

      if (dayTodos.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--c-text-muted); font-size: 0.9rem; text-align: center;">目前沒有待辦事項</p>';
      } else {
        dayTodos.forEach(todo => {
          const el = document.createElement('div');
          el.className = `todo-item ${todo.completed ? 'completed' : ''}`;
          el.innerHTML = `
            <input type="checkbox" class="todo-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHTML(todo.text)}</span>
            <button type="button" class="todo-delete-btn" data-id="${todo.id}">🗑️</button>
          `;
          listContainer.appendChild(el);
        });
      }

      // 綁定事件
      document.querySelectorAll('#modalTodoList .todo-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const todo = state.todos.find(t => t.id === e.target.dataset.id);
          if (todo) {
            todo.completed = e.target.checked;
            saveTodos();
            renderModalTodos();
            renderCalendar(); // 更新日曆紅點
            renderMasterTodoList(); // 更新總表
          }
        });
      });

      document.querySelectorAll('#modalTodoList .todo-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          if (!id) return;
          state.todos = state.todos.filter(t => t.id !== id);
          saveTodos();
          renderModalTodos();
          renderCalendar();
          renderMasterTodoList();
        });
      });
    }

    renderModalTodos();

    document.getElementById('addModalTodoBtn').addEventListener('click', () => {
      const input = document.getElementById('modalTodoInput');
      const text = input.value.trim();
      if (!text) return;

      state.todos.push({
        id: Date.now().toString(),
        date: itemData.date,
        text: text,
        completed: false
      });

      saveTodos();
      input.value = '';
      renderModalTodos();
      renderCalendar();
      renderMasterTodoList();
    });

    document.getElementById('modalTodoInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('addModalTodoBtn').click();
      }
    });

    // --- 快速筆記區的互動邏輯 ---
    const imageInput = document.getElementById('quickNoteImage');
    const previewContainer = document.getElementById('quickNotePreviewContainer');
    const previewImg = document.getElementById('quickNotePreview');
    const removeBtn = document.getElementById('removeQuickNoteImage');
    const quickNoteTextarea = document.getElementById('quickNote');
    let quickBase64Image = null;

    function processQuickImageFile(file) {
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          quickBase64Image = canvas.toDataURL('image/jpeg', 0.6);
          previewImg.src = quickBase64Image;
          previewContainer.style.display = 'block';
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    // 點擊上傳
    imageInput.addEventListener('change', function(e) {
      processQuickImageFile(e.target.files[0]);
    });

    // 貼上圖片 (Cmd+V)
    quickNoteTextarea.addEventListener('paste', function(e) {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (let index in items) {
        const item = items[index];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          processQuickImageFile(file);
        }
      }
    });

    removeBtn.addEventListener('click', () => {
      quickBase64Image = null;
      imageInput.value = '';
      previewContainer.style.display = 'none';
    });

    if (quickNoteTextarea) {
      quickNoteTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          const saveBtn = document.getElementById('saveQuickNoteBtn');
          if (saveBtn) saveBtn.click();
        }
      });
    }

    document.getElementById('saveQuickNoteBtn').addEventListener('click', () => {
      const content = document.getElementById('quickNote').value.trim();
      if (!content && !quickBase64Image) {
        alert('請輸入內容或上傳圖片！');
        return;
      }

      const newNote = {
        id: Date.now().toString(),
        title: `${itemData.location} (${itemData.date})`,
        content: content,
        categoryVal: 'general',
        categoryText: '📌 快速筆記',
        date: new Date().toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        image: quickBase64Image
      };

      state.notes.unshift(newNote);
      saveNotes();
      
      // 如果 renderNotes 存在 (即在有備忘錄列表的頁面)
      if (typeof renderNotes === 'function') {
        renderNotes();
      }
      
      alert('已成功儲存至底部的「旅行備忘錄」中！');
      document.getElementById('modalOverlay').classList.remove('active');
    });
  }

  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('active');
  });

  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.remove('active');
    }
  });

  // ===== 回到頂部 =====
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 工具函式：防止 XSS
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag])
    );
  }

  // ===== Google 試算表動態串接與離線快照保護系統 =====

  // 輕量級 CSV 解析器，支援引號與欄位內換行 (\n)
  function parseCSV(text) {
    const lines = [];
    let row = [""];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const next = text[i+1];
      if (c === '"') {
        if (inQuotes && next === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        row.push('');
      } else if ((c === '\r' || c === '\n') && !inQuotes) {
        if (c === '\r' && next === '\n') {
          i++;
        }
        lines.push(row);
        row = [''];
      } else {
        row[row.length - 1] += c;
      }
    }
    if (row.length > 1 || row[0] !== '') {
      lines.push(row);
    }
    return lines;
  }

  // 非同步抓取、解析 Google 試算表，支援斷網離線保護
  async function fetchAndRenderItinerary() {
    const statusBadge = document.getElementById('syncStatusBadge');
    try {
      // 加上時間戳記防快取參數，確保每次重整都向 Google 伺服器要求最新版
      const response = await fetch(GOOGLE_SHEET_CSV_URL + '&t=' + Date.now());
      if (!response.ok) throw new Error('雲端回應異常');
      const csvText = await response.text();
      
      // 解析 CSV
      const parsedRows = parseCSV(csvText);
      
      // 過濾並映射有效資料行 (日期符合 M/D 格式)
      const dataRows = parsedRows.filter(row => {
        if (row.length < 4) return false;
        return /^\d{1,2}\/\d{1,2}$/.test(row[0].trim());
      });

      if (dataRows.length > 0) {
        const mappedData = dataRows.map(row => {
          const date = row[0].trim();
          const weekday = row[1] ? row[1].trim() : '';
          const time = row[2] ? row[2].trim() : '';
          const location = row[3] ? row[3].trim() : '';
          const transit = row[4] ? row[4].trim() : '';
          const hotel = row[5] ? row[5].trim() : '';
          const note = row[6] ? row[6].trim() : '';
          
          // 行程種類判定
          let type = 'paris';
          if (location.includes('桃園') || location.includes('戴高樂') || location.includes('機場') || transit.includes('機') || transit.includes('航')) {
            type = 'transit';
          } else if (location.includes('迪士尼') || hotel.includes('Zenitude') || note.includes('迪士尼')) {
            type = 'disney';
          } else if (location.includes('聖米歇爾') || hotel.includes('Relais') || location.includes('雷恩') || location.includes('聖馬洛')) {
            type = 'michel';
          } else if (location.includes('比利時') || location.includes('布魯日') || location.includes('根特')) {
            type = 'belgium';
          }

          // 動態整合詳細描述 (包含交通、住宿與詳細備註)
          let detailParts = [];
          if (transit) detailParts.push(`<strong>🚇 交通與備忘：</strong><br>${transit.replace(/\n/g, '<br>')}`);
          if (hotel) detailParts.push(`<strong>🏨 住宿預訂：</strong><br>${hotel.replace(/\n/g, '<br>')}`);
          if (note) detailParts.push(`<strong>💡 行程與備忘：</strong><br>${note.replace(/\n/g, '<br>')}`);

          let detail = detailParts.join('<br><br>');

          // 特殊景點注入精美的手工 html 攻略 (維持原 index 亮點)
          if (date === '9/25') {
            detail = `🚄 <strong>SNCF 跨城火車 (Paris Montparnasse ➔ Rennes)</strong><br>• 班次：✅ <strong>已訂票 06:48</strong> (訂位代碼：<strong>4WCP2R</strong>，2 人共 68.00 €)<br>• 08:00 抵達雷恩後直接轉乘 TER 火車前往聖馬洛。<br><br><strong>🌊 今日潮汐資訊 (9/25)</strong><br>🔸 滿潮 (Pleine mer)：07:08、19:26 (大潮係數 77/82)<br>🔹 乾潮 (Basse mer)：01:34、13:54<br><br>` + detail;
          } else if (date === '9/26') {
            detail = `<strong>⛰️ 聖米歇爾山自駕與參觀攻略</strong><br>• 租車：09:30-10:15 於聖馬洛火車站 SIXT/Avis 櫃檯取車 (週六取車防週日公休)。<br>• 生蠔：10:30-13:00 康卡勒吃現開生蠔 (導航 Place de la République 或 Port de la Houle)。<br>• 停車：走「Hôtels / Residents」專用車道，輸入 6 位數 Code 停進 P3 專用停車場。<br>• 🛒 傍晚務必找超市買齊水與零食，明天週日超市下午 12:30 後大公休。<br><br><strong>🌊 今日潮汐資訊 (9/26)</strong><br>🔸 滿潮 (Pleine mer)：07:45、20:02 (大潮係數 87/92 - 注意漲退潮變化)<br>🔹 乾潮 (Basse mer)：02:15、14:35<br><br>` + detail;
          } else if (date === '9/27') {
            detail = `<strong>🏰 奧日地區伯夫龍 ➔ 翁夫勒 17世紀舊港</strong><br>• 伯夫龍：最美半木屋村莊。週日小店與餐廳多公休或只開中午，抵達立刻點餐！<br>• 停車：翁夫勒舊港單行道多，直接導航 Parking du Centre (Plage) 或 Parking de l'Est 大型露天停車場。<br><br><strong>🌊 今日潮汐資訊 (9/27)</strong><br>🔸 滿潮 (Pleine mer)：08:20、20:37 (大潮係數 95/97 - 超大潮，景觀壯麗)<br>🔹 乾潮 (Basse mer)：02:56、15:14<br><br>` + detail;
          } else if (date === '9/28') {
            detail = `<strong>🌊 埃特雷塔白堊斷崖 ➔ 歷史名城魯昂</strong><br>• 斷崖：欣賞象鼻山，停車首選 Parking de la Falaise d'Aval，若滿了改停 Parking du Grand Val 步15分鐘。<br>• 魯昂：直接導航 Parking Indigo Rouen Cathédrale。⚠️ 週一精品/甜點店多公休，以參觀魯昂聖母大教堂與大時鐘為主。部分餐廳週一週二雙休，請提前確認營業時間。<br><br>` + detail;
          } else if (date === '9/29') {
            detail = `<strong>🎨 吉維尼莫內花園 ➔ 巴黎還車</strong><br>• 花園：10:00-12:30 莫內之家與花園 (預先官網預約 10:00 入場，現場不售票)。<br>• 還車：還車至巴黎拉德芳斯，注意地下立體迷宮，認清合約停車場 (如 Parking Centre / Les 4 Temps) 隨著 Retour Location 指標開。<br>• ⚠️ <strong>國道繳費防呆 (Flux Libre新制)</strong>：開過 A13 高速公路後，務必於 72 小時內上網 (sanef.com) 繳費以免受罰。<br><br>` + detail;
          }

          // 取出第一行做為卡片顯示的精簡 desc，過濾掉 html 標籤
          const rawDesc = (transit || note || hotel || `${location}探索`).split('\n')[0].replace(/<[^>]*>/g, '');
          const desc = rawDesc.length > 18 ? rawDesc.substring(0, 18) + '...' : rawDesc;

          return {
            date,
            time,
            location,
            type,
            desc: desc || '探索美麗景致',
            detail: detail || '今日暫無詳細計畫備忘。'
          };
        });

        itineraryData = mappedData;
        
        // 儲存到本地快照，防斷網
        localStorage.setItem('franceTripItinerarySnapshot', JSON.stringify(mappedData));
        localStorage.setItem('franceTripItinerarySnapshotTime', new Date().toLocaleString());
      }

      // 更新同步狀態徽章為成功
      if (statusBadge) {
        statusBadge.className = 'sync-status-badge synced';
        statusBadge.innerHTML = '🟢 試算表已同步';
        statusBadge.title = `最後同步時間：${new Date().toLocaleTimeString()}`;
      }
    } catch (error) {
      console.warn('無法從 Google 試算表同步資料，載入離線緩存：', error);
      
      const snapshot = localStorage.getItem('franceTripItinerarySnapshot');
      const snapshotTime = localStorage.getItem('franceTripItinerarySnapshotTime');
      
      if (snapshot) {
        itineraryData = JSON.parse(snapshot);
        if (statusBadge) {
          statusBadge.className = 'sync-status-badge offline';
          statusBadge.innerHTML = '🟡 離線快照模式';
          statusBadge.title = `載入離線緩存，快照時間：${snapshotTime} (錯誤原因: ${error.message})`;
        }
      } else {
        if (statusBadge) {
          statusBadge.className = 'sync-status-badge fallback';
          statusBadge.innerHTML = '🔴 斷網預設行程';
          statusBadge.title = `無本地緩存，使用網頁出廠預設行程 (錯誤原因: ${error.message})`;
        }
      }
    }

    // 重新渲染行事曆與待辦事項
    renderCalendar();
    renderMasterTodoList();
  }
});
