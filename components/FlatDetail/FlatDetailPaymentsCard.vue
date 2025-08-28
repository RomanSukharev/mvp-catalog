<script setup lang="ts">
import type { IFlatPayments } from "~/types/FlatsListTypes";

export interface IFlatDetailPaymentsCard {
  card_payments: IFlatPayments;
  cost: number;
}

var props = defineProps<IFlatDetailPaymentsCard>();

var initial_fee_percent = ((props.card_payments.initial_fee / props.cost) * 100).toFixed(1);

const declension = (number: number, titles: string[]) =>
  titles[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]];

var str_year = computed(() => declension(props.card_payments.sub_period / 12, ["год", "года", "лет"]));
</script>

<template>
  <div class="FlatDetailPaymentsCard">
    <div class="FlatDetailPaymentsCard__Header">
      <h5 class="FlatDetailPaymentsCard__H5">
        {{ card_payments.mortgage_name }}
      </h5>
      <p class="FlatDetailPaymentsCard__Period" v-if="card_payments.mortgage_type === 'Субсидия'">
        Субсидия на
        {{ card_payments.sub_period ? `${card_payments.sub_period / 12} ${str_year}` : "весь срок" }}
      </p>

      <p class="FlatDetailPaymentsCard__Period" v-else>Платеж на весь срок</p>
    </div>

    <div v-if="card_payments.subsidized_payment" class="FlatDetailPaymentsCard__PaymentSub">
      <div class="FlatDetailPaymentsCard__Payment">
        <p class="FlatDetailPaymentsCard__PaymentCost FlatDetailPaymentsCard__PaymentCostSubsidized">
          от {{ card_payments.subsidized_payment.toLocaleString("fr") }} ₽/мес
        </p>
        <p class="FlatDetailPaymentsCard__PaymentP">Платеж первые {{ card_payments.sub_period / 12 }} {{ str_year }}</p>
      </div>

      <img class="FlatDetailPaymentsCard__PaymentImg" src="/icons/arrow_for_cost_sub.svg" alt="" srcset="" />
      <div class="FlatDetailPaymentsCard__Payment">
        <p class="FlatDetailPaymentsCard__PaymentCost">от {{ card_payments.min_payment.toLocaleString("fr") }} ₽/мес</p>
        <p class="FlatDetailPaymentsCard__PaymentP">Платеж с {{ card_payments.sub_period / 12 + 1 }}-го года</p>
      </div>
    </div>

    <div class="FlatDetailPaymentsCard__Payment" v-else>
      <p class="FlatDetailPaymentsCard__PaymentCost">от {{ card_payments.min_payment.toLocaleString("fr") }} ₽/мес</p>
      <p class="FlatDetailPaymentsCard__PaymentP">Платеж на весь срок</p>
    </div>

    <div class="FlatDetailPaymentsCard__Condition">
      <p class="FlatDetailPaymentsCard__ConditionP" v-if="card_payments.sub_rate">
        Ставка в первые {{ card_payments.sub_period / 12 }} {{ str_year }} — от {{ card_payments.sub_rate }}%
      </p>

      <p class="FlatDetailPaymentsCard__ConditionP" v-if="card_payments.sub_period">
        Ставка {{ card_payments.sub_rate ? `c ${card_payments.sub_period / 12 + 1}-года` : "" }} — от
        {{ card_payments.base_rate }}%
      </p>

      <p class="FlatDetailPaymentsCard__ConditionP" v-else>
        Ставка — от
        {{ card_payments.base_rate }}%
      </p>

      <p class="FlatDetailPaymentsCard__ConditionP">
        Первый взнос — от {{ card_payments.initial_fee.toLocaleString("fr") }} ₽ ({{ initial_fee_percent }}%)
      </p>

      <p class="FlatDetailPaymentsCard__ConditionP">Срок — до {{ card_payments.max_mortgage_term / 12 }} лет</p>
    </div>
  </div>
</template>

<style lang="scss">
.FlatDetailPaymentsCard {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  border: 1px solid #dfe6ec;
  border-radius: 12px;
  flex-shrink: 0;
}
.FlatDetailPaymentsCard__Header {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #dfe6ec;
  padding-bottom: 20px;
}

.FlatDetailPaymentsCard__H5 {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
  margin-bottom: 8px;
}

.FlatDetailPaymentsCard__Period {
  color: #1a1a1a;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.FlatDetailPaymentsCard__PaymentSub {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
}

.FlatDetailPaymentsCard__Payment {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.FlatDetailPaymentsCard__PaymentCost {
  color: #212529;
  font-family: "TT Norms Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px; /* 144.444% */

  &Subsidized {
    color: #ec3a39;
  }
}

.FlatDetailPaymentsCard__PaymentP {
  color: #969696;
  font-family: "TT Norms Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.FlatDetailPaymentsCard__Condition {
  display: grid;
  gap: 5px;
}

.FlatDetailPaymentsCard__ConditionP {
  color: #212529;
  font-family: "TT Norms Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

@media (max-width: 640px) {
  .FlatDetailPaymentsCard {
    padding: 15px;
    gap: 15px;
  }

  .FlatDetailPaymentsCard__PaymentSub {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .FlatDetailPaymentsCard__H5 {
    font-size: 18px;
  }

  .FlatDetailPaymentsCard__Period {
    font-size: 14px;
  }

  .FlatDetailPaymentsCard__PaymentCost {
    font-size: 14px;
  }

  .FlatDetailPaymentsCard__PaymentImg {
    display: none;
  }

  .FlatDetailPaymentsCard__ConditionP {
    font-size: 14px;
  }
}
</style>
