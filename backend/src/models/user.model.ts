
import mongoose from "mongoose";




const userSchema =new mongoose.Schema({
    email: { type: String, required: true ,unique:true},
    hashedPassword: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String},
    
}, {
    timestamps:true,
});

const User = mongoose.model("Users", userSchema);

export default User;
