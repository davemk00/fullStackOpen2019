require('dotenv').config()

let PORT = process.env.PORT || 3002
let MONGODB_URI = process.env.MONGODB_URI
 
module.exports = {
  MONGODB_URI,
  PORT
}