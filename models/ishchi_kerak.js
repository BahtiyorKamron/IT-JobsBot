
const Telegram_bot = require('node-telegram-bot-api')
const fetch = require("node-fetch")
const db = require('../util/pg.js')
const create_button = require("../button/button_creater.js")
const program_languages = require("../data/programming_languages")
const yonalishlar = require("../data/yo'nalishlar")
const services = require("../data/services")
const ishKerak = require("../yonalishlar/ish_kerak.js")
const checking_github = require('../check/github_check.js')
const request = require( 'request' )
const cheerio = require( 'cheerio' )
let texnologiyalar = []
let start = 0
let after_start =0
let after_after_start = 0
let daraja_tanlandi = 0
let github_keldi = 0
let git_succed = 0
let marker =0
let tanlangan_daraja = ""
let chek_names=0
let chek_where = 0
let user_id = ""
let company = ""
let names = ""
let soha = ""
module.exports = class ishKerak {
  static async ishchi_kerak(message,bot){
    if(message.text=="Ishchi kerak👽‍💻" ){
      create_button("Siz qanday darajadagi dasturchini qidiryapsiz?",message.from.id,yonalishlar.daraja,true)
      marker=1
    }
    if(message.text=="Ish kerak🧑🏽‍💻" ){
      marker=0
    }
    if(chek_names){
      user_id=message.from.id
      names=message.text
      // create_button("Iltimos telefon raqamingizni kiriting:",message.from.id,[[{text:"Telefon raqam yuborish",request_contact:true}],[{text:"⬅️Bosh sahifaga qaytish⬅️"}]],true)
      create_button("Companiya yoki idora nomini kiriting:\n",message.from.id,[[{text:"⬅️Bosh sahifaga qaytish⬅️"}]],true)
      chek_where = 1
    }
    if(chek_where){
      chek_names=0
      company = message.text
      create_button("Iltimos telefon raqamingizni kiriting:",message.from.id,[[{text:"Telefon raqam yuborish",request_contact:true}],[{text:"⬅️Bosh sahifaga qaytish⬅️"}]],true)
      chek_where=0
    }
    if(["Junior","Middle","Senior","Intern"].includes(message.text) && marker==1){
      tanlangan_daraja= message.text
      create_button("Qaysi yo'nalishdagi dasturchini qidiryapsiz?",message.from.id,yonalishlar.yonalishlar)
    }
    if(message.text == "Backend" && marker==1 ){
      soha = message.text
      after_after_start=1
      create_button("Qaysi texnologiyalarni bilishni talab qilasiz? ",message.from.id,program_languages.backend_programms,false)
    }
    if(message.text == "Frontend" && marker==1 ){
      soha = message.text
      after_after_start=1
      create_button("Qaysi texnologiyalarni bilishni talab qilasiz? ",message.from.id,program_languages.frontend_programs,false)
    }
    if(message.text == "Android" && marker==1){
      soha = message.text
      after_after_start=1
      create_button("Qaysi texnologiyalarni bilishni talab qilasiz?",message.from.id,program_languages.android_programs,false)
    }
    if(message.text == "IOS" && marker==1 ){
      soha = message.text
      after_after_start=1
      create_button("Qaysi texnologiyalarni bilishni talab qilasiz?",message.from.id,program_languages.ios_programs,false)
    }
    if(message.text == "FullStack" && marker==1 ){
      soha = message.text
      after_after_start=1
      create_button("Qaysi texnologiyalarni bilishni talab qilasiz?",message.from.id,program_languages.fullstack_programs,false)
    }
    if(after_after_start==1 &&
      (program_languages.programs.includes(message.text) ||
       program_languages.frontend.includes(message.text) ||
       program_languages.android.includes(message.text)) ||
       program_languages.ios.includes(message.text) ){
      if(!texnologiyalar.includes(message.text)){
        texnologiyalar.push(message.text)
      }
    }
    if(message.text=='✅Confirm✅' && marker==1){
      let pl = texnologiyalar
      after_after_start=0
      let y = " "
      for (let i in texnologiyalar){
        y +=  texnologiyalar[i] + "  "
      }
      bot.sendMessage(message.from.id,"Siz qidirayotgan dasturchi bilishi kerak bo'lgan texnologiyalar :  "+y)
      create_button("Ism-familiyangizni kiriting:\n",message.from.id,[[{text:"⬅️Bosh sahifaga qaytish⬅️"}]],true)
      chek_names=1

      let number = ""
      bot.on('contact', async message=>{
           number =  await message.contact.phone_number
           let jobs = readFile(path.join(process.cwd(),'data_base','vacansy.json'))
           let users = {
             "user_id":user_id,
             "Idora":company,
             "Names":names,
             "Sohasi":soha,
             "technologies":pl,
             "phone_number":number
           }
           if(!jobs.includes(users)){
             jobs.push(users)
           }
           writeFile(path.join(process.cwd(),'data_base','vacansy.json'),jobs)


          bot.sendMessage(message.from.id,`*Sizni e'loningiz joylandi!\nIsm-familiya: 🏢Idora: ${company}\n${names}👨‍💻\nSohasi: ${soha}📂\nTexnologiyalar: ${y}🛠\nAloqa: +${number}📞\n Quyidagi buyruq bilan o'zingizga kerakli dasturchilarni topishingiz mumkin : /show_programmers*
          `,{parse_mode: 'Markdown'})
      chek_names = 0
      names = ""
      user_id=""
      number=""
      soha = ""
      company = ""
      })
      texnologiyalar = []
    }

}
}
