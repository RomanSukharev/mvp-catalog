// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    BASE_URL: process.env.BASE_URL,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    public: {
      YM_COUNTER_ID: process.env.YM_COUNTER_ID,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },

    
  imports: {
    dirs: ['./helpers'],
  },

  css: ["@/assets/scss/index.scss"],

  modules: ["nuxt-quasar-ui", "@pinia/nuxt"],
 
  quasar: {
    plugins: ["BottomSheet", "Dialog", "Loading", "LoadingBar", "Notify", "Dark"],
    extras: {
      font: "roboto-font",
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },

  components: {
    global: true,
    dirs: ['~/components'],
  },
});
