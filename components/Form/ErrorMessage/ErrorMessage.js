import React from 'react'
import PropTypes from 'prop-types'
import theme from 'common/theme'
import { MessageContainer } from './styles'

const ErrorMessage = ({ message }) => (
    <MessageContainer theme={theme}>
        <i className="fa fa-times-circle" />
        <p>{message}</p>
    </MessageContainer>
)

ErrorMessage.propTypes = {
    message: PropTypes.string,
}

export default ErrorMessage
