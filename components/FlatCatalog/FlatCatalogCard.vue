<script setup lang="ts">
import type { IFlat } from "~/types/FlatsListTypes";
import type { IPopupFormProps } from "@/components/PopupForm.vue";

var props = defineProps<{ plan: IFlat }>();
var model = defineModel();
var popup_form_props = useState<IPopupFormProps | null>("popup_form_props", () => null); //prettier-ignore

var min_payment = computed(() => Math.min(...props.plan.costs[0].payments.map((i) => i.min_payment)));

// костыль, из за квазара
var num = ref<number>(0);

watch(model, () => {
  num.value = 0;
});
// -----------------------

const isFullscreen = ref(false);

const min_first_pay = computed(() => {
  return Math.min(...props.plan.costs[0].payments.map((i) => i.initial_fee));
});

const clickPlanImg = () => {
  isFullscreen.value = true;
  ymReachGoal("click_plan_fullscreen");
};

var toPlanUid = () => {
  ymReachGoal("click_see-all-cost");
  navigateTo({
    path: props.plan.uid,
  });
};
</script>

<template>
  <article class="FlatCatalogCard">
    <div class="FlatCatalogCard__order" v-if="plan.status === 'Бронь'">{{ plan.status }}</div>
    <div class="FlatCatalogCard__GalleryBox">
      <q-carousel
        v-model="num"
        v-model:fullscreen="isFullscreen"
        @update:model-value="ymReachGoal('change_plan_gallery')"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="red"
        navigation
        padding
        arrows
        height="300px"
        class="FlatCatalogCard__carousel"
      >
        <q-carousel-slide v-for="(img, idx) in plan.images" :name="idx" class="column carousel no-wrap flex-center">
          <div class="carousel__imgWrapper" @click="clickPlanImg">
            <img class="carousel__img" width="100%" height="auto" :src="img" alt="" srcset="" />
          </div>
        </q-carousel-slide>
        <template v-if="isFullscreen" v-slot:control>
          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-icon class="closeFullScreen" size="40px" name="close" @click="isFullscreen = false"></q-icon>
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>

    <div class="FlatCatalogCard__infoBox">
      <h5 class="FlatCatalogCard__h5">{{ plan.type }}, №{{ plan.number }}, {{ plan.declared_square }} м²</h5>
      <div class="FlatCatalogCard__tags">
        <span>{{ plan.complex }}</span>
        |
        <span>{{ plan.house }}</span>
        |
        <span>{{ plan.floor }} этаж</span>
        |
        <span>{{ plan.ready_date }} </span>
      </div>
      <div class="FlatCatalogCard__properties">
        <div class="FlatCatalogCard__property" v-for="property in plan.properties">
          <div
            v-if="property.sign.type === 'color'"
            class="FlatCatalogCard__propertyRing"
            :style="`background: ${property.sign.value}`"
          ></div>
          <img v-else :src="property.sign.value" alt="" srcset="" />

          <span class="FlatCatalogCard__propertiespan">{{ property.title }}</span>
        </div>
      </div>
      <p class="FlatCatalogCard__cost">от {{ plan.costs[0].cost.toLocaleString("fr") }} ₽</p>

      <p class="FlatCatalogCard__firstPay">
        <span>первоначальный взнос:</span> от {{ min_first_pay.toLocaleString("fr") }} ₽
      </p>
    </div>

    <div class="FlatCatalogCard__payment">
      <p class="FlatCatalogCard__paymentP">В ипотеку:</p>
      <p class="FlatCatalogCard__paymentCost">от {{ min_payment.toLocaleString("fr") }} ₽/мес</p>
    </div>

    <!-- <div class="FlatCatalogCard__payBox">
      <div class="FlatCatalogCard__payments">
        <div class="FlatCatalogCard__payment" v-for="payment in plan.costs[0].payments">
          <div class="FlatCatalogCard__paymentHeader">
            <p class="FlatCatalogCard__paymentPrice">от {{ payment.min_payment.toLocaleString("fr") }} ₽/мес</p>
            <div class="FlatCatalogCard__tooltip">
              <img class="FlatCatalogCard__tooltipImg" src="/img/tooltip.svg" alt="" />
              <q-tooltip class="tooltip" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <div class="FlatCatalogCard__tooltipContent">
                  Рассчитан с первоначальным взносом
                  <br />
                  {{ payment.initial_fee.toLocaleString("fr") }} ₽, по ставке {{ payment.base_rate }}%,
                  <br />
                  срок ипотеки {{ payment.max_mortgage_term / 12 }} лет
                </div>
              </q-tooltip>
            </div>
          </div>
          <p class="FlatCatalogCard__paymentP">{{ payment.mortgage_name }}</p>
        </div>
      </div>
    </div> -->

    <button class="FlatCatalogCard__link" @click="toPlanUid">Смотреть все платежи и цены</button>

    <!-- <q-btn class="FlatCatalogCard__btn" @click="clickBtnPLan" color="red-11">{{ btn_text }}</q-btn> -->
  </article>
</template>

<style lang="scss">
p {
  margin-bottom: 0px;
}
.FlatCatalogCard {
  border: 1px solid #dfe6ec;
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.FlatCatalogCard__order {
  position: absolute;
  top: -2.5%;
  left: 5%;
  border-radius: 50px;
  background: #fcc700;
  padding: 4px 10px;
  z-index: 1;

  color: #fafafa;
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 200% */
  text-transform: uppercase;
}

.carousel__imgWrapper {
  cursor: pointer;
  width: 100%;
  height: 100%;
  // max-height: 220px;
  // height: auto;
  display: flex;
  align-items: center;
}

.carousel__img {
  max-width: 100%;
  width: auto;
  max-height: 100%;
  margin: 0 auto;
  // max-height: 220px;
  height: auto;

  pointer-events: none;
}

.FlatCatalogCard__GalleryBox {
  border-radius: 12px;
  padding-top: 4px;
  background-color: #f5f7f9;
}
.FlatCatalogCard__carousel {
  background-color: #f5f7f9;
}

.q-carousel__arrow {
  .text-red {
    color: #fcc700 !important;
  }
}

.closeFullScreen {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #f88787 !important;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: rgb(238, 67, 67) !important;
  }
}

// .tooltip {
//   background-color: white;
//   box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 30%);
// }

.FlatCatalogCard__infoBox {
  padding: 20px 0px;
  margin: 0px 16px;
  // border-bottom: 1px solid #dfe6ec;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.FlatCatalogCard__h5 {
  font-family: "TT Norms Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: #1a1a1a;
}

.FlatCatalogCard__tags {
  display: flex;
  column-gap: 8px;
  row-gap: 5px;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 5px;

  color: #969696;
  font-family: "TT NormS Pro";
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.FlatCatalogCard__properties {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 17px;
}

.FlatCatalogCard__property {
  display: flex;
  gap: 4px;
  align-items: center;
}

.FlatCatalogCard__property {
  display: flex;
  align-items: center;
  gap: 5px;
}

.FlatCatalogCard__propertyRing {
  width: 12px;
  height: 12px;
  border-radius: 100%;
}

.FlatCatalogCard__propertiespan {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 18.6px */
  opacity: 0.7;
}

.FlatCatalogCard__cost {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 35.2px */
}

.FlatCatalogCard__firstPay {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 18.6px */
  span {
    color: #586267;
    font-family: "TT Norms Pro";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 155%; /* 18.6px */
  }
}
.FlatCatalogCard__payment {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  margin: 0 16px 16px;
}

.FlatCatalogCard__paymentP {
  color: #586267;
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  opacity: 0.8;
}

.FlatCatalogCard__paymentCost {
  color: #586267;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
}

// .FlatCatalogCard__payments {
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   padding: 20px 0;
//   margin: 0px 16px;
//   gap: 10px;
// }

// .FlatCatalogCard__paymentHeader {
//   display: flex;
//   gap: 8px;
//   align-items: center;
// }

// .FlatCatalogCard__paymentPrice {
//   color: #586267;
//   font-family: "TT Norms Pro";
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 120%; /* 19.2px */
// }

// .FlatCatalogCard__paymentP {
//   color: #586267;
//   font-family: "TT Norms Pro"; /*  Inter*/
//   font-size: 10px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 150%; /* 15px */
//   opacity: 0.8;
// }

// .FlatCatalogCard__tooltip {
//   cursor: pointer;
//   display: flex;
// }
// .FlatCatalogCard__tooltipContent {
//   color: #1a1a1a;
//   width: 280px;
//   font-family: "TT Norms Pro";
//   font-size: 15px;
//   font-style: normal;
//   font-weight: 100;
//   line-height: 120%; /* 19.2px */
// }

// .FlatCatalogCard__tooltipImg {
//   pointer-events: none;
// }

.FlatCatalogCard__btn {
  width: 100%;
}

.FlatCatalogCard__link {
  text-decoration: none;
  background-color: inherit;
  border: none;
  cursor: pointer;
  // padding: 7px 0;
  margin: 0 auto 16px;
  width: fit-content;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 23.8px */
  color: #f44336;
  border-bottom: 1px dashed hsla(0, 0%, 100%, 0);
  transition: 0.2s ease-in-out;
  &:hover {
    transition: 0.2s ease-in-out;
    border-bottom: 1px dashed #f44336;
  }
}

@media screen and (max-width: 1600px) {
  .FlatCatalogCard__paymentPrice {
    font-size: 14px;
  }
}

@media screen and (max-width: 1500px) {
  .FlatCatalogCard__paymentPrice {
    font-size: 16px;
  }
}

@media screen and (max-width: 740px) {
  .FlatCatalogCard__h5 {
    font-size: 20px;
  }
  .FlatCatalogCard__cost {
    font-size: 24px;
    line-height: 130%;
  }
  // .FlatCatalogCard__payments {
  //   max-width: 300px;
  // }

  .FlatCatalogCard__paymentPrice {
    font-size: 14px;
    line-height: 140%; /* 19.2px */
  }
  // .FlatCatalogCard__tooltipContent {
  //   color: #1a1a1a;
  //   width: 220px;
  //   font-size: 12px;
  // }
  .fullscreen {
    .q-carousel__next-arrow--horizontal {
      right: 0;
    }

    .q-carousel__prev-arrow--horizontal {
      left: 0;
    }
    .q-carousel__slide {
      padding-left: 40px !important;
      padding-right: 40px !important;
    }
  }
}
</style>
