'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Country = 'kz' | 'ru'
type PaymentMethod = 'kaspi' | 'vtb' | 'cod'

const deliveryMethods = {
  kz: ['kazpost', 'cdek'] as const,
  ru: ['cdek', 'pochta'] as const,
}

export default function CheckoutPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { items, totalPriceKZT, totalPriceUSD, totalPriceRUB, clearCart } = useCart()

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [messenger, setMessenger] = useState('')
  const [country, setCountry] = useState<Country>('kz')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<string>('cdek')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kaspi')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if cart is empty
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Generate order number
    const orderNumber = `OU-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store order details in sessionStorage for success page
    sessionStorage.setItem(
      'lastOrder',
      JSON.stringify({
        orderNumber,
        items,
        totalPriceKZT,
        name,
        phone,
        city,
        paymentMethod,
      })
    )

    // Clear cart and redirect
    clearCart()
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">twkkl</span>
            </Link>
            <h1 className="text-lg font-medium">{t.checkout.title}</h1>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <form onSubmit={handleSubmit}>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.checkout.contact.namePlaceholder}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.checkout.contact.phone} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.checkout.contact.phonePlaceholder}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.checkout.contact.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.checkout.contact.emailPlaceholder}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messenger">
                      {t.checkout.contact.messenger}
                    </Label>
                    <Input
                      id="messenger"
                      value={messenger}
                      onChange={(e) => setMessenger(e.target.value)}
                      placeholder={t.checkout.contact.messengerPlaceholder}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
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
                      onValueChange={(v) => setCountry(v as Country)}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.checkout.delivery.cityPlaceholder}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">
                      {t.checkout.delivery.address} *
                    </Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.checkout.delivery.addressPlaceholder}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      {t.checkout.delivery.postalCode}
                    </Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder={t.checkout.delivery.postalCodePlaceholder}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
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
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                  className="space-y-3"
                >
                  {/* Kaspi Pay - Only for Kazakhstan */}
                  {country === 'kz' && (
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
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {t.checkout.payment.kaspi}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-[#F14635] text-white rounded">
                            Kaspi
                          </span>
                        </div>
                        <p className="text-sm text-white/50 mt-1">
                          {t.checkout.payment.kaspiDescription}
                        </p>
                      </div>
                    </label>
                  )}

                  {/* VTB Bank */}
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
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {t.checkout.payment.vtb}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-[#009FDF] text-white rounded">
                          VTB
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mt-1">
                        {t.checkout.payment.vtbDescription}
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    htmlFor="cod"
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-white bg-white/5'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex-1">
                      <span className="font-medium">{t.checkout.payment.cod}</span>
                      <p className="text-sm text-white/50 mt-1">
                        {t.checkout.payment.codDescription}
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

                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.size} className="flex gap-4">
                      <div className="w-16 h-20 bg-neutral-800 flex-shrink-0 flex items-center justify-center">
                        <span className="text-white/10 text-[8px] tracking-widest uppercase">
                          IMG
                        </span>
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
                  {isSubmitting
                    ? '...'
                    : paymentMethod === 'cod'
                      ? t.checkout.summary.submitCod
                      : t.checkout.summary.submit}
                </Button>

                {/* Trust badges */}
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
