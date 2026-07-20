#!/usr/bin/env bash
###############################################################################
# Меняет пароль админки (ADMIN_SECRET в .env) на переданный аргумент.
# Пароль НЕ хранится в этом файле — вы передаёте его при запуске.
# Использование:   bash set-admin.sh НОВЫЙ_ПАРОЛЬ
###############################################################################
set -uo pipefail
NEW="${1:-}"
ENV=/var/www/twkkl-new/.env

if [ -z "$NEW" ]; then
  echo "Укажите пароль:  bash set-admin.sh вашпароль"
  exit 1
fi

if grep -q '^ADMIN_SECRET=' "$ENV"; then
  sed -i "s#^ADMIN_SECRET=.*#ADMIN_SECRET=\"$NEW\"#" "$ENV"
else
  echo "ADMIN_SECRET=\"$NEW\"" >> "$ENV"
fi

cd /var/www/twkkl-new
pm2 restart twkkl-new >/dev/null
echo "============================================"
echo " Пароль админки обновлён."
echo " Заходи на twkklbrand.com/admin с новым паролем."
echo "============================================"
