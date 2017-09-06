import React from 'react'
import PropTypes from 'prop-types'
import { TextContainer } from './styles'

const Return = ({ title, returnSince }) => (
    <TextContainer>
        <h3>{title}</h3>
        <h4>+{returnSince}%</h4>
    </TextContainer>
)

Return.propTypes = {
    title: PropTypes.string,
    returnSince: PropTypes.string,
}

export default Return
