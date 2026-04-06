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
  { size: 'S', width: 63, length: 71, sleeve: 60 },
  { size: 'M', width: 64, length: 73, sleeve: 60 },
  { size: 'L', width: 67, length: 74, sleeve: 61 },
  { size: 'XL', width: 69, length: 75, sleeve: 61 },
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
                  {t.sizeChart.width}
                </TableHead>
                <TableHead className="text-white/50 font-normal text-right">
                  {t.sizeChart.length}
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
                    {row.width}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.length}
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
