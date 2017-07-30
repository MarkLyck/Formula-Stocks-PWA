// import { withTheme } from 'emotion/react/theming'
import styled from 'emotion/react'

const Disclaimer = styled('p')`
    color: ${props => props.theme.colors.black};
    font-weight: 100;
    font-size: 0.8rem;
    line-height: 1;
`

export default Disclaimer
