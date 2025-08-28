<script setup lang="ts">
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";

import type { FlatDetailCardInfoPropsFlatInfo } from "@/components/FlatDetail/FlatDetailCardInfo.vue";

var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

var format_date_fact = computed(() => 
  data_flat_detail.value.fact_date 
    ? data_flat_detail.value.fact_date.split('-').reverse().join('.') 
    : '' 
);

var format_date_ready = computed(() => 
  data_flat_detail.value.ready_date 
    ? data_flat_detail.value.ready_date.split('-').reverse().join('.') 
    : '' 
);

var flat_info: FlatDetailCardInfoPropsFlatInfo[] = [
  {
    title: data_flat_detail.value.complex,
    class: data_flat_detail.value.complex ? "FlatDetailCardInfo__descriptionH5СomplexTitle" : "",
    videos_name: "стройка сегодня",
    videos_link:
      data_flat_detail.value.fact_date ? !(new Date(data_flat_detail.value.fact_date) < new Date())
        ? data_flat_detail.value.dynamics_today
        : "" : data_flat_detail.value.dynamics_today,
    description: [
      {
        title: "Дом",
        value: data_flat_detail.value.house || "",
      },
      {
        title: "Материал стен",
        value: data_flat_detail.value.construction_material || "",
      },
      {
        title: "Дата ввода в эксплуатацию",
        value: format_date_ready.value,
      },
      {
        title: "Фактический ввод в эксплуатацию",
        value: format_date_fact.value || "",
      },
      {
        title: "Этажность",
        value: data_flat_detail.value.entrance_floors,
      },
    ],
  },
  {
    title: `${data_flat_detail.value.type}, ${data_flat_detail.value.declared_square} м²`,
    videos_name: "видеообзор",
    videos_link: data_flat_detail.value.video_review,
    tour3D_name: "3D тур",
    tour3D_link: parsePlanoPlanUrl(data_flat_detail.value.planoplan || data_flat_detail.value.plan_planoplan),
    description: [
      {
        title: "Этаж",
        value: data_flat_detail.value.floor,
      },
      {
        title: "Номер квартиры",
        value: data_flat_detail.value.number,
      },
      {
        title: "Высота потолка, м",
        value: data_flat_detail.value.ceiling_height || "",
      },
      // {
      //   title: "Отделка",
      //   value: data_flat_detail.value.interior || "",
      // },
      // {
      //   title: "Положение окон",
      //   value: data_flat_detail.value.window_placement || "",
      // },
      // {
      //   title: "Вид из окна",
      //   value: data_flat_detail.value.window_view || "",
      // },
    ],
  },
];

flat_info = flat_info.map((item) => ({
  ...item,
  description: item.description.filter((i) => i.value),
}));
</script>

<template>
  <div class="FlatDetailCard">
    <FlatDetailCardGallery />
    <FlatDetailCardInfo :flat_info="flat_info" />
  </div>
</template>

<style lang="scss">
.FlatDetailCard {
  padding: 0px 70px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

@media (max-width: 1170px) {
  .FlatDetailCard {
    padding: 0px 35px;
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .FlatDetailCard {
    padding: 0px 16px;
    gap: 20px;
  }
}
</style>
