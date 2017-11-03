import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion/react/theming'
import { DialogContent } from 'material-ui/Dialog'
import { StripeProvider, Elements } from 'react-stripe-elements'
// import TextField from 'material-ui/TextField'
// import Button from 'material-ui/Button'
import theme from 'common/theme'
// import Disclaimer from 'components/Disclaimer'
import { dialogStyles, nextBtnStyles } from '../styles'
import CheckoutForm from './checkoutForm'

class BillingInfo extends Component {
    state = {
        termsIsVisible: false,
    }

    submitBillingInfo = () => {
        // TODO add Form validation here...
        const { name, cardNumber, expiryDate, cvc } = this.state
        const billingDetails = {
            name,
            number: cardNumber,
            expiryDate,
            cvc,
        }
        this.props.handleSignup(billingDetails)
    }

    toggleTerms = () => this.setState({ termsIsVisible: !this.state.termsIsVisible })

    renderTaxInfo = tax => (
        <div>
            <p>Tax</p>
            <p>{tax}</p>
        </div>
    )

    render() {
        const { tax } = this.props

        return (
            <ThemeProvider theme={theme}>
                <DialogContent style={dialogStyles}>
                    <StripeProvider apiKey="pk_test_EAYel8PILq2WQhZqRK7XRemy">
                        <Elements>
                            <CheckoutForm tax={tax} />
                        </Elements>
                    </StripeProvider>

                    {/* <TextField
                        id="name"
                        label="Name on card"
                        type="name"
                        autoFocus
                        value={name}
                        onChange={event => this.setState({ name: event.target.value })}
                        margin="normal"
                    />
                    <TextField
                        id="cardNumber"
                        label="Card number"
                        type="card-number"
                        onChange={event => this.setState({ cardNumber: event.target.value })}
                        margin="normal"
                    />
                    <div>
                        <TextField
                            id="cardExpiry"
                            label="Expiry date"
                            onChange={event => this.setState({ expiryDate: event.target.value })}
                            margin="normal"
                        />
                        <TextField
                            id="cvc"
                            label="CVC"
                            type="number"
                            onChange={event => this.setState({ cvc: event.target.value })}
                            margin="normal"
                        />
                    </div>
                    {this.renderTaxInfo(tax)}
                    <div className="beside">
                        <p className="description">Price after 30 days:</p>
                        <p className="price semi-bold">${} monthly</p>
                    </div>
                    <Disclaimer>
                        By signing up you agree to our <a role="button" tabIndex="0" onClick={this.toggleTerms}>Terms of Service</a>
                    </Disclaimer>
                    <Button raised color="primary" style={nextBtnStyles} onClick={this.submitBillingInfo}>Sign up</Button> */}
                </DialogContent>
            </ThemeProvider>
        )
    }
}

BillingInfo.propTypes = {
    handleSignup: PropTypes.func.isRequired,
    tax: PropTypes.number,
}

export default BillingInfo
