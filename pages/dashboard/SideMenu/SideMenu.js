/* eslint max-len: 0 */
import React, { Component } from 'react'
import { ThemeProvider } from 'emotion/react/theming'
import Router from 'next/router'
import theme from 'common/theme'
import MenuItem from './MenuItem'
import { MenuList } from './styles'

class SideMenu extends Component {
    state = { activeRoute: '' }

    setActiveRoute = route => this.setState({ activeRoute: route })

    isActive = (route) => {
        if (typeof window !== 'undefined') {
            if (this.state.activeRoute) return this.state.activeRoute.split('/')[0] === route
            return Router.router.pathname.indexOf(route) !== -1
        }
        return false
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <MenuList>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="suggestions" icon="flask" route="suggestions" isActive={this.isActive('suggestions')}><h4>Suggestions</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="portfolio" icon="chart-line" route="portfolio" isActive={this.isActive('portfolio')}><h4>Portfolio</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="trades" icon="tasks" route="trades" isActive={this.isActive('trades')}><h4>Portfolio trades</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="articles" icon="newspaper" route="articles" isActive={this.isActive('articles')}><h4>Articles</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="admin" icon="tachometer-alt" route="admin/panel" isActive={this.isActive('admin')}><h4>Admin</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="account" icon="user-alt" route="account" isActive={this.isActive('account')}><h4>Account</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="logout" icon="sign-out" route="logout"><h4>Log out</h4></MenuItem>
                    <MenuItem setActiveRoute={this.setActiveRoute} key="support" icon="question-circle"><h4>Support</h4></MenuItem>
                </MenuList>
            </ThemeProvider>
        )
    }
}

export default SideMenu
