var express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')

const app = express()
const port = process.env.PORT || 8888

app.use(express.json()) // express có thể đọc hiểu đc cái data mà client gửi lên dạng json
app.use(express.urlencoded({extended : true})) // đọc đc data gửi kiểu array, obj, urlencoded(extended giúp đọc nhiều hơn)

dbConnect()

initRoutes(app)

app.listen(port, () => {
    console.log('Server running on port: ' + port);
})