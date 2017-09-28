import React from 'react'
import PropTypes from 'prop-types'
import Dashboard from '../'

const Admin = ({ children }) => (
    <Dashboard>
        { children }
    </Dashboard>
)

Admin.propTypes = {
    children: PropTypes.node,
}

export default Admin
