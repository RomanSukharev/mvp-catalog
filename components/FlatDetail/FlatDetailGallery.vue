<script setup lang="ts">
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";

var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

var house_imgs = data_flat_detail.value.house_media
  .filter((item) => item.type === "image")
  .flatMap((item) => item.files.map((i) => i.file));

var num = ref(0);

// const clickPlanImg = () => {
//   isFullscreen.value = true;
//   ymReachGoal("click_plan_fullscreen");
// };

var arrows_hidden = ref(true);

onMounted(() => {
  if (window.innerWidth <= 1170) {
    arrows_hidden.value = false;
  }
});
</script>

<template>
  <div class="FlatDetailGallery">
    <h5 class="FlatDetailGallery__H4">Галерея ЖК</h5>
    <q-carousel
      v-model="num"
      @update:model-value="ymReachGoal('change_detail-card_gallery')"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="red"
      navigation
      padding
      :arrows="arrows_hidden"
      height="100%"
    >
      <q-carousel-slide v-for="(img, idx) in house_imgs" :name="idx" class="column carousel no-wrap flex-center">
        <div class="FlatDetailGallery__wrapper">
          <img class="FlatDetailGallery_img" width="100%" height="auto" :src="img" alt="" srcset="" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style lang="scss">
.FlatDetailGallery {
  .q-carousel__arrow {
    .text-red {
      color: #969696 !important;
      width: 49px;
      height: 42px;
    }
  }

  .q-carousel__slide,
  .q-carousel {
    padding: 0;
  }

  .q-carousel__arrow .q-icon {
    font-size: 33px;
  }
}

.FlatDetailGallery__H4 {
  color: var(--text-primary, #1a1a1a);

  /* desktop/H2 */
  font-family: "TT Norms Pro";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 35.2px */

  margin-left: 70px;
  margin-bottom: 40px;
}
.FlatDetailGallery__wrapper {
  max-height: 730px;
  width: 100%;
  padding: 0 10px;
  // margin-right: 10px;
  // max-width: 1520px;
}
.FlatDetailGallery_img {
  width: 100%;
  height: auto;
  max-height: 730px;
  aspect-ratio: 16/9;
  pointer-events: none;
  border-radius: 12px;
  // width: 1520px;
  object-fit: cover;
}

@media (max-width: 1170px) {
  .FlatDetailGallery__H4 {
    margin-left: 35px;
  }
  .FlatDetailGallery__wrapper {
    padding: 0;
  }
  .FlatDetailGallery_img {
    border-radius: 0px;
  }
  .FlatDetailGallery {
    .q-carousel__slide,
    .q-carousel {
      padding: 0;
    }
  }
}

@media (max-width: 640px) {
  .FlatDetailGallery__H4 {
    font-size: 24px;
    margin-bottom: 30px;
    margin-left: 16px;
  }

  .FlatDetailGallery_img {
    min-height: 320px;
  }
}
</style>
