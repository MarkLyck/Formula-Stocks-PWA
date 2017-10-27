import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Dashboard from '../'
import ArticleCard from './ArticleCard'
import { ArticlesList } from './styles'

const Articles = ({ allArticles }) => (
    <Dashboard>
        <ArticlesList>
            {allArticles && allArticles.map(article => <ArticleCard article={article} />)}
        </ArticlesList>
    </Dashboard>
)

const ArticlesQuery = gql`
  query {
    allArticles {
        title
        body
        headerImageUrl
    }
  }
`

Articles.propTypes = {
    allArticles: PropTypes.array,
}


export default graphql(ArticlesQuery, {
    props: ({ data }) => ({ ...data }),
})(Articles)
