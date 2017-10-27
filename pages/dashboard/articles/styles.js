import styled from 'emotion/react'

export const ArticlesList = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    > div {
        width: 100%;
        max-width: 278px;
        margin: 16px;
        h4 {
            margin: 16px;
            font-weight: 500;
        }
    }
`

export const HeaderImage = styled('div')`
    width: 100%;
    height: 200px;
    background-image: ${props => `url(${props['data-headerImageUrl']})`};
    background-repeat: no-repeat;
    background-size: cover;
`

export default null
