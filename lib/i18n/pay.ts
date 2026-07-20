import { Language } from './translations'
import { Color } from '../cart/products'

// Переводы для страниц оформления заказа и оплаты (RU / KZ / EN).
// Вынесено отдельно, чтобы не трогать основную систему переводов.

export interface PayStrings {
  // checkout
  whereDeliver: string
  countryRu: string
  countryKz: string
  countryWorld: string
  contacts: string
  fio: string
  fioPh: string
  phone: string
  phonePh: string
  messenger: string
  messengerPh: string
  email: string
  emailPh: string
  addressTitle: string
  city: string
  cityPh: string
  index: string
  indexPh: string
  addrRu: string
  addrKz: string
  addrWorld: string
  addrPh: string
  deliveryTitle: string
  delivInfoRu: string
  delivInfoKz: string
  delivInfoWorld: string
  paymentTitle: string
  payInfoRu: string
  payInfoKz: string
  payInfoWorld: string
  yourOrder: string
  size: string
  goods: string
  delivery: string
  atPickup: string
  negotiate: string
  payNowLabel: string
  cdekSeparate: string
  placeOrder: string
  afterOrderHint: string
  // success
  orderPlaced: string
  orderPlacedSub: string
  orderNumber: string
  payKzHint: string
  payRuHint: string
  payWorldHint: string
  worldDelivNote: string
  payKaspiBtn: string
  sendCheck: string
  orderComposition: string
  total: string
  trackOrder: string
  // colors
  colorBlack: string
  colorNavy: string
  colorGrey: string
}

export const PAY_T: Record<Language, PayStrings> = {
  ru: {
    whereDeliver: 'Куда доставить?',
    countryRu: 'Россия',
    countryKz: 'Казахстан',
    countryWorld: 'Другая страна',
    contacts: 'Контакты',
    fio: 'ФИО',
    fioPh: 'Иван Иванов',
    phone: 'Телефон',
    phonePh: '+7 700 000 00 00',
    messenger: 'WhatsApp / Telegram',
    messengerPh: '@username или номер',
    email: 'Email (необязательно)',
    emailPh: 'email@example.com',
    addressTitle: 'Адрес доставки',
    city: 'Город',
    cityPh: 'Москва',
    index: 'Индекс',
    indexPh: '101000',
    addrRu: 'Адрес / пункт выдачи СДЭК',
    addrKz: 'Адрес (Казпочта)',
    addrWorld: 'Полный адрес',
    addrPh: 'Улица, дом, квартира',
    deliveryTitle: 'Доставка',
    delivInfoRu: 'Доставка СДЭК по всей России (срок ~до недели, ин ша Аллах). Доставку (~700–1000 ₽) вы оплачиваете при получении — на сайте платите только за товар.',
    delivInfoKz: 'Доставка Казпочтой по Казахстану (срок ~до недели, ин ша Аллах). Стоимость доставки +1600 ₸ — включена в сумму к оплате.',
    delivInfoWorld: 'Доставка по миру. Стоимость доставки рассчитаем индивидуально и согласуем с вами в WhatsApp / Telegram после оформления. Сейчас оплачивается только товар.',
    paymentTitle: 'Оплата',
    payInfoRu: 'Оплата переводом на карту ВТБ (МИР). Реквизиты появятся на следующем шаге — оплатите и пришлите чек в WhatsApp / Telegram.',
    payInfoKz: 'Оплата через Kaspi по ссылке. Появится на следующем шаге — оплатите и пришлите чек в WhatsApp / Telegram.',
    payInfoWorld: 'Оплата переводом на карту Kaspi (в долларах). Реквизиты появятся на следующем шаге — оплатите и пришлите чек.',
    yourOrder: 'Ваш заказ',
    size: 'Размер',
    goods: 'Товары',
    delivery: 'Доставка',
    atPickup: 'при получении',
    negotiate: 'согласуем',
    payNowLabel: 'К оплате сейчас',
    cdekSeparate: 'Доставка СДЭК оплачивается отдельно при получении.',
    placeOrder: 'Оформить заказ',
    afterOrderHint: 'После оформления вы получите номер заказа и реквизиты для оплаты. Оплату подтверждаете чеком в WhatsApp / Telegram.',
    orderPlaced: 'Заказ оформлен!',
    orderPlacedSub: 'Осталось оплатить и прислать чек — и мы берём заказ в работу.',
    orderNumber: 'Номер заказа',
    payKzHint: 'Нажмите кнопку, оплатите в Kaspi, затем пришлите чек.',
    payRuHint: 'Переведите сумму на карту ВТБ (МИР) и пришлите чек:',
    payWorldHint: 'Переведите сумму (в долларах) на карту Kaspi и пришлите чек:',
    worldDelivNote: 'Стоимость доставки согласуем с вами в WhatsApp / Telegram.',
    payKaspiBtn: 'Оплатить через Kaspi',
    sendCheck: 'Пришлите чек об оплате:',
    orderComposition: 'Состав заказа',
    total: 'Итого',
    trackOrder: 'Отследить заказ',
    colorBlack: 'Чёрный',
    colorNavy: 'Синий',
    colorGrey: 'Серый',
  },
  kk: {
    whereDeliver: 'Қайда жеткіземіз?',
    countryRu: 'Ресей',
    countryKz: 'Қазақстан',
    countryWorld: 'Басқа ел',
    contacts: 'Байланыс',
    fio: 'Аты-жөні',
    fioPh: 'Айбек Серіков',
    phone: 'Телефон',
    phonePh: '+7 700 000 00 00',
    messenger: 'WhatsApp / Telegram',
    messengerPh: '@username немесе нөмір',
    email: 'Email (міндетті емес)',
    emailPh: 'email@example.com',
    addressTitle: 'Жеткізу мекенжайы',
    city: 'Қала',
    cityPh: 'Алматы',
    index: 'Индекс',
    indexPh: '050000',
    addrRu: 'Мекенжай / СДЭК тапсыру пункті',
    addrKz: 'Мекенжай (Қазпошта)',
    addrWorld: 'Толық мекенжай',
    addrPh: 'Көше, үй, пәтер',
    deliveryTitle: 'Жеткізу',
    delivInfoRu: 'СДЭК арқылы бүкіл Ресейге (мерзімі ~бір аптаға дейін, ин ша Аллаһ). Жеткізу ақысын (~700–1000 ₽) алған кезде төлейсіз — сайтта тек тауар үшін төлейсіз.',
    delivInfoKz: 'Қазпошта арқылы Қазақстан бойынша (мерзімі ~бір аптаға дейін, ин ша Аллаһ). Жеткізу құны +1600 ₸ — төлемге қосылған.',
    delivInfoWorld: 'Әлем бойынша жеткізу. Жеткізу құнын жеке есептеп, рәсімдегеннен кейін WhatsApp / Telegram арқылы келісеміз. Қазір тек тауар төленеді.',
    paymentTitle: 'Төлем',
    payInfoRu: 'ВТБ (МИР) картасына аудару арқылы төлем. Реквизиттер келесі қадамда шығады — төлеп, чекті WhatsApp / Telegram-ға жіберіңіз.',
    payInfoKz: 'Kaspi арқылы сілтемемен төлем. Келесі қадамда шығады — төлеп, чекті WhatsApp / Telegram-ға жіберіңіз.',
    payInfoWorld: 'Kaspi картасына аудару арқылы төлем (доллармен). Реквизиттер келесі қадамда шығады — төлеп, чекті жіберіңіз.',
    yourOrder: 'Тапсырысыңыз',
    size: 'Өлшемі',
    goods: 'Тауарлар',
    delivery: 'Жеткізу',
    atPickup: 'алған кезде',
    negotiate: 'келісеміз',
    payNowLabel: 'Қазір төленетін сома',
    cdekSeparate: 'СДЭК жеткізуі алған кезде бөлек төленеді.',
    placeOrder: 'Тапсырыс беру',
    afterOrderHint: 'Рәсімдегеннен кейін тапсырыс нөмірі мен төлем реквизиттерін аласыз. Төлемді WhatsApp / Telegram-дағы чекпен растайсыз.',
    orderPlaced: 'Тапсырыс рәсімделді!',
    orderPlacedSub: 'Төлеп, чекті жіберу қалды — сосын тапсырысты жұмысқа аламыз.',
    orderNumber: 'Тапсырыс нөмірі',
    payKzHint: 'Түймені басып, Kaspi-де төлеңіз, сосын чекті жіберіңіз.',
    payRuHint: 'Соманы ВТБ (МИР) картасына аударып, чекті жіберіңіз:',
    payWorldHint: 'Соманы (доллармен) Kaspi картасына аударып, чекті жіберіңіз:',
    worldDelivNote: 'Жеткізу құнын WhatsApp / Telegram арқылы келісеміз.',
    payKaspiBtn: 'Kaspi арқылы төлеу',
    sendCheck: 'Төлем чегін жіберіңіз:',
    orderComposition: 'Тапсырыс құрамы',
    total: 'Барлығы',
    trackOrder: 'Тапсырысты қадағалау',
    colorBlack: 'Қара',
    colorNavy: 'Көк',
    colorGrey: 'Сұр',
  },
  en: {
    whereDeliver: 'Where should we deliver?',
    countryRu: 'Russia',
    countryKz: 'Kazakhstan',
    countryWorld: 'Other country',
    contacts: 'Contact details',
    fio: 'Full name',
    fioPh: 'John Smith',
    phone: 'Phone',
    phonePh: '+1 555 000 0000',
    messenger: 'WhatsApp / Telegram',
    messengerPh: '@username or number',
    email: 'Email (optional)',
    emailPh: 'email@example.com',
    addressTitle: 'Delivery address',
    city: 'City',
    cityPh: 'New York',
    index: 'Postal code',
    indexPh: '10001',
    addrRu: 'Address / CDEK pickup point',
    addrKz: 'Address (Kazpost)',
    addrWorld: 'Full address',
    addrPh: 'Street, building, apartment',
    deliveryTitle: 'Delivery',
    delivInfoRu: 'CDEK delivery across Russia (approx. up to a week, in shaa Allah). You pay for delivery (~700–1000 ₽) on arrival — on the site you pay for the item only.',
    delivInfoKz: 'Kazpost delivery across Kazakhstan (approx. up to a week, in shaa Allah). Delivery cost +1600 ₸ — included in the total.',
    delivInfoWorld: 'Worldwide delivery. We will calculate the delivery cost individually and agree it with you via WhatsApp / Telegram after checkout. For now you pay for the item only.',
    paymentTitle: 'Payment',
    payInfoRu: 'Payment by transfer to a VTB (MIR) card. Details appear on the next step — pay and send the receipt via WhatsApp / Telegram.',
    payInfoKz: 'Payment via a Kaspi link. It appears on the next step — pay and send the receipt via WhatsApp / Telegram.',
    payInfoWorld: 'Payment by transfer to a Kaspi card (in US dollars). Details appear on the next step — pay and send the receipt.',
    yourOrder: 'Your order',
    size: 'Size',
    goods: 'Items',
    delivery: 'Delivery',
    atPickup: 'on arrival',
    negotiate: 'to be agreed',
    payNowLabel: 'To pay now',
    cdekSeparate: 'CDEK delivery is paid separately on arrival.',
    placeOrder: 'Place order',
    afterOrderHint: 'After checkout you will get an order number and payment details. You confirm payment with a receipt via WhatsApp / Telegram.',
    orderPlaced: 'Order placed!',
    orderPlacedSub: 'Just pay and send the receipt — and we will start processing your order.',
    orderNumber: 'Order number',
    payKzHint: 'Tap the button, pay in Kaspi, then send the receipt.',
    payRuHint: 'Transfer the amount to a VTB (MIR) card and send the receipt:',
    payWorldHint: 'Transfer the amount (in US dollars) to a Kaspi card and send the receipt:',
    worldDelivNote: 'We will agree the delivery cost with you via WhatsApp / Telegram.',
    payKaspiBtn: 'Pay via Kaspi',
    sendCheck: 'Send your payment receipt:',
    orderComposition: 'Order summary',
    total: 'Total',
    trackOrder: 'Track order',
    colorBlack: 'Black',
    colorNavy: 'Navy',
    colorGrey: 'Grey',
  },
}

export function colorLabel(lang: Language, color: Color): string {
  const p = PAY_T[lang]
  return color === 'BLACK' ? p.colorBlack : color === 'NAVY' ? p.colorNavy : p.colorGrey
}
