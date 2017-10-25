import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Button } from './styles'

class MenuItem extends Component {
    state = { isActive: false }

    componentDidMount() {
        const { route, isActive } = this.props
        if (isActive) {
            this.isActive()
        }
        if (typeof window !== 'undefined' && Router.router && route) {
            Router.prefetch(`/dashboard/${route}`)
        }
    }

    isActive = () => {
        this.setState({ isActive: true })
    }

    render() {
        const { icon, route, children } = this.props
        const { isActive } = this.state

        return (
            <Button onClick={() => Router.push(`/dashboard/${route}`)} className={isActive ? 'is-active' : ''}>
                <i className={`fa fa-${icon}`} />
                {children}
            </Button>
        )
    }
}

MenuItem.propTypes = {
    icon: PropTypes.string,
    route: PropTypes.string,
    children: PropTypes.node,
    isActive: PropTypes.bool,
}

export default MenuItem
