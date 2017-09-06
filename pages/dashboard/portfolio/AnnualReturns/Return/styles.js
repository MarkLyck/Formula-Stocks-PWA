import styled from 'emotion/react'

export const TextContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px 0;
    h4 {
        color: ${props => props.theme.colors.secondary};
    }
`

export default null
