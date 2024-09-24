const User = require('../models/user'); // import model vào
const asyncHandler = require('express-async-handler')

// Hàm asyncHandler nó sẽ bắt lỗi giúp mình
const register = asyncHandler(async (req, res) => {
    const {email, password, firstname, lastname} = req.body
    // Ko nhập 1 trong những cái này
    if(!email || !password || !firstname || !lastname) 
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    const response = await User.create(req.body) // object có 4 trường này, tạo ở User một hàng này
    return res.status(200).json({
        success: response ? true : false,
        response
    })

})

module.exports = {
    register
}