import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Logo from './logo_horizontal.svg'
import PlanButtons from './planButtons'
import AdminButtons from './adminButtons'
import { Bar } from './styles'

const NavBar = ({ selectedPlan, actions }) => {
    let route = ''
    if (typeof window !== 'undefined') {
        route = Router.router.pathname
    } else {
        return (<Bar><div /><Logo /></Bar>)
    }

    return (
        <Bar>
            {
                route.indexOf('admin') === -1
                    ? <PlanButtons selectedPlan={selectedPlan} actions={actions} />
                    : <AdminButtons route={route} />
            }
            <Logo />
        </Bar>
    )
}

NavBar.propTypes = {
    selectedPlan: PropTypes.string,
    actions: PropTypes.object,
}

export default NavBar
