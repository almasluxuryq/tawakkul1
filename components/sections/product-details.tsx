'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

interface ProductBlockProps {
  label: string
  heading: string
  subtitle?: string
  specs?: string
  description: string
  imagePosition: 'left' | 'right'
  imageSrc: string
  imageAlt: string
  index: number
}

function ProductBlock({
  label,
  heading,
  subtitle,
  specs,
  description,
  imagePosition,
  imageSrc,
  imageAlt,
  index,
}: ProductBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-16 lg:py-28"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: imagePosition === 'left' ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative aspect-[4/5] overflow-hidden ${imageOrder}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`space-y-5 ${contentOrder}`}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
          {label}
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight">
          {heading}
        </h3>
        {specs && (
          <p className="text-sm tracking-wide text-neutral-400">{specs}</p>
        )}
        {subtitle && (
          <p className="text-base font-serif italic text-neutral-500">
            {subtitle}
          </p>
        )}
        <p className="text-base text-neutral-500 leading-relaxed max-w-md">
          {description}
        </p>
      </motion.div>
    </div>
  )
}

export function ProductDetailsSection() {
  const { t } = useI18n()

  return (
    <section id="product" className="section-light py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductBlock
          label={t.product.silhouette.label}
          heading={t.product.silhouette.heading}
          specs={t.product.silhouette.specs}
          description={t.product.silhouette.description}
          imagePosition="left"
          imageSrc="/photos/photo1.jpg"
          imageAlt="ONE UMMAH ZIP HOODIE — front and back view"
          index={0}
        />

        <ProductBlock
          label={t.product.message.label}
          heading={t.product.message.heading}
          subtitle={t.product.message.subtitle}
          description={t.product.message.description}
          imagePosition="right"
          imageSrc="/photos/photo7.jpg"
          imageAlt="ONE UMMAH back print close-up"
          index={1}
        />

        <ProductBlock
          label={t.product.detail.label}
          heading={t.product.detail.heading}
          subtitle={t.product.detail.subtitle}
          description={t.product.detail.description}
          imagePosition="left"
          imageSrc="/photos/photo13.JPG"
          imageAlt="Hoodie detail — back view"
          index={2}
        />
      </div>
    </section>
  )
}
