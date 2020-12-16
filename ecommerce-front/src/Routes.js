import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard'
import Profile from './user/Profile'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Orders from './admin/Orders'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/shop' exact component={Shop}></Route>
                <Route path='/signin' exact component={Signin}></Route>
                <Route path='/signup' exact component={Signup}></Route>
                <Route path='/product/:productId' exact component={Product}></Route>
                <Route path='/cart' exact component={Cart}></Route>
                <PrivateRoute exact path='/user/dashboard'><Dashboard /></PrivateRoute>
                <PrivateRoute exact path='/profile/:userId' component={Profile}></PrivateRoute>
                <AdminRoute exact path='/admin/dashboard'><AdminDashboard /></AdminRoute>
                <AdminRoute exact path='/create/category'><AddCategory /></AdminRoute>
                <AdminRoute exact path='/create/product'><AddProduct /></AdminRoute>
                <AdminRoute exact path='/admin/orders'><Orders /></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes