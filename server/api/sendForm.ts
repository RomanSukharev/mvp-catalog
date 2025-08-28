export default defineEventHandler(async (event) => {

    // console.log(22222);
    
    var body = await readBody(event)
  
    var requestData = new FormData()
    for (var param in body) {
      requestData.set(param, body[param])
    }
  
    var cookies = parseCookies(event)
     
    // console.log("отправка заявки");
    
  
    var cookie_string = ''
    for (var key in cookies) {
      cookie_string += key + '=' + cookies[key] + ';'
    }
  
    requestData.set('COOKIES', cookie_string)
  
    await fetch('https://api.lead-router.72dom.online/api/v1/connector/catalogdom/ce70a1e4-59b1-4f8e-800e-e68f8626444f', {
      method: 'post',
      body: requestData,
    })
    return { response: 'success' }
  })
  