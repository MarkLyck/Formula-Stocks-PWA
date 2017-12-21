import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Router from 'next/router'

class AdminButtons extends Component {
    state = { activeButton: 'panel' }

    componentDidMount() {
        const { route } = this.props
        Router.prefetch('/dashboard/admin/panel')
        Router.prefetch('/dashboard/admin/users')
        Router.prefetch('/dashboard/admin/api')
        Router.prefetch('/dashboard/admin/articles')
        // eslint-disable-next-line
        this.setState({ activeButton: route.split('/')[route.split('/').length - 1] })
    }

    navigateTo = (route) => {
        this.setState({ activeButton: route.split('/')[route.split('/').length - 1] })
        Router.push(route)
    }

    render() {
        const { activeButton } = this.state

        return (
            <div key="admin-buttons">
                <Button
                    color="primary"
                    raised={activeButton === 'panel' || activeButton === 'admin'}
                    onClick={() => this.navigateTo('/dashboard/admin/panel')}
                >
                    Panel
                </Button>
                <Button
                    color="primary"
                    raised={activeButton === 'users'}
                    onClick={() => this.navigateTo('/dashboard/admin/users')}
                >
                    Users
                </Button>
                <Button
                    color="primary"
                    raised={activeButton === 'api'}
                    onClick={() => this.navigateTo('/dashboard/admin/api')}
                >
                    API
                </Button>
                <Button
                    color="primary"
                    raised={activeButton === 'newArticle'}
                    onClick={() => this.navigateTo('/dashboard/admin/newArticle')}
                >
                    New Article
                </Button>
            </div>
        )
    }
}

AdminButtons.propTypes = {
    route: PropTypes.string,
}

export default AdminButtons
