const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { createTokenForAuthenticateUser } = require("../service/jwtAuth");

const KAMSchemaInformation = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})

KAMSchemaInformation.pre("save",async function(next){
    const user = this;
    if(!user.isModified("password")) return next()
    
    try{
      const salt = await bcrypt.genSalt(10)

      const hashedPassword = await bcrypt.hash(user.password,salt)

      user.password = hashedPassword

      next()
    }
    catch(error){
       return next(error)
    }

})

KAMSchemaInformation.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email})
   
    if(!user) throw new Error("Invalid username or password!!")

    const isMatch = await bcrypt.compare(password,user.password)

    if(isMatch){
       const token = createTokenForAuthenticateUser(user)
       return token;
    }
    else{
       throw new Error("Invalid username or password")
    }
})

const KAMSchema = mongoose.model("KAM",KAMSchemaInformation)

module.exports = KAMSchema