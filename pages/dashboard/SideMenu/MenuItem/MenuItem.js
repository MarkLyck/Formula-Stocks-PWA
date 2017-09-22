import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Button } from './styles'

const MenuItem = ({ icon, route, isActive, children }) => {
    if (typeof window !== 'undefined' && Router.router && route) {
        Router.prefetch(`/dashboard/${route}`)
    }

    return (
        <Button onClick={() => Router.push(`/dashboard/${route}`)} data-isActive={isActive}>
            <i className={`fa fa-${icon}`} />
            {children}
        </Button>
    )
}

MenuItem.propTypes = {
    icon: PropTypes.string,
    route: PropTypes.string,
    children: PropTypes.node,
    isActive: PropTypes.bool,
}

export default MenuItem
