const fetch = require("node-fetch")
const TOKEN = `5024114076:AAH39Nly9smty3buItKYQsjmTZI3fKj866w`

module.exports = async (text,id,keyboard,hide_keyboard)=>{
  let res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      chat_id:id,
      text:text,
      reply_markup:{
        one_time_keyboard:hide_keyboard,
        resize_keyboard:true,
        keyboard:keyboard

      }
    })
  })

}
