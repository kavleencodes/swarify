import mongoose from "mongoose"
import {DB_NAME} from "../../constants.js"

const connectDB=async()=>{
    try {
        const connectioninst =await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)


        console.log(`/n MONOGODB CONNECTED!!!  ${connectioninst.connection.host}`);
        
    } catch (error) {
        console.log("monogodb connection error !!!",error)
        process.exit(1)
        
    }

}
export default connectDB
