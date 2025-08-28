import type { IPopupNotifyProps } from "@/components/PopupNotify.vue";
import type { IPopupVKPlayerProps } from '@/components/PopupVKPlayer.vue'
import type { IPopupYouTubeProps } from '@/components/PopupYouTube.vue'

export default (video_link: string, autoplay = true) => {
  var popup_vk_player_props = useState<IPopupVKPlayerProps | null>("popup_vk_player_props", () => null); //prettier-ignore
  var popup_youtube_props = useState<IPopupYouTubeProps | null>("popup_youtube_props", () => null); //prettier-ignore
  var popup_notify_props = useState<IPopupNotifyProps | null>("popup_notify_props", () => null); //prettier-ignore

  try {
    var url = new URL(video_link)

    if (url.host === 'vk.com') {
        console.log(12312312);
        
      popup_vk_player_props.value = {
        video_link,
        autoplay,
      }

      return
    }

    var video_info = parseYouTubeUrl(video_link)

    if (!video_info) throw ''

    popup_youtube_props.value = {
      video_id: video_info.video_id,
      autoplay,
      time_start: video_info.time_start,
    }
  } catch {
    popup_notify_props.value = {
      max_width: 500,
      status: 'error',
      text_btn: 'закрыть',
      text_header: 'Не удалось открыть видео',
    }
  }
}
