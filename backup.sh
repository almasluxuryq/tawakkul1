#!/usr/bin/env bash
# Простой бэкап базы TAWAKKUL.
# Запуск на сервере:  bash backup.sh
# Берёт строку подключения из .env (переменная DATABASE_URL) и делает дамп в /var/backups/twkkl.
# Хранит последние 14 копий, старые удаляет автоматически.

set -euo pipefail

APP_DIR="/var/www/twkkl-new"
BACKUP_DIR="/var/backups/twkkl"
KEEP=14

mkdir -p "$BACKUP_DIR"

# Достаём DATABASE_URL из .env
DB_URL="$(grep -E '^DATABASE_URL=' "$APP_DIR/.env" | head -n1 | cut -d= -f2- | tr -d '"'"'"'"'"')"

if [ -z "${DB_URL:-}" ]; then
  echo "DATABASE_URL не найден в $APP_DIR/.env"
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$BACKUP_DIR/twkkl-$STAMP.sql.gz"

pg_dump "$DB_URL" | gzip > "$OUT"
echo "Бэкап готов: $OUT"

# Удаляем всё, кроме последних $KEEP файлов
ls -1t "$BACKUP_DIR"/twkkl-*.sql.gz | tail -n +$((KEEP + 1)) | xargs -r rm -f
echo "Оставлено последних копий: $KEEP"
