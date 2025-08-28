<script lang="ts" setup>
useHead({
  title: "Каталог квартир от ПСК Дом - 500",
});
</script>

<template>
  <div class="Page500">
    <div class="Page500__content">
      <h1 class="Page500__h">
        500 
      </h1>

      <p class="Page500__p">Ошибка сервера, скоро всё заработает.</p>
    </div>
  </div>
</template>

<style lang="scss">
.Page500 {
  height: 100vh;
  background-color: #f88787;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Page500__h {
  font-family: "TT Norms Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 316.585px;
  line-height: 102%;
  color: white;

  position: relative;

  margin: 0 0 50px 0;
}

.Page500__img1 {
  position: absolute;
  top: 19px;
  left: 195px;
  width: 220px;
}

.Page500__img2 {
  position: absolute;
  top: 19px;
  left: 434px;
}

.Page500__p {
  font-family: "TT Norms Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 110%;
  color: white;
  text-align: center;
}

@media screen and (max-width: 740px) {
  .Page500__content {
    display: flex;
    flex-direction: column;
  }

  .Page500__h {
    font-size: 135.951px;
    line-height: 102%;
    text-align: center;
    margin: 0 0 20px 0;
  }

  .Page500__img1 {
    width: 95px;
    top: 8px;
    left: 83px;
  }

  .Page500__img2 {
    width: 95px;
    top: 8px;
    left: 186px;
  }

  .Page500__p {
    font-size: 10.3063px;
    line-height: 110%;
  }
}
</style>
