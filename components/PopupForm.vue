<script lang="ts" setup>
import type { IPopupNotifyProps } from "@/components/PopupNotify.vue";

export interface IPopupFormProps {
  data: {
    text_header: string;
    text_content: string;
    text_btn: string;
    lead_title: string;
    cbSuccessFetch?: () => void;
    popup_notify_props_success?: IPopupNotifyProps;
  };
}

var props = defineProps<IPopupFormProps>();
var emit = defineEmits(["close"]);

var { user_name, user_phone, error_user_name, error_user_phone, sendFormRequest } = useFormRequest(() => {
  props.data.cbSuccessFetch && props.data.cbSuccessFetch();
  closePopup();
}, props.data.popup_notify_props_success);

var is_popup_hidden = ref(false);

var closePopup = () => {
  setTimeout(() => {
    emit("close");
  }, 400);
  is_popup_hidden.value = true;
};

usePopup(closePopup);
</script>

<template>
  <div class="PopupForm" @click.self="closePopup">
    <form
      class="PopupForm__form"
      :class="{ PopupForm__form_hidden: is_popup_hidden }"
      @submit.prevent="sendFormRequest(data.lead_title)"
    >
      <q-btn class="PopupForm__btnClose" @click="closePopup"
        ><q-icon color="white" size="30px" name="close"></q-icon
      ></q-btn>

      <h5 class="PopupForm__h5" v-html="data.text_header"></h5>
      <p class="PopupForm__p" v-html="data.text_content"></p>

      <UIPskInput
        popup
        class="PopupForm__input"
        v-focus="{ min_width: 740 }"
        :error_message="error_user_name"
        v-model="user_name"
        placeholder="Имя"
        tabindex="1"
      />

      <UIPskInput
        popup
        class="PopupForm__input"
        :error_message="error_user_phone"
        useMask
        v-model="user_phone"
        placeholder="+7 (999) 999-99-99"
      />

      <q-btn color="red-12" class="PopupForm__btn" type="submit">
        {{ data.text_btn }}
      </q-btn>

      <p class="PopupForm__offer">
        Отправляя заявку, вы соглашаетесь на обработку персональных данных и получение сервисных, рекламных сообщений в
        целях рассмотрения обращения согласно
        <NuxtLink @click="closePopup" to="https://72dom.com/soglasie" class="PopupForm__link"
          >политике конфиденциальности.</NuxtLink
        >
      </p>
    </form>
  </div>
</template>

<style lang="scss">
.PopupForm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 6000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 70px;
  padding-right: 70px;

  // @include setRulesToRootNodePopup();
  // @include setFlexCenter();
  // @include useLCWP();
}

.PopupForm__form {
  position: relative;
  max-width: min-content;
  padding: 50px 30px;
  max-width: 557px;

  max-height: 90vh;
  overflow: auto;

  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
  // @include hideScroll();

  background-color: #fff;
  animation: PopupForm__form 400ms ease-out;
}

.PopupForm__btnClose {
  border-radius: 8px;
  position: absolute;
  top: 30px;
  right: 30px;
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

@keyframes PopupForm__form {
  from {
    transform: translate3d(0, 100vh, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.PopupForm__form_hidden {
  transform: translate3d(0, 100vh, 0);
  animation: PopupForm__form_hidden 400ms ease-out;
}

@keyframes PopupForm__form_hidden {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, 100vh, 0);
  }
}

// .PopupForm__btnClose {
//   width: 32px;
//   height: 32px;
//   border-radius: 8px;
//   position: absolute;
//   top: 30px;
//   right: 30px;
// }

.PopupForm__h5 {
  // @include setFontStyle1();
  color: #101212;
  color: var(--text-primary, #1a1a1a);
  text-align: center;
  /* desktop/H2 */
  font-family: "TT Norms Pro";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 35.2px */

  margin-bottom: 30px;
}

.PopupForm__p {
  color: #171a21;
  text-align: center;
  /* text / lead / default */
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: 25px; /* 138.889% */

  margin-bottom: 40px;
}

.PopupForm__input {
  min-width: 480px;
  margin-bottom: 40px;
}

.PopupForm__btn {
  // @include setBtn_primary();
  // @include setFontStyle5();
  width: 100%;
  padding: 15px 0;
  margin-bottom: 30px;
}

.PopupForm__offer {
  // @include setFontStyle6();
  color: #b2b2b2;
  // max-width: 380px;

  color: #b2b2b2;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 21.7px */
}

.PopupForm__link {
  color: #ec3a39;
  text-decoration: none;
  border-bottom: 1px solid #ec3a39;
  transition: 0.2s ease-in-out;
  &:hover {
    transition: 0.2s ease-in-out;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0);
  }
}

@media screen and (max-width: 1170px) {
  .PopupForm {
    padding: 0 35px;
  }

  .PopupForm__btnClose {
    top: 15px;
    right: 15px;
  }

  .PopupForm__p {
    margin-bottom: 30px;
  }

  .PopupForm__input {
    min-width: 400px;
  }
}

@media screen and (max-width: 740px) {
  .PopupForm__form {
    padding: 50px 20px;
  }

  .PopupForm__h5 {
    margin-bottom: 20px;
  }

  .PopupForm__input {
    min-width: 280px;
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 740px) {
  .PopupForm {
    padding: 0 16px;
  }

  .PopupForm__h5 {
    text-align: start;
  }

  .PopupForm__p {
    text-align: start;
  }
}
</style>
