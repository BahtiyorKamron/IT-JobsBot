
const Telegram_bot = require('node-telegram-bot-api')
const fetch = require("node-fetch")
const fs = require('fs')
const path = require('path')
const db = require('../util/pg.js')
const create_button = require("../button/button_creater.js")
const program_languages = require("../data/programming_languages")
const yonalishlar = require("../data/yo'nalishlar")
const services = require("../data/services")
const ishKerak = require("../yonalishlar/ish_kerak.js")
const checking_github = require('../check/github_check.js')
const writeFile = require('../lib/write_data.js')
const readFile = require('../lib/read_data.js')
const request = require( 'request' )
const cheerio = require( 'cheerio' )
let texnologiyalar = []
let start = 0
let after_start =0
let after_after_start = 0
let daraja_tanlandi = 0
let github_keldi = 0
let git_succed = 0
let marker = 0
let chek =0
let chek_names = 0
let names = ""
let user_id =""
let sohasi = ""
let level = ""
let tanlangan_daraja = ""
module.exports = class ishKerak {
  static async ishKerakController(message,bot){
    if(message.text=="Ishchi kerak👽‍💻" ){
      marker=1
    }
    if(chek_names){
      user_id=message.from.id
      names=message.text
      create_button("Iltimos telefon raqamingizni kiriting:",message.from.id,[[{text:"Telefon raqam yuborish",request_contact:true}],[{text:"⬅️Bosh sahifaga qaytish⬅️"}]],true)
    }
    let github = message.text.split("https://github.com/")
    if(github[0]!=='' && github_keldi==1 && marker!==1 && chek==0){
      bot.sendMessage(message.from.id,"*Odamni o'ynamasdan github akkountingizni kiriting*😡😡",{parse_mode: 'Markdown'})
    }
    if(github[0]=='' && github_keldi==1 && marker!==1){


      chek=1
      request("https://github.com/"+github[1].split('/')[0],(error, response , html)=>{
        if(!error && response.statusCode==200){
          const $ = cheerio.load(html)
          const Counter = $('.Counter')
          let rep_num = Counter['0'].children[0].data
          if(rep_num>0 && tanlangan_daraja=="Intern"){
            git_succed=1

            create_button("Dasturlash sohasidagi yo'nalishingizni tanlang📂",message.from.id,yonalishlar.yonalishlar)
          }
          if(rep_num>15 && tanlangan_daraja=="Junior" ){
            git_succed=1
            create_button("Dasturlash sohasidagi yo'nalishingizni tanlang📂",message.from.id,yonalishlar.yonalishlar)
          }
          else if(rep_num<15 && tanlangan_daraja=="Junior" ){
            bot.sendMessage(message.from.id,"Sizni githubingizdagi repositorylar soni Junior darajadagi dasturchinikiga mos kelmadi")
          }
          if(rep_num>35 &&  tanlangan_daraja=="Middle"){
            git_succed=1
            create_button("Dasturlash sohasidagi yo'nalishingizni tanlang📂",message.from.id,yonalishlar.yonalishlar)
          }
          else if(rep_num<35 && tanlangan_daraja=="Middle" ){
            bot.sendMessage(message.from.id,"Sizni githubingizdagi repositorylar soni Middle darajadagi dasturchinikiga mos kelmadi")
          }
          if(rep_num>45 &&  tanlangan_daraja=="Senior"){
            git_succed=1
            create_button("Dasturlash sohasidagi yo'nalishingizni tanlang📂",message.from.id,yonalishlar.yonalishlar)
          }
          else if(rep_num<45 && tanlangan_daraja=="Middle" ){
            bot.sendMessage(message.from.id,"Sizni githubingizdagi repositorylar soni Senior darajadagi dasturchinikiga mos kelmadi")
          }
        }
      })
    }
    if(["Junior","Middle","Senior","Intern"].includes(message.text) && marker!==1){
      daraja_tanlandi=1
      tanlangan_daraja= message.text
    }
    if(message.text=='/start'){
      start = 1
      create_button('Salom sizga qanday yordam bera olaman',message.from.id,services,true)
    }
    if(message.text=="Ish kerak🧑🏽‍💻" ){
      create_button("Dasturlash sohasidagi darajangizni tanlang",message.from.id,yonalishlar.daraja,true)
      marker=0
    }
    if(daraja_tanlandi && marker==0 ){
      daraja_tanlandi=0
     bot.sendMessage(message.from.id,"Iltimos github akkountingizni jo'nating\n e.g:https://github.com/Abdulqodir-Tolipov ")
     github_keldi = 1
    }

    if(message.text == "Backend" && git_succed==1 && marker!==1){
      sohasi = message.text
      after_after_start=1
      create_button("Qaysi texnologiyalardan foydalanasiz ",message.from.id,program_languages.backend_programms,false)
    }
    if(message.text == "Frontend" && git_succed==1 && marker!==1 ){
      after_after_start=1
      sohasi = message.text
      create_button("Qaysi texnologiyalardan foydalanasiz ",message.from.id,program_languages.frontend_programs,false)
    }
    if(message.text == "Android" && git_succed==1 && marker!==1){
      after_after_start=1
      sohasi = message.text
      create_button("Qaysi texnologiyalardan foydalanasiz ",message.from.id,program_languages.android_programs,false)
    }
    if(message.text == "IOS" && git_succed==1 && marker!==1){
      after_after_start=1
      sohasi = message.text
      create_button("Qaysi texnologiyalardan foydalanasiz ",message.from.id,program_languages.ios_programs,false)
    }
    if(message.text == "FullStack" && git_succed==1 && marker!==1 ){
      after_after_start=1
      sohasi = message.text
      create_button("Qaysi texnologiyalardan foydalanasiz ",message.from.id,program_languages.fullstack_programs,false)
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
    if(message.text=='✅Confirm✅' && marker!==1){
      let pl = texnologiyalar
      after_after_start=0
      let y = " "
      for (let i in texnologiyalar){
        y +=  texnologiyalar[i] + "  "
      }
      // bot.sendMessage(message.from.id,"Sizning  tanlagan texnologiyalar :  "+y)
      create_button("Ism-familiyangizni kiriting:\n",message.from.id,[[{text:"⬅️Bosh sahifaga qaytish⬅️"}]],true)
      chek_names = 1
      let number = ""
      bot.on('contact', async message=>{
           number =  await message.contact.phone_number
           let programmers = readFile(path.join(process.cwd(),'data_base','programmers.json'))
           let users = {
             "user_id":user_id,
             "Names":names,
             "Sohasi":sohasi,
             "technologies":pl,
             "phone_number":number
           }
           if(!programmers.includes(users)){
             programmers.push(users)
           }
           writeFile(path.join(process.cwd(),'data_base','programmers.json'),programmers)


          bot.sendMessage(message.from.id,`*Sizni e'loningiz joylandi!\nIsm-familiya: ${names}👨‍💻\nSohasi: ${sohasi}📂\nTexnologiyalar: ${y}🛠\nAloqa: +${number}📞\n Quyidagi buyruq bilan o'zingizga kerakli ishlarni ko'rishingiz mumkin : /show_vacancy*
          `,{parse_mode: 'Markdown'})
      chek_names = 0
      user_id=""
      number=""
      })


      texnologiyalar = []
    }
    if(message.text=="⬅️Bosh sahifaga qaytish⬅️"){
      chek_names=0
      names=""
      start = 0
      chek=0
      user_id=""
      tanlangan_daraja=0
      after_start = 0
      after_after_start = 0
      marker=0
      texnologiyalar = []
      create_button('Salom sizga qanday yordam bera olaman',message.from.id,services)
    }
    if(message.text=="❗️Bot haqida ma'lumot❗️"){
      bot.sendMessage(message.from.id,"📊Bu bot sizga 💻IT bozorda ish topishda yoki ITchi topishda yordam beradi.")
    }

  }
}
