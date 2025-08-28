export var usePopup = (handleKeyDownEsc: () => void) => {
  var node_header = () => document.getElementById("header")!;

  var _handleKeyDownEsc = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      handleKeyDownEsc();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", _handleKeyDownEsc);

    requestAnimationFrame(() => {
      document.body.style.cssText = `
        overflow: hidden;
        padding-right: ${getWidthScrollbar()}
        `;
    //   node_header().style.cssText = `width: calc(100% - ${getWidthScrollbar()})`;
    });
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", _handleKeyDownEsc);

    requestAnimationFrame(() => {
      document.body.style.cssText = "";
    //   node_header().style.cssText = "";
    });
  });
};
