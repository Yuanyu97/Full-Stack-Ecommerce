import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from '../admin/apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructure user and token from localstorage

    const { user, token } = isAuthenticated()

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const showSuccess = (
        success ? (
            <h3 className='text-success'>
                {name} is created
            </h3>
        ) : null
    )

    const showError = (
        error ? (
            <h3 className='text-danger'>
                Category should be unique
            </h3>
        ) : null
    )

    const goBack = (
        <div className='mt-5'>
            <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>
        </div>
    )

    const newCategoryForm = (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type='text' className='form-control' onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className='btn btn-outline-primary'>
                Create Category
            </button>
        </form>
    )

    return (
        <Layout title="Add a new category" description={`Good day ${user.name}, ready to add new category?`}>
            <div className="row">
                <div className="col-8 offset-md-2">
                    {showSuccess}
                    {showError}
                    {newCategoryForm}
                    {goBack}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory