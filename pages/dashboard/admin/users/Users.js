import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { ContainerStyle } from './styles'
import Dashboard from '../../'
import User from './user'

const UserList = ({ allUsers }) => (
    <Dashboard>
        <Paper style={ContainerStyle}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Signed up</TableCell>
                        <TableCell>Last seen</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers && allUsers.map(user => <User user={user} key={user.id} />)}
                </TableBody>
            </Table>
        </Paper>
    </Dashboard>
)

UserList.propTypes = {
    allUsers: PropTypes.array,
}

const UsersQuery = gql`
  query {
      allUsers {
        id
        createdAt
        updatedAt
        name
        email
      },
  }
`

export default graphql(UsersQuery, {
    props: ({ data }) => ({ ...data }),
})(UserList)
