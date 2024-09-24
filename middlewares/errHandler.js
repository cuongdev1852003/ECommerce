// Khi người dùng nhập vào 1 đường link api ko định nghĩa thì báo lỗi ko tìm thấy
const notFound = (req, res, next) => {
    // API người dùng gọi lên
    const error = new Error(`Route ${req.originalUrl} not found!`)
    // Đưa lỗi này tới Client
    res.status(404)
    // Bê error tới hàm tiếp theo
    next(error)
}

// Hàm xử lý lỗi chính  
const errHandler = (error, req, res, next) => {
    // Chứng tỏ là lỗi của db, sửa thành 500 là lỗi của server còn ko thì giữ nguyên statusCode cho nó
    // Khi lỗi là 404 thì sẽ trả về statusCode là 404
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false, 
        mes: err?.message
    })
}

module.exports = {
    notFound,
    errHandler
}