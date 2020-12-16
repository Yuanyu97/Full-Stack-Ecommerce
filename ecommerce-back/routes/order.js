const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js')
const { userById, addOrderToUserHistory } = require('../controllers/user')
const { create, listOrders, getStatusValues, updateOrderStatus, orderById } = require('../controllers/order')
const { decreaseQuantity } = require('../controllers/product')
const { orderBy } = require('lodash')

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create)

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders)
router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues)
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus)

// The parameters of router.param() are name and a function. Where name is the actual name of parameter and function is the callback function. Basically router.param() function triggers the callback function whenever user routes to the parameter. This callback function will be called for only single time in request response cycle, even if user routes to the parameter multiple times
router.param("userId", userById)
router.param("orderId", orderById)



module.exports = router