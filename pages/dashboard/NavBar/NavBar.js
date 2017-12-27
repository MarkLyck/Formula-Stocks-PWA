import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Logo from './logo_horizontal.svg'
// import PlanButtons from './planButtons'
import PlanMenu from './planMenu'
import AdminButtons from './adminButtons'
import ArticlesBackButton from './articlesBackButton'
import { Bar } from './styles'

const NavBar = ({ selectedPlan, actions }) => {
    let route = ''
    if (typeof window !== 'undefined') {
        route = Router.router.pathname
    } else {
        return (<Bar><span /><Logo /></Bar>)
    }

    const isPlanPage = route.indexOf('portfolio') > -1 || route.indexOf('suggestions') > -1 || route.indexOf('trades') > -1
    const isAdminPage = route.indexOf('admin') > -1
    const isArticlePage = Router.router.query.title
    if (!isPlanPage && !isAdminPage && !isArticlePage) return (<Bar><span /><Logo /></Bar>)

    return (
        <Bar>
            {isArticlePage && <ArticlesBackButton />}
            {isPlanPage && <PlanMenu selectedPlan={selectedPlan} actions={actions} className="plan-menu-container" route={route} />}
            {/* {isPlanPage && <PlanButtons selectedPlan={selectedPlan} actions={actions} />} */}
            {isAdminPage && <AdminButtons route={route} />}
            <Logo onClick={() => Router.push('/')} />
        </Bar>
    )
}

NavBar.propTypes = {
    selectedPlan: PropTypes.string,
    actions: PropTypes.object,
}

export default NavBar
