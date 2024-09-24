const router = require('express').Router()
const ctrls =  require('../controllers/user')
// Định nghĩa API
// Đăng kí gửi trong body ko gửi trong param hay query vì bị lộ có tài khoản email, method post, put
router.post('/register', ctrls.register )// import thành công nó sẽ gợi ý hàm đã viết ở file đó

module.exports = router

// CRUD = CREATE - READ - UPDATE - DELETE | POST - GET - PUT - DELETE