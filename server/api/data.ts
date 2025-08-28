import { IFlatsList } from "~/types/FlatsListTypes";

export default defineEventHandler(async (event) => {
  var config = useRuntimeConfig();

  const query = getQuery(event);

  const defineType = (val: any) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
  };

  const complex_uid_arr = defineType(query.complexes);
  

  var url_request = `${config.BASE_URL}/api/v1/public/flat-catalog/?complexes=${complex_uid_arr.join(",")}`;

  var response = await fetch(url_request);

  var data = (await response.json()) as IFlatsList;

  return data;
});
