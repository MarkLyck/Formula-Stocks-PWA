import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { gql, graphql } from 'react-apollo'
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'
import { dialogStyles, nextBtnStyles } from './styles'

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    componentDidMount() { Router.prefetch('/dashboard') }

    handleLogin = () => {
        const { email, password } = this.state
        this.props.signinUser({ variables: { email, password } })
            .then((response) => {
                localStorage.setItem('graphcoolToken', response.data.signinUser.token)
                Router.push('/dashboard')
            })
            .catch(e => console.error(e))
    }

    render() {
        const { email } = this.state
        const { signinUser, ...other } = this.props
        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other} transition={Slide}>
                <DialogTitle>Login</DialogTitle>
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
                    <Button raised color="primary" style={nextBtnStyles} onClick={this.handleLogin}>login</Button>
                </DialogContent>
            </Dialog>
        )
    }
}

Login.propTypes = {
    signinUser: PropTypes.func,
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

export default graphql(signinUser, { name: 'signinUser' })(Login)
