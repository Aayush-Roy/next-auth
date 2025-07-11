import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:String,
    verifyToken:String,
    verifyTokenExpiry:String,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;