<script setup lang="ts">
import usePopupYoutube from "~/composables/usePopupYouTube";
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";
import type { IPopupFormProps } from "@/components/PopupForm.vue";
import type { IPopupPlanoPlanProps } from "@/components/PopupPlanoPlan.vue";

export interface FlatDetailCardInfoPropsFlatInfo {
  title: string;
  class?: string | undefined;
  description: Array<{ title: string; value: string | number }>;
  videos_name: string | null;
  videos_link: string | null;
  tour3D_name?: string | null;
  tour3D_link?: string[] | null;
}

export interface FlatDetailCardInfoProps {
  flat_info: FlatDetailCardInfoPropsFlatInfo[];
}

defineProps<FlatDetailCardInfoProps>();
var popup_form_props = useState<IPopupFormProps | null>("popup_form_props", () => null); //prettier-ignore
var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore
var popup_planoplan_props = useState<IPopupPlanoPlanProps | null>("popup_planoplan_props", () => null) //prettier-ignore

var { openVideo } = usePopupYoutube();

var openVideoPopup = (flat_link: string, name_for_video?: string | null) => {
  openPopupVideo(flat_link);
  if (name_for_video) {
    name_for_video === "видеообзор"
      ? ymReachGoal("click_detail-card_video")
      : ymReachGoal("click_detail-card_building-today");
  }
};

const btn_text = computed(() => {
  return data_flat_detail.value.status === "Бронь" ? "Встать в очередь" : "Забронировать";
});

const clickBtnPLan = () => {
  ymReachGoal("open_detail-card_plan_order");
  popup_form_props.value = {
    data: {
      text_header: `${btn_text.value}`,
      text_content:
        "Укажите имя и телефон, мы перезвоним и ответим на ваши вопросы о квартале. Не будем беспокоить вас пустыми звонками, покупка квартиры — только ваше решение.",
      text_btn: `${btn_text.value}`,
      lead_title: `${btn_text.value} (из описания квартиры) - ${data_flat_detail.value.complex}, ${data_flat_detail.value.house}, квартира №${data_flat_detail.value.number} (ЗпКВ)`,
      cbSuccessFetch() {
        ymReachGoal("send_detail-card_plan_order");
      },
    },
  };
};

var handleClick3dTour = (uid: string) => {
  popup_planoplan_props.value = { planoplan_uid: uid };
};
</script>

<template>
  <div class="FlatDetailCardInfo">
    <div class="FlatDetailCardInfo__status" v-if="data_flat_detail.status === 'Бронь'">
      {{ data_flat_detail.status }}
    </div>
    <div class="FlatDetailCardInfo__properties" v-if="data_flat_detail.properties.length">
      <div class="FlatDetailCardInfo__property" v-for="property in data_flat_detail.properties">
        <div
          v-if="property.sign.type === 'color'"
          class="FlatDetailCardInfo__propertyRing"
          :style="`background: ${property.sign.value}`"
        ></div>
        <img v-else :src="property.sign.value" alt="" srcset="" />

        <span class="FlatDetailCardInfo__propertySpan">{{ property.title }}</span>
      </div>
    </div>

    <div class="FlatDetailCardInfo__descriptions">
      <div class="FlatDetailCardInfo__description" v-for="flat in flat_info">
        <div class="FlatDetailCardInfo__descriptionTitle">
          <h5 class="FlatDetailCardInfo__descriptionH5" :class="flat.class">{{ flat.title }}</h5>
          <div
            class="FlatDetailCardInfo__descriptionVideo"
            v-if="flat.videos_link"
            @click="openVideoPopup(flat.videos_link as string, flat.videos_name)"
          >
            <p class="FlatDetailCardInfo__descriptionVideoP">{{ flat.videos_name }}</p>
            <img src="/icons/videos.svg" alt="" srcset="" />
          </div>
        </div>

        <div class="FlatDetailCardInfo__3DTour">
          <div
            class="FlatDetailCardInfo__3DTourLabel"
            v-if="flat.tour3D_link?.length"
            v-for="(uid, idx) in flat.tour3D_link"
            @click="handleClick3dTour(uid)"
          >
            <p class="FlatDetailCardInfo__3DTourP">
              {{ flat.tour3D_name }} <span v-if="flat.tour3D_link?.length > 1">{{ idx + 1 }}</span>
            </p>
            <img src="/icons/3d_tour.svg" alt="" />
          </div>
        </div>

        <div class="FlatDetailCardInfo__descriptionItems">
          <div class="FlatDetailCardInfo__descriptionItem" v-for="desc in flat.description">
            <span class="FlatDetailCardInfo__descriptionItemTitle">{{ desc.title }}</span>
            <p class="FlatDetailCardInfo__descriptionItemValue">{{ desc.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <q-btn class="FlatDetailCardInfo__btn" @click="clickBtnPLan" color="red-12">{{ btn_text }}</q-btn>
  </div>
</template>

<style lang="scss">
p {
  margin: 0;
}

.FlatDetailCardInfo {
  padding: 24px;
  border-radius: 12px;
  height: fit-content;
  max-width: 480px;
  width: 100%;
  border: 1px solid #dfe6ec;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
}

.FlatDetailCardInfo__status {
  background: #fcc700;

  padding: 4px 12px;
  margin-bottom: 24px;
  border-radius: 50px;

  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 200% */
  text-transform: uppercase;
  width: fit-content;
}

.FlatDetailCardInfo__properties {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 24px;
  border-bottom: 1px solid #dfe6ec;
}

.FlatDetailCardInfo__property {
  display: flex;
  align-items: center;
  gap: 8px;
}

.FlatDetailCardInfo__propertyRing {
  width: 12px;
  height: 12px;
  border-radius: 100%;
}

.FlatDetailCardInfo__propertySpan {
  color: #1a1a1a;
  /* text/caption/default */
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18.6px */
  opacity: 0.8;
}

.FlatDetailCardInfo__description {
  display: flex;
  flex-direction: column;
  // gap: 10px;
  padding-top: 24px;
  padding-bottom: 24px;
  &:last-child {
    border-top: 1px solid #dfe6ec;
  }
}

.FlatDetailCardInfo__descriptionTitle {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.FlatDetailCardInfo__descriptionH5 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
  &СomplexTitle {
    font-size: 18px;
    line-height: 125%; /* 22.5px */
  }
}

.FlatDetailCardInfo__descriptionItems {
  display: grid;
  gap: 10px;
}

.FlatDetailCardInfo__descriptionItem {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.FlatDetailCardInfo__descriptionItemTitle {
  color: #303030;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  line-height: 140%; /* 20px */
}

.FlatDetailCardInfo__descriptionItemValue {
  color: #1a1a1a;
  text-align: right;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 20px */
}

.FlatDetailCardInfo__descriptionVideo {
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  cursor: pointer;
  border-bottom: 1px dashed hsla(0, 0%, 100%, 0);
  transition: 0.2s ease-in-out;
  &:hover {
    transition: 0.2s ease-in-out;
    border-bottom: 1px dashed #ec3a39;
  }
}

.FlatDetailCardInfo__descriptionVideoP {
  color: #ec3a39;
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
}

.FlatDetailCardInfo__3DTour {
  display: flex;
  margin: 0 0 24px auto;
  gap: 30px;
}

.FlatDetailCardInfo__3DTourLabel {
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding-bottom: 4px;
  cursor: pointer;
  border-bottom: 1px dashed hsla(0, 0%, 100%, 0);
  transition: 0.2s ease-in-out;
  &:hover {
    transition: 0.2s ease-in-out;
    border-bottom: 1px dashed #ec3a39;
  }
}

.FlatDetailCardInfo__3DTourP {
  color: #ec3a39;
  font-family: "TT Norms Pro";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
  display: flex;
  gap: 4px;
}

.FlatDetailCardInfo__btn {
  width: 100%;
  padding: 15px 24px 16px 24px;

  color: #fff;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
}

@media (max-width: 1170px) {
  .FlatDetailCardInfo {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .FlatDetailCardInfo {
    padding: 16px 16px 24px;
    // gap: 20px;
  }

  .FlatDetailCardInfo__properties {
    padding-bottom: 20px;
  }

  .FlatDetailCardInfo__description {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .FlatDetailCardInfo__descriptionItemTitle {
    font-size: 13px;
  }
  .FlatDetailCardInfo__descriptionItemValue {
    font-size: 13px;
  }
}

@media (max-width: 420px) {
  .FlatDetailCardInfo__descriptionTitle {
    flex-direction: column;
    align-items: flex-start;
  }
  .FlatDetailCardInfo__3DTour {
    margin: 0 0 24px;
  }
}
</style>
