import type { IFlatDetail } from "~/types/FlatsListTypes";

export default defineEventHandler(async (event) => {
  var config = useRuntimeConfig();

  const query = getQuery(event);

  const flat_uid = query.flat_uid;

  var url_request = `${config.BASE_URL}/api/v1/public/flats/${flat_uid}`;
  
  var response = await fetch(url_request);

  var data = (await response.json()) as IFlatDetail;

  return data;
});
