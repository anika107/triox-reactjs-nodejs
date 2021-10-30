const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async(req,res) =>{
    try{
        const products = await Product.find().exec()
        res.json(products)

    }catch(err){
        res.send('Error ' + err)
    }
})

module.exports = router