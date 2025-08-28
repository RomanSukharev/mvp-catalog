<script setup lang="ts">
useHead({
  title: "Каталог квартир от ПСК Дом - 404",
});
</script>

<template>
  <div class="Page404">
    <div class="Page404__404">404</div>
    <h1 class="Page404__404Text">Страница не найдена</h1>
    <p class="Page404__p">
      Ее удалили или еще не создали. <br />
      Актуальную информацию вы найдете на нашем сайте.
    </p>
    <a class="btn_ligth Page404__btn" @click="$router.push('/')">Вернуться на главную</a>
  </div>
</template>

<style lang="scss">
.Page404 {
  background-color: #f88787;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 176px 0 120px 0;
  gap: 30px;
}

.Page404__404 {
  font-family: "TT Norms Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 316.585px;
  line-height: 102%;
  color: white;
  position: relative;
  margin: 0 0 50px 0;
}

.Page404__img {
  position: absolute;
  left: 215px;
  top: 19px;
}

.Page404__404Text {
  font-family: "TT Norms Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 54px;
  line-height: 100%;
  color: white;
}

.Page404__p {
  font-family: "Lab Grotesque";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.01em;
  color: white;
}

.Page404__btn {
  text-decoration: none;
  background-color: #f68f21;
  grid-column: span 2;
  color: white;
  cursor: pointer;
  width: max-content;
  height: max-content;
  white-space: nowrap;
  padding: 9.5px 23px;
  border-radius: 120px;
  transition: 0.2s;
  &:hover{
    transition: 0.2s;
    background-color: #f4a856;
  }
}

@media screen and (max-width: 740px) {
  .Page404 {
    padding: 100px 20px 100px 20px;
  }

  .Page404__404 {
    font-size: 137.561px;
    line-height: 102%;
  }

  .Page404__img {
    width: 96px;
    height: auto;
    left: 93px;
    top: 8px;
  }

  .Page404__404Text {
    font-size: 36px;
    line-height: 108%;
    text-align: center;
  }

  .Page404__p {
    font-size: 16px;
    line-height: 140%;
    max-width: 276px;
  }

  .Page404__btn {
    width: 100%;
    text-align: center;
  }
}
</style>
