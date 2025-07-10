const mongoose = require("mongoose")

const depotSchema = new mongoose.Schema({
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

depotSchema.index({ name: 1, user: 1 }, { unique: true });

const Depot = mongoose.model("Depot", depotSchema)
module.exports = Depot