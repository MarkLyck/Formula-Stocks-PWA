import styled from 'emotion/react'

export const HeaderContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    padding-bottom: 8px;
    h4 {
        font-weight: 400;
        font-size: 1.25rem;
    }
    .stocks-number {
        color: ${props => props.theme.colors.primary};
    }
`

export const TableContainer = styled('div')`
    @media(max-width: 880px) {
        .days-owned {
            display: none;
        }
    }
    @media(max-width: 780px) {
        .last-price {
            display: none;
        }
    }
    @media(max-width: 680px) {
        .cost-basis {
            display: none;
        }
    }
    @media(max-width: 590px) {
        .allocation {
            display: none;
        }
        .cash-row {
            display: none;
        }
    }
    @media(max-width: 500px) {
        .stock-name {
            display: none;
        }
    }
`

export default null
