import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Link from 'next/link'
import { HeaderImage } from './styles'


const ArticleCard = ({ article }) => {
    const articleURLName = article.title.split(' ').join('-')
    return (
        <Link href={`/dashboard/articles/article?title=${articleURLName}`} as={`/dashboard/articles/${articleURLName}`}>
            <Paper>
                <HeaderImage data-headerImageUrl={article.headerImageUrl} />
                <h4>{article.title}</h4>
            </Paper>
        </Link>
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object,
}


export default ArticleCard
