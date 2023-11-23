import mongoose from 'mongoose'
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    name:{type:String, required:true},
    password:{type:String,required:true}
})

userSchema.pre("save", function(next){
    let user = this;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    return next();
})
userSchema.methods.comparePassword = async function(candidatePassword){
    const user = this;
    return bcrypt.compare(candidatePassword,user.password).catch((e)=>false);
}

const UserModel = mongoose.model("User",userSchema)
export default UserModel