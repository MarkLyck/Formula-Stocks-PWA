import React from 'react'
import { ThemeProvider } from 'emotion/react/theming'
import Router from 'next/router'
import theme from 'common/theme'
import MenuItem from './MenuItem'
import { MenuList } from './styles'

const isActive = (route) => {
    if (typeof window !== 'undefined') {
        return Router.router.pathname.indexOf(route) !== -1
    }
    return false
}

const SideMenu = () => (
    <ThemeProvider theme={theme}>
        <MenuList>
            <MenuItem icon="flask" route="suggestions" isActive={isActive('suggestions')}>Suggestions</MenuItem>
            <MenuItem icon="chart-line" route="portfolio" isActive={isActive('portfolio')}>Portfolio</MenuItem>
            <MenuItem icon="tasks" route="trades" isActive={isActive('trades')}>Portfolio trades</MenuItem>
            <MenuItem icon="newspaper" route="articles" isActive={isActive('articles')}>Articles</MenuItem>
            <MenuItem icon="tachometer-alt" route="admin" isActive={isActive('admin')}>Admin</MenuItem>
            <MenuItem icon="user-alt" route="account" isActive={isActive('account')}>Account</MenuItem>
            <MenuItem icon="sign-out" route="">Log out</MenuItem>
            <MenuItem icon="question-circle">Support</MenuItem>
        </MenuList>
    </ThemeProvider>
)

export default SideMenu
