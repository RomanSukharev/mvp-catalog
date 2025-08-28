<script setup lang="ts">
var cards = [
  {
    svg: "/img/mvideo.svg",
    p: "Бытовая техника и&nbsp;электроника",
    background: "/img/wash_machine.png",
  },
  {
    svg: "/img/hoff.svg",
    p: "Мебель и&nbsp;товары для&nbsp;дома",
    background: "/img/sofa.png",
  },
];
</script>

<template>
  <section class="PopupBonusShopProgramm">
    <h3 class="PopupBonusShopProgramm__h3">Магазины в&nbsp;программе</h3>
    <div class="PopupBonusShopProgramm__cards">
      <div
        class="PopupBonusShopProgramm__card"
        v-for="(card, idx) of cards"
        :class="`PopupBonusShopProgramm__card_${idx + 1}`"
        :style="`background-image: url(${card.background})`"
      >
        <img class="PopupBonusShopProgramm__cardContentLogo" :src="card.svg" alt="" />
        <p class="PopupBonusShopProgramm__cardContentP" v-html="card.p"></p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.PopupBonusShopProgramm {
  padding: 80px 40px 0;
  margin-bottom: 40px;
}
.PopupBonusShopProgramm__h3 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 39.6px */
  margin-bottom: 40px;
}

.PopupBonusShopProgramm__cards {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  //   flex-wrap: wrap;
}

.PopupBonusShopProgramm__card {
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #dfe6ec;
  background-color: #f5f7f9;
  display: grid;
  gap: 24px;
  background-repeat: no-repeat;
  max-width: 520px;
  width: 100%;
}

.PopupBonusShopProgramm__card_1 {
  background-size: 120px;
  background-position: 92% 47px;
}

.PopupBonusShopProgramm__card_2 {
  background-size: 229px;
  background-position: 95% 47px;
}

.PopupBonusShopProgramm__cardContentP {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 138.889% */

  max-width: 210px;
  padding-bottom: 40px;
}
@media screen and (max-width: 1170px) {
  .PopupBonusShopProgramm {
    padding: 64px 30px 0;
  }
}

@media screen and (max-width: 950px) {
  .PopupBonusShopProgramm__cards {
    flex-direction: column;
  }
  .PopupBonusShopProgramm__card {
    max-width: 100%;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonusShopProgramm {
    padding: 64px 16px 0;
  }
  .PopupBonusShopProgramm__h3 {
    font-size: 32px;
  }
  .PopupBonusShopProgramm__card {
    padding: 20px;
    background-repeat: no-repeat;
  }

  .PopupBonusShopProgramm__card_1 {
    background-size: 93px 98px;
    background-position: 92% 82px;
  }

  .PopupBonusShopProgramm__card_2 {
    background-position: 100% 64px;
  }

  .PopupBonusShopProgramm__cardContentP {
    padding-bottom: 60px;
  }
}

@media screen and (max-width: 450px) {
  .PopupBonusShopProgramm__card_2 {
    background-position: 187px 64px;
  }
}
</style>
