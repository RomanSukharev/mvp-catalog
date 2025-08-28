<template>
  <section class="PopupBonusComfortPoints">
    <div class="PopupBonusComfortPoints__descriprion">
      <h3 class="PopupBonusComfortPoints__descriprionH3">Распределите баллы так, как удобно вам</h3>
      <p class="PopupBonusComfortPoints__descriprionP">
        Главное заранее решить, в&nbsp;каких магазинах и&nbsp;сколько баллов вы&nbsp;планируете потратить&nbsp;&mdash;
        указать это&nbsp;нужно на&nbsp;этапе сделки.
      </p>
    </div>

    <img class="PopupBonusComfortPoints__schema" width="560" height="278" src="/img/schema_points.svg" alt="" />
  </section>
</template>

<style lang="scss">
.PopupBonusComfortPoints {
  padding: 80px 40px 0;
  display: flex;
  gap: 40px;
}
.PopupBonusComfortPoints__descriprion {
  gap: 32px;
  display: flex;
  flex-direction: column;
}
.PopupBonusComfortPoints__descriprionH3 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
}

.PopupBonusComfortPoints__descriprionP {
  color: #1a1a1a;

  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
}

.PopupBonusComfortPoints__schema {
  height: 100%;
  width: auto;
}

@media screen and (max-width: 1170px) {
  .PopupBonusComfortPoints {
    padding: 64px 30px 0;
    flex-direction: column;
    justify-content: flex-start;
  }
  .PopupBonusComfortPoints__descriprion {
    max-width: 460px;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonusComfortPoints {
    padding: 64px 16px 0;
  }

  .PopupBonusComfortPoints__schema {
    height: auto;
    width: 100%;
  }

  .PopupBonusComfortPoints__descriprionH3 {
    font-size: 32px;
  }
}
</style>
