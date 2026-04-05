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
  country: z.enum(['KZ', 'RU']),
  city: z.string().min(1),
  address: z.string().min(1),
  postalCode: z.string().optional(),
  deliveryMethod: z.string().min(1),
  paymentMethod: z.enum(['KASPI', 'VTB', 'COD']),
  items: z.array(z.object({
    size: z.string(),
    quantity: z.number().int().positive(),
    priceKZT: z.number().int().positive(),
  })).min(1),
  totalKZT: z.number().int().positive(),
  totalUSD: z.number().int().positive(),
  totalRUB: z.number().int().positive(),
})

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `OU-${date}-${rand}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createOrderSchema.parse(body)

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
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
        items: {
          create: data.items.map((item) => ({
            size: item.size,
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
