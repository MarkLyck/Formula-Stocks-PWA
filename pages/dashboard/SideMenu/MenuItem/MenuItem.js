import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Button } from './styles'

class MenuItem extends Component {
    state = { isActive: false }

    componentDidMount() {
        const { route, isActive } = this.props
        if (isActive) { this.isActive() }

        if (typeof window !== 'undefined' && Router.router && route) {
            Router.prefetch(`/dashboard/${route}`)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isActive) {
            this.isActive()
        } else {
            this.setState({ isActive: false })
        }
        return nextProps
    }

    isActive = () => this.setState({ isActive: true })

    clickHandler = () => {
        const { route, setActiveRoute } = this.props
        if (route === 'logout') {
            Router.push('/')
            return
        }
        setActiveRoute(this.props.route)
        Router.push(`/dashboard/${this.props.route}`)
    }

    render() {
        const { icon, children } = this.props
        const { isActive } = this.state

        return (
            <Button onClick={this.clickHandler} className={isActive ? 'is-active' : ''}>
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
    setActiveRoute: PropTypes.func,
}

export default MenuItem
