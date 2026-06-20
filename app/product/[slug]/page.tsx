import { notFound } from 'next/navigation'
import { getProductBySlug, PRODUCT_LIST } from '@/lib/cart/products'
import { ProductContent } from '@/components/product/product-content'

export function generateStaticParams() {
  return PRODUCT_LIST.map((p) => ({ slug: p.slug }))
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <ProductContent productId={product.id} />
}
