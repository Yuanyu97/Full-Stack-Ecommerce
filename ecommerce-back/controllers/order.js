const { Order, CartItem } = require('../models/order')
const { errorHandler } = require('../helpers/dbErrorHandler')
const { escapeRegExp } = require('lodash')

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            req.order = order
            next()
        })
}

exports.create = (req, res) => {
    // console.log('CREATE ORDER: ', req.body)
    // prints
    /* CREATE ORDER:  {
       order: {
       products: [ [Object] ],
       transaction_id: 'car0kjs3',
       amount: '324.00'
       }
    }
  */
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', "_id name address")
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(orders)
        })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}

exports.updateOrderStatus = (req, res) => {
    console.log(req)
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(order)
    })
}