import styled from 'emotion/react'

export const Statistics = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    > div:first-child {
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
    }
    > div:nth-child(2) {
        background: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.primary};
        > div:last-child {
            border-left: 1px solid #eaeaeb;
        }
    }
    > div:nth-child(3) {
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.white};
    }
    > div:last-child {
        background: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.secondary};
        > div:last-child {
            border-left: 1px solid #eaeaeb;
        }
    }
`

export default null