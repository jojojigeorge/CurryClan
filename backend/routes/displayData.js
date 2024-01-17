const express = require('express')
const router = express.Router()
const { body, query, validationResult } = require('express-validator')

const userModel = require('../models/userModel')

//url=>api/displaydata
router.get('/', (req, res) => {
    try {
        res.send([global.foodCategory,global.foodItems])
    } catch (error) {
        console.error(error.message)
        res.send('server error')
    }    
    });
module.exports=router