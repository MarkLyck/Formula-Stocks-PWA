// CardSection.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'
import theme from 'common/theme'
import Disclaimer from 'components/Disclaimer'
import TermsOfService from 'components/Dialogs/TermsOfService'
import { Form, Row, Field, ErrorMessage } from './styles'

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
        error: {},
        submitting: false,
        showTerms: false,
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
        if (this.state.submitting) return null
        if (!this.nameInput.value) {
            this.setState({ submitting: false, error: { message: 'Please enter your full name' } })
            return null
        }

        this.setState({ submitting: true, error: {} })
        this.props.stripe.createToken().then((payload) => {
            console.log(payload)
            if (payload.error) {
                this.setState({ submitting: false, error: payload.error })
            } else {
                this.setState({ submitting: false })
            }
        })
        return ev
    }

    toggleTerms = () => this.setState({ showTerms: !this.state.showTerms })

    render() {
        const { error, submitting, showTerms } = this.state
        const cardNumberError = error.message && error.message.indexOf('number') > -1

        return (
            <Form onSubmit={this.handleSubmit} theme={theme}>
                {error.message && (
                    <ErrorMessage>
                        <i className="fa fa-times-circle" />
                        <p>{error.message}</p>
                    </ErrorMessage>)
                }
                <Row className={error.message ? 'form-error' : ''}>
                    <Field>
                        <input
                            id="name"
                            // eslint-disable-next-line
                            autoFocus
                            className={`input ${this.state.nameClass}`}
                            onBlur={() => this.handleBlur('nameClass')}
                            onFocus={() => this.handleFocus('nameClass')}
                            onReady={() => console.log('ready')}
                            type="text"
                            placeholder="John Doe"
                            required=""
                            // eslint-disable-next-line
                            ref={ref => (this.nameInput = ref)}
                        />
                        <label htmlFor="name">Name</label>
                        <div className={`baseline baseline-${this.state.nameClass}`} />
                    </Field>
                </Row>

                <Row>
                    <Field>
                        <CardNumberElement
                            className={
                                `input
                                ${this.state.cardNumber}
                                ${(cardNumberError && this.state.cardNumber !== 'empty') ? 'input-error' : ''}`
                            }
                            onBlur={() => this.handleBlur('cardNumber')}
                            onChange={ev => this.handleChange(ev)}
                            onFocus={() => this.handleFocus('cardNumber')}
                            {...createOptions()}
                        />
                        <label htmlFor="card-number" className={`${cardNumberError && 'label-error'} `}>Card number</label>
                        <div className={`baseline baseline-${this.state.cardNumber}`} />
                    </Field>
                </Row>

                <Row>
                    <Field className="field half-width">
                        <CardExpiryElement
                            className={`input ${this.state.cardExpiry}`}
                            onBlur={() => this.handleBlur('cardExpiry')}
                            onChange={ev => this.handleChange(ev)}
                            onFocus={() => this.handleFocus('cardExpiry')}
                            {...createOptions()}
                        />
                        <label htmlFor="card-expiry">Expiration</label>
                        <div className={`baseline baseline-${this.state.cardExpiry}`} />
                    </Field>
                    <Field className="field half-width">
                        <CardCVCElement
                            className={`input ${this.state.cardCVC}`}
                            onBlur={() => this.handleBlur('cardCVC')}
                            onChange={ev => this.handleChange(ev)}
                            onFocus={() => this.handleFocus('cardCVC')}
                            {...createOptions()}
                        />
                        <label htmlFor="card-cvc">CVC</label>
                        <div className={`baseline baseline-${this.state.cardCVC}`} />
                    </Field>
                </Row>

                <div className="beside">
                    <p className="description">Price after 30 days:</p>
                    <p className="price semi-bold">$50 monthly</p>
                </div>
                <button type="submit">{!submitting ? 'Try it free for 30 days' : 'submitting'}</button>
                <Disclaimer className="disclaimer">
                    By signing up you agree to our <a role="button" tabIndex="0" onClick={this.toggleTerms}>Terms of Service</a>
                </Disclaimer>
                <TermsOfService open={showTerms} hideTerms={this.toggleTerms} />
            </Form>
        )
    }
}

CheckoutForm.propTypes = {
    stripe: PropTypes.object,
}

export default injectStripe(CheckoutForm)
