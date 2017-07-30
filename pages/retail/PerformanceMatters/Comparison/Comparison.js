import React from 'react'
import PropTypes from 'prop-types'
import { Container, Bar } from './styles'

const Comparison = ({ theme }) => (
    <Container>
        <p>$1,000 invested with an 18% yearly return over 30 years.</p>
        <Bar color={theme.colors.primary} width={90}>$143,370</Bar>
        <p>$1,000 invested with a 6% yearly return over 30 years.</p>
        <Bar color={theme.colors.black} width={3.6}><span>$5,743</span></Bar>
    </Container>
)

Comparison.propTypes = {
    theme: PropTypes.object.isRequired,
}

export default Comparison
