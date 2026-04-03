'use client'

import { useI18n } from '@/lib/i18n/context'
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

const sizeData = [
  { size: 'S', chest: 118, length: 70, shoulders: 55, sleeve: 62 },
  { size: 'M', chest: 124, length: 72, shoulders: 57, sleeve: 64 },
  { size: 'L', chest: 130, length: 74, shoulders: 59, sleeve: 66 },
  { size: 'XL', chest: 136, length: 76, shoulders: 61, sleeve: 68 },
]

interface SizeChartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SizeChartModal({ open, onOpenChange }: SizeChartModalProps) {
  const { t } = useI18n()

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
                  {t.sizeChart.chest}
                </TableHead>
                <TableHead className="text-white/50 font-normal text-right">
                  {t.sizeChart.length}
                </TableHead>
                <TableHead className="text-white/50 font-normal text-right">
                  {t.sizeChart.shoulders}
                </TableHead>
                <TableHead className="text-white/50 font-normal text-right">
                  {t.sizeChart.sleeve}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizeData.map((row) => (
                <TableRow
                  key={row.size}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium">{row.size}</TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.chest}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.length}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.shoulders}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.sleeve}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <p className="mt-6 text-sm text-white/40 text-center">
            {t.sizeChart.note}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
