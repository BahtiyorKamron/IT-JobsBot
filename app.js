const TOKEN = `5024114076:AAH39Nly9smty3buItKYQsjmTZI3fKj866`
const Telegram_bot = require('node-telegram-bot-api')
const fetch = require("node-fetch")
const db = require('./util/pg.js')
const create_button = require("./button/button_creater.js")
const program_languages = require("./data/programming_languages")
const yonalishlar = require("./data/yo'nalishlar")
const services = require("./data/services")
const ishKerak = require("./yonalishlar/ish_kerak.js")
const checking_github = require('./check/github_check.js')
const request = require( 'request' )
const cheerio = require( 'cheerio' )
const need_job = require('./models/ish_kerak.js')
const need_programmer = require('./models/ishchi_kerak.js')
const show_vacancy = require('./models/vakansiya_qidirish.js')
const options = {
  polling:true
}
const bot = new Telegram_bot(TOKEN,options)


bot.on('text', (message)=>{
    need_programmer.ishchi_kerak(message,bot)
    need_job.ishKerakController(message,bot)
    show_vacancy.vacancy_search(message,bot)
})
// bot.on('contact',message=>{
//   console.log(message.contact.phone_number)
//   phone_number.push(message.contact.phone_number)
//
// })

// let obj = {
//  get backend (){
//     console.log('huy');
//   }
// }
// obj.backend



// const insert = `
//  insert into users(username) values($1)
//  returning *;
// `
// const getUser = `select * from users;`
// const insertUser = async (username)=>{
//   let user = await db(false,insert,username)
//
// }
// const users = async ()=>{
//   let users = await db(false,getUser)
//   users = await users
//   return users
// }
