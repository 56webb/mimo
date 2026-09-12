# 🇫🇷 2026 法國旅行 Web App 自動同步標準作業程序 (SOP)

> **這份文件為專案 AI 助理最高工作準則**。使用者未來不需要記住任何複雜指令，只要使用者告知：「幫我更新行程」、「我改了名單」、「幫我同步」，AI 必須完全自主執行以下標準流程。

---

## 一、 核心架構與檔案對照

| 類別 | 檔案路徑 | 作用說明 |
| :--- | :--- | :--- |
| **資料來源** | `2026_私房口袋名單.md` | 私房美食、甜點、咖啡、購物、古董雜貨 |
| | `2026_法國行程表_更新版.csv` | 23 天每日時間軸行程表 |
| | `2026_法國行程規劃.txt` | 每日細部景點、拍照機位、交通指南 |
| | 各類 CSV 檔案 | 8 家飯店、待辦清單、打包清單 |
| **安全金鑰** | `vault_secret.json` | 存放 `geminiApiKey`（**.gitignore 嚴格排除，絕不可進入 Git**） |
| **金庫編譯器** | `scripts/build_full_vault.js` | 讀取所有資料進行 AES-256 加密，注入 `app.js` 與 `encrypted_vault.json` |
| **前端應用** | `index.html` | 網頁主架構、版本號控制（避免瀏覽器快取） |
| | `js/app.js` | 核心邏輯、加密金庫、隨行秘書 Gemini 2.5 Flash 核心大腦 |
| | `assets/styles/main.css` | 巴黎法式高雅深色介面樣式 |
| **雙軌備份** | `/Users/chang/Library/CloudStorage/GoogleDrive-sawgar09666@gmail.com/我的雲端硬碟/2026 旅行/法國APP/` | 本地與雲端雙重備份目錄 |
| **線上發布** | `https://56webb.github.io/mimo/` | GitHub Pages 正式線上網址（分支 `main`） |

---

## 二、 標準自動同步 7 步驟 (SOP)

### 第 1 步：資料檢視與解析
- 檢閱使用者修改的 Markdown、CSV 或 TXT 檔案。
- 嚴格落實 100% 繁體中文台灣正體與慣用詞（杜絕簡體與中國大陸用語）。

### 第 2 步：金庫自動編譯 (Build Vault)
- 確保新增項目（如新店家、新景點）同步納入 `scripts/build_full_vault.js`。
- 終端機執行：
  ```bash
  node scripts/build_full_vault.js
  ```
- 確認輸出包含 23 天行程、8 家飯店、11 筆票券與全數 93+ 處私房好店，並成功注入密文。

### 第 3 步：版本號跳號 (Cache Busting)
- 在 `index.html` 更新引用版本號：
  - `<link rel="stylesheet" href="assets/styles/main.css?v=YYYYMMDD_xxx">`
  - `<script src="js/app.js?v=YYYYMMDD_xxx"></script>`
- 確保使用者手機重新整理時必定載入最新程式碼與金庫。

### 第 4 步：雙軌備份至 Google 雲端硬碟
- 終端機執行複製指令，將核心檔案同步至 Google Drive：
  ```bash
  cp index.html js/app.js assets/styles/main.css data/encrypted_vault.json "2026_私房口袋名單.md" GEMINI.md WORKFLOW_SOP.md "/Users/chang/Library/CloudStorage/GoogleDrive-sawgar09666@gmail.com/我的雲端硬碟/2026 旅行/法國APP/"
  ```

### 第 5 步：Git 安全提交與推送
- 檢查 `git status`，確認 `vault_secret.json` 絕未被追蹤。
- 執行提交與推送：
  ```bash
  git add index.html js/app.js assets/styles/main.css scripts/build_full_vault.js "2026_私房口袋名單.md" GEMINI.md WORKFLOW_SOP.md
  git commit -m "更新摘要（使用台灣繁體中文）"
  git push origin main
  ```

### 第 6 步：確認 GitHub Pages 部署成功
- **絕對禁止開啟瀏覽器**（嚴格遵守使用者指示）。
- 使用 `curl` 查詢 GitHub Actions：
  ```bash
  curl -s "https://api.github.com/repos/56webb/mimo/actions/runs?per_page=1" | grep -E '"status"|"conclusion"'
  ```
- 確認輸出為 `"status": "completed"` 與 `"conclusion": "success"`。

### 第 7 步：以隨行秘書身分回報
- 條理分明回報更新項目。
- 提醒使用者於手機端重新整理網頁即可查看最新內容。

---

## 三、 隨行秘書核心問答準則 (Anti-Slop Guidelines)

1. **零廢話、直球對決**：
   - 嚴禁抒情散文或客套開場（如「漫步在...感受藝術氣息...真是愜意」）。
   - 開頭第 1 行直接給出明確答案與推薦名單。
2. **實戰導向排版**：
   - 依步行距離由近到遠推薦 2～3 家。
   - 每家標明：店名（法文全名）、步行時間與距離、必吃招牌品項、營業時間（加粗特別強調公休日）、可點擊直開 Google Maps 導航之超連結、秘書實戰提醒。
3. **行程智慧聯動**：
   - 推薦時主動結合當天行程（如預訂餐廳、景點預約時間）給出貼心叮嚀。
