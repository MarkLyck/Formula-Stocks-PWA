import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import countries from 'common/data/countries'
import CountrySelect from './CountrySelect'
import { dialogStyles, nextBtnStyles } from './styles'

class SignUp extends Component {
    state = { email: '', country: '' }

    handleRequestClose = () => this.props.onRequestClose()
    handleCountrySelect = country => this.setState({ country })

    renderFullAddress = () => {
        if (!this.state.country) { return null }

        const country = _.find(countries, c => c.label === this.state.country)
        if (country && country.taxPercent) {
            return (
                <div>
                    <TextField
                        id="streetAddress"
                        label="Street address"
                        margin="normal"
                        style={{ width: '100%' }}
                    />
                    <div>
                        <TextField
                            id="city"
                            label="City"
                            margin="normal"
                        />
                        <TextField
                            id="postalCode"
                            label="Postal Code"
                            margin="normal"
                        />
                    </div>
                </div>
            )
        }
        return null
    }

    render() {
        if (typeof window === 'undefined') { return null }
        const { ...other } = this.props
        const { email } = this.state

        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other} transition={Slide}>
                <DialogTitle>Sign up</DialogTitle>
                <DialogContent style={dialogStyles}>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        autoFocus
                        value={email}
                        onChange={event => this.setState({ email: event.target.value })}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <CountrySelect handleCountrySelect={this.handleCountrySelect} />
                    {this.renderFullAddress()}
                    <Button raised color="primary" style={nextBtnStyles}>Next</Button>
                </DialogContent>
            </Dialog>
        )
    }
}

SignUp.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
}

export default SignUp
