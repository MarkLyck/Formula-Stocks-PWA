import styled from 'emotion/react'
import PropTypes from 'prop-types'

const Section = styled('div')`
    background: ${props => (props['data-offWhite'] ? props.theme.colors.offWhite : '#fff')};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
`

const SectionContent = styled('div')`
    padding: 40px 80px 40px 80px;
    max-width: 1160px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Sect = props => (
    <Section theme={props.theme} data-offWhite={props['data-offWhite']}>
        <SectionContent>
            {props.children}
        </SectionContent>
    </Section>
)

Sect.propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node,
    'data-offWhite': PropTypes.bool,
}

export default Sect
