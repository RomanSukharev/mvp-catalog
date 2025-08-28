<script lang="ts" setup>
export interface IPopupBlockProps {
  component_name: string;
  max_width?: number;
}

var props = defineProps<IPopupBlockProps>();
var emit = defineEmits(["close"]);



var is_popup_hidden = ref(false);
var component = resolveComponent(props.component_name);

var closePopup = () => {
  setTimeout(() => {
    emit("close");
  }, 400);
  is_popup_hidden.value = true;
};

usePopup(closePopup);
</script>

<template>
  <Suspense>
    <div @click.self="closePopup" class="PopupBlock">
      <div
        class="PopupBlock__content"
        :style="{ 'max-width': max_width + 'px' }"
        :class="{ PopupBlock__content_hidden: is_popup_hidden }"
        @click.self="closePopup"
      >
        <header class="PopupBlock__contentHeader">
          <q-btn class="PopupBlock__btnClose" @click="closePopup"
            ><q-icon color="white" size="30px" name="close"></q-icon
          ></q-btn>
        </header>

        <div class="PopupBlock__contentMain">
          <component :is="component" />
        </div>
      </div>
    </div>

    <template #fallback> <PskLoader /> </template>
  </Suspense>
</template>

<style lang="scss">
.PopupBlock {
  position: fixed;
  inset: 0;
  z-index: 6000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.PopupBlock__content {
  position: relative;
  // width: max-content;
  width: 100%;
  max-width: fit-content;
  max-height: 90%;
  display: flex;
  flex-direction: column;

  animation: PopupBlock__content 400ms ease-out;
  transform: translateY(0);

  overflow: hidden;
}

@keyframes PopupBlock__content {
  from {
    transform: translateY(100vh);
  }

  to {
    transform: translateY(0);
  }
}

.PopupBlock__content_hidden {
  animation: PopupBlock__content_hidden 400ms ease-out;
  transform: translateY(100vh);
}

@keyframes PopupBlock__content_hidden {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100vh);
  }
}

.PopupBlock__contentHeader {
  background-color: #fff;
  position: relative;
  padding: 20px 20px 0 20px;
  display: flex;
  justify-content: flex-end;
}

.PopupBlock__btnClose {
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

.PopupBlock__contentMain {
  overflow: auto;
}

@keyframes PopupBlock__btnClose {
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

@media screen and (max-width: 1170px) {
  .PopupBlock__content {
    margin: 0 35px;
  }
}

@media screen and (max-width: 740px) {
  .PopupBlock__content {
    margin: 0;
  }
  .PopupBlock__contentHeader {
    padding: 10px;
  }
}
</style>
