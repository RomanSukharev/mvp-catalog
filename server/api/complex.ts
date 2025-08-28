import { IComplexListTypes } from "~/types/ComplexListTypes";


export default defineEventHandler(async (event) => {
  var config = useRuntimeConfig();
  
  var url_request = `${config.BASE_URL}/api/v1/public/refs/complexes`;
  

  var respone = await fetch(url_request);
  var complex = (await respone.json()) as IComplexListTypes;

  return complex;
});