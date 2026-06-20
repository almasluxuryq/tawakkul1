interface OrderWithItems {
  orderNumber: string
  name: string
  phone: string
  email: string | null
  messenger: string | null
  country: string
  city: string
  address: string
  postalCode: string | null
  deliveryMethod: string
  paymentMethod: string
  totalKZT: number
  totalRUB: number
  items: Array<{ productName: string; size: string; quantity: number; priceKZT: number }>
}

const deliveryMethodNames: Record<string, string> = {
  cdek: 'СДЭК',
  kazpost: 'КазПочта',
  pochta: 'Почта России',
}

const paymentMethodNames: Record<string, string> = {
  KASPI: 'Kaspi',
  VTB: 'VTB',
}

const countryNames: Record<string, string> = {
  KZ: 'Казахстан',
  RU: 'Россия',
}

export async function notifyNewOrder(order: OrderWithItems) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) return

  const items = order.items
    .map((i) => `  ${i.productName} · ${i.size} x${i.quantity} — ${i.priceKZT.toLocaleString('ru-RU')} ₸`)
    .join('\n')

  const lines = [
    `🛒 *Новый заказ!*`,
    ``,
    `📦 *${order.orderNumber}*`,
    ``,
    `*Клиент:*`,
    `👤 ${order.name}`,
    `📱 ${order.phone}`,
  ]

  if (order.email) lines.push(`📧 ${order.email}`)
  if (order.messenger) lines.push(`💬 ${order.messenger}`)

  lines.push(
    ``,
    `*Доставка:*`,
    `🌍 ${countryNames[order.country] || order.country}`,
    `📍 ${order.city}, ${order.address}`,
  )

  if (order.postalCode) lines.push(`📮 Индекс: ${order.postalCode}`)

  lines.push(
    `🚚 ${deliveryMethodNames[order.deliveryMethod] || order.deliveryMethod}`,
    ``,
    `*Оплата:*`,
    `💳 ${paymentMethodNames[order.paymentMethod] || order.paymentMethod}`,
    ``,
    `*Товары:*`,
    items,
    ``,
    `*Итого: ${order.totalKZT.toLocaleString('ru-RU')} ₸ / ${order.totalRUB.toLocaleString('ru-RU')} ₽*`,
  )

  const text = lines.join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    })
  } catch (error) {
    console.error('Telegram notification failed:', error)
  }
}
