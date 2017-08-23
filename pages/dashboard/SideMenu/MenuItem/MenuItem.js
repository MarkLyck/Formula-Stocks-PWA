import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

const MenuItem = ({ route, children }) => (
    <button onClick={() => Router.push(`/dashboard/${route}`)}>
        {children}
    </button>
)

MenuItem.propTypes = {
    route: PropTypes.string,
    children: PropTypes.node,
}

export default MenuItem
