const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
// Mỗi một tên là một cái key value so sánh qua mysql nó sẽ là 1 cột và định dạng của cột đó, là một collection
// Định nghĩa những thông tin mà người dùng cần có
// Bắt buộc định nghĩa dạng gì
// Một mảng chứa objectid
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { // User sẽ có quyền gì, admin có quyền gì
        type: String,
        default: 'user',
    },
    cart: { // giỏ hàng
        type: Array,
        default: [] // chứa những từ món hàng
    },
    // Lưu id của address
    address: [{ type: mongoose.Types.ObjectId, ref: 'Address' }], // mysql khóa phụ, là cái quan hệ: lưu id của bảng address
    wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Product' }], // lưu id của bảng product

    // Có khóa thằng này hay ko: bị khóa tài khoản
    isBlocked: {
        type: Boolean,
        default: false // Mặc định không bị khóa
    },
    refreshToken: {
        type: String,
    },

    // Quên mật khẩu, reset mk
    passwordChangedAt: {
        type: String
    },

    // Gửi cho họ 1 đoạn token để gửi qua mail, đúng mail thì cho phép họ lấy mk
    passwordResetToken: {
        type: String
    },

    // Token mình gửi cho họ có hiệu lực tạm thời, nó sẽ hết hạn
    passwordResetExpires: {
        type: String
    }
}, {
    timestamps: true // Thời gian chạy theo kiểu timestamps: Kiểu dữ liệu TIMESTAMP kết hợp cả ngày tháng và thời gian. Nó đại diện cho một điểm trong thời gian cụ thể và được biểu diễn dưới dạng 'YYYY-MM-DD HH:MM:SS'. Ví dụ: Lưu trữ ngày và giờ ghi nhận một giao dịch ngân hàng: '2024-04-08 15:45:23'
});

// Thay vì pass là 123456, thì trước khi lưu thì bỏ vào đây lấy muối băm ra thành một chuỗi kí tự dài thòng lòng và lưu vào biến password trước dấu bằng(trước khi lưu vào csdl)
// Ko áp dụng cho hàm update dữ liệu, ko có trigger ko kích hoạt đoạn code này
userSchema.pre('save', async function(next) {  
    // Thay đổi password nó sẽ trả về true và chạy dòng dưới để hash còn ngược lại ko 
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Export the model
module.exports = mongoose.model('User', userSchema);