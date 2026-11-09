import { Language } from './translations'

// Тексты страницы HOODIE TAWAKKUL (RU / KZ / EN).

export interface TwBlock {
  label: string
  heading: string
  subtitle?: string
  description: string
  image: string
}

export interface TawakkulHoodieStrings {
  tagline: string
  blocks: TwBlock[]
}

const IMG = {
  meaning: '/photos/tawakkul/street-dusk.jpg',
  reflective: '/photos/tawakkul/day-night-2.jpg',
  front: '/photos/tawakkul/front.jpg',
  comfort: '/photos/tawakkul/campfire.jpg',
  details: '/photos/tawakkul/ridge.jpg',
}

export const TAWAKKUL_HOODIE_T: Record<Language, TawakkulHoodieStrings> = {
  ru: {
    tagline: 'TAWAKKUL. Reflective Hoodie',
    blocks: [
      {
        label: 'Do your best. Trust Allah.',
        heading: 'Не просто одежда. Напоминание о том, на чём строится наш путь.',
        description:
          'TAWAKKUL — это упование на Аллаха. Принцип, который напоминает: делай всё, что в твоих силах, предпринимай необходимые усилия и доверяй результат Аллаху. Мы воплотили эту идею в новой модели TAWAKKUL.',
        image: IMG.meaning,
      },
      {
        label: 'A design with meaning',
        heading: 'Светоотражающая каллиграфия توكل',
        subtitle: 'Светится, когда на неё падает свет',
        description:
          'На спине — крупная арабская каллиграфия توكل, дополненная небольшой надписью Tawakkul. Главная особенность модели — светоотражающий принт: при попадании направленного света (фары, вспышка, фонарь) он отражает его и создаёт выразительный эффект. Днём — сдержанно, ночью — заметно.',
        image: IMG.reflective,
      },
      {
        label: 'Front',
        heading: 'Две минималистичные вышивки',
        description:
          'Спереди — оригинальный логотип бренда и надпись Tawakkul. Сдержанный дизайн с идеей, которая стоит за каждой деталью.',
        image: IMG.front,
      },
      {
        label: 'Made for everyday comfort',
        heading: 'Тёплое, плотное, свободное',
        subtitle: '350 GSM · мягкий флис внутри',
        description:
          'Плотный материал 350 GSM с мягкой флисовой изнанкой даёт комфорт и тепло в прохладную погоду. Свободный Oversized Fit с силуэтом Boxy, спущенными плечами и объёмным капюшоном создаёт расслабленную посадку.',
        image: IMG.comfort,
      },
      {
        label: 'Details',
        heading: 'Детали',
        subtitle: 'Размеры: S / M / L / XL',
        description:
          '350 GSM · 42% хлопок, полиэстер · мягкий начёс внутри · Oversized / Boxy Fit · две вышивки спереди · светоотражающий принт на спине · классический капюшон · карман-кенгуру.',
        image: IMG.details,
      },
    ],
  },
  kk: {
    tagline: 'TAWAKKUL. Reflective Hoodie',
    blocks: [
      {
        label: 'Do your best. Trust Allah.',
        heading: 'Жай киім емес. Жолымыздың негізін еске салу.',
        description:
          'TAWAKKUL — Аллаһқа тәуекел ету. Бұл қағида еске салады: қолыңнан келгеннің бәрін жаса, қажетті күш сал және нәтижесін Аллаһқа тапсыр. Біз осы идеяны жаңа TAWAKKUL моделінде бейнеледік.',
        image: IMG.meaning,
      },
      {
        label: 'A design with meaning',
        heading: 'Жарық шағылыстыратын توكل каллиграфиясы',
        subtitle: 'Жарық түскенде жарқырайды',
        description:
          'Арқасында — үлкен араб каллиграфиясы توكل және шағын Tawakkul жазуы. Модельдің басты ерекшелігі — жарық шағылыстыратын принт: бағытталған жарық (фара, жарқыл, шам) түскенде оны шағылыстырып, әсерлі көрініс береді. Күндіз — ұстамды, түнде — көзге түседі.',
        image: IMG.reflective,
      },
      {
        label: 'Front',
        heading: 'Екі минималистік кесте',
        description:
          'Алдында — брендтің түпнұсқа логотипі және Tawakkul жазуы. Әр детальдың артында идеясы бар ұстамды дизайн.',
        image: IMG.front,
      },
      {
        label: 'Made for everyday comfort',
        heading: 'Жылы, тығыз, еркін',
        subtitle: '350 GSM · іші жұмсақ флис',
        description:
          'Іші жұмсақ флисті 350 GSM тығыз мата салқын ауа райында жайлылық пен жылу береді. Boxy силуэтті, түсірілген иықты және көлемді капюшонды еркін Oversized Fit бос әрі жайлы отырады.',
        image: IMG.comfort,
      },
      {
        label: 'Details',
        heading: 'Детальдар',
        subtitle: 'Өлшемдер: S / M / L / XL',
        description:
          '350 GSM · 42% мақта, полиэстер · іші жұмсақ түкті · Oversized / Boxy Fit · алдында екі кесте · арқасында жарық шағылыстыратын принт · классикалық капюшон · кенгуру қалта.',
        image: IMG.details,
      },
    ],
  },
  en: {
    tagline: 'TAWAKKUL. Reflective Hoodie',
    blocks: [
      {
        label: 'Do your best. Trust Allah.',
        heading: 'Not just clothing. A reminder of what our path is built on.',
        description:
          'TAWAKKUL means trust in Allah. A principle that reminds us: do everything within your power, make the necessary effort, and trust the outcome to Allah. We put this idea into the new TAWAKKUL model.',
        image: IMG.meaning,
      },
      {
        label: 'A design with meaning',
        heading: 'Reflective توكل calligraphy',
        subtitle: 'It lights up when light hits it',
        description:
          'On the back — large Arabic calligraphy توكل with a small Tawakkul wordmark below. The key feature is the reflective print: when direct light (headlights, flash, a torch) hits it, it reflects back and creates a striking effect. Subtle by day, unmissable at night.',
        image: IMG.reflective,
      },
      {
        label: 'Front',
        heading: 'Two minimalist embroideries',
        description:
          'On the front — the original brand logo and the Tawakkul wordmark. A restrained design with an idea behind every detail.',
        image: IMG.front,
      },
      {
        label: 'Made for everyday comfort',
        heading: 'Warm, heavy, relaxed',
        subtitle: '350 GSM · soft brushed fleece inside',
        description:
          'Heavy 350 GSM fabric with a soft brushed fleece lining keeps you comfortable and warm in cool weather. A relaxed Oversized Fit with a boxy silhouette, dropped shoulders and a voluminous hood.',
        image: IMG.comfort,
      },
      {
        label: 'Details',
        heading: 'Details',
        subtitle: 'Sizes: S / M / L / XL',
        description:
          '350 GSM · 42% cotton, polyester · soft brushed fleece · Oversized / Boxy Fit · two embroideries on the front · reflective print on the back · classic hood · kangaroo pocket.',
        image: IMG.details,
      },
    ],
  },
}
