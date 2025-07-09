const mongoose = require("mongoose")
const User = require("../model/userModel")
const Depot = require("../model/depotModel")
const Record = require("../model/recordSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Company = require("../model/companyModel")

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SCRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log("username & password", username, password)
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and Password are required" })
        }
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()
        return res.status(201).json({ success: true, message: "User registered successfully" })


    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password" })
        }
        const token = generateToken(user._id)
        res.status(200).json({
            success: true, message: "Login Successfull", user: {
                token,
                username: user.username,
                id: user._id,
            },
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

const getDepot = async (req, res) => {
    try {
        const depots = await Depot.find()
        res.status(200).json({ success: true, depots });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

const getCompanys = async (req, res) => {
    try {
        const companys = await Company.find()
        res.status(200).json({ success: true, companys });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

const addRecord = async (req, res) => {
    try {
        const userId = req.user.userId
        const {
            depotId, companyId, outletName, managerName, billAmount, percentage, calculatedAmount, remark, date } = req.body;
        const newRecord = new Record({ userId, depotId, companyId, outletName, managerName, billAmount, percentage, calculatedAmount, remark, date, })

        await newRecord.save()
        res.status(201).json({ success: true, message: "Record added successfully" });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

const getRecords = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = "" } = req.query;
        const skip = (page - 1) * limit;
         const lower = search.toLowerCase();

        const allRecords = await Record.find()
            .populate("depotId", "name")
            .populate("companyId", "name");

        // Manual filtering for populated fields
        const filtered = allRecords.filter((record) => {
            return (
                record.depotId?.name.toLowerCase().startsWith(lower) ||
                record.companyId?.name.toLowerCase().startsWith(lower) ||
                record.outletName?.toLowerCase().startsWith(lower) ||
                record.managerName?.toLowerCase().startsWith(lower)
            );
        });

        const paginated = filtered.slice(skip, skip + Number(limit));
        const totalPages = Math.ceil(filtered.length / limit);

        res.status(200).json({
            success: true,
            records: paginated,
            totalPages,
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}


module.exports = {
    register,
    login,
    getDepot,
    getCompanys,
    addRecord,
    getRecords

}