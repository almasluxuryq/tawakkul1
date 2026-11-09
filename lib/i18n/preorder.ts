import { Language } from './translations'
import type { ProductId } from '../cart/products'

// Тексты предзаказа (RU / KZ / EN).
// Общие подписи — PREORDER_T. Тексты конкретного товара — PREORDER_PRODUCT_T.

export interface PreorderStrings {
  priceLabel: string
  regularLabel: string
  savingsLabel: string
  infoTitle: string
  noRefund: string
  faqLink: string
  addToCart: string
  stickyNote: string
  checkoutTitle: string
  checkoutCommon: string
  agree: string
  agreeError: string
  msgTag: string
  sizeHelp: string
}

export interface PreorderProductStrings {
  /** Бейдж рядом с ценой (например «Партия — 50 шт.») */
  limited?: string
  /** Пункты блока «Как работает предзаказ» на странице товара */
  points: string[]
  /** Короткая заметка в корзине/оформлении/после заказа */
  note: string
}

export const PREORDER_T: Record<Language, PreorderStrings> = {
  ru: {
    priceLabel: 'Цена предзаказа',
    regularLabel: 'Цена после поступления',
    savingsLabel: 'Ваша выгода',
    infoTitle: 'Как работает предзаказ',
    noRefund: '100% предоплата. Возврат средств по предзаказу не осуществляется — оформляйте, только если уверены в покупке и размере.',
    faqLink: 'Подробнее о предзаказе',
    addToCart: 'Добавить в корзину',
    stickyNote: 'Предзаказ',
    checkoutTitle: 'В заказе есть предзаказ',
    checkoutCommon: 'Оплата — 100% сразу. После поступления отправляем СДЭК или Казпочтой, сроки доставки как обычно. Возврат средств по предзаказу не осуществляется.',
    agree: 'Я понимаю, что это предзаказ, оплачиваю его осознанно и согласен(на): возврат средств не осуществляется.',
    agreeError: 'Подтвердите условия предзаказа',
    msgTag: 'ПРЕДЗАКАЗ',
    sizeHelp: 'Не уверены с размером? Напишите нам — подскажем',
  },
  kk: {
    priceLabel: 'Алдын ала тапсырыс бағасы',
    regularLabel: 'Қоймаға түскеннен кейінгі баға',
    savingsLabel: 'Сіздің пайдаңыз',
    infoTitle: 'Алдын ала тапсырыс қалай жұмыс істейді',
    noRefund: '100% алдын ала төлем. Алдын ала тапсырыс бойынша ақша қайтарылмайды — сатып алуға және өлшемге сенімді болсаңыз ғана рәсімдеңіз.',
    faqLink: 'Алдын ала тапсырыс туралы толығырақ',
    addToCart: 'Себетке қосу',
    stickyNote: 'Алдын ала тапсырыс',
    checkoutTitle: 'Тапсырыста алдын ала тапсырыс бар',
    checkoutCommon: 'Төлем — бірден 100%. Түскеннен кейін СДЭК немесе Қазпоштамен жібереміз, жеткізу мерзімі әдеттегідей. Алдын ала тапсырыс бойынша ақша қайтарылмайды.',
    agree: 'Бұл алдын ала тапсырыс екенін түсінемін, саналы түрде төлеймін және келісемін: ақша қайтарылмайды.',
    agreeError: 'Алдын ала тапсырыс шарттарын растаңыз',
    msgTag: 'АЛДЫН АЛА ТАПСЫРЫС',
    sizeHelp: 'Өлшемге сенімсізсіз бе? Бізге жазыңыз — көмектесеміз',
  },
  en: {
    priceLabel: 'Pre-order price',
    regularLabel: 'Price once in stock',
    savingsLabel: 'You save',
    infoTitle: 'How the pre-order works',
    noRefund: '100% prepayment. Pre-orders are non-refundable — please order only if you are sure about the purchase and the size.',
    faqLink: 'More about the pre-order',
    addToCart: 'Add to cart',
    stickyNote: 'Pre-order',
    checkoutTitle: 'Your order contains a pre-order',
    checkoutCommon: 'Payment is 100% upfront. After arrival we ship via CDEK or Kazpost with usual delivery times. Pre-orders are non-refundable.',
    agree: 'I understand this is a pre-order, I am paying for it consciously and I agree: it is non-refundable.',
    agreeError: 'Please confirm the pre-order terms',
    msgTag: 'PRE-ORDER',
    sizeHelp: 'Not sure about the size? Message us — we will help',
  },
}

type PreorderProductId = Extract<ProductId, 'tawakkul-hoodie' | 'one-ummah-zip-hoodie'>

export const PREORDER_PRODUCT_T: Record<Language, Record<PreorderProductId, PreorderProductStrings>> = {
  ru: {
    'tawakkul-hoodie': {
      points: [
        'Это предзаказ: вы бронируете худи из новой партии по специальной цене.',
        'Как только партия поступит, сразу отправляем: СДЭК или Казпочта, сроки доставки как обычно.',
        'Мы напишем вам в WhatsApp или Telegram, когда заказ будет отправлен.',
        'Размеры S, M, L, XL. Количество выбираете сами.',
      ],
      note: 'HOODIE TAWAKKUL — предзаказ. Отправим сразу после поступления партии и напишем вам. Возврат по предзаказу не осуществляется.',
    },
    'one-ummah-zip-hoodie': {
      limited: 'Партия — всего 50 шт.',
      points: [
        'Пошив новой партии начался 14 октября 2026.',
        'Поступление — ориентировочно через 22–27 дней (≈ 5–10 ноября), ин ша Аллах.',
        'Сразу после поступления отправляем: СДЭК или Казпочта, сроки доставки как обычно.',
        'Размеры S, M, L, XL. Количество выбираете сами.',
      ],
      note: 'ONE UMMAH ZIP HOODIE — предзаказ. Поступление ≈ 5–10 ноября 2026, ин ша Аллах. Возврат по предзаказу не осуществляется.',
    },
  },
  kk: {
    'tawakkul-hoodie': {
      points: [
        'Бұл алдын ала тапсырыс: сіз жаңа партиядан худиді арнайы бағамен брондайсыз.',
        'Партия түскен бойда бірден жібереміз: СДЭК немесе Қазпошта, жеткізу мерзімі әдеттегідей.',
        'Тапсырыс жіберілгенде WhatsApp немесе Telegram арқылы жазамыз.',
        'Өлшемдер S, M, L, XL. Санын өзіңіз таңдайсыз.',
      ],
      note: 'HOODIE TAWAKKUL — алдын ала тапсырыс. Партия түскен бойда жіберіп, сізге жазамыз. Алдын ала тапсырыс бойынша ақша қайтарылмайды.',
    },
    'one-ummah-zip-hoodie': {
      limited: 'Партия — бар болғаны 50 дана',
      points: [
        'Жаңа партияны тігу 2026 жылғы 14 қазанда басталды.',
        'Қоймаға түсуі — шамамен 22–27 күннен кейін (≈ 5–10 қараша), ин ша Аллаһ.',
        'Түскен бойда жібереміз: СДЭК немесе Қазпошта, жеткізу мерзімі әдеттегідей.',
        'Өлшемдер S, M, L, XL. Санын өзіңіз таңдайсыз.',
      ],
      note: 'ONE UMMAH ZIP HOODIE — алдын ала тапсырыс. Түсуі ≈ 2026 жылғы 5–10 қараша, ин ша Аллаһ. Алдын ала тапсырыс бойынша ақша қайтарылмайды.',
    },
  },
  en: {
    'tawakkul-hoodie': {
      points: [
        'This is a pre-order: you reserve a hoodie from the new batch at a special price.',
        'As soon as the batch arrives we ship right away: CDEK or Kazpost, usual delivery times.',
        'We will message you on WhatsApp or Telegram when your order ships.',
        'Sizes S, M, L, XL. Choose any quantity.',
      ],
      note: 'HOODIE TAWAKKUL is a pre-order. We ship as soon as the batch arrives and will message you. Pre-orders are non-refundable.',
    },
    'one-ummah-zip-hoodie': {
      limited: 'Batch of only 50 pcs',
      points: [
        'Production of the new batch started on October 14, 2026.',
        'Expected in stock in about 22–27 days (≈ November 5–10), in shaa Allah.',
        'We ship right after it arrives: CDEK or Kazpost, usual delivery times.',
        'Sizes S, M, L, XL. Choose any quantity.',
      ],
      note: 'ONE UMMAH ZIP HOODIE is a pre-order. Expected ≈ November 5–10, 2026, in shaa Allah. Pre-orders are non-refundable.',
    },
  },
}

/** Тексты предзаказа для конкретного товара (или null, если у товара их нет). */
export function preorderInfo(lang: Language, id: ProductId): PreorderProductStrings | null {
  const map = PREORDER_PRODUCT_T[lang] as Partial<Record<ProductId, PreorderProductStrings>>
  return map[id] ?? null
}

/** Уникальные заметки по предзаказным товарам из списка позиций. */
export function preorderNotes(lang: Language, ids: ProductId[]): string[] {
  const seen = new Set<ProductId>()
  const notes: string[] = []
  for (const id of ids) {
    if (seen.has(id)) continue
    seen.add(id)
    const info = preorderInfo(lang, id)
    if (info) notes.push(info.note)
  }
  return notes
}
