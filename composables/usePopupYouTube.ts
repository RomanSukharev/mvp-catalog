import type { IPopupYouTubeProps } from "@/components/PopupYouTube.vue";
import type { IPopupNotifyProps } from "~/components/PopupNotify.vue";

export default () => {
  var popup_youtube_props = useState<IPopupYouTubeProps | null>("popup_youtube_props", () => null); //prettier-ignore
  var popup_notify_props = useState<IPopupNotifyProps | null>("popup_notify_props", () => null); //prettier-ignore

  var openVideo = (url: string, autoplay = true) => {
    // console.log(url);
    
    var data = parseYouTubeUrl(url);

    if (!data) {
      popup_notify_props.value = {
        text_header: "Ошибка",
        text_content: "Не удалось воспроизвести видео",
        text_btn: "Ок",
        status: "error",
      };
      return;
    }

    popup_youtube_props.value = {...data, autoplay};
  };

  return { openVideo };
};
