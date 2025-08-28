<script setup lang="ts">
import type { IPopupFormProps } from "@/components/PopupForm.vue";
import type { IPopupYouTubeProps } from "@/components/PopupYouTube.vue";
import type { IPopupNotifyProps } from "@/components/PopupNotify.vue";
import type { IPopupBlockProps } from "@/components/PopupBlock.vue";
import type { IPopupPlanoPlanProps } from "@/components/PopupPlanoPlan.vue";
import type { IPopupVKPlayerProps } from "@/components/PopupVKPlayer.vue";

var config = useRuntimeConfig();

useHead({
  title: "Каталог квартир от ПСК Дом",

  link: [
    { rel: "apple-touch-icon", sizes: "57x57", href: "favicons/apple-icon-57x57.png" },
    { rel: "apple-touch-icon", sizes: "60x60", href: "favicons/apple-icon-60x60.png" },
    { rel: "apple-touch-icon", sizes: "72x72", href: "favicons/apple-icon-72x72.png" },
    { rel: "apple-touch-icon", sizes: "76x76", href: "favicons/apple-icon-76x76.png" },
    { rel: "apple-touch-icon", sizes: "114x114", href: "favicons/apple-icon-114x114.png" },
    { rel: "apple-touch-icon", sizes: "120x120", href: "favicons/apple-icon-120x120.png" },
    { rel: "apple-touch-icon", sizes: "144x144", href: "favicons/apple-icon-144x144.png" },
    { rel: "apple-touch-icon", sizes: "152x152", href: "favicons/apple-icon-152x152.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "favicons/apple-icon-180x180.png" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "favicons/android-icon-192x192.png",
    },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "favicons/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "96x96", href: "favicons/favicon-96x96.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "favicons/favicon-16x16.png" },
  ],
  meta: [{ name: "color-scheme", content: "only light" }],

  script: [
    // ----------------------------------- Google reCAPTCHA (start) -----------------------------------
    {
      tagPosition: "head",
      src: `https://www.google.com/recaptcha/api.js?render=${config.public.RECAPTCHA_SITE_KEY}`,
    },
    // ----------------------------------- Google reCAPTCHA  (end) -----------------------------------
    // ----------------------------------- Yandex Metrika (start) -----------------------------------
    {
      tagPosition: "head",
      innerHTML: `
        (function (m, e, t, r, i, k, a) {
          m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
          m[i].l = 1 * new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
              return;
            }
          }
          (k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a);
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${config.public.YM_COUNTER_ID}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor:true
        });
      `,
    },
    // ------------------------------------ Yandex Metrika (end) ------------------------------------

    // ------------------------------------- VK Player (start) --------------------------------------
    {
      tagPosition: "head",
      src: `https://vk.com/js/api/videoplayer.js`,
    },
    // -------------------------------------- VK Player (end) ---------------------------------------
  ],
});

var popup_form_props = useState<IPopupFormProps | null>("popup_form_props", () => null); //prettier-ignore
var popup_bonus_props = useState<Boolean | null>("popup_bonus_props", () => null); //prettier-ignore
var popup_youtube_props = useState<IPopupYouTubeProps | null>("popup_youtube_props", () => null); //prettier-ignore
var popup_notify_props = useState<IPopupNotifyProps | null>("popup_notify_props", () => null); //prettier-ignore
var popup_block_props = useState<IPopupBlockProps | null>("popup_block_props", () => null) //prettier-ignore
var popup_planoplan_props = useState<IPopupPlanoPlanProps | null>("popup_planoplan_props", () => null) //prettier-ignore
var popup_vk_player_props = useState<IPopupVKPlayerProps | null>("popup_vk_player_props", () => null); //prettier-ignore

onMounted(() => {
  setTimeout(() => {
    ymReachGoal("more-than-30-second");
  }, 30000);
});
</script>

<template>
  <div class="container">
    <slot />
    <CatalogOffer />
  </div>

  <PopupForm v-if="popup_form_props" v-bind="popup_form_props" @close="popup_form_props = null" />
  <PopupBonus v-if="popup_bonus_props" @close="popup_bonus_props = null" />
  <PopupYouTube v-if="popup_youtube_props" @close="popup_youtube_props = null" v-bind="popup_youtube_props" />
  <PopupNotify v-if="popup_notify_props" v-bind="popup_notify_props" @close="popup_notify_props = null" />
  <PopupBlock v-if="popup_block_props" v-bind="popup_block_props" @close="popup_block_props = null" />
  <PopupPlanoPlan v-if="popup_planoplan_props" v-bind="popup_planoplan_props" @close="popup_planoplan_props = null" />
  <PopupVKPlayer v-if="popup_vk_player_props" @close="popup_vk_player_props = null" v-bind="popup_vk_player_props" />
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grecaptcha-badge {
  display: none;
}
</style>
