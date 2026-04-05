'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, Check, Clock, Ban, RefreshCw, LogIn, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface OrderItem {
  size: string
  quantity: number
  priceKZT: number
}

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  name: string
  phone: string
  email: string | null
  messenger: string | null
  country: string
  city: string
  address: string
  deliveryMethod: string
  trackingNumber: string | null
  paymentMethod: string
  status: string
  totalKZT: number
  totalUSD: number
  totalRUB: number
  items: OrderItem[]
}

const STATUS_OPTIONS = ['RECEIVED', 'PAID', 'SHIPPED', 'TRANSIT', 'DELIVERED', 'CANCELLED'] as const

const STATUS_ICONS: Record<string, typeof Package> = {
  RECEIVED: Clock,
  PAID: Check,
  SHIPPED: Package,
  TRANSIT: Truck,
  DELIVERED: Check,
  CANCELLED: Ban,
}

const STATUS_COLORS: Record<string, string> = {
  RECEIVED: 'bg-yellow-500/20 text-yellow-400',
  PAID: 'bg-blue-500/20 text-blue-400',
  SHIPPED: 'bg-purple-500/20 text-purple-400',
  TRANSIT: 'bg-orange-500/20 text-orange-400',
  DELIVERED: 'bg-green-500/20 text-green-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
}

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setOrders(await res.json())
      } else if (res.status === 401) {
        setIsAuthenticated(false)
        setToken('')
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [token])

  useEffect(() => {
    const saved = sessionStorage.getItem('admin-token')
    if (saved) {
      setToken(saved)
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && token) fetchOrders()
  }, [isAuthenticated, token, fetchOrders])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/orders', {
      headers: { Authorization: `Bearer ${passwordInput}` },
    })
    if (res.ok) {
      setToken(passwordInput)
      setIsAuthenticated(true)
      sessionStorage.setItem('admin-token', passwordInput)
      setOrders(await res.json())
    }
    setPasswordInput('')
  }

  const handleLogout = () => {
    setToken('')
    setIsAuthenticated(false)
    setOrders([])
    sessionStorage.removeItem('admin-token')
  }

  const updateOrder = async (id: string, data: { status?: string; trackingNumber?: string }) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const updated = await res.json()
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-light mb-2">TAWAKKUL</h1>
            <p className="text-white/40 text-sm">Admin Panel</p>
          </div>
          <Input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Secret key"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 py-6"
          />
          <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 py-6">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </motion.form>
      </div>
    )
  }

  const formatDate = (iso: string) => new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₸'

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">TAWAKKUL Admin</h1>
            <p className="text-xs text-white/40">{orders.length} orders</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchOrders}
              disabled={loading}
              className="text-white/50 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-white/50 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {orders.length === 0 && !loading && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No orders yet</p>
          </div>
        )}

        <div className="space-y-3">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id
            const StatusIcon = STATUS_ICONS[order.status] || Clock

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-white/10 rounded-lg overflow-hidden"
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                >
                  <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                    <StatusIcon className="h-3 w-3 inline mr-1" />
                    {order.status}
                  </span>
                  <span className="font-mono text-sm">{order.orderNumber}</span>
                  <span className="text-white/50 text-sm hidden sm:block">{order.name}</span>
                  <span className="text-white/50 text-sm hidden md:block">{order.city}</span>
                  <span className="ml-auto font-medium text-sm">{formatPrice(order.totalKZT)}</span>
                  <span className="text-white/30 text-xs hidden sm:block">{formatDate(order.createdAt)}</span>
                  <ChevronDown className={`h-4 w-4 text-white/30 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4 space-y-4 bg-white/[0.02]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-white/40 mb-1">Contact</p>
                        <p>{order.name}</p>
                        <p className="text-white/60">{order.phone}</p>
                        {order.email && <p className="text-white/60">{order.email}</p>}
                        {order.messenger && <p className="text-white/60">{order.messenger}</p>}
                      </div>
                      <div>
                        <p className="text-white/40 mb-1">Delivery</p>
                        <p>{order.country} — {order.city}</p>
                        <p className="text-white/60">{order.address}</p>
                        <p className="text-white/60">{order.deliveryMethod}</p>
                      </div>
                      <div>
                        <p className="text-white/40 mb-1">Payment</p>
                        <p>{order.paymentMethod}</p>
                        <p className="text-white/60">{formatPrice(order.totalKZT)} / ${order.totalUSD} / {order.totalRUB}₽</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-white/40 text-sm mb-2">Items</p>
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-sm">
                            ONE UMMAH ZIP HOODIE — {item.size} x{item.quantity} — {formatPrice(item.priceKZT)}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                        <span className="text-xs text-white/40">Tracking:</span>
                        <Input
                          defaultValue={order.trackingNumber || ''}
                          placeholder="CDEK-..."
                          className="bg-white/5 border-white/10 text-white text-sm h-8"
                          onBlur={(e) => {
                            if (e.target.value !== (order.trackingNumber || '')) {
                              updateOrder(order.id, { trackingNumber: e.target.value })
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
