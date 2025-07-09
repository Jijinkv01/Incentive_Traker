const mongoose = require("mongoose")

const depotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Depot = mongoose.model("Depot", depotSchema)
module.exports = Depot