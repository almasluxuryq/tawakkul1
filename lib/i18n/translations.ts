export type Language = 'ru' | 'kk' | 'en'

export const translations = {
  ru: {
    // Navigation
    nav: {
      product: 'Товар',
      gallery: 'Галерея',
      manifesto: 'Манифест',
      order: 'Заказать',
      cart: 'Корзина',
    },
    // Hero
    hero: {
      label: 'Мы — умма Пророка ﷺ',
      subtitle: 'Одна вера. Одна община. Без границ.',
      cta: 'Смотреть и заказать',
      scroll: 'Листайте',
    },
    // Product Details
    product: {
      silhouette: {
        label: 'Силуэт',
        heading: 'Свободный. Чистый. Уверенный.',
        specs: 'ONE UMMAH ZIP HOODIE · 350 GSM',
        description: 'Оверсайз крой с объёмным капюшоном. Свободная посадка, которая подчёркивает уверенность и создаёт узнаваемый силуэт. Никаких компромиссов — только чистые линии и премиальное качество.',
      },
      message: {
        label: 'Послание',
        heading: 'ONE UMMAH. На спине. Заявление.',
        subtitle: 'One religion · One purpose · One goal',
        description: 'Надпись на спине — не просто принт. Это манифест единства. Одна религия, одна цель, одно предназначение. Мы — часть чего-то большего.',
      },
      detail: {
        label: 'Деталь',
        heading: 'Цифра ٤٨. На капюшоне. Для своих.',
        subtitle: 'Аль-Фатх · Победа · Вышивка',
        description: 'Арабская вышивка ٤٨ на капюшоне — отсылка к Суре Аль-Фатх (Победа). Тонкая деталь для тех, кто понимает. Для своих.',
      },
    },
    // Fabric Section
    fabric: {
      heading: 'Double Layer Air Cotton',
      description: 'Двухслойный воздушный хлопок премиального качества. Плотность 350 GSM обеспечивает идеальный баланс между теплом и комфортом. Ткань, которая служит годами.',
      specs: {
        gsm: 'GSM',
        sizes: 'S–XL',
        surah: 'Аль-Фатх ٤٨',
      },
      frontView: 'Вид спереди',
      backView: 'Вид сзади',
    },
    // Gallery
    gallery: {
      label: 'Галерея',
      heading: 'Каждый ракурс.',
      headingItalic: 'Каждая деталь.',
      dragHint: '← листайте →',
      captions: ['Улица', 'Драйв', 'Ночь', 'Стиль', 'Детали', 'Текстура', 'Фокус', 'Образ', 'Контраст', 'Атмосфера'],
    },
    // Photo Grid
    photoGrid: {
      heading: 'Визуальное единство',
    },
    // Manifesto
    manifesto: {
      label: 'Наш манифест',
      heading: 'ONE UMMAH — это про',
      headingItalic: 'единство.',
      paragraph1: 'Мы верим, что одежда — это больше, чем ткань. Это способ заявить о себе, о своих ценностях, о принадлежности к чему-то большему. ONE UMMAH — это напоминание о том, что мы — часть единой общины.',
      paragraph2: 'Каждая деталь этого худи создана с намерением. От выбора ткани до вышивки на капюшоне — всё несёт смысл. Это не просто одежда. Это идентичность.',
      cards: {
        religion: {
          title: 'Одна религия',
          description: 'Ислам объединяет миллиарды людей по всему миру. Единая вера, единые ценности.',
        },
        purpose: {
          title: 'Одно предназначение',
          description: 'Каждый из нас создан с целью. Наше предназначение — служение и созидание.',
        },
        goal: {
          title: 'Одна цель',
          description: 'Довольство Всевышнего. Всё остальное — лишь средства на этом пути.',
        },
      },
    },
    // Brand Philosophy
    brand: {
      label: 'POWERED BY TAWAKKUL',
      heading: 'Чистый. Этичный. Со смыслом.',
      description: 'Мы осознанно не размещаем религиозные тексты на ткани. Всё продумано: от выбора материалов до деталей исполнения. Tawakkul — это упование и действие.',
    },
    // Quick Order
    quickOrder: {
      label: 'Лимитированный выпуск · 2025',
      heading: 'ZIP HOODIE ONE UMMAH',
      features: [
        'Double Layer Air Cotton 350 GSM',
        'Оверсайз силуэт с объёмным капюшоном',
        'Принт ONE UMMAH на спине',
        'Вышивка ٤٨ на капюшоне',
        'Лого Tawakkul на груди',
      ],
      sizeChart: 'Таблица размеров',
      addToCart: 'Добавить в корзину',
      buyNow: 'Заказать сейчас',
      badges: {
        limited: 'Малая партия',
        delivery: 'Доставка по KZ и РФ',
        payment: 'Оплата Kaspi / VTB',
      },
    },
    // Final CTA
    finalCta: {
      heading: 'Ты — часть этой уммы.',
      subtitle: 'Лимитированная коллекция. Ограниченный тираж.',
      cta: 'Заказать',
    },
    // Footer
    footer: {
      tagline: 'ONE UMMAH · ZIP HOODIE 2025',
      order: 'Заказать',
      copyright: '© 2025 ONE UMMAH · POWERED BY TAWAKKUL',
      slogan: 'One religion · One purpose · One goal',
    },
    // Cart
    cart: {
      title: 'Корзина',
      empty: 'Корзина пуста',
      emptyDescription: 'Добавьте товары, чтобы оформить заказ',
      size: 'Размер',
      quantity: 'Кол-во',
      subtotal: 'Итого',
      checkout: 'Оформить заказ',
      continueShopping: 'Продолжить покупки',
      remove: 'Удалить',
      pieces: 'шт.',
      decreaseQty: 'Уменьшить количество',
      increaseQty: 'Увеличить количество',
    },
    // Size Chart
    sizeChart: {
      title: 'Таблица размеров',
      size: 'Размер',
      chest: 'Грудь (см)',
      length: 'Длина (см)',
      shoulders: 'Плечи (см)',
      sleeve: 'Рукав (см)',
      note: 'Oversize силуэт — рекомендуем брать свой обычный размер',
    },
    // Checkout
    checkout: {
      title: 'Оформление заказа',
      contact: {
        title: 'Контактные данные',
        name: 'Имя',
        namePlaceholder: 'Ваше имя',
        phone: 'Телефон',
        phonePlaceholder: '+7 (___) ___-__-__',
        email: 'Email (необязательно)',
        emailPlaceholder: 'your@email.com',
        messenger: 'Telegram/WhatsApp (для обновлений)',
        messengerPlaceholder: '@username или номер',
      },
      delivery: {
        title: 'Доставка',
        country: 'Страна',
        city: 'Город',
        cityPlaceholder: 'Введите город',
        address: 'Адрес',
        addressPlaceholder: 'Улица, дом, квартира',
        postalCode: 'Почтовый индекс',
        postalCodePlaceholder: '000000',
        method: 'Способ доставки',
        cost: 'Стоимость доставки',
        costNote: 'Точная стоимость рассчитывается при подтверждении',
        estimatedTime: 'Ориентировочный срок: 5-10 рабочих дней',
        methods: {
          kazpost: 'КазПочта',
          cdek: 'СДЭК',
          pochta: 'Почта России',
        },
      },
      payment: {
        title: 'Оплата',
        kaspiTitle: 'Казахстан',
        kaspiSubtitle: 'Kaspi',
        kaspiDescription: 'Оплата через приложение Kaspi',
        vtbTitle: 'Россия',
        vtbSubtitle: 'VTB',
        vtbDescription: 'Перевод на карту VTB',
      },
      summary: {
        title: 'Ваш заказ',
        product: 'Товар',
        delivery: 'Доставка',
        deliveryCalculating: 'Рассчитывается',
        total: 'Итого',
        submit: 'Оплатить',
      },
      trust: {
        secure: 'Безопасная оплата',
        delivery: 'Надёжная доставка',
        return: 'Возврат 14 дней',
      },
    },
    // Success
    success: {
      title: 'Спасибо за заказ!',
      orderNumber: 'Номер заказа',
      details: 'Детали заказа',
      trackOrder: 'Отследить заказ',
      whatsapp: 'Написать в WhatsApp',
      telegram: 'Написать в Telegram',
      confirmation: 'На ваш телефон/email отправлено подтверждение',
      paymentLink: 'Ссылка для оплаты',
      payNow: 'Оплатить',
      sendReceipt: 'После оплаты отправьте чек нам:',
      vtbCard: 'Карта VTB',
      vtbRecipient: 'Получатель',
    },
    // Track
    track: {
      title: 'Отслеживание заказа',
      placeholder: 'Введите номер заказа',
      search: 'Найти',
      notFound: 'Заказ не найден',
      status: {
        received: 'Заказ принят',
        paid: 'Оплата подтверждена',
        shipped: 'Передан в доставку',
        transit: 'В пути',
        delivered: 'Доставлен',
      },
      trackingNumber: 'Трек-номер',
      deliveryAddress: 'Адрес доставки',
    },
    // Validation
    validation: {
      nameRequired: 'Введите имя',
      nameMin: 'Имя слишком короткое',
      phoneRequired: 'Введите номер телефона',
      phoneInvalid: 'Неверный формат телефона',
      emailInvalid: 'Неверный формат email',
      cityRequired: 'Введите город',
      addressRequired: 'Введите адрес',
    },
    // Common
    common: {
      price: {
        kzt: '₸',
        usd: 'USD',
        rub: '₽',
      },
    },
  },
  kk: {
    // Navigation
    nav: {
      product: 'Өнім',
      gallery: 'Галерея',
      manifesto: 'Манифест',
      order: 'Тапсырыс беру',
      cart: 'Себет',
    },
    // Hero
    hero: {
      label: 'Біз — Пайғамбар ﷺ үмметіміз',
      subtitle: 'Бір дін. Бір қауым. Шекарасыз.',
      cta: 'Қарау және тапсырыс беру',
      scroll: 'Айналдырыңыз',
    },
    // Product Details
    product: {
      silhouette: {
        label: 'Силуэт',
        heading: 'Еркін. Таза. Сенімді.',
        specs: 'ONE UMMAH ZIP HOODIE · 350 GSM',
        description: 'Көлемді капюшонмен оверсайз пішім. Сенімділікті көрсететін және танымал силуэт жасайтын еркін отыру. Ешқандай ымыра жоқ — тек таза сызықтар мен премиум сапа.',
      },
      message: {
        label: 'Хабар',
        heading: 'ONE UMMAH. Артында. Мәлімдеме.',
        subtitle: 'One religion · One purpose · One goal',
        description: 'Артындағы жазу — жай принт емес. Бұл бірліктің манифесті. Бір дін, бір мақсат, бір міндет. Біз үлкен нәрсенің бөлігіміз.',
      },
      detail: {
        label: 'Деталь',
        heading: '٤٨ саны. Капюшонда. Өзіміздікі үшін.',
        subtitle: 'Әл-Фатх · Жеңіс · Кестелеу',
        description: 'Капюшондағы ٤٨ араб кестелеуі — Әл-Фатх (Жеңіс) сүресіне сілтеме. Түсінетіндер үшін нәзік деталь. Өзіміздікі үшін.',
      },
    },
    // Fabric Section
    fabric: {
      heading: 'Double Layer Air Cotton',
      description: 'Премиум сападағы екі қабатты ауалы мақта. 350 GSM тығыздығы жылу мен қолайлылық арасындағы тамаша теңгерімді қамтамасыз етеді. Жылдар бойы қызмет ететін мата.',
      specs: {
        gsm: 'GSM',
        sizes: 'S–XL',
        surah: 'Әл-Фатх ٤٨',
      },
      frontView: 'Алдыңғы көрініс',
      backView: 'Артқы көрініс',
    },
    // Gallery
    gallery: {
      label: 'Галерея',
      heading: 'Әр бұрыш.',
      headingItalic: 'Әр деталь.',
      dragHint: '← айналдырыңыз →',
      captions: ['Көше', 'Драйв', 'Түн', 'Стиль', 'Детальдар', 'Текстура', 'Фокус', 'Бейне', 'Контраст', 'Атмосфера'],
    },
    // Photo Grid
    photoGrid: {
      heading: 'Визуалды бірлік',
    },
    // Manifesto
    manifesto: {
      label: 'Біздің манифест',
      heading: 'ONE UMMAH — бұл',
      headingItalic: 'бірлік туралы.',
      paragraph1: 'Біз киімнің матадан артық екеніне сенеміз. Бұл өзіңіз туралы, құндылықтарыңыз туралы, үлкен нәрсеге тиесілілігіңіз туралы айтудың жолы. ONE UMMAH — біз бірыңғай қауымның бөлігі екенімізді еске салу.',
      paragraph2: 'Бұл худидің әр детальы ниетпен жасалған. Мата таңдаудан капюшондағы кестелеуге дейін — бәрі мағыналы. Бұл жай киім емес. Бұл сәйкестік.',
      cards: {
        religion: {
          title: 'Бір дін',
          description: 'Ислам бүкіл әлем бойынша миллиардтаған адамды біріктіреді. Бірыңғай сенім, бірыңғай құндылықтар.',
        },
        purpose: {
          title: 'Бір міндет',
          description: 'Әрқайсымыз мақсатпен жаратылдық. Біздің міндетіміз — қызмет ету және жасау.',
        },
        goal: {
          title: 'Бір мақсат',
          description: 'Жаратушының разылығы. Қалғанының бәрі — осы жолдағы құралдар ғана.',
        },
      },
    },
    // Brand Philosophy
    brand: {
      label: 'POWERED BY TAWAKKUL',
      heading: 'Таза. Этикалық. Мағыналы.',
      description: 'Біз матаға діни мәтіндерді қоймаймыз. Материал таңдаудан орындау детальдарына дейін бәрі ойластырылған. Tawakkul — бұл сеніп тапсыру және әрекет.',
    },
    // Quick Order
    quickOrder: {
      label: 'Лимиттелген шығарылым · 2025',
      heading: 'ZIP HOODIE ONE UMMAH',
      features: [
        'Double Layer Air Cotton 350 GSM',
        'Көлемді капюшонмен оверсайз силуэт',
        'Артында ONE UMMAH принті',
        'Капюшонда ٤٨ кестелеуі',
        'Кеудеде Tawakkul логосы',
      ],
      sizeChart: 'Өлшемдер кестесі',
      addToCart: 'Себетке қосу',
      buyNow: 'Қазір тапсырыс беру',
      badges: {
        limited: 'Шағын партия',
        delivery: 'KZ және РФ жеткізу',
        payment: 'Kaspi / VTB төлемі',
      },
    },
    // Final CTA
    finalCta: {
      heading: 'Сен — осы үмметтің бөлігісің.',
      subtitle: 'Лимиттелген коллекция. Шектеулі тираж.',
      cta: 'Тапсырыс беру',
    },
    // Footer
    footer: {
      tagline: 'ONE UMMAH · ZIP HOODIE 2025',
      order: 'Тапсырыс беру',
      copyright: '© 2025 ONE UMMAH · POWERED BY TAWAKKUL',
      slogan: 'One religion · One purpose · One goal',
    },
    // Cart
    cart: {
      title: 'Себет',
      empty: 'Себет бос',
      emptyDescription: 'Тапсырыс беру үшін тауарлар қосыңыз',
      size: 'Өлшем',
      quantity: 'Саны',
      subtotal: 'Барлығы',
      checkout: 'Тапсырыс беру',
      continueShopping: 'Сатып алуды жалғастыру',
      remove: 'Жою',
      pieces: 'дана',
      decreaseQty: 'Санын азайту',
      increaseQty: 'Санын көбейту',
    },
    // Size Chart
    sizeChart: {
      title: 'Өлшемдер кестесі',
      size: 'Өлшем',
      chest: 'Кеуде (см)',
      length: 'Ұзындық (см)',
      shoulders: 'Иық (см)',
      sleeve: 'Жең (см)',
      note: 'Oversize силуэт — әдеттегі өлшеміңізді алуды ұсынамыз',
    },
    // Checkout
    checkout: {
      title: 'Тапсырысты рәсімдеу',
      contact: {
        title: 'Байланыс деректері',
        name: 'Аты',
        namePlaceholder: 'Сіздің атыңыз',
        phone: 'Телефон',
        phonePlaceholder: '+7 (___) ___-__-__',
        email: 'Email (міндетті емес)',
        emailPlaceholder: 'your@email.com',
        messenger: 'Telegram/WhatsApp (жаңартулар үшін)',
        messengerPlaceholder: '@username немесе нөмір',
      },
      delivery: {
        title: 'Жеткізу',
        country: 'Ел',
        city: 'Қала',
        cityPlaceholder: 'Қаланы енгізіңіз',
        address: 'Мекенжай',
        addressPlaceholder: 'Көше, үй, пәтер',
        postalCode: 'Пошта индексі',
        postalCodePlaceholder: '000000',
        method: 'Жеткізу әдісі',
        cost: 'Жеткізу құны',
        costNote: 'Нақты құн растау кезінде есептеледі',
        estimatedTime: 'Болжамды мерзім: 5-10 жұмыс күні',
        methods: {
          kazpost: 'ҚазПошта',
          cdek: 'СДЭК',
          pochta: 'Ресей Поштасы',
        },
      },
      payment: {
        title: 'Төлем',
        kaspiTitle: 'Қазақстан',
        kaspiSubtitle: 'Kaspi',
        kaspiDescription: 'Kaspi қосымшасы арқылы төлем',
        vtbTitle: 'Ресей',
        vtbSubtitle: 'VTB',
        vtbDescription: 'VTB картасына аудару',
      },
      summary: {
        title: 'Сіздің тапсырысыңыз',
        product: 'Тауар',
        delivery: 'Жеткізу',
        deliveryCalculating: 'Есептелуде',
        total: 'Барлығы',
        submit: 'Төлеу',
      },
      trust: {
        secure: 'Қауіпсіз төлем',
        delivery: 'Сенімді жеткізу',
        return: 'Қайтару 14 күн',
      },
    },
    // Success
    success: {
      title: 'Тапсырыс үшін рахмет!',
      orderNumber: 'Тапсырыс нөмірі',
      details: 'Тапсырыс мәліметтері',
      trackOrder: 'Тапсырысты бақылау',
      whatsapp: 'WhatsApp-қа жазу',
      telegram: 'Telegram-ға жазу',
      confirmation: 'Телефоныңызға/email-ге растау жіберілді',
      paymentLink: 'Төлем сілтемесі',
      payNow: 'Төлеу',
      sendReceipt: 'Төлемнен кейін бізге чек жіберіңіз:',
      vtbCard: 'VTB картасы',
      vtbRecipient: 'Алушы',
    },
    // Track
    track: {
      title: 'Тапсырысты бақылау',
      placeholder: 'Тапсырыс нөмірін енгізіңіз',
      search: 'Іздеу',
      notFound: 'Тапсырыс табылмады',
      status: {
        received: 'Тапсырыс қабылданды',
        paid: 'Төлем расталды',
        shipped: 'Жеткізуге берілді',
        transit: 'Жолда',
        delivered: 'Жеткізілді',
      },
      trackingNumber: 'Трек-нөмір',
      deliveryAddress: 'Жеткізу мекенжайы',
    },
    // Validation
    validation: {
      nameRequired: 'Атыңызды енгізіңіз',
      nameMin: 'Аты тым қысқа',
      phoneRequired: 'Телефон нөмірін енгізіңіз',
      phoneInvalid: 'Телефон форматы дұрыс емес',
      emailInvalid: 'Email форматы дұрыс емес',
      cityRequired: 'Қаланы енгізіңіз',
      addressRequired: 'Мекенжайды енгізіңіз',
    },
    // Common
    common: {
      price: {
        kzt: '₸',
        usd: 'USD',
        rub: '₽',
      },
    },
  },
  en: {
    // Navigation
    nav: {
      product: 'Product',
      gallery: 'Gallery',
      manifesto: 'Manifesto',
      order: 'Order',
      cart: 'Cart',
    },
    // Hero
    hero: {
      label: 'We are the Ummah of the Prophet ﷺ',
      subtitle: 'One faith. One community. No borders.',
      cta: 'View and Order',
      scroll: 'Scroll',
    },
    // Product Details
    product: {
      silhouette: {
        label: 'Silhouette',
        heading: 'Free. Clean. Confident.',
        specs: 'ONE UMMAH ZIP HOODIE · 350 GSM',
        description: 'Oversized cut with a volumetric hood. A relaxed fit that emphasizes confidence and creates a recognizable silhouette. No compromises — only clean lines and premium quality.',
      },
      message: {
        label: 'Message',
        heading: 'ONE UMMAH. On the back. A statement.',
        subtitle: 'One religion · One purpose · One goal',
        description: 'The inscription on the back is not just a print. It is a manifesto of unity. One religion, one goal, one purpose. We are part of something greater.',
      },
      detail: {
        label: 'Detail',
        heading: 'Number ٤٨. On the hood. For those who know.',
        subtitle: 'Al-Fath · Victory · Embroidery',
        description: 'The Arabic embroidery ٤٨ on the hood — a reference to Surah Al-Fath (Victory). A subtle detail for those who understand. For our own.',
      },
    },
    // Fabric Section
    fabric: {
      heading: 'Double Layer Air Cotton',
      description: 'Premium quality double-layer air cotton. 350 GSM density provides the perfect balance between warmth and comfort. Fabric that lasts for years.',
      specs: {
        gsm: 'GSM',
        sizes: 'S–XL',
        surah: 'Al-Fath ٤٨',
      },
      frontView: 'Front View',
      backView: 'Back View',
    },
    // Gallery
    gallery: {
      label: 'Gallery',
      heading: 'Every angle.',
      headingItalic: 'Every detail.',
      dragHint: '← drag to explore →',
      captions: ['Street', 'Drive', 'Night', 'Style', 'Details', 'Texture', 'Focus', 'Look', 'Contrast', 'Atmosphere'],
    },
    // Photo Grid
    photoGrid: {
      heading: 'Visual Unity',
    },
    // Manifesto
    manifesto: {
      label: 'Our Manifesto',
      heading: 'ONE UMMAH — is about',
      headingItalic: 'unity.',
      paragraph1: 'We believe clothing is more than fabric. It is a way to express yourself, your values, your belonging to something greater. ONE UMMAH is a reminder that we are part of a unified community.',
      paragraph2: 'Every detail of this hoodie is created with intention. From fabric selection to hood embroidery — everything carries meaning. This is not just clothing. This is identity.',
      cards: {
        religion: {
          title: 'One Religion',
          description: 'Islam unites billions of people around the world. One faith, one set of values.',
        },
        purpose: {
          title: 'One Purpose',
          description: 'Each of us is created with a purpose. Our mission is to serve and create.',
        },
        goal: {
          title: 'One Goal',
          description: 'The pleasure of the Almighty. Everything else is just means on this path.',
        },
      },
    },
    // Brand Philosophy
    brand: {
      label: 'POWERED BY TAWAKKUL',
      heading: 'Clean. Ethical. Meaningful.',
      description: 'We consciously do not place religious texts on the fabric. Everything is thought through: from material selection to execution details. Tawakkul is trust and action.',
    },
    // Quick Order
    quickOrder: {
      label: 'Limited Edition · 2025',
      heading: 'ZIP HOODIE ONE UMMAH',
      features: [
        'Double Layer Air Cotton 350 GSM',
        'Oversized silhouette with volumetric hood',
        'ONE UMMAH print on back',
        '٤٨ embroidery on hood',
        'Tawakkul logo on chest',
      ],
      sizeChart: 'Size Chart',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      badges: {
        limited: 'Small Batch',
        delivery: 'Shipping to KZ & RU',
        payment: 'Kaspi / VTB Payment',
      },
    },
    // Final CTA
    finalCta: {
      heading: 'You are part of this Ummah.',
      subtitle: 'Limited collection. Limited edition.',
      cta: 'Order',
    },
    // Footer
    footer: {
      tagline: 'ONE UMMAH · ZIP HOODIE 2025',
      order: 'Order',
      copyright: '© 2025 ONE UMMAH · POWERED BY TAWAKKUL',
      slogan: 'One religion · One purpose · One goal',
    },
    // Cart
    cart: {
      title: 'Cart',
      empty: 'Cart is empty',
      emptyDescription: 'Add items to place an order',
      size: 'Size',
      quantity: 'Qty',
      subtotal: 'Subtotal',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      remove: 'Remove',
      pieces: 'pcs',
      decreaseQty: 'Decrease quantity',
      increaseQty: 'Increase quantity',
    },
    // Size Chart
    sizeChart: {
      title: 'Size Chart',
      size: 'Size',
      chest: 'Chest (cm)',
      length: 'Length (cm)',
      shoulders: 'Shoulders (cm)',
      sleeve: 'Sleeve (cm)',
      note: 'Oversized fit — we recommend ordering your usual size',
    },
    // Checkout
    checkout: {
      title: 'Checkout',
      contact: {
        title: 'Contact Information',
        name: 'Name',
        namePlaceholder: 'Your name',
        phone: 'Phone',
        phonePlaceholder: '+7 (___) ___-__-__',
        email: 'Email (optional)',
        emailPlaceholder: 'your@email.com',
        messenger: 'Telegram/WhatsApp (for updates)',
        messengerPlaceholder: '@username or number',
      },
      delivery: {
        title: 'Delivery',
        country: 'Country',
        city: 'City',
        cityPlaceholder: 'Enter city',
        address: 'Address',
        addressPlaceholder: 'Street, building, apartment',
        postalCode: 'Postal Code',
        postalCodePlaceholder: '000000',
        method: 'Delivery Method',
        cost: 'Delivery Cost',
        costNote: 'Exact cost calculated upon confirmation',
        estimatedTime: 'Estimated delivery: 5-10 business days',
        methods: {
          kazpost: 'KazPost',
          cdek: 'CDEK',
          pochta: 'Russian Post',
        },
      },
      payment: {
        title: 'Payment',
        kaspiTitle: 'Kazakhstan',
        kaspiSubtitle: 'Kaspi',
        kaspiDescription: 'Pay via Kaspi app',
        vtbTitle: 'Russia',
        vtbSubtitle: 'VTB',
        vtbDescription: 'Transfer to VTB card',
      },
      summary: {
        title: 'Your Order',
        product: 'Product',
        delivery: 'Delivery',
        deliveryCalculating: 'Calculating',
        total: 'Total',
        submit: 'Pay',
      },
      trust: {
        secure: 'Secure Payment',
        delivery: 'Reliable Delivery',
        return: '14-day Returns',
      },
    },
    // Success
    success: {
      title: 'Thank you for your order!',
      orderNumber: 'Order Number',
      details: 'Order Details',
      trackOrder: 'Track Order',
      whatsapp: 'Contact via WhatsApp',
      telegram: 'Contact via Telegram',
      confirmation: 'Confirmation sent to your phone/email',
      paymentLink: 'Payment Link',
      payNow: 'Pay Now',
      sendReceipt: 'After payment, send us the receipt:',
      vtbCard: 'VTB Card',
      vtbRecipient: 'Recipient',
    },
    // Track
    track: {
      title: 'Track Order',
      placeholder: 'Enter order number',
      search: 'Search',
      notFound: 'Order not found',
      status: {
        received: 'Order Received',
        paid: 'Payment Confirmed',
        shipped: 'Shipped',
        transit: 'In Transit',
        delivered: 'Delivered',
      },
      trackingNumber: 'Tracking Number',
      deliveryAddress: 'Delivery Address',
    },
    // Validation
    validation: {
      nameRequired: 'Please enter your name',
      nameMin: 'Name is too short',
      phoneRequired: 'Please enter your phone number',
      phoneInvalid: 'Invalid phone format',
      emailInvalid: 'Invalid email format',
      cityRequired: 'Please enter your city',
      addressRequired: 'Please enter your address',
    },
    // Common
    common: {
      price: {
        kzt: '₸',
        usd: 'USD',
        rub: '₽',
      },
    },
  },
} as const

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly string[]
      ? string[]
      : T[K] extends object
        ? DeepStringify<T[K]>
        : T[K]
}

export type Translations = DeepStringify<typeof translations.ru>
