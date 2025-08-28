import type { IFlat } from "~/types/FlatsListTypes";
import type { IComplexListTypesItem } from "~/types/ComplexListTypes";
import { getFlatsList } from "~/composables/getFlats";

export const useFlatCatalogStore = defineStore("flat_catalog", () => {
  const router = useRouter();

  const flat_list = ref<IFlat[]>([]);
  const flat_list_filtered = computed(() => {
    let result: IFlat[] | string[] = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return result;
  });

  const defineType = (val: any) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
  };

  // ------------ pagination START -------------------------------
  var page_current = computed<number>({
    get: () => {
      return router.currentRoute.value.query.page_current ? +router.currentRoute.value.query.page_current : 1;
    },
    set: (val: number) => {
      // console.log("worked");

      router.replace({ query: { ...router.currentRoute.value.query, page_current: val } });
    },
  });
  // ------------ pagination END -------------------------------

  // ------------ COMPLEX -------------------------------
  const complex_options = ref<IComplexListTypesItem[]>([]);

  const complex_current = computed<IComplexListTypesItem[]>({
    get: () =>
      <IComplexListTypesItem[]>(
        complex_options.value.filter((i) =>
          defineType(router.currentRoute.value.query.complexes).some((j) => i.value.includes(j))
        )
      ),
    set: (val: IComplexListTypesItem[]) => {
      router.replace({ query: { complexes: val.map((i) => i.value) } });
      ymReachGoal("change_filter_complex");
      flat_list.value = [];
      if (val.length) {
        getFlatsList(val.map((i) => i.value));
      }
    },
  });
  // ------------ COMPLEX END-----------------------------

  // ------------ HOUSE -------------------------------
  const house_options = computed<string[]>(() => {
    let result = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return [...new Set(result.map((i) => i.house))].sort((a, b) => a.localeCompare(b));
  });

  const house_current = computed<string[]>({
    get: () => defineType(router.currentRoute.value.query.houses),
    set: (val: string[]) => {
      // console.log("на перувю страницу");

      router.replace({ query: { ...router.currentRoute.value.query, houses: val, page_current: undefined } });
      ymReachGoal("change_filter_house");
    },
  });
  // ------------ HOUSE END-----------------------------

  // ------------ ARTICLE START-----------------------------
  const article = ref<string | undefined>(router.currentRoute.value.query.article as string);

  // {
  //   get: () => defineType(router.currentRoute.value.query.houses),
  //   set: (val: string[]) => {
  //     router.replace({ query: { ...router.currentRoute.value.query, houses: val } });
  //     ymReachGoal("change_filter_house");
  //   },
  // }
  // ------------ ARTICLE END-----------------------------

  // ------------ TYPE -------------------------------
  const type_options = computed<string[]>(() => {
    let result = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return [...new Set(result.map((i) => i.type))].sort((a, b) => {
      let aType = isNaN(parseInt(a[0])) ? "letter" : "number";
      let bType = isNaN(parseInt(b[0])) ? "letter" : "number";

      // Если типы разные, сравниваем их
      if (aType !== bType) {
        return aType === "letter" ? -1 : 1;
      }

      // Если оба элемента - числа, сортируем их как числа
      if (aType === "number") {
        return parseInt(a) - parseInt(b);
      }

      // Если оба элемента - буквы, сортируем их по алфавиту
      return a.localeCompare(b);
    });
  });

  const type_current = computed<string[]>({
    get: () => defineType(router.currentRoute.value.query.types),
    set: (val: string[]) => {
      router.replace({ query: { ...router.currentRoute.value.query, types: val, page_current: undefined } });
      ymReachGoal("change_filter_type");
    },
  });
  // ------------ TYPE END -------------------------------

  // ------------ Features -------------------------------
  const features_options = computed<string[]>(() => {
    let result = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return [...new Set(result.map((i) => i.features).flat())].sort((a, b) => a.localeCompare(b));
  });

  const features_current = computed<string[]>({
    get: () => defineType(router.currentRoute.value.query.features),
    set: (val: string[]) => {
      router.replace({ query: { ...router.currentRoute.value.query, features: val, page_current: undefined } });
      ymReachGoal("change_filter_features");
    },
  });
  // ------------ Features END -------------------------------

  // ------------ properties -------------------------------
  const properties_options = computed<string[]>(() => {
    var result: IFlat[] = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return [...new Set(result.map((i) => i.properties.map((j) => j.title)).flat())].sort((a, b) => a.localeCompare(b));
  });

  const properties_current = computed<string[]>({
    get: () => defineType(router.currentRoute.value.query.properties),
    set: (val: string[]) => {
      router.replace({ query: { ...router.currentRoute.value.query, properties: val, page_current: undefined } });
      ymReachGoal("change_filter_properties");
    },
  });
  // ------------ properties END -------------------------------

  const closest = (a: any, g: any) => a.reduce((p: any, c: any) => (Math.abs(c - g) < Math.abs(p - g) ? c : p));

  // ------------ COST --------------------------------------
  var result_for_cost = computed<IFlat[]>(() => {
    var result: IFlat[] = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return result;
  });

  const cost_min = computed<string>({
    get: (): string => {
      if (flat_list.value.length) {
        var result_cost_min =
          +(router.currentRoute.value.query.cost_min as string) >=
          Math.min(...result_for_cost.value.map((i) => i.costs[0].cost))
            ? +(router.currentRoute.value.query.cost_min as string)
            : Math.min(...result_for_cost.value.map((i) => i.costs[0].cost));

        return (isFinite(result_cost_min) ? result_cost_min : 0).toLocaleString("ru-RU");
      }

      return "0";
    },
    set: (val: string) => {
      ymReachGoal("change_filter_min-cost");

      var input = document.getElementById("input_cost_min") as HTMLInputElement | any;

      var val_converted = +val.replace(/\s+/g, "");

      var cost_max_converted = +cost_max.value.replace(/\s+/g, "");

      const array_for_min_cost = [
        ...new Set(
          result_for_cost.value
            .filter((item) => item.costs[0].cost <= cost_max_converted)
            .map((item) => item.costs[0].cost)
        ),
      ].sort((a, b) => a - b);

      const closest_in_arr = closest(array_for_min_cost, val_converted);

      if (val_converted >= Math.min(...array_for_min_cost) && val_converted <= cost_max_converted) {
        if (val_converted === Math.min(...array_for_min_cost)) {
          // console.log(1);

          router.replace({
            query: { ...router.currentRoute.value.query, cost_min: undefined, page_current: undefined },
          });
          return;
        }

        if (!array_for_min_cost.filter((item) => item >= val_converted).length) {
          // console.log(2);
          router.replace({
            query: {
              ...router.currentRoute.value.query,
              cost_min: closest_in_arr === Math.min(...array_for_min_cost) ? undefined : closest_in_arr,
              page_current: undefined,
            },
          });
          input.value = closest_in_arr.toLocaleString("ru-RU");
          return;
        }
        // console.log(3, "правильно");
        router.replace({
          query: { ...router.currentRoute.value.query, cost_min: val_converted, page_current: undefined },
        });
      } else {
        if (closest_in_arr === Math.min(...array_for_min_cost)) {
          // console.log(4, "правильно");
          router.replace({ query: { ...router.currentRoute.value.query, cost_min: undefined } });
          input.value = closest_in_arr.toLocaleString("ru-RU");
          return;
        }
        // console.log(5, "правильно");
        router.replace({
          query: { ...router.currentRoute.value.query, cost_min: closest_in_arr, page_current: undefined },
        });
        input.value = closest_in_arr.toLocaleString("ru-RU");
      }
    },
  });

  const cost_max = computed<string>({
    get: () => {
      if (flat_list.value.length) {
        var result_cost_max =
          +(router.currentRoute.value.query.cost_max as string) <=
          Math.max(...result_for_cost.value.map((i) => i.costs[0].cost))
            ? +(router.currentRoute.value.query.cost_max as string)
            : Math.max(...result_for_cost.value.map((i) => i.costs[0].cost));

        return (isFinite(result_cost_max) ? result_cost_max : 0).toLocaleString("ru-RU");
      }
      return "0";
    },
    set: (val: string) => {
      ymReachGoal("change_filter_max-cost");

      var input = document.getElementById("input_cost_max") as HTMLInputElement | any;

      var val_converted = +val.replace(/\s+/g, "");

      var cost_min_converted = +cost_min.value.replace(/\s+/g, "");

      const array_for_max_cost = [
        ...new Set(
          result_for_cost.value
            .filter((item) => item.costs[0].cost >= cost_min_converted)
            .map((item) => item.costs[0].cost)
        ),
      ].sort((a, b) => a - b);

      const closest_in_arr = closest(array_for_max_cost, val_converted);

      if (val_converted <= Math.max(...array_for_max_cost) && val_converted >= cost_min_converted) {
        if (val_converted === Math.max(...array_for_max_cost)) {
          router.replace({
            query: { ...router.currentRoute.value.query, cost_max: undefined, page_current: undefined },
          });
          return;
        }

        if (!array_for_max_cost.filter((item) => item <= val_converted).length) {
          router.replace({
            query: {
              ...router.currentRoute.value.query,
              cost_max: closest_in_arr === Math.max(...array_for_max_cost) ? undefined : closest_in_arr,
              page_current: undefined,
            },
          });
          input.value = closest_in_arr.toLocaleString("ru-RU");
          return;
        }

        router.replace({
          query: { ...router.currentRoute.value.query, cost_max: val_converted, page_current: undefined },
        });
      } else {
        if (closest_in_arr === Math.max(...array_for_max_cost)) {
          router.replace({ query: { ...router.currentRoute.value.query, cost_max: undefined } });
          input.value = closest_in_arr.toLocaleString("ru-RU");
          return;
        }

        router.replace({
          query: { ...router.currentRoute.value.query, cost_max: closest_in_arr, page_current: undefined },
        });
        input.value = closest_in_arr.toLocaleString("ru-RU");
      }
    },
  });
  // ------------ COST end--------------------------------------

  // ------------ Floor -------------------------------------
  var result_for_floor = computed<IFlat[]>(() => {
    var result: IFlat[] = flat_list.value;

    if (router.currentRoute.value.query.square_min) {
      result = result.filter((i) => i.declared_square >= +(router.currentRoute.value.query.square_min as string));
    }

    if (router.currentRoute.value.query.square_max) {
      result = result.filter((i) => i.declared_square <= +(router.currentRoute.value.query.square_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }

    return result;
  });

  const floor_min = computed<number>({
    get: () => {
      if (flat_list.value.length) {
        var result_floor_min =
          +(router.currentRoute.value.query.floor_min as string) >=
          Math.min(...result_for_floor.value.map((i) => i.floor))
            ? +(router.currentRoute.value.query.floor_min as string)
            : Math.min(...result_for_floor.value.map((i) => i.floor));

        return isFinite(result_floor_min) ? result_floor_min : 0;
      }
      return 0;
    },
    set: (val: number) => {
      ymReachGoal("change_filter_min-floor");

      var input = document.getElementById("input_floor_min") as HTMLInputElement | any;

      const array_for_min_floor = [
        ...new Set(result_for_floor.value.filter((item) => item.floor <= floor_max.value).map((item) => item.floor)),
      ].sort((a, b) => a - b);

      const closest_in_arr = closest(array_for_min_floor, val);

      if (val >= Math.min(...array_for_min_floor) && val <= floor_max.value) {
        if (+val === Math.min(...array_for_min_floor)) {
          // console.log(1);
          router.replace({
            query: { ...router.currentRoute.value.query, floor_min: undefined, page_current: undefined },
          });
          return;
        }

        if (!array_for_min_floor.filter((item) => item >= val).length) {
          // console.log(2);

          router.replace({
            query: {
              ...router.currentRoute.value.query,
              floor_min: closest_in_arr === Math.min(...array_for_min_floor) ? undefined : closest_in_arr,
              page_current: undefined,
            },
          });

          input.value = closest_in_arr;
          return;
        }
        // console.log(3);
        router.replace({ query: { ...router.currentRoute.value.query, floor_min: val, page_current: undefined } });
      } else {
        if (closest_in_arr === Math.min(...array_for_min_floor)) {
          // console.log(4);
          router.replace({ query: { ...router.currentRoute.value.query, floor_min: undefined } });
          input.value = closest_in_arr;
          return;
        }
        // console.log(5);
        router.replace({
          query: { ...router.currentRoute.value.query, floor_min: closest_in_arr, page_current: undefined },
        });
        input.value = closest_in_arr;
      }
    },
  });

  const floor_max = computed<number>({
    get: () => {
      if (flat_list.value.length) {
        var result_floor_max =
          +(router.currentRoute.value.query.floor_max as string) <=
          Math.max(...result_for_floor.value.map((i) => i.floor))
            ? +(router.currentRoute.value.query.floor_max as string)
            : Math.max(...result_for_floor.value.map((i) => i.floor));

        return isFinite(result_floor_max) ? result_floor_max : 0;
      }
      return 0;
    },
    set: (val: number) => {
      ymReachGoal("change_filter_max-floor");

      var input = document.getElementById("input_floor_max") as HTMLInputElement | any;

      const array_for_max_floor = [
        ...new Set(result_for_floor.value.filter((item) => item.floor >= floor_min.value).map((item) => item.floor)),
      ].sort((a, b) => a - b);

      const closest_in_arr = closest(array_for_max_floor, val);

      if (val <= Math.max(...array_for_max_floor) && val >= floor_min.value) {
        if (+val === Math.max(...array_for_max_floor)) {
          router.replace({
            query: { ...router.currentRoute.value.query, floor_max: undefined, page_current: undefined },
          });
          return;
        }

        if (!array_for_max_floor.filter((item) => item <= val).length) {
          router.replace({
            query: {
              ...router.currentRoute.value.query,
              floor_max: closest_in_arr === Math.max(...array_for_max_floor) ? undefined : closest_in_arr,
              page_current: undefined,
            },
          });
          input.value = closest_in_arr;
          return;
        }
        router.replace({ query: { ...router.currentRoute.value.query, floor_max: val, page_current: undefined } });
      } else {
        if (closest_in_arr === Math.max(...array_for_max_floor)) {
          router.replace({ query: { ...router.currentRoute.value.query, floor_max: undefined } });
          input.value = closest_in_arr;
          return;
        }
        router.replace({
          query: { ...router.currentRoute.value.query, floor_max: closest_in_arr, page_current: undefined },
        });
        input.value = closest_in_arr;
      }
    },
  });
  // ------------ Floor END -------------------------------

  // ------------ square -------------------------------------
  var result_for_square = computed<IFlat[]>(() => {
    var result: IFlat[] = flat_list.value;

    if (router.currentRoute.value.query.floor_min) {
      result = result.filter((i) => i.floor >= +(router.currentRoute.value.query.floor_min as string));
    }

    if (router.currentRoute.value.query.floor_max) {
      result = result.filter((i) => i.floor <= +(router.currentRoute.value.query.floor_max as string));
    }

    if (router.currentRoute.value.query.cost_min) {
      result = result.filter((i) => i.costs[0].cost >= +(router.currentRoute.value.query.cost_min as string));
    }

    if (router.currentRoute.value.query.cost_max) {
      result = result.filter((i) => i.costs[0].cost <= +(router.currentRoute.value.query.cost_max as string));
    }

    if (router.currentRoute.value.query.houses?.length) {
      result = result.filter((i) => house_current.value.includes(i.house));
    }

    if (router.currentRoute.value.query.features?.length) {
      result = result.filter((i) => features_current.value.some((j) => i.features.includes(j as never)));
    }

    if (router.currentRoute.value.query.types?.length) {
      result = result.filter((i) => type_current.value.includes(i.type));
    }

    if (router.currentRoute.value.query.properties?.length) {
      result = result.filter((i) =>
        properties_current.value.some((j) => i.properties.map((item) => item.title).includes(j))
      );
    }

    if (router.currentRoute.value.query.article) {
      result = result.filter((i) => i.article === article.value);
    }
    return result;
  });

  const square_min = computed<number>({
    get: () => {
      if (flat_list.value.length) {
        var result_square_min =
          +(router.currentRoute.value.query.square_min as string) >=
          Math.min(...result_for_square.value.map((i) => i.declared_square))
            ? +(router.currentRoute.value.query.square_min as string)
            : Math.min(...result_for_square.value.map((i) => i.declared_square));

        return isFinite(result_square_min) ? Math.floor(result_square_min) : 0;
      }
      return 0;
    },
    set: (val: number) => {
      ymReachGoal("change_filter_min-square");

      var input = document.getElementById("input_square_min") as HTMLInputElement | any;

      const array_for_min_square = [
        ...new Set(
          result_for_square.value
            .filter((item) => item.declared_square <= square_max.value)
            .map((item) => item.declared_square)
        ),
      ].sort((a, b) => a - b);

      const closest_in_arr = closest(array_for_min_square, val);

      if (val >= Math.floor(Math.min(...array_for_min_square)) && val <= square_max.value) {
        if (+val === Math.floor(Math.min(...array_for_min_square))) {
          router.replace({
            query: { ...router.currentRoute.value.query, square_min: undefined, page_current: undefined },
          });
          return;
        }

        if (!array_for_min_square.filter((item) => item >= val).length) {
          router.replace({
            query: {
              ...router.currentRoute.value.query,
              square_min:
                Math.floor(closest_in_arr) === Math.floor(Math.min(...array_for_min_square))
                  ? undefined
                  : Math.floor(closest_in_arr),
              page_current: undefined,
            },
          });

          input.value = Math.floor(closest_in_arr);
          return;
        }

        router.replace({ query: { ...router.currentRoute.value.query, square_min: val, page_current: undefined } });
      } else {
        if (Math.floor(closest_in_arr) === Math.floor(Math.min(...array_for_min_square))) {
          router.replace({ query: { ...router.currentRoute.value.query, square_min: undefined } });
          input.value = Math.floor(closest_in_arr);
          return;
        }
        router.replace({
          query: {
            ...router.currentRoute.value.query,
            square_min: Math.floor(closest_in_arr),
            page_current: undefined,
          },
        });
        input.value = Math.floor(closest_in_arr);
      }
    },
  });

  const square_max = computed<number>({
    get: () => {
      if (flat_list.value.length) {
        var result_square_max =
          +(router.currentRoute.value.query.square_max as string) <=
          Math.max(...result_for_square.value.map((i) => i.declared_square))
            ? +(router.currentRoute.value.query.square_max as string)
            : Math.max(...result_for_square.value.map((i) => i.declared_square));

        return isFinite(result_square_max) ? Math.ceil(result_square_max) : 0;
      }
      return 0;
    },
    set: (val: number) => {
      ymReachGoal("change_filter_max-square");

      var input = document.getElementById("input_square_max") as HTMLInputElement | any;

      const array_for_max_square = [
        ...new Set(
          result_for_square.value
            .filter((item) => item.declared_square >= square_min.value)
            .map((item) => item.declared_square)
        ),
      ].sort((a, b) => a - b);

      const closest_in_arr = closest(array_for_max_square, val);

      if (val <= Math.ceil(Math.max(...array_for_max_square)) && val >= square_min.value) {
        if (+val === Math.ceil(Math.max(...array_for_max_square))) {
          router.replace({
            query: { ...router.currentRoute.value.query, square_max: undefined, page_current: undefined },
          });
          return;
        }

        if (!array_for_max_square.filter((item) => item <= val).length) {
          router.replace({
            query: {
              ...router.currentRoute.value.query,
              square_max:
                Math.ceil(closest_in_arr) === Math.ceil(Math.max(...array_for_max_square))
                  ? undefined
                  : Math.ceil(closest_in_arr),
              page_current: undefined,
            },
          });
          input.value = Math.ceil(closest_in_arr);
          return;
        }

        router.replace({ query: { ...router.currentRoute.value.query, square_max: val, page_current: undefined } });
      } else {
        if (Math.ceil(closest_in_arr) === Math.ceil(Math.max(...array_for_max_square))) {
          router.replace({ query: { ...router.currentRoute.value.query, square_max: undefined } });
          input.value = Math.ceil(closest_in_arr);
          return;
        }
        router.replace({
          query: { ...router.currentRoute.value.query, square_max: Math.ceil(closest_in_arr), page_current: undefined },
        });
        input.value = Math.ceil(closest_in_arr);
      }
    },
  });
  // ------------ square END -------------------------------

  return {
    complex_options,
    complex_current,
    flat_list,
    house_options,
    house_current,
    flat_list_filtered,
    type_options,
    type_current,
    features_options,
    features_current,
    properties_options,
    properties_current,
    cost_min,
    cost_max,
    result_for_cost,
    floor_min,
    floor_max,
    result_for_floor,
    square_min,
    square_max,
    result_for_square,
    page_current,
    // floor_min_test,
  };
});
