<script setup lang="ts">
import type { NuxtLink } from "#build/components";
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";
import type { IPopupBlockProps } from "@/components/PopupBlock.vue";

definePageMeta({
  middleware: ["flat-detail"],
});

var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore
var popup_block_props = useState<IPopupBlockProps | null>("popup_block_props", () => null) //prettier-ignore

var link_back = ref();

const linkToBack = () => {
  ymReachGoal("click_detail-card_comeback");
};


onMounted(() => {
  link_back.value = localStorage.getItem("link_back");
});
</script>

<template>
  <section class="FlatDetail">
    <NuxtLink class="FlatDetail__Link" v-if="link_back" :to="link_back">
      <div class="FlatDetail__LinkContent" @click="linkToBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#EC3A39" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.8489 6.9999L10.4247 7.42416L6.44892 11.3999H19.0004H19.6004V12.5999H19.0004H6.44892L10.4247 16.5756L10.8489 16.9999L10.0004 17.8484L9.57613 17.4242L4.57613 12.4242C4.34181 12.1898 4.34181 11.8099 4.57613 11.5756L9.57613 6.57563L10.0004 6.15137L10.8489 6.9999Z"
          />
        </svg>
        <p class="FlatDetail__LinkContentP">вернуться к выбору</p>
      </div>
    </NuxtLink>

    <FlatDetailCard />
    <FlatDetailPayments />
    <BannerBonus  v-if="data_flat_detail.properties.find(item => item.title === 'Ещё бонус')"/>
    <FlatDetailGallery v-if="data_flat_detail.house_media.length" />
    <FlatDetailLocation />
  </section>
</template>

<style lang="scss">
.FlatDetail {
  padding: 150px 0px 60px;
  max-width: 1660px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.FlatDetail__Link {
  border: none;
  text-decoration: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  margin: 0px 70px;
  margin-bottom: -36px;
  border-bottom: 1px solid red;
  width: fit-content;
  border-bottom: 1px dashed hsla(0, 0%, 100%, 0);
}

.FlatDetail__LinkContent {
  display: flex;
  gap: 5px;
  p {
    color: #ec3a39;
    font-family: "TT Norms Pro";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 111.111% */
    text-decoration: none;
    opacity: 1;
    transition: 200ms ease-in-out;
  }

  svg {
    transition: 200ms ease-in-out;
    opacity: 1;
  }
  transition: 200ms ease-in-out;

  &:hover {
    p {
      transition: 200ms ease-in-out;
      opacity: 0.77;
    }

    svg {
      transition: 200ms ease-in-out;
      opacity: 0.77;
      transform: translate(-30%);
    }
  }
}

@media (max-width: 1170px) {
  .FlatDetail {
    padding: 65px 0px;
    max-width: 1660px;
    width: 100%;
    margin: 0 auto;
    gap: 60px;
  }
  .FlatDetail__Link {
    margin: 0px 35px;
  }
}

@media (max-width: 640px) {
  .FlatDetail {
    gap: 40px;
  }

  .FlatDetail__Link {
    margin: 0px 16px;
    margin-bottom: -20px;
  }
}
</style>
