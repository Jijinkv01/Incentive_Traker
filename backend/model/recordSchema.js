const mongoose = require("mongoose")

const recordScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    depotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Depot",
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    outletName: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    billAmount: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    calculatedAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Paid",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    remark: {
        type: String
    }
}, { timestamps: true })


const Record = mongoose.model("record", recordScheme)
module.exports = Record