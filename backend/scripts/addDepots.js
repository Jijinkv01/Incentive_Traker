const mongoose = require("mongoose");
const Depot = require("../model/depotModel")
const dotenv = require("dotenv")
dotenv.config()

const userId = "686f7752770d3d4edaaf290d"
 
const userDepotList = [
  "Kasargod",
  "Kanhangad",
  "Thaliparamba",
  "Kannur",
  "Thalassery",
  "Mananthavadi",
  "Bathery",
  "Kalpetta"
];


mongoose.connect(process.env.MONGO_URI).then(async () => {
  const result = await Depot.insertMany(
    userDepotList.map(name => ({ name, user: userId }))
  );
  console.log("Depots added:", result);
  mongoose.disconnect();
});




// node scripts/addDepots.js