export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { notifyNewOrder } from '@/lib/telegram'

const createOrderSchema = z.object({
  name: z.string().min(1).min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal('')),
  messenger: z.string().optional(),
  country: z.enum(['KZ', 'RU', 'WORLD']),
  city: z.string().min(1),
  address: z.string().min(1),
  postalCode: z.string().optional(),
  deliveryMethod: z.string().min(1),
  paymentMethod: z.enum(['KASPI', 'VTB']),
  items: z.array(z.object({
    productId: z.string().min(1),
    productName: z.string().min(1),
    size: z.string(),
    color: z.string().optional(),
    quantity: z.number().int().positive(),
    priceKZT: z.number().int().positive(),
  })).min(1),
  totalKZT: z.number().int().positive(),
  totalUSD: z.number().int().positive(),
  totalRUB: z.number().int().positive(),
  deliveryFeeKZT: z.number().int().nonnegative().optional(),
})

async function generateOrderNumber(name: string): Promise<string> {
  const cleanName = name
    .trim()
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]/g, '')
    .slice(0, 15) || 'ORDER'

  const now = new Date()
  const date = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`

  const todayCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      },
    },
  })

  return `${cleanName}-${date}-${todayCount + 1}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createOrderSchema.parse(body)

    const order = await prisma.order.create({
      data: {
        orderNumber: await generateOrderNumber(data.name),
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        messenger: data.messenger || null,
        country: data.country,
        city: data.city,
        address: data.address,
        postalCode: data.postalCode || null,
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
        totalKZT: data.totalKZT,
        totalUSD: data.totalUSD,
        totalRUB: data.totalRUB,
        deliveryFeeKZT: data.deliveryFeeKZT ?? 0,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            size: item.size,
            color: item.color || null,
            quantity: item.quantity,
            priceKZT: item.priceKZT,
          })),
        },
      },
      include: { items: true },
    })

    // Send Telegram notification (non-blocking)
    notifyNewOrder(order).catch(() => {})

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    console.error('Order creation failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
