const mongoose = require('mongoose')
const { NODE_ENV, DATABASE_URI, DATABASE_URI_TEST } = process.env

const connectDB = async () => {
    
    let connectionString = DATABASE_URI

    if (NODE_ENV === 'test') connectionString = DATABASE_URI_TEST


    try {
        await mongoose.connect(connectionString)
    } catch (err) {
        console.error(err);
    }
    
}

module.exports = connectDB