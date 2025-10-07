const mongoose = require('mongoose')
const { NODE_ENV, DATABASE_URI, DATABASE_URI_TEST } = process.env
 
// let connectionString = NODE_ENV === 'development' ?
//     DATABASE_URI_TEST : DATABASE_URI
let connectionString = DATABASE_URI

const connectDB = async () => {

    try {
        // await mongoose.connect('mongodb://192.168.56.111:27017/test')
        // await mongoose.connect('mongodb://127.0.0.1:27017/jest?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8')
        await mongoose.connect(connectionString)
    } catch (err) {
        console.error(err);
    }
    
}

module.exports = connectDB