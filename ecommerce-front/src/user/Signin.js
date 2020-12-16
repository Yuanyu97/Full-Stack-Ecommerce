import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'

const Signin = () => {
    const [values, setValues] = useState({
        email: 'freddy1997@gmail.com',
        password: 'freddy1997',
        error: '',
        loading: false,
        redirectToReferrer: false,
    })

    const { email, password, error, loading, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        return signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true,
                        })
                    })
                }
            })
    }

    const signInForm = (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type='email' className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type='password' className="form-control" />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    )

    const showError = (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    )

    const redirectUser = redirectToReferrer ? user && user.role === 1 ? <Redirect to="/admin/dashboard" /> : <Redirect to="/user/dashboard" /> : isAuthenticated() ? <Redirect to='/' /> : null
    return (
        <Layout title="Signin" description="Sign in to Node React E-Commernce App" className="container col-md-8 offset-md-2">
            {showLoading}
            {showError}
            {signInForm}
            {redirectUser}
        </Layout>
    )
}

export default Signin