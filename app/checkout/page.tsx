'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useI18n } from '@/lib/i18n/context'
import { useCart, PRODUCT } from '@/lib/cart/context'
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
    messenger: z.string().optional(),
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
  const { items, totalPriceKZT, totalPriceUSD, totalPriceRUB, clearCart } = useCart()

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
    if (items.length === 0) {
      router.push('/')
    }
  }, [items, router])

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  const estimatedDeliveryCost = country === 'kz' ? 1600 : 1000
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
            size: item.size,
            quantity: item.quantity,
            priceKZT: item.quantity * PRODUCT.priceKZT,
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
                      {t.checkout.contact.messenger}
                    </Label>
                    <Input
                      id="messenger"
                      {...register('messenger')}
                      placeholder={t.checkout.contact.messengerPlaceholder}
                      className={inputClass}
                    />
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
                <div className="p-4 rounded-lg border border-white bg-white/5">
                  {country === 'kz' ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium">{t.checkout.payment.kaspiTitle}</span>
                        <span className="text-xs px-2 py-0.5 bg-[#F14635] text-white rounded">
                          {t.checkout.payment.kaspiSubtitle}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mt-2">
                        {t.checkout.payment.kaspiDescription}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium">{t.checkout.payment.vtbTitle}</span>
                        <span className="text-xs px-2 py-0.5 bg-[#009FDF] text-white rounded">
                          {t.checkout.payment.vtbSubtitle}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mt-2">
                        {t.checkout.payment.vtbDescription}
                      </p>
                    </div>
                  )}
                </div>
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
                  {items.map((item) => (
                    <div key={item.size} className="flex gap-4">
                      <div className="w-16 h-20 relative flex-shrink-0 overflow-hidden">
                        <Image
                          src="/photos/photo11.png"
                          alt={PRODUCT.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">
                          {PRODUCT.name}
                        </h3>
                        <p className="text-xs text-white/50 mt-1">
                          {t.cart.size}: {item.size} · {t.cart.quantity}:{' '}
                          {item.quantity}
                        </p>
                        <p className="text-sm mt-2">
                          {formatPrice(
                            item.quantity * PRODUCT.priceKZT,
                            t.common.price.kzt
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
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
                    <span className="text-white/50">
                      {t.checkout.summary.deliveryCalculating}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">
                      {t.checkout.summary.total}
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-medium">
                        {formatPrice(totalPriceKZT, t.common.price.kzt)}
                      </span>
                      <p className="text-xs text-white/40">
                        ({formatPrice(totalPriceUSD, t.common.price.usd)} /{' '}
                        {formatPrice(totalPriceRUB, t.common.price.rub)})
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
