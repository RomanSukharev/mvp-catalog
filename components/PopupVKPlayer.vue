<script lang="ts" setup>
import gsap from 'gsap'

import type { IPopupNotifyProps } from './PopupNotify.vue'

export interface IPopupVKPlayerProps {
  video_link: string
  autoplay?: boolean
}

var popup_notify_props = useState<IPopupNotifyProps | null>('popup_notify_props', () => null)
var props = defineProps<IPopupVKPlayerProps>()
var emit = defineEmits(['close'])
var node_ref = ref<HTMLElement>()
var is_PopupVKPlayer__skeleton = ref(true)
var node_VKPlayer_player = ref<HTMLElement>()
var src_iframe = ref('')

var closePopup = () => {
  gsap.to(node_ref.value!.querySelector('.PopupVKPlayer__player'), {
    y: '-100%',
    opacity: 0,
    duration: 1,
    ease: 'power1.inOut',
  })

  gsap.to(node_ref.value!.querySelector('.PopupVKPlayer__player iframe'), {
    y: '+120%',
    duration: 1,
    ease: 'power1.inOut',
  })

  gsap.to(node_ref.value!.querySelector('.PopupVKPlayer__UIButtonClose'), {
    duration: 1,
    opacity: 0,
    ease: 'power1.inOut',
  })

  gsap.to(node_ref.value!, {
    duration: 1,
    backgroundColor: '#00000000',
    ease: 'power1.inOut',
    onComplete: () => {
      emit('close')
    },
  })
}

var setSizesPLayer = () => {
  var node_PopupVKPlayer__player = node_ref.value!.querySelector('.PopupVKPlayer__player')!

  var width = node_PopupVKPlayer__player.clientWidth
  var height = node_PopupVKPlayer__player.clientHeight

  node_VKPlayer_player.value!.setAttribute('width', width.toString())
  node_VKPlayer_player.value!.setAttribute('height', height.toString())
}

var getSrcIframe = () => {
  var [oid, id] = new URL(props.video_link).pathname.match(/-?\d+/g) || []

  if (!oid || !id) {
    emit('close')
    throw 'Некорректная ссылка на видео'
  }

  var url = new URL('https://vk.com/video_ext.php')
  url.searchParams.append('oid', oid)
  url.searchParams.append('id', id)
  url.searchParams.append('js_api', '1')

  return url.href
}

var handleWindowResize = debounce(setSizesPLayer, 300)

usePopup(closePopup)

onMounted(async () => {
  gsap.to(node_ref.value!, {
    opacity: 1,
    duration: 0.5,
  })

  try {
    src_iframe.value = getSrcIframe()
    await nextTick()
    var player = window.VK.VideoPlayer(node_VKPlayer_player.value!)
    setSizesPLayer()

    player.on('inited', () => {
      var start_time = new URL(props.video_link).searchParams.get('t')
      player.seek(start_time)
      props.autoplay && player.play()

      // gsap.to(node_ref.value!.querySelector('.PopupVKPlayer__skeleton'), { opacity: 0, duration: 1 }).then(() => {
      //   is_PopupVKPlayer__skeleton.value = false
      // })

      // gsap.to(node_ref.value!.querySelector('.PopupVKPlayer__player'), { y: '0%', duration: 1 })
      // gsap.fromTo(
      //   node_ref.value!.querySelector('.PopupVKPlayer__player iframe'),
      //   { y: '-120%', opacity: 0 },
      //   { y: '0%', opacity: 1, duration: 1 }
      // )
    })

    window.addEventListener('resize', handleWindowResize)
  } catch (error: any) {
    emit('close')
    popup_notify_props.value = {
      status: 'error',
      text_btn: 'Закрыть',
      text_header: 'Ошибка воспроизведения',
      text_content: error,
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<template>
  <div class="PopupVKPlayer" ref="node_ref" @click.self="closePopup">
    <UIButtonClose class="PopupVKPlayer__UIButtonClose" @click="closePopup" />

    <div class="PopupVKPlayer__content">
      <!-- <div class="PopupVKPlayer__skeleton" v-if="is_PopupVKPlayer__skeleton">
        Загрузка плеера
        <UILoader />
      </div> -->

      <div class="PopupVKPlayer__player">
        <iframe
          ref="node_VKPlayer_player"
          :src="src_iframe"
          width="426"
          height="240"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.PopupVKPlayer {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #000000cc;
  opacity: 0;

  z-index: 6000;

  will-change: opacity;
}

.PopupVKPlayer__content {
  position: relative;

  width: 1024px;
  aspect-ratio: 16 / 9;
  max-height: 90vh;
  max-width: calc(100% - var(--inline-offset) * 2);

  overflow: hidden;
}

.PopupVKPlayer__skeleton {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gutter);
  background-color: black;

  // @include setFontStyle1();
  color: #fff;
}

.PopupVKPlayer__player {
  position: absolute;
  inset: 0;

  overflow: hidden;

  // transform: translateY(101%);
  will-change: transform, opacity;

  iframe {
    will-change: transform;
  }
}

.PopupVKPlayer__UIButtonClose {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
}
</style>
