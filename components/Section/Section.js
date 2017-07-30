import styled from 'emotion/react'

const Section = styled('div')`
    background: ${props => (props['data-offWhite'] ? props.theme.colors.offWhite : '#fff')};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 80px 40px 80px;
    margin: 0;
`

export default Section
