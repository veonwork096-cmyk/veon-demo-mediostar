// Facts from veon/client.json only (ids in comments). Nothing here is invented.

export interface Phone { display: string; href: string; }
export interface City {
  id: "lviv" | "kyiv";
  name: string;
  address: string;
  landmark: string;
  phones: Phone[];
  viber: string;
  telegram: string;
  email?: string;
  hours: string[];
  hoursNote?: string;
  extra?: string;
  map: string;
}

const tel = (d: string) => "tel:+380" + d.replace(/\D/g, "").slice(1);

export const cities: City[] = [
  {
    id: "lviv",
    name: "Львів",
    address: "вул. Городоцька, 62",                         // B-F002, B-F015
    landmark: "орієнтир — цирк",                             // company.geography[0]
    phones: ["067 833-05-05", "050 833-05-05", "093 833-05-05"].map((d) => ({ display: d, href: tel(d) })), // company.contacts.phones
    viber: "viber://chat?number=+380678330505",             // company.contacts.messengers[0]
    telegram: "https://telegram.me/Mediostar",               // company.contacts.messengers[2]
    email: "mediostar@gmail.com",                            // B-F015
    hours: ["пн–сб 8:30–20:30", "нд 9:00–19:00"],            // B-F015
    extra: "Поруч 4-рівневий паркінг, перша година безкоштовно", // B-F015
    map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Львів, вул. Городоцька, 62"),
  },
  {
    id: "kyiv",
    name: "Київ",
    address: "вул. М. Максимовича, 3Д",                      // B-F003
    landmark: "м. Васильківська",                            // company.geography[1]
    phones: ["067 811-06-06", "050 811-06-06", "063 811-06-06"].map((d) => ({ display: d, href: tel(d) })),
    viber: "viber://chat?number=+380678110606",             // company.contacts.messengers[1]
    telegram: "https://telegram.me/mediostar_kyiv",          // company.contacts.messengers[3]
    hours: ["вт–сб 9:00–21:00"],                             // B-F007 (DOC.UA)
    hoursNote: "Графік за даними DOC.UA, уточнюйте телефоном",
    map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Київ, вул. М. Максимовича, 3Д"),
  },
];

// Problem-first index (concept §5 napryamy). Prices: C-101 (Lviv). Devices: B-F005, B-F021.
export interface Direction { problem: string; answer: string; device?: string; price?: string; priceNote?: string; }
export const directions: Direction[] = [
  { problem: "Небажане волосся", answer: "Лазерна епіляція", device: "Діодний лазер Lumenis LightSheer", price: "від 890 грн", priceNote: "бікіні, Львів" },
  { problem: "Пігментація і судини", answer: "Видалення пігментації та судин лазером" },
  { problem: "Акне і постакне", answer: "Лікування акне і постакне лазером" },
  { problem: "Тьмяна шкіра, ознаки віку", answer: "Фотоомолодження, HydraFacial, ін’єкційна косметологія", price: "2700 грн", priceNote: "чистка HydraFacial, Львів" },
  { problem: "Родимки, новоутворення, атерома", answer: "Консультація дерматолога, видалення новоутворень", device: "Дерматоскоп Illuco IDS 1100", price: "1200 грн", priceNote: "консультація дерматолога, Львів" },
  { problem: "Тіло", answer: "Косметологія тіла" },
  { problem: "Стопи і нігті", answer: "Медичний педикюр і манікюр" },
  { problem: "Випадіння волосся", answer: "Лазерна стимуляція росту волосся" },
];

// B-F020, C-108: six doctors on the clinic's home page (Lviv), specialisation and schedule «згідно з записом».
export interface Doctor { name: string; role: string; hours: string; }
export const doctors: Doctor[] = [
  { name: "Вікторія Збірко", role: "Лазерні технології та апаратні методики, трихолог, дерматолог, косметолог-ін’єкціоніст", hours: "вт, пт 10:00–20:00; нд 9:00–19:00" },
  { name: "Віра Вигнанська", role: "Лазерні технології та апаратні методики", hours: "чт, пт 8:30–20:30" },
  { name: "Олена Триндяк", role: "Лазерні технології та апаратні методики, косметолог", hours: "пн, ср, чт, сб 8:30–20:00" },
  { name: "Олександра Гугусь", role: "Лазерні технології та апаратні методики, косметолог, косметолог-ін’єкціоніст", hours: "пн, ср 11:00–16:00; сб 10:00–17:00" },
  { name: "Святослав Синюк", role: "Лікар-хірург, ін’єкціоніст", hours: "пн, ср 16:00–20:00" },
  { name: "Ірина Гаврилюк", role: "Лікар дієтолог-нутриціолог", hours: "ср 8:30–20:30" },
];

// B-F021, grouped by purpose.
export const equipment = [
  { group: "Лазери", items: ["Lumenis M22", "Lumenis LightSheer Duet", "Sciton BBL"] },
  { group: "Догляд за шкірою", items: ["HydraFacial", "OXYjet LEO de LUXE"] },
  { group: "Діагностика і стерильність", items: ["Дерматоскоп Illuco IDS 1100", "Автоклав Tau Clave 3000"] },
];

// C-105
export const app = {
  appStore: "https://apps.apple.com/ua/app/mediostar/id6468869504",
  googlePlay: "https://play.google.com/store/apps/details?id=com.cleverbox.mediostar",
};
export const instagram = "https://www.instagram.com/mediostar.ua/";
