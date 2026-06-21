#!/usr/bin/env bash
###############################################################################
# TWKKL — этап 2: переключить домен twkklbrand.com на новый сайт (:3001)
# Переиспользует существующий SSL-сертификат -> HTTPS без простоя.
# Делает бэкап nginx, проверяет, при ошибке откатывает. Старый сайт не удаляется.
###############################################################################
set -uo pipefail
PORT=3001
DOMAIN=twkklbrand.com
CERT=/etc/letsencrypt/live/twkklbrand.com
LOG=/root/twkkl-golive.log
exec > >(tee -a "$LOG") 2>&1
echo "================ TWKKL GO-LIVE $(date) ================"

# 0. Новый сайт реально работает и отдаёт нужную страницу?
HTML=$(curl -s "http://localhost:$PORT/" || true)
CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" || echo 000)
echo "Новый сайт :$PORT => HTTP $CODE"
if [ "$CODE" != "200" ] || ! echo "$HTML" | grep -qi "TAWAKKUL"; then
  echo "СТОП: новый сайт не отдаёт нормальную главную страницу. Домен НЕ трогаю."
  exit 1
fi
echo "Проверка контента: на странице найдено 'TAWAKKUL' — ок"

# 1. Бэкап nginx
TS=$(date +%Y%m%d-%H%M%S); BK=/root/nginx-backup-$TS
mkdir -p "$BK"; cp -a /etc/nginx/sites-available "$BK/" 2>/dev/null || true
cp -a /etc/nginx/sites-enabled "$BK/" 2>/dev/null || true
echo "Бэкап nginx -> $BK"

# 2. Старые конфиги домена
mapfile -t HITS < <(grep -rl "$DOMAIN" /etc/nginx/sites-available /etc/nginx/sites-enabled 2>/dev/null | sort -u)
echo "Старые конфиги с доменом: ${HITS[*]:-нет}"

# 3. Новый конфиг (с HTTPS если сертификат есть)
if [ -f "$CERT/fullchain.pem" ]; then
  echo "Сертификат найден -> пишу конфиг с HTTPS"
  cat > /etc/nginx/sites-available/twkkl-new <<NGX
server {
    listen 80;
    listen [::]:80;
    server_name twkklbrand.com www.twkklbrand.com;
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name twkklbrand.com www.twkklbrand.com;
    ssl_certificate $CERT/fullchain.pem;
    ssl_certificate_key $CERT/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    client_max_body_size 25M;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGX
else
  echo "Сертификата нет -> конфиг только http, потом certbot"
  cat > /etc/nginx/sites-available/twkkl-new <<NGX
server {
    listen 80;
    listen [::]:80;
    server_name twkklbrand.com www.twkklbrand.com;
    client_max_body_size 25M;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGX
fi

# 4. Отключить старые конфиги домена
for f in "${HITS[@]}"; do
  b=$(basename "$f")
  if [ -L "/etc/nginx/sites-enabled/$b" ]; then rm -f "/etc/nginx/sites-enabled/$b"; echo "Отключил symlink $b"
  elif [ -f "/etc/nginx/sites-enabled/$b" ]; then mv "/etc/nginx/sites-enabled/$b" "/etc/nginx/sites-enabled/$b.disabled"; echo "Отключил файл $b"
  fi
done
ln -sf /etc/nginx/sites-available/twkkl-new /etc/nginx/sites-enabled/twkkl-new

# 5. Проверка + reload (с откатом)
if nginx -t; then
  systemctl reload nginx; echo "ГОТОВО: домен переключён на новый сайт."
else
  echo "nginx -t ПРОВАЛ — откатываю на старый сайт."
  rm -f /etc/nginx/sites-enabled/twkkl-new
  rm -rf /etc/nginx/sites-enabled; cp -a "$BK/sites-enabled" /etc/nginx/sites-enabled
  nginx -t && systemctl reload nginx
  echo "Откат выполнен, старый сайт на месте. Бэкап: $BK"; exit 1
fi

# 6. Если сертификата не было — выпустить
if [ ! -f "$CERT/fullchain.pem" ]; then
  command -v certbot >/dev/null || apt-get install -y certbot python3-certbot-nginx
  certbot --nginx -d twkklbrand.com -d www.twkklbrand.com --non-interactive --agree-tos -m almasluxuryq@gmail.com --redirect || echo "certbot не доделал — повторим позже"
  nginx -t && systemctl reload nginx
fi

echo "================ ПРОВЕРКА ================"
curl -s -o /dev/null -w "http  => %{http_code}\n" http://twkklbrand.com/  || true
curl -s -o /dev/null -w "https => %{http_code}\n" https://twkklbrand.com/ || true
echo "#####################################################################"
echo "#  ГОТОВО. Открой https://twkklbrand.com — там должен быть НОВЫЙ сайт #"
echo "#  Откат при необходимости: бэкап nginx в $BK                        #"
echo "#####################################################################"
