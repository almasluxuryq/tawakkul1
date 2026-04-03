'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

const gridItems = [
  { id: 1, span: 'col-span-2 row-span-2', photo: '/photos/photo12.JPG' },
  { id: 2, span: 'col-span-1 row-span-1', photo: '/photos/photo2.JPG' },
  { id: 3, span: 'col-span-1 row-span-2', photo: '/photos/photo9.JPG' },
  { id: 4, span: 'col-span-1 row-span-1', photo: '/photos/photo15.JPG' },
  { id: 5, span: 'col-span-2 row-span-1', photo: '/photos/photo3.JPEG' },
  { id: 6, span: 'col-span-1 row-span-1', photo: '/photos/photo8.JPG' },
]

export function PhotoGridSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + gridItems.length) % gridItems.length)
    }
  }

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % gridItems.length)
    }
  }

  return (
    <>
      <section ref={ref} className="section-darker py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-light">
              {t.photoGrid.heading}
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[120px] sm:auto-rows-[160px] lg:auto-rows-[180px]"
          >
            {gridItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                className={`${item.span} relative cursor-pointer overflow-hidden`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.photo}
                  alt={`Gallery ${item.id}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white/50 hover:text-white hover:bg-transparent z-10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-transparent z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-transparent z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl aspect-[3/4] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gridItems[lightboxIndex].photo}
                alt={`Gallery ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightboxIndex + 1} / {gridItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
