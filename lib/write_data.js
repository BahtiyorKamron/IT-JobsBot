const fs = require('fs')
const path = require('path')
module.exports = function writeFile(paz,data){

  fs.writeFileSync(paz,JSON.stringify(data,null,4))
}
