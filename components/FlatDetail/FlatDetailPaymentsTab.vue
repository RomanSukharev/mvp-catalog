<script setup lang="ts">
import type { IFlatDetailInfo } from "~/types/FlatsListTypes";
import type { IPopupFormProps } from "@/components/PopupForm.vue";
import type { IFlatCost } from "~/types/FlatsListTypes";

export interface IFlatDetailPaymentsTab {
  tab_item: IFlatCost;
}

var props = defineProps<IFlatDetailPaymentsTab>();

var popup_form_props = useState<IPopupFormProps | null>("popup_form_props", () => null); //prettier-ignore
var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

const btn_text = computed(() => {
  return data_flat_detail.value.status === "Бронь" ? "Встать в очередь" : "Забронировать";
});

const clickBtnPayments = () => {
  ymReachGoal("open_detail-card_cost_order");
  popup_form_props.value = {
    data: {
      text_header: `${btn_text.value}`,
      text_content:
        "Укажите имя и телефон, мы перезвоним и ответим на ваши вопросы о квартале. Не будем беспокоить вас пустыми звонками, покупка квартиры — только ваше решение.",
      text_btn: `${btn_text.value}`,
      lead_title: `${btn_text.value} (из цен) - ${data_flat_detail.value.complex}, ${data_flat_detail.value.house}, квартира №${data_flat_detail.value.number} (ЗпКВ)`,
      cbSuccessFetch() {
        ymReachGoal("send_detail-card_cost_order");
      },
    },
  };
};

var sorted_payments = computed(() => {
  return [...props.tab_item.payments].sort((a, b) => {
    var c = a.min_payment;
    var d = b.min_payment;

    if (a.subsidized_payment && a.subsidized_payment < a.min_payment) {
      c = a.subsidized_payment;
    }

    if (b.subsidized_payment && b.subsidized_payment < b.min_payment) {
      d = b.subsidized_payment;
    }
    return c - d;
  });
});
</script>

<template>
  <div class="FlatDetailPayments__Header">
    <div class="FlatDetailPayments__Cost">
      <h4 class="FlatDetailPayments__CostH4">{{ tab_item.cost.toLocaleString("fr") }} ₽</h4>
      <div class="FlatDetailPayments__CostBonus" v-if="tab_item.title === 'Цена по программе Еще бонус'">
        <p class="FlatDetailPayments__CostBonusP">{{ tab_item.bonus_count?.toLocaleString("fr") }} бонусов</p>
        <!-- <div class="FlatDetailPayments__CostBonusTooltip">
          <img class="FlatDetailPayments__CostBonusTooltipImg" src="/icons/bonus_toolpit.svg" alt="" />
          <q-tooltip
            class="FlatDetailPayments__CostBonusTooltipContent"
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 17]"
          >
            <div>
              Программа Еще бонус <br />
              не&nbsp;суммируется с&nbsp;субсидированной ипотекой
            </div>
          </q-tooltip>
        </div> -->
      </div>
    </div>
    <q-btn class="FlatDetailPayments__btn FlatDetailPayments__btnDesctop" @click="clickBtnPayments" color="red-12">{{
      btn_text
    }}</q-btn>
  </div>
  <div class="FlatDetailPayments__Cards" v-grabscroll>
    <FlatDetailPaymentsCard
      v-for="card_payments in sorted_payments"
      :cost="tab_item.cost"
      :card_payments="card_payments"
    />
  </div>
  <q-btn class="FlatDetailPayments__btn FlatDetailPayments__btnMobile" @click="clickBtnPayments" color="red-12">{{
    btn_text
  }}</q-btn>
</template>

<style lang="scss">
.FlatDetailPayments__Header {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
}
.FlatDetailPayments__Cost {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.FlatDetailPayments__CostH4 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 112.5% */
}

.FlatDetailPayments__CostBonus {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 5px;
  border: 1px solid #7a3cff30;
  background: linear-gradient(99deg, rgba(122, 60, 255, 0.1) 0%, rgba(142, 89, 255, 0.1) 100%);
}


.FlatDetailPayments__CostBonusP {
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 20.8px */
  background: linear-gradient(99deg, #7a3cff 0%, #8e59ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
}
.FlatDetailPayments__CostBonusTooltip {
  height: 16px;
  cursor: pointer;
}

.FlatDetailPayments__CostBonusTooltipImg {
  width: 100%;
  height: 16px;
  pointer-events: none;
}

.FlatDetailPayments__CostBonusTooltipContent {
  background-color: white;
  box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 30%);
  color: #1a1a1a;
  padding: 16px;
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 166%; /* 19.92px */
}

.FlatDetailPayments__btn {
  width: fit-content;
  padding: 15px 24px 16px 24px;

  color: #fff;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  &Mobile {
    display: none;
  }
}

.FlatDetailPayments__Cards {
  display: flex;
  gap: 40px;
  width: 100%;

  overflow: auto;
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 740px) {
  .FlatDetailPayments__btn {
    &Desctop {
      display: none;
    }
    &Mobile {
      display: block;
      width: 100%;
    }
  }
}

@media (max-width: 640px) {
  .FlatDetailPayments__CostH4 {
    font-size: 28px;
  }

  .FlatDetailPayments__CostBonus {
    padding: 4px 8px;
  }

  .FlatDetailPayments__CostBonusP {
    font-size: 13px;
  }

  .FlatDetailPayments__CostBonusTooltipContent {
    padding: 7px;
    font-size: 10px;
    line-height: 130%; /* 19.92px */
    width: 240px;
  }

  .FlatDetailPayments__Cards {
    gap: 16px;
  }
}
</style>
