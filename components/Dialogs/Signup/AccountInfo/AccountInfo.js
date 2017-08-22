import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DialogContent } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import countries from 'common/data/countries'
import { dialogStyles, nextBtnStyles } from '../styles'
import CountrySelect from './CountrySelect'

class AccountInfo extends Component {
    state = {
        email: '',
        password: '',
        country: '',
    }

    handleCountrySelect = country => this.setState({ country })

    submitAccountInfo = () => {
        // TODO add Form validation here...
        this.props.nextPage(this.state)
    }

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
        const { email } = this.state

        return (
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
                    onChange={event => this.setState({ password: event.target.value })}
                    autoComplete="current-password"
                    margin="normal"
                />
                <CountrySelect handleCountrySelect={this.handleCountrySelect} />
                {this.renderFullAddress()}
                <Button raised color="primary" style={nextBtnStyles} onClick={this.submitAccountInfo}>Next</Button>
            </DialogContent>
        )
    }
}

AccountInfo.propTypes = {
    nextPage: PropTypes.func.isRequired,
}

export default AccountInfo
