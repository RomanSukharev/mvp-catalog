export default (url: string | null): string[] | null => {
  if (!url?.length) {
    return null;
  }

  var uid = url?.split(",").map((item) => item.split("/")[3].replaceAll(" ", ""));

  if (!uid) {
    return null;
  }
  return uid;
};
