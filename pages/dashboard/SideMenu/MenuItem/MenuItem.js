import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Button } from './styles'

const MenuItem = ({ route, children }) => (
    <Button onClick={() => Router.push(`/dashboard/${route}`)}>
        {children}
    </Button>
)

MenuItem.propTypes = {
    route: PropTypes.string,
    children: PropTypes.node,
}

export default MenuItem
