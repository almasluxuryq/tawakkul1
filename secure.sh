#!/usr/bin/env bash
###############################################################################
# TWKKL — смена секретов (после деплоя). Делает старые секреты бесполезными.
# Меняет: пароль БД PostgreSQL и ADMIN_SECRET (доступ к админке заказов).
###############################################################################
set -uo pipefail
APP=/var/www/twkkl-new
ENV=$APP/.env

NEW_ADMIN=$(openssl rand -hex 12)
NEW_DBP=$(openssl rand -hex 12)

echo ">>> Меняю пароль базы данных..."
sudo -u postgres psql -c "ALTER USER tawakkul WITH PASSWORD '$NEW_DBP';" >/dev/null

echo ">>> Обновляю .env новыми секретами..."
if [ -f "$ENV" ]; then
  sed -i "s#^DATABASE_URL=.*#DATABASE_URL=\"postgresql://tawakkul:$NEW_DBP@localhost:5432/tawakkul_db\"#" "$ENV"
  if grep -q '^ADMIN_SECRET=' "$ENV"; then
    sed -i "s#^ADMIN_SECRET=.*#ADMIN_SECRET=\"$NEW_ADMIN\"#" "$ENV"
  else
    echo "ADMIN_SECRET=\"$NEW_ADMIN\"" >> "$ENV"
  fi
else
  echo "!!! .env не найден в $APP — останови и напиши мне."; exit 1
fi

echo ">>> Перезапускаю сайт..."
cd "$APP"
pm2 restart twkkl-new >/dev/null
sleep 3
CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/ || echo 000)
echo "Сайт после перезапуска: HTTP $CODE (нужно 200)"

echo
echo "############################################################"
echo "#  НОВЫЙ ПАРОЛЬ ДЛЯ АДМИНКИ ЗАКАЗОВ — СОХРАНИ ЕГО СЕБЕ:     #"
echo "#                                                          #"
echo "       $NEW_ADMIN"
echo "#                                                          #"
echo "#  Старый секрет 'twkkl-admin-2025' больше НЕ работает.    #"
echo "#  ВАЖНО: этот пароль НЕ отправляй мне в чат — просто      #"
echo "#  запиши себе. Пароль базы данных сменился автоматически. #"
echo "############################################################"
