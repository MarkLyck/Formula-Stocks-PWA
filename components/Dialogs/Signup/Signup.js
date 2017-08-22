import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import AccountInfo from './AccountInfo'
import BillingInfo from './BillingInfo'

class SignUp extends Component {
    state = {
        accountInfo: {},
        billingInfo: {},
        page: 1,
    }

    handleRequestClose = () => this.props.onRequestClose()
    nextPage = accountInfo => this.setState({ page: this.state.page + 1, accountInfo })

    handleSignup = (card) => {
        console.log(this.state.accountInfo)
        console.log(card)
    }

    render() {
        console.log(this.props)
        if (typeof window === 'undefined') { return null }
        const { page } = this.state
        const { createUser, ...other } = this.props

        const email = 'test@test.com'
        const password = 'pass'
        const name = 'Mark'
        createUser({ variables: { email, password, name } })
        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other} transition={Slide}>
                <DialogTitle>Sign up</DialogTitle>
                { page === 1 && <AccountInfo nextPage={this.nextPage} /> }
                { page === 2 && <BillingInfo handleSignup={this.handleSignup} /> }
            </Dialog>
        )
    }
}

SignUp.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    createUser: PropTypes.func,
}

const createUser = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    createUser(authProvider: { email: { email: $email, password: $password } }, name: $name) {
      id
    }
  }
`

export default graphql(createUser, { name: 'createUser' })(SignUp)
