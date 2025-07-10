const mongoose = require("mongoose");
const Company = require("../model/companyModel")
const dotenv = require("dotenv")
dotenv.config()

const userId = "686f7752770d3d4edaaf290d"
 
const userCompanyList = [
  "Raidco Foods",
  "Ansar Pavan",
  "Apple Ziya",
  "Saico Foods"
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const result = await Company.insertMany(
    userCompanyList.map(name => ({ name, user: userId }))
  );
  console.log("Company added:", result);
  mongoose.disconnect();
});




// node scripts/addCompany.js