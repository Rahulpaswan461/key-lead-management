const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name :{
        type: String,
        requied: true,
    },
    role: {
        type: String,
        enum:["Owner","Manager"],
        default:""
    },
    phone:{
       type: String,
       required: true,
    }
},{timestamps: true})

const Contact = mongoose.model("contact",contactSchema)

module.exports = Contact