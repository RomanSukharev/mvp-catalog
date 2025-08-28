<script lang="ts" setup>
import gsap from 'gsap'

import type { IPopupNotifyProps } from '@/components/Popup/PopupNotify.vue'

export interface IPopupYouTubeProps {
  video_id: string
  autoplay?: boolean
  time_start?: number
}

var popup_notify_props = useState<IPopupNotifyProps | null>('popup_notify_props', () => null)
var props = defineProps<IPopupYouTubeProps>()
var emit = defineEmits(['close'])
var node_ref = ref<HTMLElement>()
var is_PopupYouTube__skeleton = ref(true)
var player_you_tube: any

var closePopup = () => {
  gsap.to(node_ref.value!.querySelector('.PopupYouTube__player'), {
    y: '-100%',
    opacity: 0,
    duration: 1,
    ease: 'power1.inOut',
  })

  gsap.to(node_ref.value!.querySelector('.PopupYouTube__player iframe'), {
    y: '+120%',
    duration: 1,
    ease: 'power1.inOut',
  })

  gsap.to(node_ref.value!.querySelector('.PopupYouTube__UIButtonClose'), {
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

usePopup(closePopup)

var getSizePLayer = () => {
  var node_PopupYouTube__player = node_ref.value!.querySelector('.PopupYouTube__player')!

  return {
    width: node_PopupYouTube__player.clientWidth,
    height: node_PopupYouTube__player.clientHeight,
  }
}

var handleWindowResize = debounce(() => {
  var { height, width } = getSizePLayer()
  player_you_tube.setSize(width, height)
}, 300)

onMounted(async () => {
  gsap.to(node_ref.value!, {
    opacity: 1,
    duration: 0.5,
  })

  try {
    var you_tube_api = await getYouTubeIFrameAPI()

    var { height: player_height, width: player_width } = getSizePLayer()

    player_you_tube = new you_tube_api.Player('youtube_player', {
      height: player_height,
      width: player_width,
      videoId: props.video_id,
      playerVars: { autoplay: props.autoplay, start: props.time_start },
      events: {
        onReady: () => {
          gsap.to(node_ref.value!.querySelector('.PopupYouTube__skeleton'), { opacity: 0, duration: 1 }).then(() => {
            is_PopupYouTube__skeleton.value = false
          })

          gsap.to(node_ref.value!.querySelector('.PopupYouTube__player'), { y: '0%', duration: 1 })
          gsap.fromTo(
            node_ref.value!.querySelector('.PopupYouTube__player iframe'),
            { y: '-120%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1 }
          )
        },
      },
    })

    window.addEventListener('resize', handleWindowResize)
  } catch (error) {
    emit('close')
    popup_notify_props.value = {
      status: 'error',
      text_btn: 'Закрыть',
      text_header: 'Ошибка воспроизведения',
      text_content: 'Не удалось загрузить youtube плеер',
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<template>
  <div class="PopupYouTube" ref="node_ref" @click.self="closePopup">
    <UIButtonClose class="PopupYouTube__UIButtonClose" @click="closePopup" />

    <div class="PopupYouTube__content">
      <div class="PopupYouTube__skeleton type-heading-h3" v-if="is_PopupYouTube__skeleton">
        Загрузка плеера
        <UILoader />
      </div>

      <div class="PopupYouTube__player">
        <div id="youtube_player"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.PopupYouTube {
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

.PopupYouTube__content {
  position: relative;

  width: 1024px;
  aspect-ratio: 16 / 9;
  max-height: 90vh;
  max-width: calc(100% - var(--inline-offset) * 2);

  overflow: hidden;
}

.PopupYouTube__skeleton {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gutter);
  background-color: black;
}

.PopupYouTube__player {
  position: absolute;
  inset: 0;

  overflow: hidden;

  transform: translateY(101%);
  will-change: transform, opacity;

  iframe {
    will-change: transform;
  }
}

.PopupYouTube__UIButtonClose {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
}
</style>
