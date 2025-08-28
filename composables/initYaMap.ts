export var initYaMap = (): Promise<boolean> => {
  return new Promise((res, rej) => {
    // @ts-ignore
    if (window?.ymaps) {
      res(true);
      return;
    }

    var script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1.79/?lang=ru_RU";
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
