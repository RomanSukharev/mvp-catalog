export default defineEventHandler(async (event) => {
  var config = useRuntimeConfig();
  var requestData = new FormData();

  var body = await readBody(event);

  for (var param in body) requestData.set(param, body[param]);

  var url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.RECAPTCHA_SECRET_KEY}&response=${requestData.get('token')}`

  const response = await $fetch(url, {method: "post"});


  return { success: response?.success && response?.score >= 0.5 };
});
