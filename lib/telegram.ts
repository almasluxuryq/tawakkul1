interface OrderWithItems {
  orderNumber: string
  name: string
  phone: string
  city: string
  address: string
  paymentMethod: string
  totalKZT: number
  items: Array<{ size: string; quantity: number; priceKZT: number }>
}

export async function notifyNewOrder(order: OrderWithItems) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) return

  const items = order.items
    .map((i) => `  ${i.size} x${i.quantity} — ${i.priceKZT.toLocaleString('ru-RU')} ₸`)
    .join('\n')

  const text = [
    `🛒 *Новый заказ!*`,
    ``,
    `📦 *${order.orderNumber}*`,
    `👤 ${order.name}`,
    `📱 ${order.phone}`,
    `📍 ${order.city}, ${order.address}`,
    `💳 ${order.paymentMethod}`,
    ``,
    `*Товары:*`,
    items,
    ``,
    `*Итого: ${order.totalKZT.toLocaleString('ru-RU')} ₸*`,
  ].join('\n')

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
