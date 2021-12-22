require("dotenv").config()
const moongose = require("mongoose");

const db = moongose.connection

db.once("open",()=>{
    console.log("Database bağlantısı başarılı :)")

})

const connectDB = async () =>{
    try {
        const con = await moongose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
        
    } 
      
    catch (error) {
        console.log(error);
        process.exit(1)
        
        
    }
}

module.exports = {
    connectDB,
}

