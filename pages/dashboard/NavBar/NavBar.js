import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Logo from './logo_horizontal.svg'
import PlanButtons from './planButtons'
import PlanMenu from './planMenu'
import AdminButtons from './adminButtons'
import { Bar } from './styles'

const NavBar = ({ selectedPlan, actions }) => {
    let route = ''
    if (typeof window !== 'undefined') {
        route = Router.router.pathname
    } else {
        return (<Bar><div /><Logo /></Bar>)
    }
    console.log(route.indexOf('admin'))
    return (
        <Bar>
            <PlanMenu selectedPlan={selectedPlan} actions={actions} className="plan-menu-container" route={route} />
            {route.indexOf('admin') > -1 && <AdminButtons route={route} />}
            {(route.indexOf('account') === 0 && route.indexOf('admin') === 0) && <PlanButtons selectedPlan={selectedPlan} actions={actions} />}
            <Logo />
        </Bar>
    )
}

NavBar.propTypes = {
    selectedPlan: PropTypes.string,
    actions: PropTypes.object,
}

export default NavBar
