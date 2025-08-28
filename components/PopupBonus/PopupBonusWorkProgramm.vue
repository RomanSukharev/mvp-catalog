<template>
  <section class="PopupBonusWorkProgramm">
    <h3 class="PopupBonusWorkProgramm__h3">
      Как работает <br />
      программа
    </h3>
    <div class="PopupBonusWorkProgramm__description">
      <p class="PopupBonusWorkProgramm__descriptionP1">
        Баллы от&nbsp;покупки начисляются на&nbsp;ваш счёт в&nbsp;программе лояльности в&nbsp;течение 90&nbsp;дней после
        сделки.
      </p>
      <p class="PopupBonusWorkProgramm__descriptionP2">
        Затем они конвертируются в&nbsp;сертификаты для ваших покупок.
      </p>
      <p class="PopupBonusWorkProgramm__descriptionP2">
        Когда всё будет готово, пригласим вас для получения. Если вы&nbsp;живёте не&nbsp;в&nbsp;Тюмени, отправим
        сертификаты по&nbsp;почте.
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.PopupBonusWorkProgramm {
  padding: 80px 40px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.PopupBonusWorkProgramm__h3 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 39.6px */
  flex-shrink: 0;
}

.PopupBonusWorkProgramm__description {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 480px;
  width: 100%;
  justify-content: flex-start;
}

.PopupBonusWorkProgramm__descriptionP1 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 30.8px */
  max-width: 442px;
}

.PopupBonusWorkProgramm__descriptionP2 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 138.889% */
  max-width: 360px;
}


@media screen and (max-width: 1170px) {
  .PopupBonusWorkProgramm {
    padding: 80px 30px;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonusWorkProgramm {
    padding: 80px 16px;
    flex-direction: column;
  }

  .PopupBonusWorkProgramm__h3 {
    font-size: 32px;
  }

  .PopupBonusWorkProgramm__descriptionP1 {
    font-size: 20px;
  }

  .PopupBonusWorkProgramm__descriptionP2 {
    font-size: 18px;
  }
}
</style>
