<script setup lang="ts">
var cards_points = [
  {
    title: "Для кухни",
    labels: [
      { title: "Плита", points: "≈75 599" },
      { title: "Холодильник", points: "≈69 390" },
      { title: "Посудомоечная машина", points: "≈52 890" },
      { title: "Кофемашина", points: "≈24 999" },
      { title: "Вытяжка", points: "≈19 999" },
      { title: "Мультиварка", points: "≈12 499" },
      { title: "Аэрогриль", points: "≈10 490" },
      { title: "Обеденный стол", points: "≈9 999" },
      { title: "Стулья", points: "≈8 796" },
      { title: "Соковыжималка", points: "≈7 999" },
      { title: "Столовый сервиз", points: "≈3 599" },
      { title: "Набор столовых приборов", points: "≈1 599" },
    ],
  },
  {
    title: "Для гостиной",
    labels: [
      { title: "Телевизор", points: "≈72 790" },
      { title: "Диван", points: "≈52 999" },
      { title: "Кондиционер", points: "≈46 999" },
      { title: "Торшер", points: "≈35 999" },
      { title: "Саундбар", points: "≈21 999" },
      { title: "Яндекс Станция 2", points: "≈17 990" },
      { title: "Тумба под ТВ", points: "≈11 799" },
      { title: "Стеллаж", points: "≈10 299" },
      { title: "Электронная книга", points: "≈8 499" },
      { title: "Ковёр", points: "≈ 7 999" },
      { title: "Журнальный стол", points: "≈4 799" },
      { title: "Плед", points: "≈3 599" },
    ],
  },
];
</script>

<template>
  <section class="PopupBonusSpendPoints">
    <div class="PopupBonusSpendPoints__content">
      <h3 class="PopupBonusSpendPoints__contentH3">На что потратить баллы</h3>
      <div class="PopupBonusSpendPoints__description">
        <p class="PopupBonusSpendPoints__descriptionP">
          Например, при покупке квартиры за&nbsp;6&nbsp;000&nbsp;000&nbsp;₽ вы&nbsp;получите 300&nbsp;000&nbsp;баллов.
        </p>
        <p class="PopupBonusSpendPoints__descriptionP">
          Посмотрели, что можно купить на эту сумму и составили две подборки.
        </p>
      </div>
    </div>
    <div class="PopupBonusSpendPoints__cards">
      <div class="PopupBonusSpendPoints__card" v-for="card of cards_points">
        <h5 class="PopupBonusSpendPoints__cardH5">{{ card.title }}</h5>
        <div class="PopupBonusSpendPoints__cardList">
          <div class="PopupBonusSpendPoints__cardListItem" v-for="label in card.labels">
            <p class="PopupBonusSpendPoints__cardListItemTitle">{{ label.title }}</p>
            <p class="PopupBonusSpendPoints__cardListItemPoints">{{ label.points }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.PopupBonusSpendPoints {
  padding: 80px 40px 0;
  display: grid;
  gap: 40px;
}

.PopupBonusSpendPoints__content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.PopupBonusSpendPoints__contentH3 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
}

.PopupBonusSpendPoints__description {
  max-width: 480px;
  width: 100%;
  display: grid;
  gap: 20px;
  padding-top: 10px;
}

.PopupBonusSpendPoints__descriptionP {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  max-width: 430px;
}

.PopupBonusSpendPoints__cards {
  display: flex;
  gap: 40px;
}

.PopupBonusSpendPoints__card {
  padding: 20px 30px 30px;
  border-radius: 12px;
  border: 1px solid #dfe6ec;
  background-color: #f5f7f9;
  width: 100%;
}

.PopupBonusSpendPoints__cardH5 {
  color: #7a3cff;
  font-family: "TT Norms Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 28.8px */
  margin-bottom: 35px;
}

.PopupBonusSpendPoints__cardList {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.PopupBonusSpendPoints__cardListItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #7a3cff60;
  &:last-child {
    border-bottom: 1px solid #7a3cff00;
    padding-bottom: 0;
  }
}

.PopupBonusSpendPoints__cardListItemTitle {
  color: #1a1a1a;

  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
}

.PopupBonusSpendPoints__cardListItemPoints {
  color: #1a1a1a;

  font-family: "TT Norms Pro";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  flex-shrink: 0;
}

@media screen and (max-width: 1170px) {
  .PopupBonusSpendPoints {
    padding: 64px 30px 0;
  }
  .PopupBonusSpendPoints__cards {
    gap: 20px;
  }
}

@media screen and (max-width: 740px) {
  .PopupBonusSpendPoints {
    padding: 64px 16px 0;
  }

  .PopupBonusSpendPoints__content {
    flex-direction: column;
    gap: 40px;
  }

  .PopupBonusSpendPoints__description {
    padding-top: 10px;
  }

  .PopupBonusSpendPoints__contentH3 {
    font-size: 32px;
  }

  .PopupBonusSpendPoints__cards {
    flex-direction: column;
    gap: 40px;
  }
}
</style>
