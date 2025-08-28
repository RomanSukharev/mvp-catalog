<script setup lang="ts">
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";

var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

var num = ref(0);
const isFullscreen = ref(false);

const clickPlanImg = () => {
  isFullscreen.value = true;
  ymReachGoal("click_detail-card_plan_fullscreen");
};
</script>

<template>
  <div class="FlatDetailCardGallery">
    <div class="FlatDetailCardGallery__gallery">
      <q-carousel
        v-model="num"
        v-model:fullscreen="isFullscreen"
        @update:model-value="ymReachGoal('change_detail-card_plan_gallery')"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="red"
        navigation
        padding
        arrows
        class="FlatDetailCardGallery__carousel"
      >
        <q-carousel-slide
          v-for="(img, idx) in data_flat_detail.images"
          :name="idx"
          class="column carousel no-wrap flex-center"
        >
          <div class="FlatDetailCardGallery__imgWrapper" @click="clickPlanImg">
            <img class="FlatDetailCardGallery__carouselImg" width="100%" height="auto" :src="img" alt="" srcset="" />
            <!-- <img class="carousel__img" width="100%" height="auto" :src="img" alt="" srcset=""/> -->
          </div>
        </q-carousel-slide>
        <template v-if="isFullscreen" v-slot:control>
          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-icon class="closeFullScreen" size="40px" name="close" @click="isFullscreen = false"></q-icon>
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </div>
</template>

<style lang="scss">
.FlatDetailCardGallery {
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid #dfe6ec;
  background: #f5f7f9;
}
.FlatDetailCardGallery__header {
  display: flex;
  justify-content: space-between;
}
.FlatDetailCardGallery__propertyes {
  display: flex;
  gap: 12px;
}

.FlatDetailCardGallery__property {
  display: flex;
  align-items: center;
  gap: 4px;
}

.FlatDetailCardGallery__propertyRing {
  width: 12px;
  height: 12px;
  border-radius: 100%;
}

.FlatDetailCardGallery__propertySpan {
  color: #1a1a1a;
  /* text/caption/default */
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 18.6px */
  opacity: 0.8;
}

.FlatDetailCardGallery__status {
  background: #fcc700;

  padding: 4px 12px;
  border-radius: 50px;

  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 200% */
  text-transform: uppercase;
}

.FlatDetailCardGallery__carousel {
  background: #f5f7f9;
  height: 660px;
  border-radius: 12px;
}

.FlatDetailCardGallery__imgWrapper {
  cursor: pointer;
  width: 100%;
  height: 100%;
  // max-height: 220px;
  // height: auto;
  display: flex;
  align-items: center;
}

.FlatDetailCardGallery__carouselImg {
  max-width: 100%;
  width: auto;
  max-height: 100%;
  margin: 0 auto;
  // max-height: 220px;
  height: auto;

  pointer-events: none;
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

@media screen and (max-width: 1400px) {
  .FlatDetailCardGallery__carousel {
    height: 400px;
  }
}

@media screen and (max-width: 1300px) {
  .FlatDetailCardGallery {
    min-width: 570px;
    padding: 50px 30px;
  }
}

@media screen and (max-width: 1170px) {
  .FlatDetailCardGallery {
    padding: 30px;
    min-width: 100%;
  }
  .FlatDetailCardGallery__carousel {
    height: 600px;
  }
}

@media screen and (max-width: 740px) {
  .FlatDetailCardGallery {
    padding: 20px 1px;
    min-width: 100%;
  }
  .FlatDetailCardGallery__carousel {
    height: 450px;
  }
}

@media screen and (max-width: 640px) {
  .FlatDetailCardGallery {
    padding: 15px 1px;
  }
  // .FlatDetailCardGallery__carousel {
  //   height: 260px;
  // }
}

@media screen and (max-width: 450px) {
  .FlatDetailCardGallery {
    padding: 1px 1px;
  }
  .FlatDetailCardGallery__carousel {
    height: 290px;
  }
}
</style>
