import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { HeaderImage } from './styles'

const ArticleCard = ({ article }) => (
    <Paper>
        <HeaderImage data-headerImageUrl={article.headerImageUrl} />
        <h4>{article.title}</h4>
    </Paper>
)

ArticleCard.propTypes = {
    article: PropTypes.object,
}


export default ArticleCard
