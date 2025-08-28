<script lang="ts" setup>
import { initPlanoPlan } from "~/composables/initPlanoPlan";

export interface IPopupPlanoPlanProps {
  planoplan_uid: string;
}

var props = defineProps<IPopupPlanoPlanProps>();
var emit = defineEmits(["close"]);

var is_popup_hidden = ref(false);

var closePopup = () => {
  setTimeout(() => {
    emit("close");
  }, 400);
  is_popup_hidden.value = true;
};

usePopup(closePopup);

var has_mar_error = ref(false);

onMounted(async () => {
  function init() {
    var popWidget = Planoplan.init({
      width: "100%",
      height: "100%",
      primaryColor: "#81AEE3",
      secondaryColor: "#F4F7F7",
      textColor: "#4A4A4A",
      backgroundColor: "#FFFFFF",
      fontFamily: "Open Sans, sans-serif",
      activeTab: "top",
      activeFloor: "0",
      activeDesign: "873032",
      uid: props.planoplan_uid,
      el: "pop-widget",
      lang: "ru",
      initialCamera: [
        {
          design: 873032,
          floor: 1,
          camera: 6,
        },
      ],
    });
    popWidget.onerror(() => {
      has_mar_error.value = true;
      console.log("errorr!!!!!!!!!");
    });
  }

  var is_plano_plan_init = await initPlanoPlan();

  // parsePlanoPlanUrl();
  is_plano_plan_init ? init() : (has_mar_error.value = true);
});
</script>

<template>
  <div @click.self="closePopup" class="PopupPlanoPlan">
    <div
      class="PopupPlanoPlan__content"
      :class="{ PopupPlanoPlan__content_hidden: is_popup_hidden }"
      @click.self="closePopup"
    >
      <header class="PopupPlanoPlan__contentHeader">
        <q-btn class="PopupPlanoPlan__btnClose" @click="closePopup"
          ><q-icon color="white" size="30px" name="close"></q-icon
        ></q-btn>
      </header>

      <div class="PopupPlanoPlan__contentMain">
        <div class="PlanoPlan">
          <div id="pop-widget"></div>
          <div v-if="has_mar_error" class="PlanoPlan__error">При загрузке 3D-тура произошла ошибка</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.PopupPlanoPlan {
  position: fixed;
  inset: 0;
  z-index: 6000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.PopupPlanoPlan__content {
  position: relative;
  // width: max-content;
  width: 100%;
  max-width: 900px;
  max-height: 90%;
  display: flex;
  flex-direction: column;

  animation: PopupPlanoPlan__content 400ms ease-out;
  transform: translateY(0);

  overflow: hidden;
}

@keyframes PopupPlanoPlan__content {
  from {
    transform: translateY(100vh);
  }

  to {
    transform: translateY(0);
  }
}

.PopupPlanoPlan__content_hidden {
  animation: PopupPlanoPlan__content_hidden 400ms ease-out;
  transform: translateY(100vh);
}

@keyframes PopupPlanoPlan__content_hidden {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100vh);
  }
}

.PopupPlanoPlan__contentHeader {
  background-color: #fff;
  position: relative;
  padding: 20px 20px 0 20px;
  display: flex;
  justify-content: flex-end;
}

.PopupPlanoPlan__btnClose {
  border-radius: 8px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 6002;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  // @include setBtnClose_primary();
  background-color: #ec3a39;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #ff6363;
    transition: 0.2s ease-in-out;
  }
}

.PopupPlanoPlan__contentMain {
  overflow: auto;
}

@keyframes PopupPlanoPlan__btnClose {
  from {
    opacity: 0;
  }

  60% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.PlanoPlan {
  background-color: #fff;
  max-width: 900px;
  width: 100%;
  height: 700px;
}
#pop-widget {
  position: absolute;
  inset: 0;
}

.pp-loaderIcon {
  transform: translate(-50%, -130%) !important;
}
.PlanoPlan__error {
  color: #1a1a1a;
  font-family: "TT Norms Pro"; /*  Inter*/
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 280px;
  text-align: center;
}

@media screen and (max-width: 1170px) {
  .PopupPlanoPlan__content {
    margin: 0 35px;
  }
}

@media screen and (max-width: 740px) {
  .PopupPlanoPlan__content {
    margin: 0;
  }
  .PopupPlanoPlan__contentHeader {
    padding: 10px;
  }
}

@media screen and (max-width: 460px) {
  #pop-widget {
    .pp-app--mw460 .pp-scene__img {
      padding-top: 0px !important;
    }
  }
}
</style>
