<template>
  <div class="PskLoader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss">
.PskLoader {
  // display: block;
  // position: relative;
  // width: 80px;
  // height: 80px;
  // margin: 100px auto;
}

.PskLoader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #f88787;
  border-radius: 50%;
  animation: PskLoader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f88787 transparent transparent transparent;
}

.PskLoader div:nth-child(1) {
  animation-delay: -0.45s;
}

.PskLoader div:nth-child(2) {
  animation-delay: -0.3s;
}

.PskLoader div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes PskLoader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 640px) {
  .PskLoader {
    margin: 40px auto;
  }
}
</style>
