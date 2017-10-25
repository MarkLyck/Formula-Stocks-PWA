import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Dashboard from '../'
import { MyAccountContainer } from './styles'

class Account extends Component {
    render() {
        const { User } = this.props
        return (
            <Dashboard>
                <MyAccountContainer>
                    <h4>My Account</h4>
                    <Paper style={{ padding: '16px' }}>
                        <h4 className="user-info">{User.name}</h4>
                        <h4 className="user-info">{User.email}</h4>
                        <h4 className="user-info user-plan">{User.plan} Model</h4>
                    </Paper>
                </MyAccountContainer>
                <Button raised style={{ margin: '0 auto', display: 'block' }}>
                    Cancel subscription
                </Button>
            </Dashboard>
        )
    }
}

const AccountQuery = gql`
  query {
    User(id: "cj84k0ja70pxx0197tfzbuge0") {
      email,
      name,
      plan,
      type
    },
  }
`

Account.propTypes = {
    User: PropTypes.object,
}

export default graphql(AccountQuery, {
    props: ({ data }) => ({ ...data }),
})(Account)
