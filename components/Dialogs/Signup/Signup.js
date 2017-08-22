import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import AccountInfo from './AccountInfo'
import BillingInfo from './BillingInfo'

class SignUp extends Component {
    state = {
        accountInfo: {},
        billingInfo: {},
        page: 2,
    }

    handleRequestClose = () => this.props.onRequestClose()
    nextPage = accountInfo => this.setState({ page: this.state.page + 1, accountInfo })

    signUp = (card) => {
        console.log(this.state.accountInfo)
        console.log(card)
    }

    render() {
        console.log(this.props)
        if (typeof window === 'undefined') { return null }
        const { page } = this.state
        const { ...other } = this.props

        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other} transition={Slide}>
                <DialogTitle>Sign up</DialogTitle>
                { page === 1 && <AccountInfo nextPage={this.nextPage} /> }
                { page === 2 && <BillingInfo signUp={this.signUp} /> }
            </Dialog>
        )
    }
}

SignUp.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
}

export default SignUp
