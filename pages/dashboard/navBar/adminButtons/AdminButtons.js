import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Router from 'next/router'

const AdminButtons = ({ route }) => {
    Router.prefetch('/dashboard/admin/panel')
    Router.prefetch('/dashboard/admin/users')
    Router.prefetch('/dashboard/admin/api')
    Router.prefetch('/dashboard/admin/articles')

    return (
        <div key="admin-buttons">
            <Button
                color="primary"
                raised={route.indexOf('panel') !== -1 || route === '/dashboard/admin'}
                onClick={() => Router.push('/dashboard/admin/panel')}
            >
                Panel
            </Button>
            <Button
                color="primary"
                raised={route.indexOf('users') !== -1}
                onClick={() => Router.push('/dashboard/admin/users')}
            >
                Users
            </Button>
            <Button
                color="primary"
                raised={route.indexOf('api') !== -1}
                onClick={() => Router.push('/dashboard/admin/api')}
            >
                API
            </Button>
            <Button
                color="primary"
                raised={route.indexOf('newArticle') !== -1}
                onClick={() => Router.push('/dashboard/admin/newArticle')}
            >
                New Article
            </Button>
        </div>
    )
}

AdminButtons.propTypes = {
    route: PropTypes.string,
}

export default AdminButtons
