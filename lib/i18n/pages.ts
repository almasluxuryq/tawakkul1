import { Language } from './translations'

// Контент страниц «О бренде» и FAQ (RU / KZ / EN).
// Вынесено отдельно, чтобы не трогать основную систему переводов.

export interface Value {
  title: string
  text: string
}
export interface QA {
  q: string
  a: string
}
export interface PagesStrings {
  // nav
  navAbout: string
  navFaq: string
  // about
  aboutLabel: string
  aboutHeading: string
  aboutP1: string
  aboutP2: string
  aboutP3: string
  aboutValuesLabel: string
  values: Value[]
  // faq
  faqLabel: string
  faqHeading: string
  faqItems: QA[]
  // shared
  contactCta: string
  writeWa: string
  writeTg: string
}

export const PAGES_T: Record<Language, PagesStrings> = {
  ru: {
    navAbout: 'О бренде',
    navFaq: 'Вопросы',
    aboutLabel: 'О бренде',
    aboutHeading: 'TAWAKKUL — упование и действие',
    aboutP1: 'Таваккуль (тавакуль) — это упование на Аллаха. Но истинное упование — это не ждать сложа руки, а делать всё, что в твоих силах, и затем полностью полагаться на Всевышнего. Именно эта идея лежит в основе нашего бренда.',
    aboutP2: 'TAWAKKUL (TWKKL) — исламский премиальный стритвир. Мы верим, что одежда — это больше, чем ткань: это способ заявить о своих ценностях и о принадлежности к чему-то большему. Каждая вещь создаётся с намерением — от выбора материала до последнего стежка.',
    aboutP3: 'Мы осознанно не размещаем аяты и имена Аллаха на ткани — из уважения. Всё продумано: чисто, этично, со смыслом. TAWAKKUL — это не просто одежда, это ежедневное напоминание жить с упованием, действием и искренним намерением.',
    aboutValuesLabel: 'Наши принципы',
    values: [
      { title: 'Осознанность', text: 'Никаких аятов и имён Аллаха на ткани. С уважением к вере.' },
      { title: 'Этичность', text: 'Продуманно от материала до детали. Честно к покупателю.' },
      { title: 'Качество', text: 'Премиальные ткани и посадка, которые служат годами.' },
      { title: 'Смысл', text: 'Каждая деталь несёт послание. Одежда как идентичность.' },
    ],
    faqLabel: 'Помощь',
    faqHeading: 'Частые вопросы',
    faqItems: [
      { q: 'Как выбрать размер?', a: 'На странице каждого товара есть «Таблица размеров» — подбирайте по росту и весу. Если сомневаетесь между размерами — напишите нам, подскажем.' },
      { q: 'Как оплатить заказ?', a: 'Казахстан — через Kaspi (ссылка/карта). Россия — переводом на карту ВТБ (МИР). Другие страны — переводом на карту Kaspi в долларах. После оплаты пришлите чек нам в WhatsApp или Telegram — и мы берём заказ в работу.' },
      { q: 'Сколько идёт доставка?', a: 'Россия — СДЭК по всей стране (ориентировочно до недели, ин ша Аллах). Казахстан — Казпочта (до недели). Другие страны — согласуем способ и сроки индивидуально.' },
      { q: 'Сколько стоит доставка?', a: 'Россия: доставку СДЭК (~700–1000 ₽) вы оплачиваете при получении — на сайте платите только за товар. Казахстан: +1600 ₸ (Казпочта), включено в сумму. Другие страны: стоимость согласуем в WhatsApp / Telegram.' },
      { q: 'Как отследить заказ?', a: 'После оформления вы получаете номер заказа (формата TWKKL-...). Введите его на странице «Отследить заказ» — там будет актуальный статус и трек-номер, как только мы отправим посылку.' },
      { q: 'Можно ли обменять или вернуть?', a: 'Если размер не подошёл или возникли вопросы — напишите нам в WhatsApp или Telegram в течение нескольких дней после получения. Товар должен быть неношеным, с бирками. Решим вопрос индивидуально.' },
      { q: 'Из чего сделано худи ONE UMMAH?', a: 'Double Layer Air Cotton, плотность 350 GSM — двухслойный воздушный хлопок премиального качества. Оверсайз крой, объёмный капюшон, принт ONE UMMAH на спине.' },
      { q: 'Когда новые дропы?', a: 'Дропы лимитированные. Чтобы узнать о старте первым и не пропустить — подпишитесь на наш Telegram. Там мы объявляем даты и открываем доступ раньше всех.' },
    ],
    contactCta: 'Остались вопросы? Напишите нам напрямую:',
    writeWa: 'Написать в WhatsApp',
    writeTg: 'Написать в Telegram',
  },
  kk: {
    navAbout: 'Бренд туралы',
    navFaq: 'Сұрақтар',
    aboutLabel: 'Бренд туралы',
    aboutHeading: 'TAWAKKUL — тәуекел және әрекет',
    aboutP1: 'Тәуекел — Аллаһқа сену. Бірақ шынайы тәуекел — қол қусырып отыру емес, қолыңнан келгеннің бәрін жасап, содан кейін Жаратқанға толық сену. Дәл осы идея біздің брендтің негізінде жатыр.',
    aboutP2: 'TAWAKKUL (TWKKL) — исламдық премиум стритвир. Киім матадан артық деп сенеміз: бұл өз құндылықтарың мен үлкен нәрсеге тиесілілігің туралы айтудың жолы. Әр зат ниетпен жасалады — материал таңдаудан соңғы тігіске дейін.',
    aboutP3: 'Біз матаға аяттар мен Аллаһтың есімдерін саналы түрде орналастырмаймыз — құрметпен. Бәрі ойластырылған: таза, әдепті, мағыналы. TAWAKKUL — жай киім емес, тәуекелмен, әрекетпен және шынайы ниетпен өмір сүруге күнделікті еске салу.',
    aboutValuesLabel: 'Біздің ұстанымдар',
    values: [
      { title: 'Саналылық', text: 'Матада аяттар мен Аллаһтың есімдері жоқ. Сенімге құрметпен.' },
      { title: 'Әдептілік', text: 'Материалдан детальға дейін ойластырылған. Сатып алушыға адал.' },
      { title: 'Сапа', text: 'Жылдар бойы қызмет ететін премиум мата мен қону.' },
      { title: 'Мағына', text: 'Әр деталь хабар жеткізеді. Киім — бұл сәйкестік.' },
    ],
    faqLabel: 'Көмек',
    faqHeading: 'Жиі қойылатын сұрақтар',
    faqItems: [
      { q: 'Өлшемді қалай таңдаймын?', a: 'Әр тауар бетінде «Өлшемдер кестесі» бар — бойыңыз бен салмағыңызға қарай таңдаңыз. Екі өлшемнің арасында тұрсаңыз — бізге жазыңыз, көмектесеміз.' },
      { q: 'Тапсырысты қалай төлеймін?', a: 'Қазақстан — Kaspi арқылы. Ресей — ВТБ картасына аудару. Басқа елдер — Kaspi картасына доллармен аудару. Төлегеннен кейін чекті WhatsApp немесе Telegram арқылы жіберіңіз — тапсырысты жұмысқа аламыз.' },
      { q: 'Жеткізу қанша уақыт алады?', a: 'Ресей — бүкіл ел бойынша СДЭК (шамамен бір аптаға дейін, ин ша Аллаһ). Қазақстан — Қазпошта (бір аптаға дейін). Басқа елдер — тәсіл мен мерзімді жеке келісеміз.' },
      { q: 'Жеткізу қанша тұрады?', a: 'Ресей: СДЭК жеткізуін (~700–1000 ₽) алған кезде төлейсіз — сайтта тек тауар үшін төлейсіз. Қазақстан: +1600 ₸ (Қазпошта), сомаға қосылған. Басқа елдер: құнын WhatsApp / Telegram арқылы келісеміз.' },
      { q: 'Тапсырысты қалай қадағаласам болады?', a: 'Рәсімдегеннен кейін тапсырыс нөмірін аласыз (TWKKL-... форматында). Оны «Тапсырысты бақылау» бетіне енгізіңіз — сол жерде статус пен трек-нөмір көрінеді.' },
      { q: 'Айырбастауға немесе қайтаруға бола ма?', a: 'Өлшемі сәйкес келмесе — алғаннан кейін бірнеше күн ішінде WhatsApp немесе Telegram арқылы жазыңыз. Тауар киілмеген, биркалармен болуы керек. Мәселені жеке шешеміз.' },
      { q: 'ONE UMMAH худиі неден жасалған?', a: 'Double Layer Air Cotton, тығыздығы 350 GSM — премиум сападағы екі қабатты ауалы мақта. Оверсайз крой, көлемді капюшон, арқада ONE UMMAH принті.' },
      { q: 'Жаңа дроптар қашан?', a: 'Дроптар шектеулі. Бірінші болып білу үшін — Telegram-ымызға жазылыңыз. Күндерді сонда жариялаймыз және қол жеткізуді ерте ашамыз.' },
    ],
    contactCta: 'Сұрақтарыңыз бар ма? Бізге тікелей жазыңыз:',
    writeWa: 'WhatsApp-қа жазу',
    writeTg: 'Telegram-ға жазу',
  },
  en: {
    navAbout: 'About',
    navFaq: 'FAQ',
    aboutLabel: 'About',
    aboutHeading: 'TAWAKKUL — trust and action',
    aboutP1: 'Tawakkul means trust in Allah. But true tawakkul is not sitting idle — it is doing everything within your power and then relying fully on the Almighty. This idea is at the heart of our brand.',
    aboutP2: 'TAWAKKUL (TWKKL) is Islamic premium streetwear. We believe clothing is more than fabric — it is a way to express your values and your belonging to something greater. Every piece is created with intention, from the choice of material to the last stitch.',
    aboutP3: 'We consciously do not place Quranic verses or the names of Allah on the fabric — out of respect. Everything is considered: clean, ethical, meaningful. TAWAKKUL is not just clothing; it is a daily reminder to live with trust, action and sincere intention.',
    aboutValuesLabel: 'Our principles',
    values: [
      { title: 'Mindful', text: 'No verses or names of Allah on the fabric. Respectful of faith.' },
      { title: 'Ethical', text: 'Considered from material to detail. Honest to the customer.' },
      { title: 'Quality', text: 'Premium fabric and fit that lasts for years.' },
      { title: 'Meaning', text: 'Every detail carries a message. Clothing as identity.' },
    ],
    faqLabel: 'Help',
    faqHeading: 'Frequently asked questions',
    faqItems: [
      { q: 'How do I choose my size?', a: 'Every product page has a "Size chart" — pick by your height and weight. If you are between sizes, message us and we will help.' },
      { q: 'How do I pay?', a: 'Kazakhstan — via Kaspi. Russia — transfer to a VTB (MIR) card. Other countries — transfer to a Kaspi card in US dollars. After paying, send us the receipt via WhatsApp or Telegram and we will start processing your order.' },
      { q: 'How long is delivery?', a: 'Russia — CDEK across the country (approx. up to a week, in shaa Allah). Kazakhstan — Kazpost (up to a week). Other countries — we agree the method and timing individually.' },
      { q: 'How much is delivery?', a: 'Russia: you pay CDEK delivery (~700–1000 ₽) on arrival — on the site you pay for the item only. Kazakhstan: +1600 ₸ (Kazpost), included in the total. Other countries: we agree the cost via WhatsApp / Telegram.' },
      { q: 'How do I track my order?', a: 'After checkout you receive an order number (format TWKKL-...). Enter it on the "Track order" page to see the current status and tracking number once we ship.' },
      { q: 'Can I exchange or return?', a: 'If the size does not fit or you have questions, message us on WhatsApp or Telegram within a few days of delivery. The item must be unworn, with tags. We will sort it out individually.' },
      { q: 'What is the ONE UMMAH hoodie made of?', a: 'Double Layer Air Cotton, 350 GSM — premium double-layer air cotton. Oversized fit, voluminous hood, ONE UMMAH print on the back.' },
      { q: 'When are new drops?', a: 'Drops are limited. To be the first to know, subscribe to our Telegram — we announce dates there and open access early.' },
    ],
    contactCta: 'Still have questions? Message us directly:',
    writeWa: 'Message on WhatsApp',
    writeTg: 'Message on Telegram',
  },
}
