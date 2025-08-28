<script setup lang="ts">
const flat_catalog_store = useFlatCatalogStore();
var route = useRoute();
var router = useRouter();
var is_app_loading = useState<boolean >("is_app_loading", () => false); //prettier-ignore

// const page_current = ref(1);
const page_per = ref(20);
const page_last = computed(() => Math.ceil(flat_catalog_store.flat_list_filtered.length / page_per.value));

const curr_list = computed(() =>
  [...flat_catalog_store.flat_list_filtered].slice(
    (flat_catalog_store.page_current - 1) * page_per.value,
    page_per.value * flat_catalog_store.page_current
  )
);

watch(
  ()=>curr_list.value,
  () => {
    // console.log("change");
    window.scrollTo(0, 0);
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    
  }
);

const max_pages = ref(7);
</script>

<template>
  <section class="FlatCatalog">
    <h1 class="FlatCatalog__h1">Каталог квартир от&nbsp;ПСК Дом</h1>
    <FlatCatalogFilters />
    <div v-if="flat_catalog_store.complex_current.length">
      <div class="FlatCatalog__content" v-if="!is_app_loading">
        <p class="FlatCatalog__countList">Найдено квартир: {{ flat_catalog_store.flat_list_filtered.length }}</p>
        <div class="FlatCatalog__cardList" v-if="flat_catalog_store.flat_list_filtered.length">
          <FlatCatalogCard v-for="plan in curr_list" :plan="plan" v-model="flat_catalog_store.page_current" />
        </div>

        <section class="FlatCatalog__errorList" v-else>Список пуст</section>
        <div class="FlatCatalog__pagination">
          <q-pagination
            v-if="flat_catalog_store.flat_list_filtered.length"
            v-model="flat_catalog_store.page_current"
            @update:model-value="ymReachGoal('change_pagination')"
            :max="page_last"
            direction-links
            max-pages="7"
            flat
            animated
            color="grey"
            active-color="red"
          ></q-pagination>
        </div>
      </div>
    </div>
    <div class="FlatCatalog__addComplex" v-else>Выберите объект</div>
    <UIPskLoader class="FlatCatalog__loader" v-if="is_app_loading" />
  </section>
</template>

<style lang="scss">
// html {
//   scroll-behavior: smooth;
// }
.FlatCatalog {
  max-width: 1667px;
  width: 100%;
  padding: 150px 70px 60px;
  margin: 0 auto;
}

.FlatCatalog__h1 {
  color: #1a1a1a;
  font-family: "TT Norms Pro"; /*  Inter*/
  margin-bottom: 40px;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
}

.FlatCatalog__errorList {
  color: #586267;
  font-family: "TT Norms Pro"; /*  Inter*/
  text-align: center;
  margin-top: 100px;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  opacity: 0.8;
}

.FlatCatalog__cardList {
  margin-top: 35px;
  gap: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.FlatCatalog__countList {
  margin-top: 50px;
  margin-bottom: 20px;
  color: #5a5a5a;
  font-family: "TT Norms Pro"; /*   Segoe UI*/
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.FlatCatalog__pagination {
  width: fit-content;
  margin: 60px auto 0px;
}

.FlatCatalog__addComplex {
  color: #586267;
  font-family: "TT Norms Pro"; /*  Inter*/
  text-align: center;
  margin-top: 100px;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  opacity: 0.8;
}

.FlatCatalog__loader {
  display: block;
  position: relative;
  margin: 100px auto;
  width: 80px;
  height: 80px;
}

@media screen and (max-width: 1500px) {
  .FlatCatalog__cardList {
    margin-top: 35px;
    gap: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
  }
}

@media screen and (max-width: 1170px) {
  .FlatCatalog {
    padding: 65px 35px;
  }
  .FlatCatalog__cardList {
    margin-top: 40px;
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 740px) {
  .FlatCatalog__cardList {
    margin-top: 40px;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media screen and (max-width: 640px) {
  .FlatCatalog {
    padding-left: 16px;
    padding-right: 16px;
  }
  .FlatCatalog__h1 {
    margin-top: 0;
    font-size: 30px;
    max-width: 270px;
    margin-bottom: 25px;
  }
  .FlatCatalog__addComplex {
    margin-top: 50px;
  }
  .FlatCatalog__pagination {
    width: fit-content;
    margin: 40px auto 0px;
  }
}

@media screen and (max-width: 420px) {
  .q-pagination {
    .q-btn {
      font-size: 12px;
    }
  }
}
</style>
