const { default: mongoose } = require('mongoose')

// Hàm kết nối với mongodb
const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        // Check xem ở trạng thái sẵn sàng hay chưa
        if(connect.connection.readyState === 1) console.log('DB is connecting successfully!')
        else console.log('DB connecting');   

    } catch (error) {
        console.log('DB Connection failed');
        throw new Error(error) // Code mình đang có lỗi và dừng tại đây
    }
} 

module.exports = dbConnect