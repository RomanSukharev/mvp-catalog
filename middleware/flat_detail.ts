import type { IFlatDetailInfo } from "~/types/FlatsListTypes";

export default defineNuxtRouteMiddleware(async (to, from) => {
  var data_flat_detail = useState<IFlatDetailInfo>("data_flat_detail"); //prettier-ignore

  if (process.client) {
    if (to.fullPath !== from.fullPath) {
      localStorage.setItem("link_back",from.fullPath)
    }
    
  }

  try {
    // is_app_loading.value = true;
    const response = await $fetch("/api/flat_detail", {
      query: { flat_uid: to.params.uid },
    });

    if (!response.payload) {
      return;
    }
    // is_app_loading.value = false;
    data_flat_detail.value = response.payload as IFlatDetailInfo;
  } catch (error) {
    throw showError({ statusCode: 500 });
  } finally {
    // is_app_loading.value = false;
  }

  // console.log(localStorage);
});
