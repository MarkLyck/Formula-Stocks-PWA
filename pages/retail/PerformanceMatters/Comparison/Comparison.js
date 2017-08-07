import React from 'react'
import PropTypes from 'prop-types'
import { Container, Bar, Dollars } from './styles'

const Comparison = ({ theme }) => (
    <Container>
        <p>$1,000 invested with an 18% yearly return over 30 years.</p>
        <Bar color={theme.colors.primary} width={90}><Dollars>$143,370</Dollars></Bar>
        <p>$1,000 invested with a 6% yearly return over 30 years.</p>
        <Bar color={theme.colors.black} width={3.6}><Dollars market>$5,743</Dollars></Bar>
    </Container>
)

Comparison.propTypes = {
    theme: PropTypes.object.isRequired,
}

export default Comparison
