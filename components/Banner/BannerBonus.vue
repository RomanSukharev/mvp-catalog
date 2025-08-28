<script setup lang="ts">
var popup_bonus_props = useState<Boolean | null>("popup_bonus_props", () => null); //prettier-ignore
var handleClickBtnBannerBonus = () => {
  ymReachGoal("open_form-banner_bonus"); //ym_target - Открыть форму - "Баннер - 5% баллами от покупки квартиры"
  //   usePopupFormProps({
  //     text_header: "Узнать подробнее",
  //     text_content:
  //       "Оставьте заявку, мы позвоним и расскажем об условиях ипотеки, первоначальном взносе и ежемесячных платежах.",
  //     text_btn: "Отправить заявку",
  //     lead_title: "программа лояльности — Ещё бонус (ЗпКВ)",
  //     cbSuccessFetch() {
  //       ymReachGoal("send_form-banner_bonus"); //ym_target - Отправить форму - "Баннер - 5% баллами от покупки квартиры"
  //     },
  //     popup_notify_props_success: {
  //       status: "succes",
  //       text_btn: "Понятно",
  //       text_content:
  //         "Получили вашу заявку.<br />Свяжемся с&nbsp;вами в&nbsp;ближайшее время.",
  //       max_width: 560,
  //     },
  //   });
};
</script>

<template>
  <article class="BannerBonus">
    <div class="BannerBonus__bg"></div>

    <h3 class="BannerBonus__h3">
      5% баллами <br />
      от покупки квартиры
    </h3>
    <p class="BannerBonus__p">на технику и мебель для дома</p>
    <button class="BannerBonus__button" @click="popup_bonus_props = true">Узнать подробнее</button>
    <div class="BannerBonus__bg_text">
      <img width="100" height="101" src="/img/banners/banner_bonus_mini_arrow.svg" alt="mini" />
      <svg xmlns="http://www.w3.org/2000/svg" width="406" height="80" viewBox="0 0 406 80" fill="none">
        <g>
          <path
            d="M0 60.6198V2.57128H37.972V11.3759H10.5695V26.9594H35.9364V35.6472H10.5695V51.8151H38.1286V60.6198H0Z"
            fill="white"
          />
          <path
            d="M112.584 52.2047L111.722 73.0866H102.014V60.6198H96.8467V52.2047H112.584ZM46.8959 17.0639H56.7999V52.1657H70.5403V17.0639H80.5227V52.1657H94.2239V17.0639H104.245V60.6198H46.8959V17.0639Z"
            fill="white"
          />
          <path
            d="M137.949 61.4769C133.564 61.4769 129.78 60.5678 126.596 58.7497C123.413 56.9057 120.959 54.3084 119.237 50.958C117.541 47.6076 116.692 43.6597 116.692 39.1146C116.692 34.6213 117.541 30.6865 119.237 27.3101C120.933 23.9077 123.321 21.2585 126.401 19.3625C129.48 17.4665 133.108 16.5185 137.283 16.5185C139.971 16.5185 142.516 16.947 144.917 17.8041C147.344 18.6612 149.484 19.9858 151.337 21.7779C153.216 23.57 154.691 25.8556 155.761 28.6347C156.831 31.3877 157.366 34.6733 157.366 38.4912V41.6858H121.507V34.7901H152.237L147.422 36.816C147.422 34.3486 147.044 32.2059 146.287 30.3878C145.53 28.5438 144.408 27.1023 142.921 26.0634C141.433 25.0245 139.58 24.505 137.362 24.505C135.143 24.505 133.251 25.0245 131.685 26.0634C130.12 27.1023 128.932 28.5048 128.123 30.2709C127.314 32.0111 126.91 33.959 126.91 36.1147V40.9067C126.91 43.5558 127.366 45.8284 128.28 47.7244C129.219 49.5944 130.524 51.0229 132.194 52.0099C133.891 52.9968 135.861 53.4903 138.105 53.4903C139.567 53.4903 140.898 53.2825 142.098 52.867C143.325 52.4514 144.369 51.8281 145.23 50.997C146.117 50.1399 146.796 49.088 147.266 47.8413L156.896 48.9711C156.269 51.4904 155.108 53.6981 153.412 55.5941C151.742 57.4641 149.588 58.9186 146.953 59.9575C144.343 60.9704 141.342 61.4769 137.949 61.4769ZM128.554 10.6747C127.066 10.7007 125.774 10.1812 124.678 9.11634C123.582 8.05147 123.034 6.80479 123.034 5.3763C123.034 3.84393 123.582 2.57128 124.678 1.55835C125.774 0.519449 127.066 0 128.554 0C130.094 0 131.385 0.519449 132.429 1.55835C133.473 2.57128 133.995 3.84393 133.995 5.3763C133.995 6.80479 133.473 8.05147 132.429 9.11634C131.385 10.1812 130.094 10.7007 128.554 10.6747ZM145.622 10.6747C144.134 10.7007 142.842 10.1812 141.746 9.11634C140.65 8.05147 140.102 6.80479 140.102 5.3763C140.102 3.84393 140.65 2.57128 141.746 1.55835C142.842 0.519449 144.134 0 145.622 0C147.161 0 148.453 0.519449 149.497 1.55835C150.567 2.57128 151.089 3.84393 151.063 5.3763C151.089 6.80479 150.567 8.05147 149.497 9.11634C148.453 10.1812 147.161 10.7007 145.622 10.6747Z"
            fill="white"
          />
          <path
            d="M218.039 1.01293L221.68 7.59695C220.401 8.71377 218.966 9.51891 217.374 10.0124C215.808 10.5059 213.955 10.8305 211.815 10.9864C209.701 11.1162 207.196 11.2071 204.299 11.2591C201.037 11.337 198.375 11.9473 196.313 13.0901C194.251 14.2329 192.659 15.9731 191.537 18.3106C190.441 20.6481 189.737 23.635 189.423 27.2711H189.893C191.25 24.5959 193.155 22.5571 195.608 21.1546C198.088 19.7521 200.985 19.0508 204.299 19.0508C207.927 19.0508 211.124 19.856 213.89 21.4663C216.682 23.0765 218.861 25.4141 220.427 28.4788C222.019 31.5436 222.802 35.2576 222.776 39.621C222.802 44.0883 221.967 47.9582 220.271 51.2307C218.574 54.5032 216.173 57.0356 213.068 58.8277C209.962 60.5938 206.295 61.4769 202.068 61.4769C195.674 61.4769 190.598 59.412 186.84 55.2824C183.108 51.1268 181.229 45.0622 181.203 37.0887V33.2318C181.229 22.9727 183.147 15.3367 186.957 10.3241C190.793 5.2854 196.483 2.70114 204.025 2.57128C206.269 2.51933 208.279 2.50634 210.054 2.53232C211.828 2.55829 213.381 2.48037 214.712 2.29856C216.043 2.09078 217.152 1.66224 218.039 1.01293ZM202.107 53.2955C204.221 53.2696 206.034 52.7241 207.548 51.6593C209.088 50.5684 210.275 49.023 211.11 47.0232C211.946 45.0233 212.35 42.6468 212.324 39.8937C212.35 37.1926 211.946 34.894 211.11 32.998C210.275 31.0761 209.088 29.6216 207.548 28.6347C206.008 27.6477 204.155 27.1542 201.989 27.1542C200.397 27.1542 198.975 27.4399 197.722 28.0113C196.47 28.5567 195.387 29.3749 194.473 30.4657C193.586 31.5566 192.907 32.8941 192.438 34.4785C191.968 36.0628 191.72 37.8679 191.694 39.8937C191.668 43.9714 192.581 47.218 194.434 49.6334C196.287 52.0488 198.845 53.2696 202.107 53.2955Z"
            fill="white"
          />
          <path
            d="M249.159 61.4769C244.879 61.4769 241.173 60.5418 238.042 58.6718C234.91 56.8018 232.483 54.1786 230.76 50.8022C229.064 47.4257 228.216 43.5039 228.216 39.0366C228.216 34.5434 229.064 30.6086 230.76 27.2321C232.483 23.8297 234.91 21.1935 238.042 19.3235C241.173 17.4535 244.879 16.5185 249.159 16.5185C253.439 16.5185 257.145 17.4535 260.277 19.3235C263.409 21.1935 265.836 23.8297 267.558 27.2321C269.28 30.6086 270.142 34.5434 270.142 39.0366C270.142 43.5039 269.28 47.4257 267.558 50.8022C265.836 54.1786 263.409 56.8018 260.277 58.6718C257.145 60.5418 253.439 61.4769 249.159 61.4769ZM249.159 53.2176C251.534 53.2176 253.491 52.5943 255.031 51.3476C256.571 50.0749 257.719 48.3608 258.476 46.205C259.259 44.0493 259.65 41.6599 259.65 39.0366C259.65 36.3615 259.259 33.946 258.476 31.7903C257.719 29.6346 256.571 27.9334 255.031 26.6867C253.491 25.4141 251.534 24.7777 249.159 24.7777C246.837 24.7777 244.892 25.4141 243.326 26.6867C241.761 27.9334 240.586 29.6346 239.803 31.7903C239.046 33.946 238.668 36.3615 238.668 39.0366C238.668 41.6599 239.046 44.0493 239.803 46.205C240.586 48.3608 241.761 50.0749 243.326 51.3476C244.892 52.5943 246.837 53.2176 249.159 53.2176Z"
            fill="white"
          />
          <path
            d="M307.408 34.5953V43.0104H284.194V34.5953H307.408ZM287.325 17.0639V60.6198H277.421V17.0639H287.325ZM314.219 17.0639V60.6198H304.315V17.0639H314.219Z"
            fill="white"
          />
          <path
            d="M328.271 76.9045C326.862 76.9305 325.557 76.8266 324.356 76.5928C323.182 76.3851 322.229 76.1383 321.499 75.8526L323.926 67.8661L324.435 68.0219C326.523 68.5673 328.297 68.6063 329.759 68.1388C331.246 67.6713 332.434 66.2558 333.321 63.8923L334.182 61.5548L318.367 17.0639H329.289L339.35 49.984H339.819L349.919 17.0639H360.919L343.382 65.8792C342.573 68.1907 341.503 70.1646 340.172 71.8009C338.841 73.4632 337.196 74.7228 335.239 75.5799C333.282 76.463 330.959 76.9045 328.271 76.9045Z"
            fill="white"
          />
          <path
            d="M384.249 61.4769C379.891 61.4769 376.146 60.5289 373.014 58.6329C369.882 56.7109 367.481 54.0617 365.811 50.6853C364.141 47.3089 363.306 43.426 363.306 39.0366C363.306 34.5953 364.154 30.6865 365.85 27.3101C367.546 23.9336 369.96 21.2974 373.092 19.4014C376.224 17.4795 379.917 16.5185 384.171 16.5185C387.746 16.5185 390.904 17.1678 393.644 18.4664C396.384 19.7651 398.563 21.5961 400.181 23.9596C401.826 26.2971 402.765 29.0372 403 32.1799H393.135C392.874 30.7774 392.365 29.5177 391.608 28.4009C390.852 27.2841 389.86 26.401 388.633 25.7517C387.433 25.1024 385.997 24.7777 384.327 24.7777C382.213 24.7777 380.36 25.3491 378.768 26.4919C377.203 27.6087 375.976 29.219 375.089 31.3228C374.201 33.4266 373.758 35.9459 373.758 38.8808C373.758 41.8417 374.188 44.4 375.049 46.5557C375.911 48.6854 377.137 50.3347 378.729 51.5034C380.321 52.6462 382.187 53.2176 384.327 53.2176C386.598 53.2176 388.516 52.5553 390.082 51.2307C391.674 49.9061 392.691 48.0751 393.135 45.7375H403C402.765 48.8283 401.852 51.5554 400.26 53.9189C398.668 56.2824 396.515 58.1394 393.801 59.49C391.086 60.8146 387.903 61.4769 384.249 61.4769Z"
            fill="white"
          />
        </g>
      </svg>
    </div>
    <p class="BannerBonus__footerP">Ещё бонус — программа лояльности застройщика</p>
  </article>
</template>

<style lang="scss">
.BannerBonus {
  position: relative;
  padding: 40px 40px 24px;
  border-radius: 12px;
  border: 1px solid rgba(26, 26, 26, 0.1);
  background: linear-gradient(99deg, #7a3cff 0%, #8e59ff 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin: 0 70px;

  &:before,
  &:after {
    position: absolute;
    content: "";
    z-index: -1;
  }

  &:before {
    bottom: -150%;
    left: -10%;
    width: 885.561px;
    height: 887.628px;
    border-radius: 887.628px;
    background: radial-gradient(74.1% 74.1% at 50% 50%, #97c0d6 0%, #8b80e5 100%);
    filter: blur(132.64715576171875px);
  }

  &:after {
    width: 578px;
    height: 578px;
    top: -130%;
    right: 20%;
    border-radius: 478px;
    background: radial-gradient(50% 50% at 50% 50%, #f2e7da 0%, #c9a9c4 100%);
    filter: blur(100px);
  }
}

.BannerBonus__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: url(/img/banners/banner_bonus.png);
  background-position: 75% top;
  background-repeat: no-repeat;
  opacity: 0.15;
}

.BannerBonus__bg_text {
  display: flex;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 21%;
  img {
    display: none;
    margin-top: -15px;
  }

  svg {
    filter: drop-shadow(3px 3px 0px #623dfe);
  }
}

.BannerBonus__img {
  position: absolute;
  right: 40px;
  bottom: 0;
  display: block;
  width: clamp(168px, 43%, 334px);
  height: auto;
}

.BannerBonus__h3 {
  color: #fff;
  font-family: "TT Norms Pro";
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;

  margin: 0 0 24px 0;

  position: relative;
  z-index: 1;
}

.BannerBonus__p {
  color: #fff;
  font-family: "TT Norms Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  margin: 0 0 40px 0;

  position: relative;
  z-index: 1;
}

.BannerBonus__footerP {
  color: #dfe6ec;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%;
  margin-top: 51px;
}

.BannerBonus__button {
  width: max-content;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  border-color: transparent;
  color: #1a1a1a;

  border-radius: 4px;
  background-color: #fff;
  padding: 10px 20px;

  position: relative;
  z-index: 1;

  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: rgb(234, 234, 234);
  }
}

@media (max-width: 1300px) {
  .BannerBonus {
    &:before {
      bottom: -150%;
      left: -10%;
    }

    &:after {
      top: -130%;
      right: -15%;
    }
  }

  .BannerBonus__bg_text {
    right: 5%;
  }
  .BannerBonus__bg {
    background-position: calc(100% + 350px) top;
  }
}

@media screen and (max-width: 1170px) {
  .BannerBonus {
    margin: 0 35px;
    &:before {
      bottom: -240%;
      left: -40%;
    }

    &:after {
      top: -160%;
      right: -15%;
    }
  }
  .BannerBonus {
    padding: 32px 32px 24px;
  }

  .BannerBonus__h3 {
    font-size: 32px;
    margin: 0 0 16px 0;
  }

  .BannerBonus__p {
    font-size: 24px;
    line-height: 140%;
    max-width: 400px;
  }

  .BannerBonus__button {
    font-size: 16px;
    padding: 8px 24px;
  }
}

@media screen and (max-width: 870px) {
  .BannerBonus {
    &:before {
      bottom: -210%;
      left: -60%;
    }

    &:after {
      top: -160%;
      right: -45%;
    }
  }
  .BannerBonus__bg_text {
    margin-top: -10px;
    svg {
      max-width: 302px;
    }
  }

  .BannerBonus__p {
    max-width: 300px;
  }
  .BannerBonus__footerP {
    margin-top: 40px;
  }
}

@media screen and (max-width: 640px) {
  .BannerBonus {
    height: initial;
    min-height: 340px;
    padding: 20px;
    margin: 0 16px;
    &:before {
      bottom: -180%;
      left: -100%;
    }

    &:after {
      top: -110%;
      right: -100%;
    }
  }

  .BannerBonus__img {
    right: 20px;
  }

  .BannerBonus__bg {
    background-image: url(/img/banners/banner_bonus_mini_arrow.svg);
    background-size: 317px auto;
    background-position: calc(100% + 80px) calc(100% + 70px);
  }

  .BannerBonus__bg_text {
    position: inherit;
    top: initial;
    right: initial;
    transform: translateY(0);
    svg {
      width: 252px;
      height: auto;
      filter: drop-shadow(1px 1px 0px #623dfe);
    }
    img {
      display: flex;
    }
  }

  .BannerBonus__h3 {
    max-width: 80%;
    font-size: 28px;
  }

  .BannerBonus__p {
    font-size: 18px;
    line-height: 140%;
    margin: 0 0 32px 0;
    width: 100%;
    max-width: 300px;
  }

  .BannerBonus__button {
    font-size: 14px;
    padding: 12px 20px;
    margin: 0 0 40px 0;
  }
}

@media screen and (max-width: 450px) {
  .BannerBonus {
    &:before {
      bottom: -220%;
      left: -80%;
    }

    &:after {
      top: -160%;
      right: -75%;
    }
  }

  .BannerBonus__bg_text {
    gap: 16px;
    img {
      width: 58px;
      height: auto;
      margin-top: -5px;
    }
  }

  .BannerBonus__footerP {
    margin-top: 12px;
    font-size: 12px;
  }

  .BannerBonus__button {
    width: 100%;
  }
}
</style>
