<script setup lang="ts">
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";

var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

var complex_img:string = data_flat_detail.value?.complex_media.filter((item) => item.type === "genplan")[0]?.files[0]?.file;

var map_objects:number[] = data_flat_detail.value.map_objects;

var tab = ref(complex_img ? "Cvartal" : "City");

</script>

<template>
  <div class="FlatDetailLocation" v-if="map_objects || complex_img">
    <h4 class="FlatDetailLocation__h4">Расположение</h4>

    <q-tabs
      v-model="tab"
      @update:model-value="ymReachGoal('change_tab-location_detail-card')"
      active-color="black"
      class="text-grey q-mb-lg FlatDetailLocation__tabs"
      indicator-color="red-12"
    >
      <q-tab v-if="complex_img" name="Cvartal" label="Квартал"></q-tab>
      <q-tab v-if="map_objects" name="City" label="Город"></q-tab>
    </q-tabs>

    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade"
        transition-duration="500"
        class="text-black text-center"
      >
        <q-tab-panel name="Cvartal">
          <InfrastructureImg :complex_img="complex_img"/>
        </q-tab-panel>

        <q-tab-panel name="City">
          <div class="FlatDetailLocation__InfrastructureMap">
            <InfrastructureMap :map_objects="map_objects"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<style lang="scss">
.FlatDetailLocation {
  // margin-top: 80px;
  padding: 0px 70px;
}
.FlatDetailLocation__h4 {
  color: #1a1a1a;

  font-family: "TT Norms Pro";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;

  margin-bottom: 40px;
}

.FlatDetailLocation__tabs {
  width: fit-content;
  margin-bottom: 40px;
}

.FlatDetailLocation__InfrastructureMap {
  height: 845px;
  // padding: 0 var(--global_padding_content);
  position: relative;
}

.q-tab-panel {
  padding: 0 !important;
}

@media (max-width: 1170px) {
  .FlatDetailLocation {
    padding: 0px 35px;
  }
  .FlatDetailLocation__InfrastructureMap {
    height: 700px;
  }
}

@media (max-width: 740px) {
  .FlatDetailLocation__InfrastructureMap {
    height: 500px;
  }
}

@media (max-width: 640px) {
  .FlatDetailLocation {
    // margin-top: 64px;
    padding: 0px 16px;
  }
  .FlatDetailLocation__InfrastructureMap {
    height: 375px;
  }

  .FlatDetailLocation__h4 {
    margin-bottom: 30px;
    font-size: 24px;
  }
}
</style>
