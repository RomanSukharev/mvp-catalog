<script setup lang="ts">
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";
// import type { IPopupFormProps } from "@/components/PopupForm.vue";

// var popup_form_props = useState<IPopupFormProps | null>("popup_form_props", () => null); //prettier-ignore
var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

// var test_arr_for_cost = data_flat_detail.value.costs.filter(
//   (item) => item.title === "Цена ВТБ/Альфа" || item.title === "Цена на сайте" || item.title === "Цена сотрудника" || item.title === "Цена РОПа" 
// );
var tab = ref(data_flat_detail.value.costs[0].title);
</script>

<template>
  <section class="FlatDetailPayments">
    <q-tabs
      v-model="tab"
      @update:model-value="ymReachGoal('change_tab-cost_detail-card')"
      active-color="black"
      class="text-grey q-mb-lg"
      content-class="FlatDetailPayments__Tabs"
      indicator-color="red-12"
      mobile-arrows
      outside-arrows
    >
      <q-tab v-for="item in data_flat_detail.costs" :name="item.title" :label="item.title"></q-tab>
    </q-tabs>

    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade"
        transition-duration="200"
        class="text-black"
      >
        <q-tab-panel v-for="item in data_flat_detail.costs" :name="item.title" class="FlatDetailPayments__TabPanel">
          <FlatDetailPaymentsTab :tab_item="item" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </section>
</template>

<style lang="scss">
.FlatDetailPayments {
  padding: 0 70px;
}
.FlatDetailPayments__Tabs {
  display: flex;
  justify-content: flex-start;
}
.FlatDetailPayments__TabPanel {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  height: fit-content !important;
  gap: 32px;
  margin-top: 32px;
}

.scroll{
  overflow-y: hidden;
}

@media (max-width: 1170px) {
  .FlatDetailPayments {
    padding: 0 35px;
  }
}

@media (max-width: 640px) {
  .FlatDetailPayments {
    padding: 0 16px;
  }
}
</style>
