import mongoose from 'mongoose'

function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("db connected");
    }catch(err){
        console.log("error in db connection", err.message);
    }
}


export default connectDB;