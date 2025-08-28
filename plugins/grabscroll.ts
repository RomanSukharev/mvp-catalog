export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("grabscroll", {
    mounted(el: HTMLDivElement) {
      el.style.cursor = "grab";

      var saved_page_x: number;
      var saved_scroll_left: number;

      var is_event_click = false;

      var handleEventClick = (event: MouseEvent) => {
        event.stopPropagation();
      };

      var setEventClick = () => {
        is_event_click = true;
        el.addEventListener("click", handleEventClick, { capture: true });
      };

      var removeEventClick = () => {
        is_event_click = false;
        setTimeout(() => {
          el.removeEventListener("click", handleEventClick, { capture: true });
        }, 0);
      };

      el.addEventListener("click", function (event: MouseEvent) {}, { capture: true });

      el.addEventListener("mousedown", function (event: MouseEvent) {
        event.preventDefault();
        saved_page_x = event.pageX;
        saved_scroll_left = el.scrollLeft;
      });

      el.addEventListener("mouseup", function () {
        saved_page_x = 0;
        el.style.cursor = "grab";
        is_event_click && removeEventClick();
      });

      el.addEventListener("mouseleave", function () {
        saved_page_x = 0;
        el.style.cursor = "grab";
        is_event_click && removeEventClick();
      });

      el.addEventListener("mousemove", function (event: MouseEvent) {
        if (!saved_page_x) {
          return;
        }

        !is_event_click && setEventClick();
        el.scrollLeft = saved_scroll_left + saved_page_x - event.pageX;
        el.style.cursor = "grabbing";
      });
    },
  });
});

