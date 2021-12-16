
const Telegram_bot = require('node-telegram-bot-api')
const fetch = require("node-fetch")
const fs = require('fs')
const path = require('path')
const db = require('../util/pg.js')
const create_button = require("../button/button_creater.js")
const program_languages = require("../data/programming_languages")
const yonalishlar = require("../data/yo'nalishlar")
const services = require("../data/services")
const writeFile = require('../lib/write_data.js')
const readFile = require('../lib/read_data.js')
let marker = 0
module.exports = class Vacancy {
  static async vacancy_search(message,bot){

       if(message.text=='/show_vacancy'){
         services[1][1]={text:"Vakansiyalar"}
         create_button("Endi siz pastdagi Vakansiyalar bo'lini bosishingiz  bilan sizga mos yangi ishlar kelib turadi ",message.from.id,services,true)
         let dasturchilar = readFile(path.join(process.cwd(),'data_base','programmers.json'))
         let isHeThere = dasturchilar.find(d => d.user_id==message.from.id )
         let moslari = []
         if(isHeThere){
           let ishlar = readFile(path.join(process.cwd(),'data_base','vacansy.json'))
           for(let i of ishlar){
             for(let j of i.technologies){
               if(isHeThere.technologies.includes(j) && !moslari.includes(i)){
                 moslari.push(i)
                 bot.sendMessage(message.from.id,`*🏢Idora: ${i.Idora}\n👨🏻Ish beruvchi: ${i.Ishberuvchi}\n☎️Aloqa uchun: ${i.Aloqa}\n🛠Texnologiyalar: ${i.technologies}\n💵Ish haqi: ${i.haqi}\n📍Hudud: ${i.Hudud}*`,{parse_mode: 'Markdown'})
               }
             }
           }
         }
         marker=1
       }
       if(message.text == "Vakansiyalar" && marker==1){
         let dasturchilar = readFile(path.join(process.cwd(),'data_base','programmers.json'))
         let isHeThere = dasturchilar.find(d => d.user_id==message.from.id )
         let moslari = []
         if(isHeThere){
           let ishlar = readFile(path.join(process.cwd(),'data_base','vacansy.json'))
           for(let i of ishlar){
             for(let j of i.technologies){
               if(isHeThere.technologies.includes(j) && !moslari.includes(i)){
                 moslari.push(i)
                 bot.sendMessage(message.from.id,`*🏢Idora: ${i.Idora}\n👨🏻Ish beruvchi: ${i.Ishberuvchi}\n☎️Aloqa uchun: ${i.Aloqa}\n🛠Texnologiyalar: ${i.technologies}\n💵Ish haqi: ${i.haqi}\n📍Hudud: ${i.Hudud}*`,{parse_mode: 'Markdown'})
               }
             }
           }
         }
       }
  }
}
