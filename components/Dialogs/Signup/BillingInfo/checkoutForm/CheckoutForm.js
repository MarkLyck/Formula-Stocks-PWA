// CardSection.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'
import theme from 'common/theme'
import Disclaimer from 'components/Disclaimer'
import { Form, Row, Field } from './styles'

const createOptions = () => ({
    style: {
        base: {
            color: '#32325D',
            fontWeight: 500,
            fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
            fontSize: '16px',
            fontSmoothing: 'antialiased',

            '::placeholder': {
                color: '#CFD7DF',
            },
            ':-webkit-autofill': {
                color: theme.colors.warning,
            },
        },
        invalid: {
            color: theme.colors.error,

            '::placeholder': {
                color: '#FFCCA5',
            },
        },
    },
})

class CheckoutForm extends Component {
    state = {
        cardNumber: 'empty',
        cardCVC: 'empty',
        cardExpiry: 'empty',
        postalCode: 'empty',
        nameClass: 'empty',
    }

    handleBlur = (elementName) => {
        const newState = this.state
        newState[elementName] = 'filled'
        this.setState(newState)
    }

    handleChange = (change) => {
        // Handle error states in here
        console.log('[change]', change)
    }

    handleFocus = (elementName) => {
        const newState = this.state
        newState[elementName] = 'focused'
        this.setState(newState)
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.stripe.createToken().then(payload => console.log(payload))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} theme={theme}>
                {/* <div className="row">
                    <div className="field">
                        <input
                            data-tid="form.address_placeholder"
                            className="input empty"
                            type="text"
                            placeholder="185 Berry St"
                            required=""
                        />
                        <label htmlFor="example2-address" data-tid="form.address_label">Address</label>
                        <div className="baseline" />
                    </div>
                </div> */}
                {/* <div className="row">
                    <div className="field half-width">
                        <input
                            id="example2-city"
                            data-tid="form.city_placeholder"
                            className="input empty"
                            type="text"
                            placeholder="San Francisco"
                            required=""
                        />
                        <label htmlFor="example2-city" data-tid="form.city_label">City</label>
                        <div className="baseline" />
                    </div>
                    <div className="field quarter-width">
                        <input
                            id="example2-state"
                            data-tid="form.state_placeholder"
                            className="input empty"
                            type="text"
                            placeholder="CA"
                            required=""
                        />
                        <label htmlFor="example2-state" data-tid="form.state_label">State</label>
                        <div className="baseline" />
                    </div>
                    <div className="field quarter-width">
                        <input
                            id="example2-postal-code"
                            data-tid="form.postal_code_placeholder"
                            className="input empty"
                            type="text"
                            placeholder="94107"
                            required=""
                        />
                        <label htmlFor="example2-postal-code" data-tid="form.postal_code_label">ZIP</label>
                        <div className="baseline" />
                    </div>
                </div> */}

                <Row>
                    <Field>
                        <input
                            autoFocus
                            className={`input ${this.state.nameClass}`}
                            onBlur={() => this.handleBlur('nameClass')}
                            onFocus={() => this.handleFocus('nameClass')}
                            type="text"
                            placeholder="John Doe"
                            required=""
                        />
                        <label htmlFor="name">Name</label>
                        <div className="baseline" />
                    </Field>
                </Row>

                <Row>
                    <Field>
                        <CardNumberElement
                            id="card-number"
                            className={`input ${this.state.cardNumber}`}
                            onBlur={() => this.handleBlur('cardNumber')}
                            onChange={ev => this.handleChange(ev)}
                            onFocus={() => this.handleFocus('cardNumber')}
                            {...createOptions()}
                        />
                        <label htmlFor="card-number">Card number</label>
                        <div className="baseline" />
                    </Field>
                </Row>

                <Row>
                    <Field className="field half-width">
                        <CardExpiryElement
                            id="card-expiry"
                            className={`input ${this.state.cardExpiry}`}
                            onBlur={() => this.handleBlur('cardExpiry')}
                            onChange={ev => this.handleChange(ev)}
                            onFocus={() => this.handleFocus('cardExpiry')}
                            {...createOptions()}
                        />
                        <label htmlFor="card-expiry">Expiration</label>
                        <div className="baseline" />
                    </Field>
                    <Field className="field half-width">
                        <CardCVCElement
                            id="card-cvc"
                            className={`input ${this.state.cardCVC}`}
                            onBlur={() => this.handleBlur('cardCVC')}
                            onChange={ev => this.handleChange(ev)}
                            onFocus={() => this.handleFocus('cardCVC')}
                            {...createOptions()}
                        />
                        <label htmlFor="card-cvc">CVC</label>
                        <div className="baseline" />
                    </Field>
                </Row>
                <div className="beside">
                    <p className="description">Price after 30 days:</p>
                    <p className="price semi-bold">$50 monthly</p>
                </div>
                <button type="submit">Try it free for 30 days</button>
                <Disclaimer className="disclaimer">
                    By signing up you agree to our <a role="button" tabIndex="0" onClick={this.toggleTerms}>Terms of Service</a>
                </Disclaimer>
                <div className="error" role="alert">
                    <span className="message" />
                </div>
            </Form>
        )
    }
}

CheckoutForm.propTypes = {
    stripe: PropTypes.object,
}

export default injectStripe(CheckoutForm)
