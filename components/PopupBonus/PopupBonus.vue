<script lang="ts" setup>
var emit = defineEmits(["close"]);

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
  <div class="PopupBonus">
    <div class="PopupBonus__wrapper" @click.self="closePopup" :class="{ PopupBonus__content_hidden: is_popup_hidden }">
      <div class="PopupBonus__wrapperAfter">
        <div class="PopupBonus__stickyButton">
          <q-btn class="PopupBonus__btnClose" @click="closePopup"
            ><q-icon color="white" size="30px" name="close"></q-icon
          ></q-btn>
        </div>

        <div class="PopupBonus__content">
          <PopupBonusAboutProgramm />
          <PopupBonusShopProgramm />
          <PopupBonusWorkProgramm />
          <PopupBonusConditions />
          <PopupBonusComfortPoints />
          <PopupBonusSpendPoints />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.PopupBonus {
  position: fixed;
  inset: 0;
  z-index: 6000;
  background: rgba(26, 26, 26, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
}

.PopupBonus__wrapper {
  overflow: auto;
  width: 100%;
  padding-left: 70px;
  padding-right: 70px;
  display: flex;
  justify-content: center;
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */
  animation: PopupBonus__content 400ms ease-out;
  &::-webkit-scrollbar {
    display: none;
  }
}

.PopupBonus__wrapperAfter {
  position: relative;
  height: max-content;
  padding-top: 80px;
  padding-bottom: 80px;
}

.PopupBonus__content {
  position: relative;
  max-width: min-content;
  padding-bottom: 80px;
  max-width: 1160px;
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0% 0% 12px 12px;
}

.PopupBonus__stickyButton {
  width: 100%;
  height: 80px;
  background-color: white;
  position: sticky;
  z-index: 9999;
  top: 0px;
  border-radius: 12px 12px 0% 0%;
}

.PopupBonus__btnClose {
  border-radius: 8px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 6002;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  background-color: #ec3a39;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #ff6363;
    transition: 0.2s ease-in-out;
  }
}

@keyframes PopupBonus__content {
  from {
    transform: translate3d(0, 100vh, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.PopupBonus__content_hidden {
  transform: translate3d(0, 100vh, 0);
  animation: PopupBonus__content_hidden 400ms ease-out;
}

@keyframes PopupBonus__content_hidden {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, 100vh, 0);
  }
}

@media screen and (max-width: 1170px) {
  .PopupBonus__wrapper {
    padding-left: 35px;
    padding-right: 35px;
  }

  .PopupBonus__content {
    padding-bottom: 64px;
  }
  .PopupBonus__stickyButton {
    height: 64px;
  }
  .PopupBonus__btnClose {
    top: 15px;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonus__wrapper {
    padding-left: 0;
    padding-right: 0;
  }
  .PopupBonus__wrapperAfter {
    padding-top: 0px;
    padding-bottom: 0px;
    width: 100%;
  }
  .PopupBonus__content {
    border-radius: 0;
  }
  .PopupBonus__stickyButton {
    border-radius: 0;
  }
}
</style>
