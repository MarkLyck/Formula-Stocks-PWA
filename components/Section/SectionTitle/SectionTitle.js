import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion/react/theming'

import { SectionTitleContainer, Title, Divider } from './styles'

const SectionTitle = ({ children, theme }) => (
    <SectionTitleContainer>
        <Title type="title" theme={theme}>{children}</Title>
        <Divider theme={theme} />
    </SectionTitleContainer>
)

SectionTitle.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withTheme(SectionTitle)
