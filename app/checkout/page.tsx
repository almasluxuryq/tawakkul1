'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Truck, Trash2, Minus, Plus, Info } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useI18n } from '@/lib/i18n/context'
import { useCart, PRODUCTS, COLOR_LABEL_RU } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Country = 'ru' | 'kz' | 'world'

const KZ_DELIVERY_FEE = 1600 // ₸, Казпочта

function useCheckoutSchema() {
  const { t } = useI18n()
  return z.object({
    name: z.string().min(1, t.validation.nameRequired).min(2, t.validation.nameMin),
    phone: z.string().min(1, t.validation.phoneRequired).regex(/^\+?[\d\s\-()]{7,}$/, t.validation.phoneInvalid),
    email: z.string().optional().refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: '' }
    ),
    messenger: z.string().min(1, t.validation.messengerRequired),
    city: z.string().min(1, t.validation.cityRequired),
    address: z.string().min(1, t.validation.addressRequired),
    postalCode: z.string().optional(),
  })
}

type CheckoutFormData = z.infer<ReturnType<typeof useCheckoutSchema>>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-red-400 mt-1">{message}</p>
}

const fmt = (price: number, currency: string) =>
  new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency

const COUNTRY_OPTIONS: { value: Country; label: string }[] = [
  { value: 'ru', label: '🇷🇺 Россия' },
  { value: 'kz', label: '🇰🇿 Казахстан' },
  { value: 'world', label: '🌍 Другая страна' },
]

export default function CheckoutPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { items, totalPriceKZT, totalPriceUSD, totalPriceRUB, clearCart, updateQuantity, removeItem } = useCart()

  const schema = useCheckoutSchema()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', messenger: '', city: '', address: '', postalCode: '' },
  })

  const [country, setCountry] = useState<Country>('ru')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (items.length === 0 && !isSubmitting) router.push('/')
  }, [items, router, isSubmitting])

  const deliveryFeeKZT = country === 'kz' ? KZ_DELIVERY_FEE : 0
  const paymentApi = country === 'ru' ? 'VTB' : 'KASPI'
  const countryApi = country === 'ru' ? 'RU' : country === 'kz' ? 'KZ' : 'WORLD'

  // Итоговая сумма «к оплате сейчас» в основной валюте страны
  const payNow =
    country === 'kz'
      ? { amount: totalPriceKZT + deliveryFeeKZT, cur: t.common.price.kzt }
      : country === 'world'
      ? { amount: totalPriceUSD, cur: t.common.price.usd }
      : { amount: totalPriceRUB, cur: t.common.price.rub }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          messenger: data.messenger || '',
          country: countryApi,
          city: data.city,
          address: data.address,
          postalCode: data.postalCode || '',
          deliveryMethod: country === 'kz' ? 'kazpost' : country === 'ru' ? 'cdek' : 'world',
          paymentMethod: paymentApi,
          items: items.map((item) => ({
            productId: item.productId,
            productName: PRODUCTS[item.productId].name,
            size: item.size,
            color: item.color || undefined,
            quantity: item.quantity,
            priceKZT: item.quantity * PRODUCTS[item.productId].priceKZT,
          })),
          totalKZT: totalPriceKZT,
          totalUSD: totalPriceUSD,
          totalRUB: totalPriceRUB,
          deliveryFeeKZT,
        }),
      })
      if (!res.ok) throw new Error('Order failed')
      const { orderNumber } = await res.json()

      sessionStorage.setItem(
        'lastOrder',
        JSON.stringify({
          orderNumber,
          items,
          totalPriceKZT,
          totalPriceUSD,
          totalPriceRUB,
          deliveryFeeKZT,
          country: countryApi,
          paymentMethod: paymentApi,
          name: data.name,
          phone: data.phone,
          city: data.city,
        })
      )
      const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]')
      savedOrders.unshift(orderNumber)
      localStorage.setItem('myOrders', JSON.stringify(savedOrders))

      clearCart()
      router.push('/checkout/success')
    } catch {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) return null

  const inputClass = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30'
  const inputErrorClass = 'bg-white/5 border-red-500/50 text-white placeholder:text-white/30 focus:border-red-400'

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">TAWAKKUL</span>
          </Link>
          <h1 className="text-lg font-medium">Оформление заказа</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ── ЛЕВО: форма ── */}
            <div className="lg:col-span-3 space-y-8">
              {/* Страна */}
              <section className="space-y-4">
                <h2 className="text-base font-medium text-white/80">Куда доставить?</h2>
                <div className="grid grid-cols-3 gap-2.5">
                  {COUNTRY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setCountry(opt.value)}
                      className={`py-3 px-2 text-sm rounded-lg border transition-all ${
                        country === opt.value
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Контакты */}
              <section className="space-y-4">
                <h2 className="text-base font-medium text-white/80 border-b border-white/10 pb-3">Контакты</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО *</Label>
                    <Input id="name" {...register('name')} placeholder="Иван Иванов" className={errors.name ? inputErrorClass : inputClass} />
                    <FieldError message={errors.name?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" type="tel" inputMode="tel" {...register('phone')} placeholder="+7 700 000 00 00" className={errors.phone ? inputErrorClass : inputClass} />
                    <FieldError message={errors.phone?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messenger">WhatsApp / Telegram *</Label>
                    <Input id="messenger" {...register('messenger')} placeholder="@username или номер" className={errors.messenger ? inputErrorClass : inputClass} />
                    <FieldError message={errors.messenger?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (необязательно)</Label>
                    <Input id="email" type="email" inputMode="email" {...register('email')} placeholder="email@example.com" className={errors.email ? inputErrorClass : inputClass} />
                  </div>
                </div>
              </section>

              {/* Доставка */}
              <section className="space-y-4">
                <h2 className="text-base font-medium text-white/80 border-b border-white/10 pb-3">Адрес доставки</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Город *</Label>
                    <Input id="city" {...register('city')} placeholder="Москва" className={errors.city ? inputErrorClass : inputClass} />
                    <FieldError message={errors.city?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Индекс</Label>
                    <Input id="postalCode" inputMode="numeric" {...register('postalCode')} placeholder="101000" className={inputClass} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">
                      {country === 'ru' ? 'Адрес / пункт выдачи СДЭК *' : country === 'kz' ? 'Адрес (Казпочта) *' : 'Полный адрес *'}
                    </Label>
                    <Input id="address" {...register('address')} placeholder="Улица, дом, квартира" className={errors.address ? inputErrorClass : inputClass} />
                    <FieldError message={errors.address?.message} />
                  </div>
                </div>

                {/* Инфо по доставке */}
                <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <Truck className="h-5 w-5 text-white/50 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-white/70 leading-relaxed">
                    {country === 'ru' && (
                      <>Доставка <b>СДЭК</b> по всей России (срок ~до недели, ин ша Аллах). Доставку (~700–1000 ₽) вы оплачиваете <b>при получении</b> — на сайте платите только за товар.</>
                    )}
                    {country === 'kz' && (
                      <>Доставка <b>Казпочтой</b> по Казахстану (срок ~до недели, ин ша Аллах). Стоимость доставки <b>+{fmt(KZ_DELIVERY_FEE, t.common.price.kzt)}</b> — включена в сумму к оплате.</>
                    )}
                    {country === 'world' && (
                      <>Доставка по миру. Стоимость доставки рассчитаем индивидуально и согласуем с вами в <b>WhatsApp / Telegram</b> после оформления. Сейчас оплачивается только товар.</>
                    )}
                  </div>
                </div>
              </section>

              {/* Оплата (инфо) */}
              <section className="space-y-3">
                <h2 className="text-base font-medium text-white/80 border-b border-white/10 pb-3">Оплата</h2>
                <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <Info className="h-5 w-5 text-white/50 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-white/70 leading-relaxed">
                    {country === 'ru' && <>Оплата переводом на карту <b>ВТБ (МИР)</b>. Реквизиты появятся на следующем шаге — оплатите и пришлите чек в WhatsApp / Telegram.</>}
                    {country === 'kz' && <>Оплата через <b>Kaspi</b> по ссылке. Появится на следующем шаге — оплатите и пришлите чек в WhatsApp / Telegram.</>}
                    {country === 'world' && <>Оплата переводом на карту <b>Kaspi</b> (в долларах). Реквизиты появятся на следующем шаге — оплатите и пришлите чек в WhatsApp / Telegram.</>}
                  </div>
                </div>
              </section>
            </div>

            {/* ── ПРАВО: итог ── */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24 space-y-5 p-5 sm:p-6 bg-white/5 rounded-xl border border-white/10">
                <h2 className="text-lg font-medium">Ваш заказ</h2>

                <div className="space-y-3">
                  {items.map((item) => {
                    const product = PRODUCTS[item.productId]
                    return (
                      <div key={`${item.productId}-${item.size}-${item.color ?? ''}`} className="flex gap-3">
                        <div className="w-14 h-16 relative flex-shrink-0 overflow-hidden rounded bg-white/5">
                          <Image src={product.thumb} alt={product.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-medium leading-tight">{product.name}</h3>
                            <button type="button" onClick={() => removeItem(item.productId, item.size, item.color)} className="text-white/30 hover:text-red-400 flex-shrink-0" aria-label="Удалить">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-white/40 mt-0.5">
                            {t.cart.size}: {item.size}{item.color ? ` · ${COLOR_LABEL_RU[item.color]}` : ''}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1, item.color)} className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-white/60 hover:border-white/40" aria-label="−"><Minus className="h-3 w-3" /></button>
                              <span className="text-sm w-5 text-center">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1, item.color)} className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-white/60 hover:border-white/40" aria-label="+"><Plus className="h-3 w-3" /></button>
                            </div>
                            <span className="text-sm font-medium">{fmt(item.quantity * product.priceRUB, t.common.price.rub)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Товары</span>
                    <span>{fmt(totalPriceRUB, t.common.price.rub)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Доставка</span>
                    <span className="text-right text-white/70">
                      {country === 'ru' && 'при получении'}
                      {country === 'kz' && `+${fmt(KZ_DELIVERY_FEE, t.common.price.kzt)}`}
                      {country === 'world' && 'согласуем'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between">
                    <span className="text-base font-medium">К оплате сейчас</span>
                    <div className="text-right">
                      <span className="text-2xl font-semibold tabular-nums">{fmt(payNow.amount, payNow.cur)}</span>
                      <p className="text-[11px] text-white/40 mt-0.5">
                        {fmt(totalPriceKZT + deliveryFeeKZT, t.common.price.kzt)} · {fmt(totalPriceUSD, t.common.price.usd)}
                      </p>
                    </div>
                  </div>
                  {country === 'ru' && (
                    <p className="text-[11px] text-white/40 mt-2">Доставка СДЭК оплачивается отдельно при получении.</p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-black hover:bg-white/90 py-6 text-base font-medium disabled:opacity-50">
                  {isSubmitting ? '...' : 'Оформить заказ'}
                </Button>
                <p className="text-[11px] text-white/40 text-center leading-relaxed">
                  После оформления вы получите номер заказа и реквизиты для оплаты. Оплату подтверждаете чеком в WhatsApp / Telegram.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
