'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Truck, RotateCcw, AlertTriangle, Minus, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useI18n } from '@/lib/i18n/context'
import { useCart, PRODUCTS } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Country = 'kz' | 'ru'
type PaymentMethod = 'kaspi' | 'vtb'

const deliveryMethods = {
  kz: ['kazpost', 'cdek'] as const,
  ru: ['cdek', 'pochta'] as const,
}

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

export default function CheckoutPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { items, totalPriceKZT, totalPriceUSD, totalPriceRUB, clearCart, updateQuantity, removeItem, addItem } = useCart()

  const schema = useCheckoutSchema()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      messenger: '',
      city: '',
      address: '',
      postalCode: '',
    },
  })

  const [country, setCountry] = useState<Country>('kz')
  const [deliveryMethod, setDeliveryMethod] = useState<string>('cdek')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kaspi')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCountryChange = (v: Country) => {
    setCountry(v)
    setPaymentMethod(v === 'kz' ? 'kaspi' : 'vtb')
  }

  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      router.push('/')
    }
  }, [items, router, isSubmitting])

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  const deliveryCosts: Record<string, { kzt: number; rub: number; usd: number }> = {
    cdek: { kzt: 5900, rub: 1000, usd: 12 },
    kazpost: { kzt: 1600, rub: 300, usd: 3 },
    pochta: { kzt: 5900, rub: 1000, usd: 12 },
  }
  const costs = deliveryCosts[deliveryMethod] || deliveryCosts.cdek
  const estimatedDeliveryCost = country === 'kz' ? costs.kzt : costs.rub
  const deliveryCurrency = country === 'kz' ? t.common.price.kzt : t.common.price.rub

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
          country: country.toUpperCase(),
          city: data.city,
          address: data.address,
          postalCode: data.postalCode || '',
          deliveryMethod,
          paymentMethod: paymentMethod.toUpperCase(),
          items: items.map((item) => ({
            productId: item.productId,
            productName: PRODUCTS[item.productId].name,
            size: item.size,
            quantity: item.quantity,
            priceKZT: item.quantity * PRODUCTS[item.productId].priceKZT,
          })),
          totalKZT: totalPriceKZT,
          totalUSD: totalPriceUSD,
          totalRUB: totalPriceRUB,
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
          name: data.name,
          phone: data.phone,
          city: data.city,
          paymentMethod,
        })
      )

      // Save order number to localStorage for tracking
      const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]')
      savedOrders.unshift(orderNumber)
      localStorage.setItem('myOrders', JSON.stringify(savedOrders))

      clearCart()
      router.push('/checkout/success')
    } catch {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  const inputClass = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30'
  const inputErrorClass = 'bg-white/5 border-red-500/50 text-white placeholder:text-white/30 focus:border-red-400'

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">TAWAKKUL</span>
            </Link>
            <h1 className="text-lg font-medium">{t.checkout.title}</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium border-b border-white/10 pb-4">
                  {t.checkout.contact.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.checkout.contact.name} *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder={t.checkout.contact.namePlaceholder}
                      className={errors.name ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.checkout.contact.phone} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder={t.checkout.contact.phonePlaceholder}
                      className={errors.phone ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.checkout.contact.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder={t.checkout.contact.emailPlaceholder}
                      className={errors.email ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messenger">
                      {t.checkout.contact.messenger} *
                    </Label>
                    <Input
                      id="messenger"
                      {...register('messenger')}
                      placeholder={t.checkout.contact.messengerPlaceholder}
                      className={errors.messenger ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.messenger?.message} />
                  </div>
                </div>
              </motion.section>

              {/* Delivery Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium border-b border-white/10 pb-4">
                  {t.checkout.delivery.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.checkout.delivery.country}</Label>
                    <Select
                      value={country}
                      onValueChange={(v) => handleCountryChange(v as Country)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        <SelectItem value="kz" className="text-white">
                          Казахстан
                        </SelectItem>
                        <SelectItem value="ru" className="text-white">
                          Россия
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t.checkout.delivery.city} *</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder={t.checkout.delivery.cityPlaceholder}
                      className={errors.city ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.city?.message} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">
                      {t.checkout.delivery.address} *
                    </Label>
                    <Input
                      id="address"
                      {...register('address')}
                      placeholder={t.checkout.delivery.addressPlaceholder}
                      className={errors.address ? inputErrorClass : inputClass}
                    />
                    <FieldError message={errors.address?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      {t.checkout.delivery.postalCode}
                    </Label>
                    <Input
                      id="postalCode"
                      {...register('postalCode')}
                      placeholder={t.checkout.delivery.postalCodePlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.checkout.delivery.method}</Label>
                    <Select
                      value={deliveryMethod}
                      onValueChange={setDeliveryMethod}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        {deliveryMethods[country].map((method) => (
                          <SelectItem
                            key={method}
                            value={method}
                            className="text-white"
                          >
                            {t.checkout.delivery.methods[method]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">
                      {t.checkout.delivery.cost}
                    </span>
                    <span>~{formatPrice(estimatedDeliveryCost, deliveryCurrency)}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    {t.checkout.delivery.costNote}
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    {t.checkout.delivery.estimatedTime}
                  </p>
                </div>
                {deliveryMethod === 'cdek' && (
                  <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-200 font-medium">
                      {t.checkout.delivery.cdekWarning}
                    </p>
                  </div>
                )}
                {deliveryMethod === 'kazpost' && (
                  <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <Truck className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-200 font-medium">
                      {t.checkout.delivery.kazpostWarning}
                    </p>
                  </div>
                )}
              </motion.section>

              {/* Payment Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium border-b border-white/10 pb-4">
                  {t.checkout.payment.title}
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                  className="space-y-3"
                >
                  <label
                    htmlFor="kaspi"
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'kaspi'
                        ? 'border-white bg-white/5'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <RadioGroupItem value="kaspi" id="kaspi" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{t.checkout.payment.kaspiTitle}</span>
                        <span className="text-xs px-2 py-0.5 bg-[#F14635] text-white rounded">
                          {t.checkout.payment.kaspiSubtitle}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mt-1">
                        {t.checkout.payment.kaspiDescription}
                      </p>
                    </div>
                  </label>

                  <label
                    htmlFor="vtb"
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'vtb'
                        ? 'border-white bg-white/5'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <RadioGroupItem value="vtb" id="vtb" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{t.checkout.payment.vtbTitle}</span>
                        <span className="text-xs px-2 py-0.5 bg-[#009FDF] text-white rounded">
                          {t.checkout.payment.vtbSubtitle}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mt-1">
                        {t.checkout.payment.vtbDescription}
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              </motion.section>
            </div>

            {/* Right Column - Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-8 space-y-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-xl font-medium">
                  {t.checkout.summary.title}
                </h2>

                <div className="space-y-4">
                  {items.map((item) => {
                    const product = PRODUCTS[item.productId]
                    return (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-14 h-18 relative flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={product.thumb}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-medium truncate">
                            {product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId, item.size)}
                            className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                            aria-label={t.cart.remove}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50">{t.cart.size}:</span>
                          <div className="flex gap-1">
                            {product.sizes.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => {
                                  if (size !== item.size) {
                                    const qty = item.quantity
                                    removeItem(item.productId, item.size)
                                    addItem(item.productId, size, qty)
                                  }
                                }}
                                className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                                  size === item.size
                                    ? 'border-white bg-white text-black'
                                    : 'border-white/20 text-white/50 hover:border-white/40'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors"
                              aria-label={t.cart.decreaseQty}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm w-5 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors"
                              aria-label={t.cart.increaseQty}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium">
                            {formatPrice(item.quantity * product.priceKZT, t.common.price.kzt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">
                      {t.checkout.summary.product}
                    </span>
                    <span>{formatPrice(totalPriceKZT, t.common.price.kzt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">
                      {t.checkout.summary.delivery}
                    </span>
                    {deliveryMethod === 'kazpost' ? (
                      <span>{formatPrice(costs.kzt, t.common.price.kzt)}</span>
                    ) : (
                      <span className="text-white/50">
                        {t.checkout.summary.deliveryCalculating}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">
                      {t.checkout.summary.total}
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-medium">
                        {formatPrice(
                          totalPriceKZT + (deliveryMethod === 'kazpost' ? costs.kzt : 0),
                          t.common.price.kzt
                        )}
                      </span>
                      <p className="text-xs text-white/40">
                        ({formatPrice(
                          totalPriceUSD + (deliveryMethod === 'kazpost' ? costs.usd : 0),
                          t.common.price.usd
                        )} /{' '}
                        {formatPrice(
                          totalPriceRUB + (deliveryMethod === 'kazpost' ? costs.rub : 0),
                          t.common.price.rub
                        )})
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-white/90 py-6 text-base font-medium disabled:opacity-50"
                >
                  {isSubmitting ? '...' : t.checkout.summary.submit}
                </Button>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <Shield className="h-4 w-4 text-white/40" />
                    <span className="text-[10px] text-white/40">
                      {t.checkout.trust.secure}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Truck className="h-4 w-4 text-white/40" />
                    <span className="text-[10px] text-white/40">
                      {t.checkout.trust.delivery}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <RotateCcw className="h-4 w-4 text-white/40" />
                    <span className="text-[10px] text-white/40">
                      {t.checkout.trust.return}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </main>
    </div>
  )
}
