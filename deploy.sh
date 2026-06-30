#!/usr/bin/env bash
###############################################################################
# TWKKL — установка нового сайта (этап 1: сборка + запуск на :3001)
# Безопасно: НЕ трогает старый сайт и домен. Старый сайт продолжает работать.
###############################################################################
set -uo pipefail

APP_DIR=/var/www/twkkl-new
PORT=3001
REPO=https://github.com/almasluxuryq/tawakkul1.git
LOG=/root/twkkl-deploy.log

exec > >(tee -a "$LOG") 2>&1
echo "==================================================================="
echo " TWKKL DEPLOY  $(date)"
echo "==================================================================="

ok(){ echo; echo ">>>>>> $1"; }

ok "0/12  Базовые инструменты (git, curl)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y >/dev/null 2>&1 || true
command -v git  >/dev/null || apt-get install -y git
command -v curl >/dev/null || apt-get install -y curl

ok "1/12  Swap (чтобы сборка не упала по памяти)"
if ! swapon --show | grep -q .; then
  echo "Создаю swap 2G..."
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
else
  echo "Swap уже есть — ок"
fi

ok "2/12  Node.js (нужен >= 18)"
NODE_OK=0
if command -v node >/dev/null; then
  NV=$(node -v | sed 's/v//' | cut -d. -f1)
  [ "$NV" -ge 18 ] && NODE_OK=1 && echo "Node $(node -v) — ок"
fi
if [ "$NODE_OK" -ne 1 ]; then
  echo "Ставлю Node 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo "node: $(node -v) | npm: $(npm -v)"

ok "3/12  pnpm + pm2"
command -v pnpm >/dev/null || npm install -g pnpm
command -v pm2  >/dev/null || npm install -g pm2
echo "pnpm: $(pnpm -v) | pm2: $(pm2 -v)"

ok "4/12  PostgreSQL"
command -v psql >/dev/null || apt-get install -y postgresql postgresql-contrib
systemctl enable --now postgresql
echo "$(psql --version)"

ok "5/12  База данных и пользователь"
DB=tawakkul_db; DBU=tawakkul; DBP='twkkl2025secretDB'
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='$DBU'" | grep -q 1 \
  || sudo -u postgres psql -c "CREATE USER $DBU WITH PASSWORD '$DBP';"
sudo -u postgres psql -c "ALTER USER $DBU WITH PASSWORD '$DBP';"
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='$DB'" | grep -q 1 \
  || sudo -u postgres psql -c "CREATE DATABASE $DB OWNER $DBU;"
echo "БД $DB и пользователь $DBU готовы"

ok "6/12  Код с GitHub"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch --all -q && git -C "$APP_DIR" reset --hard origin/main
else
  rm -rf "$APP_DIR"; git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"
echo "Код в $APP_DIR (коммит $(git -C "$APP_DIR" rev-parse --short HEAD))"

ok "7/12  Файл .env"
cat > "$APP_DIR/.env" <<ENVEOF
DATABASE_URL="postgresql://${DBU}:${DBP}@localhost:5432/${DB}"
ADMIN_SECRET="twkkl-admin-2025"
TELEGRAM_BOT_TOKEN=""
TELEGRAM_CHAT_ID=""
NEXT_PUBLIC_WHATSAPP_NUMBER=77009570233
NEXT_PUBLIC_TELEGRAM_BOT=tawakkulgpt
NEXT_PUBLIC_TELEGRAM_CHANNEL=tawakkulbrand
NEXT_PUBLIC_INSTAGRAM=tawakkultwkkl
NEXT_PUBLIC_SITE_URL=https://twkklbrand.com
NODE_ENV=production
ENVEOF
echo ".env записан"

ok "8/12  Установка зависимостей (дольше всего, 2-5 мин)"
pnpm install --frozen-lockfile || pnpm install

ok "9/12  Prisma (создание таблиц в БД)"
npx prisma generate
npx prisma db push --accept-data-loss

ok "10/12  Сборка сайта (ещё 2-4 мин)"
export NODE_OPTIONS=--max-old-space-size=3072
pnpm build

ok "11/12  Запуск через pm2 на порту $PORT"
pm2 delete twkkl-new >/dev/null 2>&1 || true
cd "$APP_DIR"
PORT=$PORT pm2 start npm --name twkkl-new -- start
pm2 save

ok "12/12  Проверка + диагностика"
sleep 5
CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" || echo 000)
echo "Ответ нового сайта на localhost:$PORT  =>  HTTP $CODE   (нужно 200)"
echo
echo "----- pm2 -----"; pm2 list
echo "----- PORTS -----"; ss -tlnp | grep -E ':(80|443|3000|3001|5432)' || true
echo "----- NGINX sites-enabled -----"; ls -la /etc/nginx/sites-enabled/ 2>/dev/null
echo "----- NGINX configs -----"
for f in /etc/nginx/sites-enabled/*; do echo "===== $f ====="; cat "$f"; done 2>/dev/null
echo
if [ "$CODE" = "200" ]; then
  echo "#####################################################################"
  echo "#  ЭТАП 1 ГОТОВ. Новый сайт работает на :3001. Старый не тронут.     #"
  echo "#  Пришли скрин — дальше переключаем домен (этап 2, golive).         #"
  echo "#####################################################################"
else
  echo "!!! Нет ответа 200. Пришли вывод:  tail -n 40 /root/twkkl-deploy.log"
fi
