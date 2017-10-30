import React from 'react'
import Router from 'next/router'
import Button from 'material-ui/Button'

const BackButton = () => (
    <Button color="primary" onClick={() => Router.push('/dashboard/articles')}>
        <i className="fa fa-angle-left fa-2x" style={{ marginRight: '8px' }} />Articles
    </Button>
)

export default BackButton
