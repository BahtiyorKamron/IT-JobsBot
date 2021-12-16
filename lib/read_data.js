const fs = require('fs')
const path = require('path')
module.exports = function readFile(paz){

let data =   fs.readFileSync(paz,"utf8")
if(!data.length){
  return []
}
data = JSON.parse(data)
return data
}
