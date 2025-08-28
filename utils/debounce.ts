export default (func: (...args: any) => void, ms: number) => {
  let timeout: NodeJS.Timeout

  return function (this: any) {
    clearTimeout(timeout)
    //@ts-ignore
    timeout = setTimeout(() => func.apply(this, arguments), ms)
  }
}
