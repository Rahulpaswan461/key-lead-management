const mongoose = require("mongoose")

const interactionSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: true
    },
    interactionDate :{
        type: Date,
        default: Date.now
    },
    interactionType: {
        type: String,
        enum: ["Call", "Order", "Meeting"],
        default: ""
    },
    notes: {
        type: String,
        default: ""
    }
},{timestamps: true})

const Interaction = mongoose.model("interaction",interactionSchema)

module.exports = Interaction