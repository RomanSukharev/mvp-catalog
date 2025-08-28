export const getComplexOption = async () => {
  const flat_catalog_store = useFlatCatalogStore();
  const response = await useFetch("/api/complex");

  if (!response.data.value?.payload) {
    return;
  }

  flat_catalog_store.complex_options = response.data.value.payload;
};
