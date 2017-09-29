import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import StatisticsContainer from 'components/statisticsContainer'
import StatisticsBox from 'components/statisticsContainer/StatisticsBox'
import Admin from '../'

const getPayingSubscribers = (users) => {
    const subscribers = users.length
    return subscribers
}

const Panel = ({ visitorCount, userCount, allUsers }) => {
    const uniqueVisitsFromOldSite = 6600
    const uniqueVisitors = visitorCount.count + uniqueVisitsFromOldSite
    console.log(userCount)
    return (
        <Admin>
            <StatisticsContainer>
                <StatisticsBox title="Unique visitors" value={uniqueVisitors} icon="users" />
                <StatisticsBox title="Subscribers" value={getPayingSubscribers([])} icon="flask" />
                <StatisticsBox title="Trials" value={0} icon="hourglass-half" />
                <StatisticsBox title="Trial conversion rate" value={`0%`} icon="hourglass-end" />
            </StatisticsContainer>
            <div />
        </Admin>
    )
}

Panel.propTypes = {
    visitorCount: PropTypes.object,
    userCount: PropTypes.object,
    allUsers: PropTypes.array,
}

const VisitorsQuery = gql`
  query {
      visitorCount: _allVisitorsMeta {
        count
      }
      userCount: _allUsersMeta {
        count
      }
      allUsers {
        id
        name
        email
      },
  }
`

export default graphql(VisitorsQuery, {
    props: ({ data }) => ({ ...data }),
})(Panel)
