export interface IFlatsList {
  payload: IFlat[];
}
export interface IFlatDetail {
  payload: IFlatDetailInfo;
}
export interface IFlat {
  uid: string;
  status: string;
  type: string;
  number: string;
  declared_square: number;
  marketing_square: number | null;
  complex: string;
  house: string;
  article: string;
  floor: number;
  ready_date: string;
  costs: IFlatCost[];
  properties: IFlatProperties[] | [];
  features: string[] | [];
  images: string[];
}

export interface IFlatDetailInfo {
  uid: string;
  status: string;
  type: string;
  arcticle: string | null;
  planoplan: string | null | "";
  plan_planoplan: string | null | "";
  number: string;
  declared_square: number;
  marketing_square: number | null;
  complex: string;
  house: string;
  house_media: IFlatDetailInfoHouseMedia[];
  complex_media: IFlatDetailInfoComplexMedia[];
  entrance_floors: string;
  floor: number;
  ceiling_height: number | null;
  construction_material: string | null;
  interior: string | null;
  window_placement: string | null;
  window_view: string | null;
  ready_date: string;
  fact_date: string | null;
  costs: IFlatCost[];
  properties: IFlatProperties[] | [];
  features: string[] | [];
  images: string[];
  video_review: string | null;
  dynamics_today: string | null;
  map_objects: number[];
}

export interface IFlatCost {
  cost: number;
  old_cost: number | 0;
  bonus_count: number | null
  title: string;
  payments: IFlatPayments[];
}

export interface IFlatPayments {
  base_rate: number;
  initial_fee: number;
  max_mortgage_term: number;
  min_payment: number;
  mortgage_name: string;
  mortgage_type: string;
  subsidized_payment: number | null;
  sub_period: number | 0;
  sub_rate: number | 0;
}

export interface IFlatProperties {
  title: string;
  sign: {
    type: "color" | "icon";
    value: string;
  };
}

// LET блочная область видимости
// VAR функциональная область видимости
// стрелочные функции не имеют this и не имеют объекта arguments
// Массивы (свойства):
// .prototype Позволяет добавлять свойства ко всем объектам массива.
// .constructor Определяет функцию, создающую прототип объекта.
// event loop - механизм для выполнения асинхронного кода, т.к js однопоточный
// 1 выполняются: taskи (console.log())
// 2 выполняются: microtaskи (promise)
// 3 выполняются: веб-апи macrotaskи (setTimeout(), eventListener)
//
// NodeList возвращают метод getElementsByName()- Динамический (измен при new elem)
// NodeList возвращает метод querySelectorAll() - Статический (не измен при new elem)
// HTMLCollection возвращает метод getElementsByClassName() - Динамический

// декларативная разработка
// sessionStorage - после обновления страницы
// localStorage - после перезагрузки браузера

//  WeakMap - 1) ключи объекты, 2) нет методов keys(), values(), entries()

// атрибуты объекта : writeble, configurable, prototype, enumerable
// defineExpose - Обратная

// 1)nuxt
// +: 1. универсальность - статический сайт, spa, ssr
//    2. производительность - кэширование, ленивая загрузка
//    3. seo - автоматическая генерация страниц улучшает индексацию поисковиками
//    4. компонентный подход
//    5. поддержка ts
//    6. автоматическая генерация маршрутов

// universal side rendering(при ssr тоже самое, но файлы js связаны с функциями):
//  1) сервер отдает не пустой html client (можно смотреть картинки, тыкать ссылки)
//  2) сервер отдает js файл и клиент загружает и запускает его бэкграундом
//  3) произошла гидратация и интерфейс интерактивен

// client side rendering (spa тоже самое но js вьюшный)
// 1) клиент получает пустой html файлик,
// 2) клиент загружает и запускает js
// 3) приложение стало визуализированным и интерактивным

// 2)type script

// .env - это изолированный файлик с важными данными типа яндекс каунтер или base url
// NVM (node version manager)- нужен для управления node и для установки npm

//  pm2 это прооцесс менеджер node js приложений
// 1) запуск процесса
// 2) автоматическая презагрузка
// 3) управление процессами (через pm2 команды)
// 4) масштабируемость (запускать разные экземпляры на разных портах)

export interface IFlatDetailInfoHouseMedia {
  uid: string;
  type: string;
  name: string;
  files: {
    uid: string;
    type: string;
    file: string;
  }[];
}

export interface IFlatDetailInfoComplexMedia {
  uid: string;
  type: string;
  name: string;
  files: {
    uid: string;
    type: string;
    file: string;
  }[];
}
