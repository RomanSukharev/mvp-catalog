export const getFlatsList = async (val: string[]) => {
  const flat_catalog_store = useFlatCatalogStore();
  var is_app_loading = useState<boolean>("is_app_loading", () => false); //prettier-ignore

  try {
    is_app_loading.value = true;

    const response = await $fetch("/api/data", {
      query: { complexes: val },
    });

    if (!response.payload) {
      return;
    }
    is_app_loading.value = false;
    flat_catalog_store.flat_list = response.payload;
  } catch (error) {
    throw showError({ statusCode: 500 });
  } finally {
    is_app_loading.value = false;
  }
};
