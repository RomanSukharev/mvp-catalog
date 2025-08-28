<script setup lang="ts">
import type { IPopupBlockProps } from "@/components/PopupBlock.vue";

var popup_block_props = useState<IPopupBlockProps | null>("popup_block_props", () => null) //prettier-ignore

var handleClickQuestionBtnOffer = () => {
  popup_block_props.value = { component_name: "PskOffer" };
};
</script>

<template>
  <div class="CatalogOffer">
    <p class="CatalogOffer__p">Не является публичной офертой</p>

    <div class="CatalogOffer__tooltip">
      <svg
        class="CatalogOffer__tooltipSvg"
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="handleClickQuestionBtnOffer"
      >
        <g opacity="0.5">
          <circle cx="6.5" cy="7" r="6.26" stroke="#1A1A1A" stroke-width="0.48" />
          <path
            fill="#1A1A1A"
            d="M6.63684 8.43788H6.12368C6.12653 8.18984 6.15077 7.97974 6.19638 7.80758C6.242 7.63541 6.31612 7.47638 6.41875 7.33047C6.52138 7.18457 6.65965 7.02407 6.83355 6.84899C6.98465 6.69433 7.11864 6.55135 7.23553 6.42003C7.35241 6.2858 7.44364 6.13844 7.50921 5.97795C7.57763 5.81745 7.61184 5.62048 7.61184 5.38704C7.61184 5.15651 7.57193 4.9537 7.49211 4.77862C7.41228 4.60354 7.29254 4.46639 7.13289 4.36717C6.97325 4.26796 6.77368 4.21835 6.53421 4.21835C6.31469 4.21835 6.11798 4.26212 5.94408 4.34966C5.77303 4.43721 5.63761 4.56414 5.53783 4.73047C5.4409 4.89388 5.38958 5.09231 5.38388 5.32576H4.875C4.8807 4.9931 4.95768 4.71004 5.10592 4.4766C5.25702 4.24024 5.45658 4.06077 5.70461 3.93822C5.95548 3.81274 6.23202 3.75 6.53421 3.75C6.87632 3.75 7.16425 3.81857 7.39803 3.95572C7.63465 4.09287 7.81425 4.28401 7.93684 4.52912C8.06228 4.77424 8.125 5.05875 8.125 5.38266C8.125 5.64237 8.08224 5.87727 7.99671 6.08737C7.91118 6.29456 7.79287 6.49007 7.64178 6.67391C7.49068 6.85774 7.31535 7.04304 7.11579 7.2298C6.93333 7.39029 6.80789 7.57413 6.73947 7.78131C6.67105 7.98558 6.63684 8.20443 6.63684 8.43788ZM6.05526 9.89983C6.05526 9.80062 6.08662 9.71745 6.14934 9.65034C6.21206 9.5803 6.29759 9.54529 6.40592 9.54529C6.51425 9.54529 6.59978 9.5803 6.6625 9.65034C6.72807 9.71745 6.76086 9.80062 6.76086 9.89983C6.76086 9.99613 6.72807 10.0793 6.6625 10.1493C6.59978 10.2164 6.51425 10.25 6.40592 10.25C6.29759 10.25 6.21206 10.2164 6.14934 10.1493C6.08662 10.0793 6.05526 9.99613 6.05526 9.89983Z"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.CatalogOffer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 60px;
}

.CatalogOffer__p {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 21.7px */
  opacity: 0.5;
}

.CatalogOffer__tooltipSvg {
  display: block;
  cursor: pointer;
  circle,
  path {
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    circle,
    path {
      stroke: red;
    }
  }
}

@media screen and (max-width: 1170px) {
  .CatalogOffer {
    padding-bottom: 40px;
  }
}
</style>
