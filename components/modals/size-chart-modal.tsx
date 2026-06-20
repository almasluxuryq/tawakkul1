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
  { size: 'S', height: '165–172', weight: '55–68' },
  { size: 'M', height: '172–180', weight: '65–78' },
  { size: 'L', height: '180–188', weight: '75–90' },
  { size: 'XL', height: '188–196', weight: '88–110' },
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
                    {row.height}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {row.weight}
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
