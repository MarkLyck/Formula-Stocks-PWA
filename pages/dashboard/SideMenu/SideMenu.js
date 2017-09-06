import React from 'react'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import MenuItem from './MenuItem'
import { MenuList } from './styles'

const SideMenu = () => (
    <ThemeProvider theme={theme}>
        <MenuList>
            <MenuItem route="suggestions">Suggestions</MenuItem>
            <MenuItem route="portfolio">Portfolio</MenuItem>
            <MenuItem route="trades">Portfolio trades</MenuItem>
            <MenuItem route="articles">Articles</MenuItem>
            <MenuItem route="admin">Admin</MenuItem>
            <MenuItem route="account">Account</MenuItem>
            <MenuItem route="">Log out</MenuItem>
            <MenuItem>Support</MenuItem>
        </MenuList>
    </ThemeProvider>
)

export default SideMenu
