import { Language } from './translations'

// Тексты предзаказа ONE UMMAH ZIP HOODIE (RU / KZ / EN).
// Пошив начат 14.10.2026, поступление через 22–27 дней ≈ 5–10 ноября 2026.

export interface PreorderStrings {
  priceLabel: string
  regularLabel: string
  savingsLabel: string
  limited: string
  infoTitle: string
  points: string[]
  noRefund: string
  faqLink: string
  addToCart: string
  stickyNote: string
  cartNote: string
  checkoutTitle: string
  checkoutBody: string
  agree: string
  agreeError: string
  successNote: string
  msgTag: string
}

export const PREORDER_T: Record<Language, PreorderStrings> = {
  ru: {
    priceLabel: 'Цена предзаказа',
    regularLabel: 'Цена после поступления',
    savingsLabel: 'Ваша выгода',
    limited: 'Партия — всего 50 шт.',
    infoTitle: 'Как работает предзаказ',
    points: [
      'Пошив новой партии начался 14 октября 2026.',
      'Поступление — ориентировочно через 22–27 дней (≈ 5–10 ноября), ин ша Аллах.',
      'Сразу после поступления отправляем: СДЭК или Казпочта, сроки доставки как обычно.',
      'Размеры S, M, L, XL. Количество выбираете сами.',
    ],
    noRefund: '100% предоплата. Возврат средств по предзаказу не осуществляется — оформляйте, только если уверены в покупке и размере.',
    faqLink: 'Подробнее о предзаказе',
    addToCart: 'Добавить в корзину',
    stickyNote: 'Предзаказ',
    cartNote: 'ONE UMMAH ZIP HOODIE — это предзаказ. Поступление ≈ 5–10 ноября, ин ша Аллах. Возврат по предзаказу не осуществляется.',
    checkoutTitle: 'В заказе есть предзаказ',
    checkoutBody: 'ONE UMMAH ZIP HOODIE оформляется как предзаказ: пошив начат 14 октября 2026, поступление ориентировочно через 22–27 дней (≈ 5–10 ноября), ин ша Аллах. После поступления — отправка СДЭК или Казпочтой, сроки доставки как обычно. Оплата — 100% сразу. Возврат средств по предзаказу не осуществляется.',
    agree: 'Я понимаю, что это предзаказ, оплачиваю его осознанно и согласен(на): возврат средств не осуществляется.',
    agreeError: 'Подтвердите условия предзаказа',
    successNote: 'ONE UMMAH ZIP HOODIE — предзаказ. Ожидаемое поступление ≈ 5–10 ноября 2026, ин ша Аллах. Мы напишем вам, как только партия придёт и заказ будет отправлен.',
    msgTag: 'ПРЕДЗАКАЗ',
  },
  kk: {
    priceLabel: 'Алдын ала тапсырыс бағасы',
    regularLabel: 'Қоймаға түскеннен кейінгі баға',
    savingsLabel: 'Сіздің пайдаңыз',
    limited: 'Партия — бар болғаны 50 дана',
    infoTitle: 'Алдын ала тапсырыс қалай жұмыс істейді',
    points: [
      'Жаңа партияны тігу 2026 жылғы 14 қазанда басталды.',
      'Қоймаға түсуі — шамамен 22–27 күннен кейін (≈ 5–10 қараша), ин ша Аллаһ.',
      'Түскен бойда жібереміз: СДЭК немесе Қазпошта, жеткізу мерзімі әдеттегідей.',
      'Өлшемдер S, M, L, XL. Санын өзіңіз таңдайсыз.',
    ],
    noRefund: '100% алдын ала төлем. Алдын ала тапсырыс бойынша ақша қайтарылмайды — сатып алуға және өлшемге сенімді болсаңыз ғана рәсімдеңіз.',
    faqLink: 'Алдын ала тапсырыс туралы толығырақ',
    addToCart: 'Себетке қосу',
    stickyNote: 'Алдын ала тапсырыс',
    cartNote: 'ONE UMMAH ZIP HOODIE — алдын ала тапсырыс. Түсуі ≈ 5–10 қараша, ин ша Аллаһ. Алдын ала тапсырыс бойынша ақша қайтарылмайды.',
    checkoutTitle: 'Тапсырыста алдын ала тапсырыс бар',
    checkoutBody: 'ONE UMMAH ZIP HOODIE алдын ала тапсырыс ретінде рәсімделеді: тігу 2026 жылғы 14 қазанда басталды, қоймаға түсуі шамамен 22–27 күннен кейін (≈ 5–10 қараша), ин ша Аллаһ. Түскеннен кейін — СДЭК немесе Қазпоштамен жібереміз, жеткізу мерзімі әдеттегідей. Төлем — бірден 100%. Алдын ала тапсырыс бойынша ақша қайтарылмайды.',
    agree: 'Бұл алдын ала тапсырыс екенін түсінемін, саналы түрде төлеймін және келісемін: ақша қайтарылмайды.',
    agreeError: 'Алдын ала тапсырыс шарттарын растаңыз',
    successNote: 'ONE UMMAH ZIP HOODIE — алдын ала тапсырыс. Күтілетін түсуі ≈ 2026 жылғы 5–10 қараша, ин ша Аллаһ. Партия келіп, тапсырыс жіберілген бойда сізге жазамыз.',
    msgTag: 'АЛДЫН АЛА ТАПСЫРЫС',
  },
  en: {
    priceLabel: 'Pre-order price',
    regularLabel: 'Price once in stock',
    savingsLabel: 'You save',
    limited: 'Batch of only 50 pcs',
    infoTitle: 'How the pre-order works',
    points: [
      'Production of the new batch started on October 14, 2026.',
      'Expected in stock in about 22–27 days (≈ November 5–10), in shaa Allah.',
      'We ship right after it arrives: CDEK or Kazpost, usual delivery times.',
      'Sizes S, M, L, XL. Choose any quantity.',
    ],
    noRefund: '100% prepayment. Pre-orders are non-refundable — please order only if you are sure about the purchase and the size.',
    faqLink: 'More about the pre-order',
    addToCart: 'Add to cart',
    stickyNote: 'Pre-order',
    cartNote: 'ONE UMMAH ZIP HOODIE is a pre-order. Expected ≈ November 5–10, in shaa Allah. Pre-orders are non-refundable.',
    checkoutTitle: 'Your order contains a pre-order',
    checkoutBody: 'ONE UMMAH ZIP HOODIE is placed as a pre-order: production started on October 14, 2026, expected in stock in about 22–27 days (≈ November 5–10), in shaa Allah. After arrival we ship via CDEK or Kazpost with usual delivery times. Payment is 100% upfront. Pre-orders are non-refundable.',
    agree: 'I understand this is a pre-order, I am paying for it consciously and I agree: it is non-refundable.',
    agreeError: 'Please confirm the pre-order terms',
    successNote: 'ONE UMMAH ZIP HOODIE is a pre-order. Expected arrival ≈ November 5–10, 2026, in shaa Allah. We will message you as soon as the batch arrives and your order ships.',
    msgTag: 'PRE-ORDER',
  },
}
