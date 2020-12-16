const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //any space at start or end will be removed
        required: true,
        maxLength: 32
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxLength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category', //refer to category model
        required: true
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);