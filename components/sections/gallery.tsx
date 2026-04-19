'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

const galleryPhotos = [
  '/photos/new1.jpg',
  '/photos/photo1.jpg',
  '/photos/new4.jpg',
  '/photos/photo13.JPG',
  '/photos/new5.jpg',
  '/photos/photo7.jpg',
  '/photos/new6.jpg',
  '/photos/photo4.PNG',
  '/photos/new7.jpg',
  '/photos/photo10.PNG',
  '/photos/new8.jpg',
  '/photos/photo15.JPG',
]

export function GallerySection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="gallery" ref={ref} className="section-light py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
            {t.gallery.heading}
            <br />
            <span className="font-serif italic text-neutral-500">
              {t.gallery.headingItalic}
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Scrollable Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4"
        >
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={photo}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="320px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
