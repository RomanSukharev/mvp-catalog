<template>
  <section class="PopupBonusAboutProgramm">
    <h3 class="PopupBonusAboutProgramm__h3">О программе</h3>
    <p class="PopupBonusAboutProgramm__p">
      &laquo;Ещё бонус&raquo;&nbsp;&mdash; это возможность получить&nbsp;5% от&nbsp;стоимости квартиры баллами
      и&nbsp;потратить их&nbsp;в&nbsp;магазинах техники и&nbsp;мебели.
    </p>
    <div class="PopupBonusAboutProgramm__banner">1 балл = 1 ₽</div>
  </section>
</template>
<style lang="scss">
.PopupBonusAboutProgramm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  margin-top: 48px;
  padding: 0px 40px;
}
.PopupBonusAboutProgramm__h3 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  margin-bottom: 25px;

  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 39.6px */
}

.PopupBonusAboutProgramm__p {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
  max-width: 489px;

  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 30.8px */
}

.PopupBonusAboutProgramm__banner {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: span 2;

  margin-top: 11px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-family: "TT Norms Pro";
  font-size: 52px;
  font-style: normal;
  font-weight: 500;
  line-height: 41px; /* 78.846% */

  border-radius: 12px;
  background: linear-gradient(99deg, #7a3cff 0%, #8e59ff 100%);
}

@media screen and (max-width: 1170px) {
  .PopupBonusAboutProgramm {
    column-gap: 20px;
    padding: 0px 30px;
  }
  .PopupBonusAboutProgramm__p {
    font-size: 18px;
  }
  .PopupBonusAboutProgramm__banner {
    font-size: 51px;
  }
}

@media screen and (max-width: 900px) {
  .PopupBonusAboutProgramm {
    margin-top: 0;
  }
  .PopupBonusAboutProgramm__banner {
    grid-row-start: 2;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonusAboutProgramm {
    grid-template-columns: 1fr;
    padding: 0px 16px;
  }
  .PopupBonusAboutProgramm__h3 {
    font-size: 32px;
    margin-bottom: 24px;
  }
  .PopupBonusAboutProgramm__p {
    grid-row-start: 2;
    margin-bottom: 40px;
  }
  .PopupBonusAboutProgramm__banner {
    grid-column-start: 1;
    grid-row-start: 3;
    margin-top: 0;
    height: 146px;
    font-size: 52px;
  }
}
</style>
