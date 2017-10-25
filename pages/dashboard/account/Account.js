import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Dashboard from '../'

class Account extends Component {
    render() {
        console.log(this.props)
        return (
            <Dashboard>
                test
            </Dashboard>
        )
    }
}

const AccountQuery = gql`
  query {
    User(id: "cj84k0ja70pxx0197tfzbuge0") {
      email,
      name,
      plan,
      type
    },
  }
`

export default graphql(AccountQuery, {
    props: ({ data }) => ({ ...data }),
})(Account)
