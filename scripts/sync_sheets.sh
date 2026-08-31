#!/bin/bash
# 2026 法國旅行 - Google Sheets 資料同步腳本
# 執行方式：./scripts/sync_sheets.sh 或 bash scripts/sync_sheets.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(dirname "$SCRIPT_DIR")"
TARGET_DIR="${APP_DIR}/sheets_data"
BASE_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vQKsRU4MxrVDOZOUosa5bUMDZG8w9kHqy_iPEKrGD6dB9Q_8SJcfPr7pT9hVLXJuUXbO6Z0o0TsX5Ns/pub?output=csv"

mkdir -p "$TARGET_DIR"

SHEET_LIST=(
  "1948635274:AI版總表"
  "539933228:人類用的行程表_AI勿調整"
  "294627883:拍婚紗_AI勿調整"
  "185810392:婚紗"
  "503268453:初見巴黎滿滿博物館_915_920"
  "1003473039:巴黎迪士尼好讚讚_921_924"
  "469056269:諾曼第自駕真好玩_925_101"
  "1108649423:雙重博物館_102_107"
  "602663680:法國開車注意事項"
  "1487986267:迪士尼"
  "870785007:飯店"
  "861051227:機票"
  "2145456948:工作表14"
)

echo "🚀 開始從 Google Sheets 同步最新行程資料..."
for item in "${SHEET_LIST[@]}"; do
  gid="${item%%:*}"
  name="${item#*:}"
  echo "📥 正在下載: ${name} (gid: ${gid})..."
  curl -sL "${BASE_URL}&gid=${gid}" -o "${TARGET_DIR}/${name}.csv"
done

echo "✅ 所有工作表同步完成！資料已更新至 ${TARGET_DIR}/"
