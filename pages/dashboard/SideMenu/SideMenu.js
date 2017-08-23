import React from 'react'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import MenuItem from './MenuItem'

const SideMenu = () => (
    <ThemeProvider theme={theme}>
        <ul>
            <MenuItem route="suggestions">Suggestions</MenuItem>
            <MenuItem route="portfolio">Portfolio</MenuItem>
            <MenuItem route="trades">Portfolio trades</MenuItem>
            <MenuItem route="articles">Articles</MenuItem>
            <MenuItem route="admin">Admin</MenuItem>
            <MenuItem route="account">Account</MenuItem>
            <MenuItem route="">Log out</MenuItem>
            <MenuItem>Support</MenuItem>
        </ul>
    </ThemeProvider>
)

export default SideMenu
