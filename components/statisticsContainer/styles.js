import styled from 'emotion/react'

export const Statistics = styled('div')`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    > div {
        width: calc(100% / 4 - 16px)
    }
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
    @media (max-width: 1200px) {
        > div {
            width: calc(100% / 2 - 16px);
        }
        > div:first-child {
            margin-bottom: 16px;
        }
        > div:nth-child(2) {
            margin-bottom: 16px;
        }
    }
    @media (max-width: 600px) {
        > div {
            width: calc(100% - 16px);
            margin-bottom: 16px;
        }
        > div:last-child {
            margin-bottom: 0;
        }
    }
`

export default null
