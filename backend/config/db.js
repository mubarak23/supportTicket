const mongoose = require('mongoose')

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongdb Connected: ${conn.connection.host}`.cyan.underline )
  }catch(err){
    console.log(`Error: ${err.message}`.red.underline)
    process.exit(1)
  }
}

module.exports = connectDB