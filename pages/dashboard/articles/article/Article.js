import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Router from 'next/router'
import Dashboard from '../../'
import { HeaderImage, Title, Body } from './styles'

class Article extends Component {
    componentDidMount() {
        const articleTitle = Router.router ? Router.router.query.title : ''
        console.log(articleTitle)
        this.props.refetch({ title: articleTitle.split('-').join(' ') })
    }

    render() {
        if (!this.props.allArticles || !this.props.allArticles.length) return null
        const article = this.props.allArticles[0]

        return (
            <Dashboard>
                <HeaderImage data-headerImageUrl={article.headerImageUrl} />
                <Title>{article.title}</Title>
                <Body
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: article.body }}
                />
            </Dashboard>
        )
    }
}

const ArticleQuery = gql`
  query ArticleQuery($title: String) {
    allArticles(filter: {
        title: $title
    }) {
        title
        body
        headerImageUrl
    }
  }
`


Article.propTypes = {
    allArticles: PropTypes.array,
    refetch: PropTypes.func,
}


const articleTitle = Router.router ? Router.router.query.title : ''

export default graphql(ArticleQuery, {
    options: {
        variables: {
            title: articleTitle,
        },
    },
    props: ({ data }) => ({ ...data }),
})(Article)
