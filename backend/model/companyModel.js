const mongoose = require("mongoose")


const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

companySchema.index({ name: 1, user: 1 }, { unique: true });

const Company = mongoose.model("Company", companySchema)
module.exports = Company