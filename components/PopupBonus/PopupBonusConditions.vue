<script setup lang="ts">
var li_items = [
  "Выбрать и&nbsp;забронировать квартиру",
  "Внести платеж за&nbsp;квартиру",
  "Дождаться начисления баллов",
  "Получить сертификаты",
  "Потратить их&nbsp;на&nbsp;обустройства дома",
];
</script>

<template>
  <section class="PopupBonusConditions">
    <div class="PopupBonusConditions__description">
      <h3 class="PopupBonusConditions__descriptionH3">Условия участия</h3>
      <p class="PopupBonusConditions__descriptionP1">
        Присоединиться к программе можно при 100% оплате или при покупке в ипотеку.
      </p>
      <p class="PopupBonusConditions__descriptionP2">
        Важно, чтобы первоначальный взнос был оплачен из собственных средств — без использования жилищных сертификатов
        и материнского капитала.
      </p>
    </div>

    <div class="PopupBonusConditions__list">
      <h5 class="PopupBonusConditions__listH5">Присоединиться к&nbsp;программе</h5>
      <ol class="PopupBonusConditions__listOl">
        <li class="PopupBonusConditions__listLi" v-for="item of li_items">
          <p class="PopupBonusConditions__listLiP" v-html="item"></p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss">
.PopupBonusConditions {
  padding: 80px 40px;
  background-color: #f5f7f9;
  display: flex;
  gap: 40px;
}

.PopupBonusConditions__description {
  max-width: 560px;
  width: 100%;
}
.PopupBonusConditions__descriptionH3 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 39.6px */
  margin-bottom: 30px;
}

.PopupBonusConditions__descriptionP1 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 30.8px */
  margin-bottom: 20px;
  max-width: 388px;
}

.PopupBonusConditions__descriptionP2 {
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 138.889% */
  max-width: 360px;
}

.PopupBonusConditions__list {
  padding-top: 10px;
  max-width: 480px;
  width: 100%;
}

.PopupBonusConditions__listH5 {
  color: #1a1a1a;

  font-family: "TT Norms Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 28.8px */
  margin-bottom: 32px;
}

.PopupBonusConditions__listLiP {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.PopupBonusConditions__listOl {
  counter-reset: myCounter;
  display: grid;
  gap: 32px;
  border-left: 1px dashed lightgray;
  margin-left: 20px;
}

.PopupBonusConditions__listLi {
  list-style: none;
  line-height: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.PopupBonusConditions__listLi:before {
  counter-increment: myCounter;
  content: counter(myCounter);
  color: #7a3cff;
  background: #fff;
  border-radius: 41px;
  border: 1px solid #d9dee2;
  display: inline-block;
  text-align: center;
  line-height: normal;
  height: auto;
  width: auto;
  padding: 10px 16px;

  text-align: center;
  /* text/primary/accent */
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
  margin-left: -20px;
}

@media screen and (max-width: 1170px) {
  .PopupBonusConditions {
    padding: 64px 30px;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonusConditions {
    padding: 64px 16px;
    flex-direction: column;
  }

  .PopupBonusConditions__descriptionH3 {
    font-size: 32px;
    margin-bottom: 30px;
  }

  .PopupBonusConditions__descriptionP1 {
    font-size: 20px;

    margin-bottom: 20px;
  }
}
</style>
