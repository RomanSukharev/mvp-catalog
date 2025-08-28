<script lang="ts" setup>
export interface IPopupNotifyProps {
  text_header?: string;
  text_content?: string;
  text_btn?: string;
  status?: "succes" | "error";
  max_width?: number;
}

defineProps<IPopupNotifyProps>();
</script>

<template>
  <PopupCloseHOC>
    <template #default="{ is_popup_hidden, closePopup }">
      <div
        class="PopupNotify__content"
        :class="{ PopupNotify__content_hidden: is_popup_hidden }"
        :style="{ 'max-width': max_width }"
      >
        <div class="PopupNotify__iconSucces" v-if="status === 'succes'">
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.2189 23.094L6.62489 16.5C6.35422 16.2294 6.03122 16.146 5.65589 16.25C5.28056 16.354 5.04622 16.5884 4.95289 16.953C4.85956 17.3177 4.94822 17.6457 5.21889 17.937L13.2189 25.937L29.2189 9.93702C29.4062 9.72835 29.4949 9.48868 29.4849 9.21802C29.4749 8.94735 29.3706 8.71302 29.1719 8.51502C28.9732 8.31702 28.7439 8.21802 28.4839 8.21802C28.2239 8.21802 27.9896 8.31168 27.7809 8.49902L13.2189 23.094Z"
              fill="#EC3A39"
            />
          </svg>
        </div>
        <div class="PopupNotify__iconError" v-if="status === 'error'"></div>

        <h5 v-if="text_header" class="PopupNotify__h5" v-html="text_header"></h5>

        <p class="PopupNotify__p" v-if="text_content" v-html="text_content"></p>

        <q-btn v-if="text_btn" class="PopupNotify__btn" color="red-12" @click="closePopup"> {{ text_btn }}</q-btn>
      </div>
    </template>
  </PopupCloseHOC>
</template>

<style lang="scss">
.PopupNotify {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  justify-content: center;
  display: flex;
  align-items: center;
  z-index: 6000;
  background-color: rgba(0, 0, 0, 0.5);
}

.PopupNotify__content {
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  display: flex;
  background-color: #ffffff;
  padding: 50px 47.5px;
  border-radius: 15px;

  max-height: 90vh;
  overflow: auto;
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
  will-change: transform;
  animation: PopupNotify__content 250ms ease-out;
  transform: translate3d(0, 0, 0);
}

@keyframes PopupNotify__content {
  from {
    transform: translate3d(0, 105vh, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.PopupNotify__content_hidden {
  animation: PopupNotify__content_hidden 250ms ease-out;
  transform: translate3d(100vw, 0, 0);
}

@keyframes PopupNotify__content_hidden {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(100vw, 0, 0);
  }
}

.PopupNotify__iconSucces {
  // &-icon {
  //   display: block;
  //   width: 40px;
  //   height: 40px;
  //   background-repeat: no-repeat;
  //   background-position: center;
  //   // background-image: url("data:image/svg+xml;utf8," + $i_check_primary);
  // }
  margin-bottom: 15px;
  // border: 2px solid green;
  // border-radius: 50%;
  // padding: 15px;
}

.PopupNotify__iconError {
  width: 40px;
  height: 40px;
  margin-bottom: 30px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  //   background-image: url("data:image/svg+xml;utf8," + $i_close_white);
  background-size: 30px;
  background-color: rgb(226, 69, 69);
}

.PopupNotify__h5 {
  //   @include setFontStyle8();
  margin: 0 0 30px 0;
}

.PopupNotify__p {
  //   @include setFontStyle7();
  color: #171a21;
  text-align: center;
  /* text / lead / default */
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 100;
  line-height: 25px; /* 138.889% */

  text-align: center;
  margin-bottom: 20px;
}

.PopupNotify__btn {
  // @include setBtn_primary();
  //   @include setFontStyle5();
  width: 195px;
  text-transform: uppercase;
  padding: 7px 16px;
  border-radius: 2px;
}

@media screen and (max-width: 740px) {
  .PopupNotify__content {
    padding: 20px;
    margin: 0 16px;
  }
}
</style>
