const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    "Product Id": {
        type: String
        
    },
    DESCRIPTION: {
        type: String
        
    },
    CD: {
        type:  String
        
    },
    SD: {
        type:  String
        
    },
    VAT: {
        type:  String
        
    },
    RD: {
        type:  String
        
    }
})

module.exports = mongoose.model('Product', productSchema)