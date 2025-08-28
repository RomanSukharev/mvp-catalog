<script setup lang="ts">
export interface IInfrastructureImgProps {
  complex_img: string;
}

defineProps<IInfrastructureImgProps>();

var is_plug_hidden = ref(false);
</script>

<template>
  <div class="InfrastructureImg">
    <img class="InfrastructureImg__img" :src="complex_img" />

    <div
      class="InfrastructureImg__plug"
      :class="{
        InfrastructureImg__plug_hidden: is_plug_hidden,
      }"
      @touchstart.prevent="is_plug_hidden = true"
    >
      <img src="/icons/blind.png" />
      <p class="InfrastructureImg__plugP type-control-l">
        Проведите пальцем <br />
        для просмотра карты
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.InfrastructureImg {
  // aspect-ratio: 16 / 9;
  position: relative;
  height: 845px;
  overflow: hidden;
  // cursor: zoom-in;
}
// .InfrastructureImg__content {
//   height: 100%;
// }
.InfrastructureImg__img {
  // width: 100%;
  // height: auto;

  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: contain;
}

.InfrastructureImg__plug {
  display: none;
}

@media (max-width: 1170px) {
  .InfrastructureImg {
    height: 700px;
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE и Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .InfrastructureImg__img {
    height: 100% !important;
    width: auto !important;
  }

  .InfrastructureImg__plug {
    display: block;
    position: absolute;
    inset: 0;

    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .InfrastructureImg__plugP {
    color: white;
  }

  .InfrastructureImg__plug_hidden {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 740px) {
  .InfrastructureImg {
    height: 500px;
  }
}

@media (max-width: 640px) {
  .InfrastructureImg {
    height: 375px;
  }
}
</style>
