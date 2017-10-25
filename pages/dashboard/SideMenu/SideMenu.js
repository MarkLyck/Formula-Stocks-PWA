import React from 'react'
import { ThemeProvider } from 'emotion/react/theming'
import Router from 'next/router'
import theme from 'common/theme'
import MenuItem from './MenuItem'
import { MenuList } from './styles'

const isActive = (route) => {
    if (typeof window !== 'undefined') {
        // console.log(Router.router.pathname.indexOf(route) !== -1)
        return Router.router.pathname.indexOf(route) !== -1
    }
    return false
}

const SideMenu = () => (
    <ThemeProvider theme={theme}>
        <MenuList>
            <MenuItem icon="flask" route="suggestions" isActive={isActive('suggestions')}><h4>Suggestions</h4></MenuItem>
            <MenuItem icon="chart-line" route="portfolio" isActive={isActive('portfolio')}><h4>Portfolio</h4></MenuItem>
            <MenuItem icon="tasks" route="trades" isActive={isActive('trades')}><h4>Portfolio trades</h4></MenuItem>
            <MenuItem icon="newspaper" route="articles" isActive={isActive('articles')}><h4>Articles</h4></MenuItem>
            <MenuItem icon="tachometer-alt" route="admin/panel" isActive={isActive('admin')}><h4>Admin</h4></MenuItem>
            <MenuItem icon="user-alt" route="account" isActive={isActive('account')}><h4>Account</h4></MenuItem>
            <MenuItem icon="sign-out" route=""><h4>Log out</h4></MenuItem>
            <MenuItem icon="question-circle"><h4>Support</h4></MenuItem>
        </MenuList>
    </ThemeProvider>
)

export default SideMenu
