<script setup lang="ts">
import type { IFlat } from "~/types/FlatsListTypes";
import { useQuasar } from "quasar";

const q = useQuasar();

const flat_catalog_store = useFlatCatalogStore();
const router = useRouter();
const route = useRoute();

const clearFilteres = () => {
  if (route.path === "/flats") {
    router.replace({ query: { complexes: router.currentRoute.value.query.complexes } });
    ymReachGoal("click_clear_filteres");
    return;
  }
  flat_catalog_store.flat_list = [];
  router.replace({ query: {} });
  ymReachGoal("click_clear_filteres");
};

var input_href = ref();

const createHrefForCLient = () => {
  input_href.value = `${window.location.origin + "/flats" + window.location.search}`;
  ymReachGoal("click_generate-link");
  return;
};

const copyToClipBoard = () => {
  navigator.clipboard.writeText(input_href.value);

  q.notify({
    type: "positive",
    message: "Скопировано",
    timeout: 10,
    position: "center",
  });
  ymReachGoal("click_copy-link");
};
watch(
  () => route.fullPath,
  () => {
    input_href.value = "";
  }
);

const isNumber = (evt: Event | any) => {
  var currPos_before = evt.target.selectionStart;
  var before_len = evt.target!.value.length;
  var t = +evt.target!.value.replace(/\D+/g, "");

  evt.target!.value = t.toLocaleString("ru-RU");

  var after_len = evt.target!.value.length;
  var currPos_after = after_len - before_len + currPos_before;
  var str = evt.target!.value.matchAll(/\s/g);
  var arr_space_index = [];

  for (var result of str) {
    arr_space_index.push(result.index);
  }

  if (arr_space_index.includes(currPos_before) && currPos_after > currPos_before) {
    currPos_after = currPos_after - 1;
  }

  // если попросят, то after_len <= 1, сейчас обработка если остается только 0
  if (currPos_after <= 0 && evt.target!.value === "0") {
    evt.target.setSelectionRange(1, 1);
    return;
  }

  if (currPos_after < 0) {
    evt.target.setSelectionRange(0, 0);
    return;
  }

  evt.target.setSelectionRange(currPos_after, currPos_after);
};
</script>

<template>
  <section class="FlatCatalogFilters">
    <h3 class="FlatCatalogFilters__h3">Фильтры</h3>
    <div class="FlatCatalogFilters__filterList1">
      <div class="FlatCatalogFilters__select FlatCatalogFilters__select_complex">
        <q-select
          @click="ymReachGoal('click_filter_complex')"
          multiple
          filled
          v-model="flat_catalog_store.complex_current"
          :options="flat_catalog_store.complex_options"
          label="Выберите объект"
          :disable="route.path === '/flats'"
        ></q-select>
      </div>

      <div class="FlatCatalogFilters__select FlatCatalogFilters__select_house">
        <q-select
          @click="ymReachGoal('click_filter_house')"
          filled
          multiple
          v-model="flat_catalog_store.house_current"
          :options="flat_catalog_store.house_options"
          label="Дом"
          :disable="!flat_catalog_store.house_options.length || !flat_catalog_store.complex_current.length"
        ></q-select>
      </div>

      <div class="FlatCatalogFilters__select FlatCatalogFilters__select_type">
        <q-select
          @click="ymReachGoal('click_filter_type')"
          filled
          multiple
          v-model="flat_catalog_store.type_current"
          :options="flat_catalog_store.type_options"
          label="Тип"
          :disable="!flat_catalog_store.type_options.length || !flat_catalog_store.complex_current.length"
        ></q-select>
      </div>

      <div class="FlatCatalogFilters__select FlatCatalogFilters__select_features">
        <q-select
          @click="ymReachGoal('click_filter_features')"
          filled
          multiple
          v-model="flat_catalog_store.features_current"
          :options="flat_catalog_store.features_options"
          label="Особенности"
          :disable="!flat_catalog_store.features_options.length || !flat_catalog_store.complex_current.length"
        ></q-select>
      </div>
      <div class="FlatCatalogFilters__select FlatCatalogFilters__select_properties">
        <q-select
          @click="ymReachGoal('click_filter_properties')"
          filled
          multiple
          v-model="flat_catalog_store.properties_current"
          :options="flat_catalog_store.properties_options"
          label="Акции"
          :disable="!flat_catalog_store.properties_options.length || !flat_catalog_store.complex_current.length"
        ></q-select>
      </div>
    </div>

    <div class="FlatCatalogFilters__filterList2">
      <div class="FlatCatalogFilters__cost">
        <p class="FlatCatalogFilters__inputLabel">Цена, ₽</p>
        <div class="FlatCatalogFilters__inputFilteresItem">
          <div class="FlatCatalogFilters__inputFilteresItem__content">
            <p class="FlatCatalogFilters__inputP">от</p>
            <input
              class="FlatCatalogFilters__input"
              id="input_cost_min"
              type="text"
              :placeholder="`${Math.min(...flat_catalog_store.result_for_cost.map((i:IFlat) => i.costs[0].cost)) || 0}`"
              :disabled="!flat_catalog_store.complex_current.length || !flat_catalog_store.flat_list_filtered.length"
              v-model.lazy="flat_catalog_store.cost_min"
              @input="isNumber($event)"
            />
          </div>
          -
          <div class="FlatCatalogFilters__inputFilteresItem__content">
            <p class="FlatCatalogFilters__inputP">до</p>
            <input
              class="FlatCatalogFilters__input"
              id="input_cost_max"
              type="text"
              :placeholder="`${Math.max(...flat_catalog_store.result_for_cost.map((i:IFlat) => i.costs[0].cost)) || 0}`"
              :disabled="!flat_catalog_store.complex_current.length || !flat_catalog_store.flat_list_filtered.length"
              v-model.lazy="flat_catalog_store.cost_max"
              @input="isNumber($event)"
            />
          </div>
        </div>
      </div>

      <div class="FlatCatalogFilters__floor">
        <p class="FlatCatalogFilters__inputLabel">Этаж</p>
        <div class="FlatCatalogFilters__inputFilteresItem">
          <div class="FlatCatalogFilters__inputFilteresItem__content">
            <p class="FlatCatalogFilters__inputP">от</p>
            <input
              class="FlatCatalogFilters__input"
              id="input_floor_min"
              type="text"
              :placeholder="`${
                flat_catalog_store.result_for_floor.length
                  ? Math.min(...flat_catalog_store.result_for_floor.map((i:IFlat) => i.floor))
                  : 0
              }`"
              :disabled="!flat_catalog_store.complex_current.length || !flat_catalog_store.flat_list_filtered.length"
              v-model.lazy="flat_catalog_store.floor_min"
              @input="isNumber($event)"
            />
          </div>
          -
          <div class="FlatCatalogFilters__inputFilteresItem__content">
            <p class="FlatCatalogFilters__inputP">до</p>
            <input
              class="FlatCatalogFilters__input"
              id="input_floor_max"
              type="text"
              :placeholder="`${Math.max(...flat_catalog_store.result_for_floor.map((i:IFlat) => i.floor)) || 0}`"
              :disabled="!flat_catalog_store.complex_current.length || !flat_catalog_store.flat_list_filtered.length"
              v-model.lazy="flat_catalog_store.floor_max"
              @input="isNumber($event)"
            />
          </div>
        </div>
      </div>

      <div class="FlatCatalogFilters__square">
        <p class="FlatCatalogFilters__inputLabel">Площадь, м²</p>
        <div class="FlatCatalogFilters__inputFilteresItem">
          <div class="FlatCatalogFilters__inputFilteresItem__content">
            <p class="FlatCatalogFilters__inputP">от</p>
            <input
              class="FlatCatalogFilters__input"
              id="input_square_min"
              type="text"
              :placeholder="`${Math.floor(
                Math.min(...flat_catalog_store.result_for_square.map((i:IFlat) => i.declared_square)) || 0
              )}`"
              :disabled="!flat_catalog_store.complex_current.length || !flat_catalog_store.flat_list_filtered.length"
              v-model.lazy="flat_catalog_store.square_min"
              @input="isNumber($event)"
            />
          </div>
          -
          <div class="FlatCatalogFilters__inputFilteresItem__content">
            <p class="FlatCatalogFilters__inputP">до</p>
            <input
              class="FlatCatalogFilters__input"
              id="input_square_max"
              type="text"
              :placeholder="`${Math.ceil(
                Math.max(...flat_catalog_store.result_for_square.map((i:IFlat) => i.declared_square)) || 0
              )}`"
              :disabled="!flat_catalog_store.complex_current.length || !flat_catalog_store.flat_list_filtered.length"
              v-model.lazy="flat_catalog_store.square_max"
              @input="isNumber($event)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="FlatCatalogFilters__btns">
      <q-btn class="FlatCatalogFilters__clearFilteres" color="red-11" @click="clearFilteres">очистить фильтры</q-btn>
      <q-btn
        v-if="route.path != '/flats' && flat_catalog_store.complex_current.length"
        class="FlatCatalogFilters__succsess"
        color="amber-6"
        @click="createHrefForCLient"
      >
        Сформировать ссылку</q-btn
      >
    </div>
    <div v-if="input_href" class="FlatCatalogFilters__href">
      <h1 class="FlatCatalogFilters__hrefH1">Ссылка для клиента</h1>
      <q-input class="FlatCatalogFilters__hrefInput" filled v-model="input_href" readonly></q-input>
      <q-btn class="FlatCatalogFilters__copyBtn" @click="copyToClipBoard" color="amber-6">скопировать</q-btn>
    </div>
  </section>
</template>

<style lang="scss">
.FlatCatalogFilters__href {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 500px;
  column-gap: 30px;
}
.FlatCatalogFilters__hrefH1 {
  color: #1a1a1a;
  font-family: "TT Norms Pro"; /*  Inter*/
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
}
.FlatCatalogFilters__hrefInput {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
}

.FlatCatalogFilters__copyBtn {
  text-decoration: none;
  border: none;
  padding: 10px 20px;
  font-family: "TT Norms Pro";
  text-transform: lowercase;
  color: white;
  font-size: 20px;
  transition: ease-in-out 0.2s;
  display: block;
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 2;
}

.FlatCatalogFilters__h3 {
  color: #1a1a1a;
  font-family: "TT Norms Pro"; /*  Inter*/
  margin-bottom: 25px;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
}

.FlatCatalogFilters__filterList1 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  // width: 100%;
}

.FlatCatalogFilters__select {
  width: 18%;
}

.FlatCatalogFilters__btns {
  display: flex;
  gap: 40px;
}

.FlatCatalogFilters__clearFilteres {
  margin-top: 30px;
  text-decoration: none;
  border: none;
  padding: 10px 20px;
  font-family: "TT Norms Pro";
  text-transform: lowercase;
  color: white;
  font-size: 20px;
  transition: ease-in-out 0.2s;
  display: block;
}

.FlatCatalogFilters__succsess {
  margin-top: 30px;
  text-decoration: none;
  border: none;
  padding: 10px 20px;
  font-family: "TT Norms Pro";
  text-transform: lowercase;
  color: white;
  font-size: 20px;
  transition: ease-in-out 0.2s;
  display: block;
}

.FlatCatalogFilters__filterList2 {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
  justify-content: flex-start;
}

.FlatCatalogFilters__inputLabel {
  margin-bottom: 10px;
  color: #000;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 128%; /* 17.92px */
}

.FlatCatalogFilters__inputFilteresItem {
  display: flex;
  align-items: center;
  gap: 10px;
}

.FlatCatalogFilters__cost {
  width: 280px;
}

.FlatCatalogFilters__floor {
  width: 155px;
}

.FlatCatalogFilters__square {
  width: 205px;
}
.FlatCatalogFilters__inputFilteresItem__content {
  display: flex;
  align-items: center;
  position: relative;
}

.FlatCatalogFilters__input {
  padding: 10px 0px;
  padding-left: 30px;
  padding-right: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  // border: 2px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.24);
  // -webkit-transition: 0.5s;
  transition: 0.3s;

  &:focus {
    border: 1px solid #1976d2;
    outline: none;
  }

  &::placeholder {
    color: #a9a7a7;
  }
  color: #5a5a5a;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
  width: 100%;
}

.FlatCatalogFilters__inputP {
  color: #5a5a5a;
  font-family: "TT Norms Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
  position: absolute;
  z-index: 1;
  left: 10px;
}

@media screen and (max-width: 1500px) {
  .FlatCatalogFilters__select_complex {
    width: 245px;
  }
  .FlatCatalogFilters__select_house {
    width: 245px;
  }
  .FlatCatalogFilters__select_type {
    width: 100px;
  }
  .FlatCatalogFilters__select_features {
    width: 260px;
  }
  .FlatCatalogFilters__select_properties {
    width: 200px;
  }
}

@media screen and (max-width: 1270px) {
  .FlatCatalogFilters__filterList1 {
    justify-content: flex-start;
  }
}

@media screen and (max-width: 640px) {
  .FlatCatalogFilters__filterList1 {
    justify-content: flex-start;
  }
  .FlatCatalogFilters__select_complex {
    width: 240px;
  }
  .FlatCatalogFilters__select_house {
    width: 150px;
  }
  .FlatCatalogFilters__select_type {
    width: 100px;
  }
  .FlatCatalogFilters__select_features {
    width: 240px;
  }
  .FlatCatalogFilters__select_properties {
    width: 200px;
  }
  .FlatCatalogFilters__btns {
    gap: 15px;
  }
  .FlatCatalogFilters__clearFilteres {
    font-size: 14px;
    padding: 8px 5px;
    flex-shrink: 0;
  }
  .FlatCatalogFilters__succsess {
    // flex-shrink: 0;
    font-size: 14px;
    width: 100%;
    padding: 8px 5px;
  }
  .FlatCatalogFilters__href {
    column-gap: 20px;
  }
  .FlatCatalogFilters__hrefH1 {
    font-size: 30px;
  }
  .FlatCatalogFilters__copyBtn {
    font-size: 16px;
  }
  .FlatCatalogFilters__hrefInput {
    font-size: 12px;
  }
}

@media screen and (max-width: 440px) {
  .FlatCatalogFilters__filterList1 {
    justify-content: flex-start;
  }
  .FlatCatalogFilters__select_complex {
    width: 100%;
  }
  .FlatCatalogFilters__select_house {
    width: 50%;
  }
  .FlatCatalogFilters__select_type {
    width: calc(50% - 20px);
  }
  .FlatCatalogFilters__select_features {
    width: 100%;
  }
  .FlatCatalogFilters__select_properties {
    width: 100%;
  }
  .FlatCatalogFilters__clearFilteres {
    width: 100%;
    flex-shrink: 1;
  }

  .FlatCatalogFilters__filterList2 {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .FlatCatalogFilters__input {
    padding: 10px 0px;
    padding-left: 25px;
    padding-right: 10px;

    font-size: 12.5px;
  }

  .FlatCatalogFilters__inputFilteresItem {
    gap: 5px;
  }

  .FlatCatalogFilters__inputP {
    font-size: 12.5px;
  }

  .FlatCatalogFilters__cost {
    width: 100%;
  }

  .FlatCatalogFilters__floor {
    width: 40%;
  }

  .FlatCatalogFilters__square {
    width: 53%;
  }
}
</style>
