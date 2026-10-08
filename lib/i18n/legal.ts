import { Language } from './translations'

// Юридические / информационные страницы: Политика конфиденциальности,
// Условия (публичная оферта), Доставка и возврат. RU / KZ / EN.
// ВАЖНО: это базовые тексты под реальную работу бренда. Рекомендуется
// показать юристу перед публикацией в вашей юрисдикции.

export interface LegalSection {
  heading: string
  paras: string[]
}
export interface LegalDoc {
  navLabel: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}
export interface LegalStrings {
  backHome: string
  privacy: LegalDoc
  terms: LegalDoc
  delivery: LegalDoc
}

const CONTACT_LINE_RU =
  'TAWAKKUL (TWKKL). Связь: WhatsApp +7 700 957 0233, Telegram @tawakkulgpt, Instagram @tawakkultwkkl.'
const CONTACT_LINE_KK =
  'TAWAKKUL (TWKKL). Байланыс: WhatsApp +7 700 957 0233, Telegram @tawakkulgpt, Instagram @tawakkultwkkl.'
const CONTACT_LINE_EN =
  'TAWAKKUL (TWKKL). Contact: WhatsApp +7 700 957 0233, Telegram @tawakkulgpt, Instagram @tawakkultwkkl.'

export const LEGAL_T: Record<Language, LegalStrings> = {
  ru: {
    backHome: 'На главную',
    privacy: {
      navLabel: 'Конфиденциальность',
      title: 'Политика конфиденциальности',
      updated: 'Обновлено: сентябрь 2026',
      intro:
        'Мы бережно относимся к вашим данным и используем их только для того, чтобы оформить и доставить ваш заказ. Ниже — что мы собираем и зачем.',
      sections: [
        {
          heading: 'Какие данные мы собираем',
          paras: [
            'Имя, номер телефона и адрес доставки — чтобы оформить заказ и передать его в службу доставки.',
            'Состав заказа (товар, размер, цвет, количество) и номер заказа.',
            'Сообщения, которые вы отправляете нам в WhatsApp или Telegram.',
          ],
        },
        {
          heading: 'Зачем мы их используем',
          paras: [
            'Только для обработки, оплаты и доставки вашего заказа, а также чтобы связаться с вами по нему.',
            'Мы не рассылаем спам и не передаём ваши данные третьим лицам, кроме служб доставки (СДЭК, Казпочта), которым нужен адрес для отправки посылки.',
          ],
        },
        {
          heading: 'Оплата',
          paras: [
            'Оплата проходит вне сайта — через Kaspi или переводом на карту. Мы не собираем и не храним данные ваших карт на сайте. Вы просто присылаете нам чек об оплате.',
          ],
        },
        {
          heading: 'Хранение и ваши права',
          paras: [
            'Данные заказа хранятся столько, сколько нужно для его выполнения и учёта. Вы можете попросить нас удалить ваши данные — напишите нам в WhatsApp или Telegram.',
          ],
        },
        {
          heading: 'Контакты',
          paras: [CONTACT_LINE_RU],
        },
      ],
    },
    terms: {
      navLabel: 'Условия',
      title: 'Условия (публичная оферта)',
      updated: 'Обновлено: сентябрь 2026',
      intro:
        'Оформляя заказ на сайте, вы соглашаетесь с условиями ниже. Это простые и честные правила нашей работы.',
      sections: [
        {
          heading: 'О товаре',
          paras: [
            'Мы продаём одежду бренда TAWAKKUL (TWKKL). Фотографии и описания максимально точны, но оттенок на вашем экране может немного отличаться от реального.',
          ],
        },
        {
          heading: 'Заказ и оплата',
          paras: [
            'После оформления заказа вы получаете инструкции по оплате: Казахстан — Kaspi, Россия — перевод на карту, другие страны — перевод в долларах.',
            'Заказ принимается в работу после того, как вы пришлёте чек об оплате в WhatsApp или Telegram.',
            'Цены на сайте указаны в тенге, рублях и долларах в зависимости от региона.',
          ],
        },
        {
          heading: 'Доставка',
          paras: [
            'Сроки и стоимость доставки описаны на странице «Доставка и возврат». Мы отправляем заказ и передаём вам трек-номер для отслеживания.',
          ],
        },
        {
          heading: 'Возврат и обмен',
          paras: [
            'Если размер не подошёл — напишите нам в течение нескольких дней после получения. Товар должен быть неношеным, с бирками. Вопрос решаем индивидуально.',
          ],
        },
        {
          heading: 'Контакты',
          paras: [CONTACT_LINE_RU],
        },
      ],
    },
    delivery: {
      navLabel: 'Доставка и возврат',
      title: 'Доставка и возврат',
      updated: 'Обновлено: сентябрь 2026',
      intro: 'Как мы доставляем заказы и что делать, если что-то не подошло.',
      sections: [
        {
          heading: 'Способы и сроки',
          paras: [
            'Россия — СДЭК по всей стране, ориентировочно до недели, ин ша Аллах.',
            'Казахстан — Казпочта, до недели.',
            'Другие страны — способ и сроки согласуем индивидуально в WhatsApp или Telegram.',
          ],
        },
        {
          heading: 'Стоимость доставки',
          paras: [
            'Россия: доставку СДЭК (примерно 700–1000 ₽) вы оплачиваете при получении — на сайте вы платите только за товар.',
            'Казахстан: +1600 ₸ (Казпочта), уже включено в сумму заказа.',
            'Другие страны: стоимость согласуем индивидуально.',
          ],
        },
        {
          heading: 'Отслеживание',
          paras: [
            'После отправки мы даём вам трек-номер. Статус заказа можно проверить на странице «Отследить заказ» по его номеру.',
          ],
        },
        {
          heading: 'Возврат и обмен',
          paras: [
            'Если размер не подошёл или есть вопросы — напишите нам в WhatsApp или Telegram в течение нескольких дней после получения. Товар должен быть неношеным, с бирками, в товарном виде. Мы поможем с обменом или решим вопрос индивидуально.',
          ],
        },
        {
          heading: 'Контакты',
          paras: [CONTACT_LINE_RU],
        },
      ],
    },
  },
  kk: {
    backHome: 'Басты бетке',
    privacy: {
      navLabel: 'Құпиялылық',
      title: 'Құпиялылық саясаты',
      updated: 'Жаңартылды: қыркүйек 2026',
      intro:
        'Біз деректеріңізге ұқыпты қараймыз және оларды тек тапсырысыңызды рәсімдеу мен жеткізу үшін ғана қолданамыз. Төменде — нені жинайтынымыз және не үшін.',
      sections: [
        {
          heading: 'Қандай деректер жинаймыз',
          paras: [
            'Аты-жөні, телефон нөмірі және жеткізу мекенжайы — тапсырысты рәсімдеп, жеткізу қызметіне беру үшін.',
            'Тапсырыс құрамы (тауар, өлшем, түс, саны) және тапсырыс нөмірі.',
            'WhatsApp немесе Telegram арқылы бізге жіберген хабарламаларыңыз.',
          ],
        },
        {
          heading: 'Не үшін қолданамыз',
          paras: [
            'Тек тапсырысыңызды өңдеу, төлеу және жеткізу үшін, сондай-ақ сол бойынша сізбен байланысу үшін.',
            'Біз спам жібермейміз және деректеріңізді үшінші тұлғаларға бермейміз — тек посылканы жіберу үшін мекенжай қажет жеткізу қызметтерінен басқа (СДЭК, Қазпошта).',
          ],
        },
        {
          heading: 'Төлем',
          paras: [
            'Төлем сайттан тыс өтеді — Kaspi арқылы немесе картаға аудару. Біз карта деректеріңізді сайтта жинамаймыз және сақтамаймыз. Сіз бізге тек төлем чегін жібересіз.',
          ],
        },
        {
          heading: 'Сақтау және құқықтарыңыз',
          paras: [
            'Тапсырыс деректері оны орындау мен есепке қажет уақыт бойы сақталады. Деректеріңізді жоюды сұрай аласыз — бізге WhatsApp немесе Telegram арқылы жазыңыз.',
          ],
        },
        {
          heading: 'Байланыс',
          paras: [CONTACT_LINE_KK],
        },
      ],
    },
    terms: {
      navLabel: 'Шарттар',
      title: 'Шарттар (жария оферта)',
      updated: 'Жаңартылды: қыркүйек 2026',
      intro:
        'Сайтта тапсырыс беру арқылы сіз төмендегі шарттармен келісесіз. Бұл — біздің жұмысымыздың қарапайым әрі адал ережелері.',
      sections: [
        {
          heading: 'Тауар туралы',
          paras: [
            'Біз TAWAKKUL (TWKKL) брендінің киімін сатамыз. Фото мен сипаттама барынша дәл, бірақ экраныңыздағы реңк нақтысынан сәл өзгеше болуы мүмкін.',
          ],
        },
        {
          heading: 'Тапсырыс және төлем',
          paras: [
            'Тапсырыс бергеннен кейін төлем нұсқауларын аласыз: Қазақстан — Kaspi, Ресей — картаға аудару, басқа елдер — доллармен аудару.',
            'Тапсырыс төлем чегін WhatsApp немесе Telegram арқылы жібергеннен кейін жұмысқа алынады.',
            'Сайттағы бағалар аймаққа қарай теңге, рубль және доллармен көрсетілген.',
          ],
        },
        {
          heading: 'Жеткізу',
          paras: [
            'Жеткізу мерзімі мен құны «Жеткізу және қайтару» бетінде сипатталған. Біз тапсырысты жіберіп, бақылау үшін трек-нөмір береміз.',
          ],
        },
        {
          heading: 'Қайтару және айырбастау',
          paras: [
            'Өлшемі сәйкес келмесе — алғаннан кейін бірнеше күн ішінде бізге жазыңыз. Тауар киілмеген, биркалармен болуы керек. Мәселені жеке шешеміз.',
          ],
        },
        {
          heading: 'Байланыс',
          paras: [CONTACT_LINE_KK],
        },
      ],
    },
    delivery: {
      navLabel: 'Жеткізу және қайтару',
      title: 'Жеткізу және қайтару',
      updated: 'Жаңартылды: қыркүйек 2026',
      intro: 'Тапсырыстарды қалай жеткіземіз және бірдеңе сәйкес келмесе не істеу керек.',
      sections: [
        {
          heading: 'Тәсілдер мен мерзімдер',
          paras: [
            'Ресей — бүкіл ел бойынша СДЭК, шамамен бір аптаға дейін, ин ша Аллаһ.',
            'Қазақстан — Қазпошта, бір аптаға дейін.',
            'Басқа елдер — тәсіл мен мерзімді WhatsApp немесе Telegram арқылы жеке келісеміз.',
          ],
        },
        {
          heading: 'Жеткізу құны',
          paras: [
            'Ресей: СДЭК жеткізуін (шамамен 700–1000 ₽) алған кезде төлейсіз — сайтта тек тауар үшін төлейсіз.',
            'Қазақстан: +1600 ₸ (Қазпошта), тапсырыс сомасына қосылған.',
            'Басқа елдер: құнын жеке келісеміз.',
          ],
        },
        {
          heading: 'Бақылау',
          paras: [
            'Жібергеннен кейін сізге трек-нөмір береміз. Тапсырыс статусын «Тапсырысты бақылау» бетінде нөмірі бойынша тексере аласыз.',
          ],
        },
        {
          heading: 'Қайтару және айырбастау',
          paras: [
            'Өлшемі сәйкес келмесе немесе сұрағыңыз болса — алғаннан кейін бірнеше күн ішінде WhatsApp немесе Telegram арқылы жазыңыз. Тауар киілмеген, биркалармен, тауарлық түрде болуы керек. Айырбастауға көмектесеміз немесе мәселені жеке шешеміз.',
          ],
        },
        {
          heading: 'Байланыс',
          paras: [CONTACT_LINE_KK],
        },
      ],
    },
  },
  en: {
    backHome: 'Back to home',
    privacy: {
      navLabel: 'Privacy',
      title: 'Privacy Policy',
      updated: 'Updated: September 2026',
      intro:
        'We treat your data carefully and use it only to process and deliver your order. Here is what we collect and why.',
      sections: [
        {
          heading: 'What we collect',
          paras: [
            'Your name, phone number and delivery address — to process the order and hand it to the courier.',
            'Order details (product, size, color, quantity) and the order number.',
            'Messages you send us on WhatsApp or Telegram.',
          ],
        },
        {
          heading: 'How we use it',
          paras: [
            'Only to process, pay for and deliver your order, and to contact you about it.',
            'We do not send spam and do not share your data with third parties, except delivery services (CDEK, Kazpost) who need the address to ship your parcel.',
          ],
        },
        {
          heading: 'Payment',
          paras: [
            'Payment happens off-site — via Kaspi or a card transfer. We do not collect or store your card details on the site. You simply send us the payment receipt.',
          ],
        },
        {
          heading: 'Storage and your rights',
          paras: [
            'Order data is kept for as long as needed to fulfil and record the order. You can ask us to delete your data — message us on WhatsApp or Telegram.',
          ],
        },
        {
          heading: 'Contact',
          paras: [CONTACT_LINE_EN],
        },
      ],
    },
    terms: {
      navLabel: 'Terms',
      title: 'Terms (public offer)',
      updated: 'Updated: September 2026',
      intro:
        'By placing an order on the site you agree to the terms below. These are simple, honest rules of how we work.',
      sections: [
        {
          heading: 'About the product',
          paras: [
            'We sell TAWAKKUL (TWKKL) clothing. Photos and descriptions are as accurate as possible, but the shade on your screen may differ slightly from the real item.',
          ],
        },
        {
          heading: 'Order and payment',
          paras: [
            'After placing an order you receive payment instructions: Kazakhstan — Kaspi, Russia — card transfer, other countries — transfer in US dollars.',
            'The order is processed once you send the payment receipt via WhatsApp or Telegram.',
            'Prices on the site are shown in tenge, rubles and dollars depending on the region.',
          ],
        },
        {
          heading: 'Delivery',
          paras: [
            'Timing and cost are described on the "Delivery & returns" page. We ship the order and give you a tracking number.',
          ],
        },
        {
          heading: 'Returns and exchange',
          paras: [
            'If the size does not fit, message us within a few days of delivery. The item must be unworn, with tags. We resolve it individually.',
          ],
        },
        {
          heading: 'Contact',
          paras: [CONTACT_LINE_EN],
        },
      ],
    },
    delivery: {
      navLabel: 'Delivery & returns',
      title: 'Delivery & returns',
      updated: 'Updated: September 2026',
      intro: 'How we deliver orders and what to do if something does not fit.',
      sections: [
        {
          heading: 'Methods and timing',
          paras: [
            'Russia — CDEK across the country, approx. up to a week, in shaa Allah.',
            'Kazakhstan — Kazpost, up to a week.',
            'Other countries — method and timing agreed individually via WhatsApp or Telegram.',
          ],
        },
        {
          heading: 'Delivery cost',
          paras: [
            'Russia: you pay CDEK delivery (approx. 700–1000 ₽) on arrival — on the site you pay for the item only.',
            'Kazakhstan: +1600 ₸ (Kazpost), already included in the order total.',
            'Other countries: cost agreed individually.',
          ],
        },
        {
          heading: 'Tracking',
          paras: [
            'After shipping we give you a tracking number. You can check the order status on the "Track order" page by its number.',
          ],
        },
        {
          heading: 'Returns and exchange',
          paras: [
            'If the size does not fit or you have questions, message us on WhatsApp or Telegram within a few days of delivery. The item must be unworn, with tags, in resaleable condition. We will help with an exchange or resolve it individually.',
          ],
        },
        {
          heading: 'Contact',
          paras: [CONTACT_LINE_EN],
        },
      ],
    },
  },
}
