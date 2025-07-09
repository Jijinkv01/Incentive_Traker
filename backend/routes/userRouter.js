const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const userAuth = require("../middleware/userAuth")

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/getDepots",userAuth,userController.getDepot)
router.get("/getCompanys",userAuth,userController.getCompanys)
router.post("/addRecord",userAuth,userController.addRecord)
router.get("/getRecords",userAuth,userController.getRecords)


module.exports = router