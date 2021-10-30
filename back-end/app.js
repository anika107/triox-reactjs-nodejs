const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/product'
const productRouter = require('./routes/product')

app = express()
app.use(express.json())
app.use('/product', productRouter)
mongoose.connect(url, {useNewUrlParser: true})
    .then (() =>{
        console.log('Connected to MongoDB!')
    } )
    .catch(err => console.error('Error ', err));

app.listen(5000, () =>{
    console.log('Server started 5000....')
})