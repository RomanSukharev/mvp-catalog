export var initPlanoPlan = (): Promise<boolean> => {
    return new Promise((res, rej) => {
      // @ts-ignore
      if (window?.ymaps) {
        res(true);
        return;
      }
  
      var script = document.createElement("script");
      script.src = "https://widget.planoplan.com/etc/multiwidget/release/v4/static/js/main.js";
      script.type = "text/javascript";
  
      document.getElementsByTagName("head")[0].appendChild(script);
  
      script.onload = () => {
        res(true);
      };
  
      script.onerror = () => {
        res(false);
      };
    });
  };