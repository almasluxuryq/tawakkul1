'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, Check, Clock, Ban, RefreshCw, LogIn, LogOut, ChevronDown, MessageCircle, Copy, MapPin, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface OrderItem {
  productId: string
  productName: string
  size: string
  color?: string | null
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
  deliveryFeeKZT?: number
  items: OrderItem[]
}

const STATUS_OPTIONS = ['RECEIVED', 'PAID', 'SHIPPED', 'TRANSIT', 'DELIVERED', 'CANCELLED'] as const

const STATUS_RU: Record<string, string> = {
  RECEIVED: 'Новый',
  PAID: 'Оплачен',
  SHIPPED: 'Отправлен',
  TRANSIT: 'В пути',
  DELIVERED: 'Доставлен',
  CANCELLED: 'Отменён',
}

const STATUS_ICONS: Record<string, typeof Package> = {
  RECEIVED: Clock,
  PAID: Check,
  SHIPPED: Package,
  TRANSIT: Truck,
  DELIVERED: Check,
  CANCELLED: Ban,
}

const STATUS_COLORS: Record<string, string> = {
  RECEIVED: 'bg-yellow-500/20 text-yellow-300',
  PAID: 'bg-blue-500/20 text-blue-300',
  SHIPPED: 'bg-purple-500/20 text-purple-300',
  TRANSIT: 'bg-orange-500/20 text-orange-300',
  DELIVERED: 'bg-green-500/20 text-green-300',
  CANCELLED: 'bg-red-500/20 text-red-300',
}

const COUNTRY_RU: Record<string, string> = { RU: 'Россия', KZ: 'Казахстан', WORLD: 'Другая страна' }
const COLOR_RU: Record<string, string> = { BLACK: 'Чёрный', NAVY: 'Синий', GREY: 'Серый' }

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('ALL')
  const [copied, setCopied] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setOrders(await res.json())
      else if (res.status === 401) { setIsAuthenticated(false); setToken('') }
    } catch { /* ignore */ }
    setLoading(false)
  }, [token])

  useEffect(() => {
    const saved = sessionStorage.getItem('admin-token')
    if (saved) { setToken(saved); setIsAuthenticated(true) }
  }, [])

  useEffect(() => {
    if (isAuthenticated && token) fetchOrders()
  }, [isAuthenticated, token, fetchOrders])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(false)
    const res = await fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${passwordInput}` } })
    if (res.ok) {
      setToken(passwordInput)
      setIsAuthenticated(true)
      sessionStorage.setItem('admin-token', passwordInput)
      setOrders(await res.json())
      setPasswordInput('')
    } else {
      setLoginError(true)
    }
  }

  const handleLogout = () => {
    setToken(''); setIsAuthenticated(false); setOrders([]); sessionStorage.removeItem('admin-token')
  }

  const updateOrder = async (id: string, data: { status?: string; trackingNumber?: string }) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const updated = await res.json()
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
    }
  }

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  // ── LOGIN ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-5">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-5"
        >
          <div className="text-center mb-2">
            <h1 className="text-2xl font-light mb-1">TAWAKKUL</h1>
            <p className="text-white/40 text-sm">Панель заказов</p>
          </div>
          <Input
            type="password"
            inputMode="text"
            value={passwordInput}
            onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false) }}
            placeholder="Пароль"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 py-6 text-base"
          />
          {loginError && <p className="text-red-400 text-sm text-center">Неверный пароль</p>}
          <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 py-6 text-base">
            <LogIn className="h-4 w-4 mr-2" /> Войти
          </Button>
        </motion.form>
      </div>
    )
  }

  const fmtDate = (iso: string) => new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  })
  const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽'
  const kzt = (n: number) => n.toLocaleString('ru-RU') + ' ₸'

  const counts: Record<string, number> = { ALL: orders.length }
  for (const s of STATUS_OPTIONS) counts[s] = orders.filter((o) => o.status === s).length
  const visible = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur z-20">
        <div className="max-w-3xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold leading-none">TAWAKKUL</h1>
            <p className="text-[11px] text-white/40 mt-1">{orders.length} заказов</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={fetchOrders} disabled={loading} className="text-white/60 hover:text-white h-10 w-10">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white/60 hover:text-white h-10 w-10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Status filter — horizontally scrollable */}
        <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {(['ALL', ...STATUS_OPTIONS] as string[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === s ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {s === 'ALL' ? 'Все' : STATUS_RU[s]} · {counts[s] ?? 0}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5">
        {visible.length === 0 && !loading && (
          <div className="text-center py-24">
            <Package className="h-10 w-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm">Заказов нет</p>
          </div>
        )}

        <div className="space-y-3">
          {visible.map((order) => {
            const isExpanded = expandedOrder === order.id
            const StatusIcon = STATUS_ICONS[order.status] || Clock
            const waPhone = order.phone.replace(/\D/g, '')

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]"
              >
                {/* Card head */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full text-left p-4 active:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium ${STATUS_COLORS[order.status]}`}>
                      <StatusIcon className="h-3 w-3" /> {STATUS_RU[order.status] || order.status}
                    </span>
                    <span className="text-base font-semibold tabular-nums">{rub(order.totalRUB)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{order.name} · <span className="text-white/50">{COUNTRY_RU[order.country] || order.country}, {order.city}</span></p>
                      <p className="text-[11px] text-white/35 mt-0.5 font-mono">{order.orderNumber} · {fmtDate(order.createdAt)}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-white/30 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4 space-y-5 bg-white/[0.015]">
                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full py-5 gap-2 text-white text-sm" style={{ backgroundColor: '#25D366' }}>
                          <MessageCircle className="h-4 w-4" /> WhatsApp
                        </Button>
                      </a>
                      <Button variant="outline" onClick={() => copy(order.phone)} className="w-full py-5 gap-2 border-white/15 text-white text-sm">
                        <Copy className="h-4 w-4" /> {copied === order.phone ? 'Скопировано' : order.phone}
                      </Button>
                    </div>

                    {/* Contact */}
                    <div className="text-sm space-y-1">
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Клиент</p>
                      <p>{order.name}</p>
                      <p className="text-white/60">{order.phone}</p>
                      {order.messenger && <p className="text-white/60">{order.messenger}</p>}
                      {order.email && <p className="text-white/60">{order.email}</p>}
                    </div>

                    {/* Delivery */}
                    <div className="text-sm space-y-1">
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Доставка</p>
                      <p>{COUNTRY_RU[order.country] || order.country}, {order.city}</p>
                      <p className="text-white/60">{order.address}</p>
                      <p className="text-white/50 text-xs">{order.deliveryMethod}{order.deliveryFeeKZT ? ` · доставка +${kzt(order.deliveryFeeKZT)}` : ''}</p>
                    </div>

                    {/* Payment */}
                    <div className="text-sm space-y-1">
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-1 flex items-center gap-1"><CreditCard className="h-3 w-3" /> Оплата</p>
                      <p>{order.paymentMethod === 'VTB' ? 'ВТБ (МИР)' : 'Kaspi'}</p>
                      <p className="text-white/60">{rub(order.totalRUB)} · {kzt(order.totalKZT)} · ${order.totalUSD}</p>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Товары</p>
                      <div className="space-y-1.5">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between gap-2 text-sm">
                            <span className="text-white/80">
                              {item.productName} · {item.size}{item.color ? `, ${COLOR_RU[item.color] || item.color}` : ''} ×{item.quantity}
                            </span>
                            <span className="text-white/50 whitespace-nowrap">{kzt(item.priceKZT)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status control */}
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Статус</p>
                      <div className="grid grid-cols-3 gap-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateOrder(order.id, { status: s })}
                            className={`py-2.5 rounded-lg text-xs font-medium transition-colors ${
                              order.status === s ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:text-white'
                            }`}
                          >
                            {STATUS_RU[s]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tracking */}
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Трек-номер (СДЭК / Казпочта)</p>
                      <Input
                        defaultValue={order.trackingNumber || ''}
                        placeholder="Введите трек-номер и уберите фокус"
                        className="bg-white/5 border-white/10 text-white text-sm h-11"
                        onBlur={(e) => {
                          if (e.target.value !== (order.trackingNumber || '')) {
                            updateOrder(order.id, { trackingNumber: e.target.value })
                          }
                        }}
                      />
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
