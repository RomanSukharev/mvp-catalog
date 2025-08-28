<script setup lang="ts">
import { ref } from "vue";
// import { IInfrastructure, IInfrastructureElement } from "@/types/InfrastructureTypes";
import { initYaMap } from "~/composables/initYaMap";
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";

export interface IInfrastructureMapProps {
  map_objects: number[];
}

const props = defineProps<IInfrastructureMapProps>();

// var infrastructure = useState<IInfrastructure>("infrastructure");
var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

var openFullScreenMap = ref();
var closeFullScreenMap = ref();

var is_fullscreen = ref(false);
var has_mar_error = ref(false);

var hasShiftKeyHandler = false;

onMounted(async () => {
  var yamap_options = {
    center: [props.map_objects[0] + -0.003, props.map_objects[1] - 0.003],
    zoom: 15,
    controls: [],
  };

  function init() {
    var ya_map = new ymaps.Map("infrastructure_map", yamap_options);
    ya_map.behaviors.disable("scrollZoom");
    ya_map.controls.add('zoomControl', {position: {right: '20px', top: '130px'}}); //prettier-ignore

    var ya_clusterer = new ymaps.Clusterer({ zIndex: 1 });

    //--- ИНИЦИАЛИЗИРУЕМ ФУНКЦИИ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ КАРТЫ В ПОЛНОЭКРАННОМ РЕЖИМЕ (start) ---
    openFullScreenMap.value = function () {
      is_fullscreen.value = true;
      ya_map.container.enterFullscreen();
    };

    closeFullScreenMap.value = function () {
      is_fullscreen.value = false;
      ya_map.container.exitFullscreen();
    };
    //--- ИНИЦИАЛИЗИРУЕМ ФУНКЦИИ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ КАРТЫ В ПОЛНОЭКРАННОМ РЕЖИМЕ (end) ---

    //------------------------- ГЛАВНАЯ ПЛАШКА (start) -------------------------
    var placemark_main = new ymaps.Placemark(
      props.map_objects,
      { iconCaption: data_flat_detail.value.complex },
      {
        iconColor: "#EC3A39",
        // preset: "islands#dotIcon",
        preset: "islands#blueHomeIcon",
        iconImageSize: [268, 268],
      }
    );
    ya_map.geoObjects.add(placemark_main);
    //------------------------- ГЛАВНАЯ ПЛАШКА (end) -------------------------

    //------------------------- ОБРАБОТЧИКИ НА SHIFT (start) -------------------------
    if (!hasShiftKeyHandler) {
      hasShiftKeyHandler = true;

      document.addEventListener("keydown", (event) => {
        if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
          ya_map.behaviors.enable("scrollZoom");
        }
      });

      document.addEventListener("keyup", (event) => {
        if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
          ya_map.behaviors.disable("scrollZoom");
        }
      });
    }
    //------------------------- ОБРАБОТЧИКИ НА SHIFT (end) -------------------------

    // var iconContentLayout = (href: string) =>
    //   ymaps.templateLayoutFactory.createClass(
    //     `<div class="InfrastructureMap__Placemark">${href ? `<img src="${href}"/>` : ""}</div>`
    //   );

    // var getContentBalloon = (element: IInfrastructureElement) => {
    //   var html = "";

    //   // element?.map_icon?.[0]?.file &&
    //   //   (html += `<img class="InfrastructureMap__ballonContentImg" src="${element.map_icon[0].file}" />`);

    //   html += `<h5 class="InfrastructureMap__ballonTitle" >${element.name}</h5>`;

    //   let html_items = "";

    //   element.walking_time &&
    //     (html_items += `<div class="InfrastructureMap__ballonContentItem" ><img src="/icons/icon_walk.svg"/><p>${element.walking_time} мин.</p></div>`);
    //   element.car_time &&
    //     (html_items += `<div class="InfrastructureMap__ballonContentItem" ><img src="/icons/icon_car.svg"/><p>${element.car_time} мин.</p></div>`);
    //   element.public_transport_time &&
    //     (html_items += `<div class="InfrastructureMap__ballonContentItem" ><img src="/icons/icon_bus.svg"/><p>${element.public_transport_time} мин.</p></div>`);
    //   element.cycling_time &&
    //     (html_items += `<div class="InfrastructureMap__ballonContentItem" ><img src="/icons/icon_bicycle.svg"/><p>${element.cycling_time} мин.</p></div>`);
    //   element.scooter_time &&
    //     (html_items += `<div class="InfrastructureMap__ballonContentItem" ><img src="/icons/icon_scooter.svg"/><p>${element.scooter_time} мин.</p></div>`);
    //   element.scooter_time &&
    //     (html_items += `<div class="InfrastructureMap__ballonContentItem" ><img src="/icons/icon_taxi.svg"/><p>${element.taxi_cost} руб.</p></div>`);

    //   html_items && (html += `<div class="InfrastructureMap__ballonContentList" >${html_items}</div>`);

    //   return html;
    // };

    // var getPlacemarks = () =>
    //   infrastructure.value.current_category.elements.map(
    //     (i) =>
    //       new ymaps.Placemark(
    //         i.map_mark,
    //         {
    //           balloonContentBody: getContentBalloon(i),
    //         },
    //         {
    //           iconLayout: iconContentLayout(i.placemark_icon),
    //           iconOffset: [-20, -15],
    //           iconShape: {
    //             type: "Circle",
    //             coordinates: [15, 19],
    //             radius: 17,
    //           },
    //         }
    //       )
    //   );

    // var setPlacemarks = () => {
    //   ya_clusterer.removeAll();
    //   ya_clusterer.add(getPlacemarks());
    //   ya_map.geoObjects.add(ya_clusterer);
    // };

    // setPlacemarks();
    // watch(() => infrastructure.value.current_category, setPlacemarks);
  }

  var is_ya_map_init = await initYaMap();
  is_ya_map_init ? ymaps.ready(init) : (has_mar_error.value = true);
});
</script>

<template>
  <div class="InfrastructureMap" v-if="!has_mar_error">
    <Teleport to="body">
      <q-btn v-if="is_fullscreen" class="InfrastructureMap__btnCloseFullSize" @click="closeFullScreenMap"
        ><q-icon color="white" size="30px" name="close"></q-icon
      ></q-btn>
    </Teleport>
    <!-- <div>324324234234323423432424</div> -->
    <div id="infrastructure_map" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0"></div>

    <div class="InfrastructureMap__coverHint">
      <div class="InfrastructureMap__desktopHint">
        <img class="InfrastructureMap__desktopHintIcon" :src="'icons/icon_keyboard.svg'" />
        <h5 class="InfrastructureMap__desktopHintText">
          Для скрола карты зажмите <br />
          клавишу Shift и крутите <br />
          колесико мыши
        </h5>
      </div>

      <div class="InfrastructureMap__mobileHint">
        <!-- <p class="InfrastructureMap__mobileHintP">Выберите ярлык на&nbsp;карте, чтобы прочитать подробнее</p> -->

        <button class="InfrastructureMap__btnOpenMap" @click="openFullScreenMap()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 7.20012V20.0001L8.72727 16.8001L15.2727 20.0001L21 16.8001V4.00012L15.2727 7.20012L8.72727 4.00012L3 7.20012Z"
              stroke="#FFFDF9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.72729 4.00012V16.8001"
              stroke="#FFFDF9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.2727 7.19995V20"
              stroke="#FFFDF9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Открыть карту
        </button>
      </div>
    </div>

    <!-- <div class="InfrastructureMap__toggleBox" v-if="is_fullscreen">
      <button
        :class="`${
          infrastructure.current_category === category
            ? 'InfrastructureMap__toggleCaregory_active'
            : 'InfrastructureMap__toggleCaregory'
        }`"
        v-for="(category, idx) in infrastructure.categories"
        @click="infrastructure.current_category = category"
      >
        <img v-if="category.elements[0].placemark_icon && idx !== 0" :src="category.elements[0].placemark_icon" />
        {{ category.name_category }}
      </button>
    </div> -->
  </div>
  <div class="InfrastructureMap__error" v-else>
    <h4>Ошибка загрузки карты</h4>
  </div>
</template>

<style lang="scss">
//Настройки стилей yandex_map ballon (всплывашка)
//цвет иконки "закрыть" меняется через background в классе .ymaps-2-1-79-balloon__close-button
$ballon_max-width: 170px;
$ballon_border-radius: 8px;
$ballon_background-color: black;
$ballon_color: black; //цвет текста

.InfrastructureMap {
  position: absolute;
  inset: 0;
}

.InfrastructureMap__btnCloseFullSize {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  width: 34px;
  height: 40px;
  background-color: #ec3a39;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #ff6363;
    transition: 0.2s ease-in-out;
  }
}

.InfrastructureMap:hover .InfrastructureMap__coverHint {
  opacity: 0;
}

.InfrastructureMap__coverHint {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.5s;
}

.InfrastructureMap__desktopHint {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.InfrastructureMap__desktopHintText {
  font-family: "TT Norms Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 26.4px */
  text-align: center;
  color: white;
}

.InfrastructureMap__mobileHint {
  display: none;
}

.InfrastructureMap__mobileHintP {
  text-align: center;
  font-family: "TT Norms Pro";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 24.2px */
  color: black;

  max-width: 280px;
}

.InfrastructureMap__btnOpenMap {
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 23.4px */
  color: white;

  display: flex;
  align-items: center;
  background: none;
  background-color: #ec3a39;

  border: 1px solid #ec3a39;
  gap: 6px;
  padding: 14px 52px;
  border-radius: 40px;
}

.InfrastructureMap__Placemark {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: black;
  border: 2px solid black;
  transform: scale(1.2);

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    filter: invert(1);
  }
}

.InfrastructureMap__error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
}

//---------------- ПЕРЕОПРЕДЕЛЕНИЕ СТИЛЕЙ КАРТЫ (start) ----------------
.ymaps-2-1-79-balloon__layout {
  background: none !important;
  border-radius: $ballon_border-radius !important;
}

.ymaps-2-1-79-balloon {
  border-radius: $ballon_border-radius;
  padding: 0 !important;
}

.ymaps-2-1-79-balloon__content {
  padding: 0 !important;
  margin: 0 !important;
  background-color: $ballon_background-color !important;
}

.ymaps-2-1-79-balloon__close-button {
  opacity: 1 !important;
  background: url("data:image/svg+xml;utf8," + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect x="0" y="0" width="50" height="50" fill="%23000" /><path d="M9.2 6.3 6.3 9.2 22.2 25l-16 16L9 43.8l16-16 16 16 2.8-2.9-16-15.9L43.7 9.2l-2.9-2.9L25 22.2Z" fill="%23fff" /></svg>')
    50% no-repeat !important;
  transform: scale(0.7);
  position: relative;
  top: -9px;
  left: 4px;
}

// треугольник (указатель) снизу ballon
.ymaps-2-1-79-balloon__tail::after {
  background-color: $ballon_background-color !important;
}
//---------------- ПЕРЕОПРЕДЕЛЕНИЕ СТИЛЕЙ КАРТЫ (end) ----------------

.InfrastructureMap__ballonContentImg {
  display: block;
  width: 100%;
  height: auto;

  max-width: $ballon_max-width;
  border-radius: 8px 8px 0 0;
}

.InfrastructureMap__ballonTitle {
  font-family: "LabGrotesque", Arial, sans-serif !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px !important;
  line-height: 17px !important;
  color: $ballon_color !important;

  padding: 20px 10px 12px 10px;
  max-width: $ballon_max-width;
}

.InfrastructureMap__ballonContentList {
  padding: 0 10px 20px 10px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  max-width: $ballon_max-width;
}

.InfrastructureMap__ballonContentItem {
  display: flex;
  gap: 2px;

  p {
    font-family: "LabGrotesque", Arial, sans-serif !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 17px !important;
    color: $ballon_color !important;
  }

  img {
    width: 18px;
    height: 18px;
  }
}

// .InfrastructureMap__toggleBox {
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   z-index: 10001;

//   padding: 20px;

//   background-color: black;
//   overflow: auto;

//   -ms-overflow-style: none; /* IE и Edge */
//   scrollbar-width: none; /* Firefox */
//   &::-webkit-scrollbar {
//     display: none;
//   }

//   display: flex;
//   gap: 20px;
// }

.InfrastructureMap__toggleCaregory {
  // @include setBtn_shadow();
  // @include setFlexCenter();
  border-radius: 60px;
  padding: 10px 15px;
  white-space: nowrap;
  gap: 15px;
}

.InfrastructureMap__toggleCaregory_active {
  // @include setBtn_shadowActive();
  // @include setFlexCenter();
  border-radius: 60px;
  padding: 10px 15px;
  white-space: nowrap;
  gap: 15px;
}

.InfrastructureMap__toggleItem_active {
  background-color: #f4f9ff;
}

@media screen and (max-width: 1170px) {
  .InfrastructureMap__coverHint {
    pointer-events: fill;
  }

  .InfrastructureMap:hover .InfrastructureMap__coverHint {
    opacity: 1;
  }

  .InfrastructureMap__desktopHint {
    display: none;
  }

  .InfrastructureMap__mobileHint {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
}
</style>
