#!/usr/bin/env bash
###############################################################################
# TWKKL — этап 2: переключить домен twkklbrand.com на новый сайт (:3001)
# Делает бэкап nginx, проверяет конфиг, при ошибке откатывает.
###############################################################################
set -uo pipefail
PORT=3001
EMAIL=almasluxuryq@gmail.com
LOG=/root/twkkl-golive.log
exec > >(tee -a "$LOG") 2>&1
echo "================ TWKKL GO-LIVE $(date) ================"

# 0. Новый сайт точно работает?
CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" || echo 000)
echo "Новый сайт на :$PORT => HTTP $CODE"
if [ "$CODE" != "200" ]; then
  echo "СТОП: новый сайт не отвечает 200. Сначала доделай этап 1 (deploy.sh)."; exit 1
fi

# 1. Бэкап nginx
TS=$(date +%Y%m%d-%H%M%S); BK=/root/nginx-backup-$TS
mkdir -p "$BK"; cp -a /etc/nginx/sites-available "$BK/" 2>/dev/null || true
cp -a /etc/nginx/sites-enabled "$BK/" 2>/dev/null || true
echo "Бэкап nginx -> $BK"

# 2. Какие конфиги уже упоминают домен
mapfile -t HITS < <(grep -rl 'twkklbrand.com' /etc/nginx/sites-available /etc/nginx/sites-enabled 2>/dev/null | sort -u)
echo "Конфиги с доменом: ${HITS[*]:-нет}"

# 3. Новый конфиг
cat > /etc/nginx/sites-available/twkkl-new <<'NGX'
server {
    listen 80;
    listen [::]:80;
    server_name twkklbrand.com www.twkklbrand.com;
    client_max_body_size 25M;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGX

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
  systemctl reload nginx; echo "HTTP переключён на новый сайт."
else
  echo "nginx -t ПРОВАЛ — откат."
  rm -f /etc/nginx/sites-enabled/twkkl-new
  rm -rf /etc/nginx/sites-enabled; cp -a "$BK/sites-enabled" /etc/nginx/sites-enabled
  nginx -t && systemctl reload nginx
  echo "Откат выполнен, старый сайт на месте. Бэкап: $BK"; exit 1
fi

# 6. HTTPS
command -v certbot >/dev/null || apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d twkklbrand.com -d www.twkklbrand.com --non-interactive --agree-tos -m "$EMAIL" --redirect \
  || echo "Внимание: certbot не доделал HTTPS. Сайт пока по http, повторим позже."
nginx -t && systemctl reload nginx

echo "================ ПРОВЕРКА ================"
curl -s -o /dev/null -w "http  => %{http_code}\n" http://twkklbrand.com/  || true
curl -s -o /dev/null -w "https => %{http_code}\n" https://twkklbrand.com/ || true
echo "ГОТОВО. Открой https://twkklbrand.com"
echo "Если что-то не так — откат: бэкап nginx лежит в $BK"
