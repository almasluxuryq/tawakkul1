export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params

    const order = await prisma.order.findUnique({
      where: { orderNumber: orderNumber.toUpperCase() },
      include: { items: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      date: order.createdAt.toISOString(),
      status: order.status,
      trackingNumber: order.trackingNumber,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        quantity: item.quantity,
        priceKZT: item.priceKZT,
      })),
      address: `${order.city}, ${order.address}`,
      totalKZT: order.totalKZT,
      name: order.name,
      phone: order.phone,
      paymentMethod: order.paymentMethod,
    })
  } catch (error) {
    console.error('Order lookup failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
