<script lang="ts" setup>
interface IPskInputProps {
  placeholder: string
  useMask?: boolean
  modelValue: string
  error_message: string
  popup?: boolean
}

var props = defineProps<IPskInputProps>()

var emit = defineEmits(['update:modelValue'])
var node_PskInput = ref<HTMLInputElement>()
// --------------------- PHONE MASK (start ---------------------

var setValue = (event: InputEvent) => {
  var value = (<HTMLInputElement>event.target).value
  if (!props.useMask) {
    emit('update:modelValue', value)
    return
  }

  var newValue = [...value]
    .filter((char) => char >= '0' && char <= '9')
    .slice(0, 11)
    .join('')

  if (props.modelValue === newValue) {
    node_PskInput.value!.value = getPresentValue(newValue)
  }

  emit('update:modelValue', newValue)
}

var getPresentValue = (str: string) => {
  if (!props.useMask) return props.modelValue

  return [...String(str.replace(/\D+/, ''))]
    .map((char, idx) => {
      if (idx === 0) {
        return '+7'
      }

      if (idx === 1) {
        return ' (9'
      }

      if (idx === 4) {
        return ') ' + char
      }

      if (idx === 7) {
        return '-' + char
      }

      if (idx === 9) {
        return '-' + char
      }

      return char
    })
    .join('')
}

var input_value = computed(() => getPresentValue(props.modelValue))

onMounted(() => {
  props.useMask && emit('update:modelValue', '7')
})
</script>

<template>
  <div class="PskInput">
    <input
      class="PskInput__input"
      :class="{
        PskInput__input_error: error_message,
        'PskInput__input_error--popup': error_message && popup,
        'PskInput__input--popup': popup,
      }"
      ref="node_PskInput"
      :placeholder="placeholder"
      type="text"
      :value="input_value"
      @input="setValue($event as InputEvent)"
    />
    <div v-if="error_message" class="PskInput__error">{{ error_message }}</div>
  </div>
</template>

<style lang="scss">
.PskInput__input {
  // @include setFontStyle3();
  color: black;

  position: relative;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid lightgray;
  padding: 9px;

  transition: border-bottom 200ms ease-in-out;

  &--popup {
    border-bottom: 1px solid lightgray;
    background-color: white;
    padding: 20px;
  }

  &::placeholder {
    color: lightgray;
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
}

.PskInput__input_error {
  border-bottom: 1px solid red;

  &--popup {
    border-bottom: 1px solid red;
  }
}

.PskInput__error {
  // @include setFontStyle2();
  color: red;
  font-size: 12px;

  position: absolute;
  padding: 0 0 0 9px;

  animation: PskInput__error 300ms ease-in-out;
}

@keyframes PskInput__error {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>