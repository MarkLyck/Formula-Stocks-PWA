import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Visitor from './visitor'

const VisitorList = ({ visitors }) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Referer</TableCell>
                    <TableCell>Visited</TableCell>
                    <TableCell>Device</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {visitors.map(visitor => <Visitor visitor={visitor} key={visitor.id} />)}
            </TableBody>
        </Table>
    </Paper>
)

VisitorList.propTypes = {
    visitors: PropTypes.array,
}

export default VisitorList
