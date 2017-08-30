import React from 'react'
import PropTypes from 'prop-types'

const Return = ({ title, returnSince }) => (
    <div>
        <h3>{title}</h3>
        <h4>+{returnSince}%</h4>
    </div>
)

Return.propTypes = {
    title: PropTypes.string,
    returnSince: PropTypes.number,
}

export default Return
