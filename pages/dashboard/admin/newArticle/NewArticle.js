import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Admin from '../'

const NewArticle = () => (
    <Admin>
        write here
    </Admin>
)

NewArticle.propTypes = {
    allUsers: PropTypes.array,
}

const ArticlesQuery = gql`
  query {
      allUsers {
        id
      },
  }
`

export default graphql(ArticlesQuery, {
    props: ({ data }) => ({ ...data }),
})(NewArticle)
