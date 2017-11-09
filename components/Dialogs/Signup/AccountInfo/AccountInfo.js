import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ThemeProvider } from 'emotion/react/theming'
import { DialogContent } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import countries from 'common/data/countries'
import theme from 'common/theme'
import Form, { Row, Field, ErrorMessage } from 'components/Form'
import { dialogStyles, nextBtnStyles } from '../styles'
import CountrySelect from './CountrySelect'

class AccountInfo extends Component {
    state = {
        email: '',
        password: '',
        country: '',
        city: '',
        postalCode: '',
        address: '',
        emailClass: 'empty',
        passwordClass: 'empty',
        countryClass: 'empty',
        error: {},
    }

    handleCountrySelect = country => this.setState({ country })

    handleBlur = (elementName) => {
        const newState = this.state
        newState[elementName] = 'filled'
        this.setState(newState)
    }

    handleFocus = (elementName) => {
        const newState = this.state
        newState[elementName] = 'focused'
        this.setState(newState)
    }

    submitAccountInfo = () => {
        const { email, password, country, address, city, postalCode } = this.state

        // eslint-disable-next-line
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const selectedCountry = countries.filter(item => item.label === country)[0]

        if (!emailRegex.test(email)) {
            this.setState({ error: { message: 'Invalid email' } })
        } else if (!password) {
            this.setState({ error: { message: 'Please enter a password' } })
        } else if (password.length < 4) {
            this.setState({ error: { message: 'Password must be at least 4 characters' } })
        } else if (!country) {
            this.setState({ error: { message: 'Please choose your country' } })
        } else if (selectedCountry && selectedCountry.taxPercent && !address) {
            this.setState({ error: { message: 'Please enter your address' } })
        } else if (selectedCountry && selectedCountry.taxPercent && !city) {
            this.setState({ error: { message: 'Please enter your city' } })
        } else if (selectedCountry && selectedCountry.taxPercent && !postalCode) {
            this.setState({ error: { message: 'Please enter your address' } })
        } else {
            this.props.nextPage({ email, password, selectedCountry, address, city, postalCode })
        }
    }

    renderFullAddress = () => {
        if (!this.state.country) { return null }

        const country = _.find(countries, c => c.label === this.state.country)
        if (country && country.taxPercent) {
            return (
                <div>
                    <Row>
                        <Field
                            label="Street address"
                            type="text"
                            className={this.state.streetClass}
                            inputState={this.state.streetClass}
                            onChange={event => this.setState({ address: event.target.value })}
                            onBlur={() => this.handleBlur('streetClass')}
                            onFocus={() => this.handleFocus('streetClass')}
                            placeholder="Elm Street 123"
                            margin="normal"
                        />
                    </Row>
                    <Row>
                        <Field
                            label="City"
                            type="text"
                            className={this.state.cityClass}
                            inputState={this.state.cityClass}
                            onChange={event => this.setState({ city: event.target.value })}
                            onBlur={() => this.handleBlur('cityClass')}
                            onFocus={() => this.handleFocus('cityClass')}
                            placeholder="New York"
                            margin="normal"
                        />
                        <Field
                            label="Postal code"
                            type="text"
                            className={this.state.postalClass}
                            inputState={this.state.postalClass}
                            onChange={event => this.setState({ postalCode: event.target.value })}
                            onBlur={() => this.handleBlur('postalClass')}
                            onFocus={() => this.handleFocus('postalClass')}
                            placeholder="10075"
                            margin="normal"
                        />
                    </Row>
                </div>
            )
        }
        return null
    }

    render() {
        const { error } = this.state

        return (
            <ThemeProvider theme={theme}>
                <DialogContent style={dialogStyles}>
                    <Form>
                        {error.message && <ErrorMessage message={error.message} />}
                        <Row className={error.message ? 'form-error' : ''}>
                            <Field
                                label="Email"
                                type="email"
                                autoFocus
                                className={this.state.emailClass}
                                inputState={this.state.emailClass}
                                onChange={event => this.setState({ email: event.target.value })}
                                onBlur={() => this.handleBlur('emailClass')}
                                onFocus={() => this.handleFocus('emailClass')}
                                placeholder="example@domain.com"
                                margin="normal"
                            />
                        </Row>
                        <Row>
                            <Field
                                label="Password"
                                type="password"
                                className={this.state.passwordClass}
                                inputState={this.state.passwordClass}
                                onChange={event => this.setState({ password: event.target.value })}
                                onBlur={() => this.handleBlur('passwordClass')}
                                onFocus={() => this.handleFocus('passwordClass')}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                margin="normal"
                            />
                        </Row>
                        <Row>
                            <CountrySelect
                                inputState={this.state.countryClass}
                                handleCountrySelect={this.handleCountrySelect}
                                onBlur={() => this.handleBlur('countryClass')}
                                onFocus={() => this.handleFocus('countryClass')}
                            />
                        </Row>
                        {this.renderFullAddress()}
                        <Button raised color="primary" style={nextBtnStyles} onClick={this.submitAccountInfo}>Next</Button>
                    </Form>
                </DialogContent>
            </ThemeProvider>
        )
    }
}

AccountInfo.propTypes = {
    nextPage: PropTypes.func.isRequired,
}

export default AccountInfo
