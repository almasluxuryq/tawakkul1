'use client'

import { useI18n } from '@/lib/i18n/context'
import { Size, ProductId } from '@/lib/cart/products'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Row = {
  size: Size
  height: string
  weight: string
  /** Замеры изделия, см (если известны) */
  garment?: { width: string; length: string; shoulders: string; sleeve: string }
}

const GARMENT_T = {
  ru: { title: 'Замеры изделия, см', width: 'Ширина', length: 'Длина', shoulders: 'Плечи', sleeve: 'Рукав' },
  kk: { title: 'Бұйым өлшемдері, см', width: 'Ені', length: 'Ұзындығы', shoulders: 'Иық', sleeve: 'Жең' },
  en: { title: 'Garment measurements, cm', width: 'Width', length: 'Length', shoulders: 'Shoulders', sleeve: 'Sleeve' },
} as const

// Рекомендуемый рост (см) / вес (кг) — отдельно для каждой модели.
const SIZE_CHARTS: Record<ProductId, Row[]> = {
  'tawakkul-hoodie': [
    { size: 'S', height: '160–170', weight: '50–65', garment: { width: '66', length: '68', shoulders: '65', sleeve: '53.5' } },
    { size: 'M', height: '168–175', weight: '63–75', garment: { width: '68', length: '70', shoulders: '67', sleeve: '54.5' } },
    { size: 'L', height: '174–182', weight: '73–85', garment: { width: '70', length: '72', shoulders: '69', sleeve: '55.5' } },
    { size: 'XL', height: '180–188', weight: '83–95', garment: { width: '72', length: '74', shoulders: '71', sleeve: '56.5' } },
  ],
  'one-ummah-zip-hoodie': [
    { size: 'S', height: '165–172', weight: '55–68' },
    { size: 'M', height: '172–180', weight: '65–78' },
    { size: 'L', height: '180–188', weight: '75–90' },
    { size: 'XL', height: '188–196', weight: '88–110' },
  ],
  'awrah-shorts': [
    { size: 'M', height: '165–175', weight: '60–73' },
    { size: 'L', height: '176–185', weight: '75–88' },
    { size: 'XL', height: '183–195+', weight: '90–105+' },
  ],
}

interface SizeChartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sizes?: Size[]
  productId: ProductId
}

export function SizeChartModal({ open, onOpenChange, sizes, productId }: SizeChartModalProps) {
  const { t, language } = useI18n()
  const g = GARMENT_T[language]
  const data = SIZE_CHARTS[productId]
  const rows = sizes ? data.filter((r) => sizes.includes(r.size)) : data
  const hasGarment = rows.some((r) => r.garment)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 backdrop-blur-md border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">
            {t.sizeChart.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Size measurements in centimeters
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50 font-normal">
                  {t.sizeChart.size}
                </TableHead>
                <TableHead className="text-white/50 font-normal text-right">
                  {t.sizeChart.width}
                </TableHead>
                <TableHead className="text-white/50 font-normal text-right">
                  {t.sizeChart.length}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.size}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium">{row.size}</TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.height}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.weight}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {hasGarment && (
            <div className="mt-6">
              <p className="text-xs tracking-[0.15em] uppercase text-white/50 mb-2">{g.title}</p>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/50 font-normal">{t.sizeChart.size}</TableHead>
                    <TableHead className="text-white/50 font-normal text-right">{g.width}</TableHead>
                    <TableHead className="text-white/50 font-normal text-right">{g.length}</TableHead>
                    <TableHead className="text-white/50 font-normal text-right">{g.shoulders}</TableHead>
                    <TableHead className="text-white/50 font-normal text-right">{g.sleeve}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) =>
                    row.garment ? (
                      <TableRow key={row.size} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">{row.size}</TableCell>
                        <TableCell className="text-right text-white/70">{row.garment.width}</TableCell>
                        <TableCell className="text-right text-white/70">{row.garment.length}</TableCell>
                        <TableCell className="text-right text-white/70">{row.garment.shoulders}</TableCell>
                        <TableCell className="text-right text-white/70">{row.garment.sleeve}</TableCell>
                      </TableRow>
                    ) : null
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <p className="mt-6 text-sm text-white/40 text-center">
            {t.sizeChart.note}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
