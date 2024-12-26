const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["New","In Progress","Closed"],
        default: "New"
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "contact",
    }],
    assignedKAM: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KAM",
        requied: true
    },
    callFrequency: {
        type: Number,
        required: true,
        default: 7,
    },
    lastCalled: {
         type: Date,
         default: Date.now()
    }
    
},{timestamps: true})

const Restaurant  = mongoose.model("restaurant", restaurantSchema)

module.exports = Restaurant
