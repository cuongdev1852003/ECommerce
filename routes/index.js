// File routes có nhiều đối tượng khác như User, blog, coupon,.....
// Dùng trong file index này nó lớn hơn
// Nhờ thế mà mes trả về ngắn hơn và lỗi đọc là hiểu

const userRouter = require('./user')
const {notFound, errHandler} = require('../middlewares/errHandler')

const initRoutes = (app) => {
    // trường hợp chạy hàm này có lỗi trong controllers thì nó sẽ chạy thẳng xuống dưới notFound
    app.use('/api/user', userRouter)


    // Ko tìm thấy link api nào thì nó sẽ chạy hàm notFound này nó sẽ next(error) và vào hàm errHandler
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes