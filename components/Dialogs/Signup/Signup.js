import React, { Component } from 'react'
import PropTypes from 'prop-types'
import platform from 'platform'
import Router from 'next/router'
import { gql, graphql } from 'react-apollo'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import { hasStorage } from 'common/featureTests'
import { getDeviceType } from 'common/helpers'
import AccountInfo from './AccountInfo'
import BillingInfo from './BillingInfo'

class SignUp extends Component {
    state = {
        accountInfo: {},
        page: 1,
    }

    nextPage = accountInfo => this.setState({ page: this.state.page + 1, accountInfo })

    handleSignup = (card) => {
        const { createUser } = this.props
        const { accountInfo } = this.state

        const name = 'Mark'
        const type = 'trial'
        const location = (hasStorage && localStorage.getItem('location'))
            ? JSON.parse(localStorage.getItem('location')) : {}
        const device = {
            os: platform.os.family,
            product: platform.product,
            browser: platform.name,
            type: getDeviceType(),
        }

        // TODO handle stripe subscription

        createUser({ variables: {
            email: accountInfo.email,
            password: accountInfo.password,
            address: {
                country: accountInfo.country,
                city: accountInfo.city,
                postalCode: accountInfo.postalCode,
                address: accountInfo.address,
            },
            name,
            type,
            location,
            device,
        } })
            .then(() => Router.push('/dashboard/portfolio'))
            .catch(e => console.error(e))
        console.log(card)
    }

    render() {
        if (typeof window === 'undefined') { return null }
        const { page } = this.state
        const { ...other } = this.props
        delete other.createUser

        return (
            <Dialog {...other} transition={Slide}>
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
  mutation (
      $email: String!,
      $password: String!,
      $name: String!
      $type: String!
      $location: Json!
      $device: Json!
  ) {
    createUser(authProvider: {
        email: {
            email: $email,
            password: $password,
        }
    },
    name: $name,
    type: $type,
    location: $location,
    device: $device,
    ) { id }
  }
`

export default graphql(createUser, { name: 'createUser' })(SignUp)
