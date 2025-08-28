<script lang="ts" setup>
import { getComplexOption } from "~/composables/getComplex";

const flat_catalog_store = useFlatCatalogStore();
const router = useRouter();

const defineType = (val: any) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
};

const perem = defineType(router.currentRoute.value.query.complexes);

getComplexOption();
if (perem.length) {
  getFlatsList(perem);
}
</script>

<template>
  <div class="PageIndex">
    <FlatCatalog v-if="flat_catalog_store.complex_options.length" />
  </div>
</template>
