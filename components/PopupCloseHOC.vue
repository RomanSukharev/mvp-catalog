<script lang="ts" setup>
var props = withDefaults(defineProps<{ timeout?: number }>(), { timeout: 300 });
var emit = defineEmits(["close"]);

var is_popup_hidden = ref(false);

var closePopup = () => {
  is_popup_hidden.value = true;

  setTimeout(() => {
    emit("close");
  }, props.timeout);
};

usePopup(closePopup);
</script>

<template>
  <div class="Popup" @click.self="closePopup">
    <slot :closePopup="closePopup" :is_popup_hidden="is_popup_hidden" />
  </div>
</template>

<style lang="scss">

.Popup {
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
}
</style>
