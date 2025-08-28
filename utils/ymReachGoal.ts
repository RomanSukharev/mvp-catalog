// @ts-nocheck
export default (target: string, ...args: any) => {
    var config = useRuntimeConfig();
  
    if (window.ym) {
      window.ym(config.public.YM_COUNTER_ID, "reachGoal", target, ...args);
    }
  };
  