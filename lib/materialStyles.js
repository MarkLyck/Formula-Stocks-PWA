// eslint-disable-next-line
import { create as createJss } from 'jss'
import jss, { SheetsRegistry } from 'react-jss/lib/jss'
// eslint-disable-next-line
import preset from 'jss-preset-default'
// import { SheetsRegistry } from 'react-jss'
import createPalette from 'material-ui/styles/createPalette'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { blue, green } from 'material-ui/colors'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

const theme = createMuiTheme({
    palette: createPalette({
        primary: blue,
        accent: green,
    }),
})

// Configure JSS
// const jss = createJss(preset())
jss.options.createGenerateClassName = createGenerateClassName

const createContext = () => ({
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new WeakMap(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
})

export const setContext = () => {
    // Singleton hack as there is no way to pass variables from _document.js to pages yet.
    global.__INIT_MATERIAL_UI__ = createContext()
}

export const getContext = () => {
    // Make sure to create a new store for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return global.__INIT_MATERIAL_UI__
    }

    // Reuse context on the client-side
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createContext()
    }

    return global.__INIT_MATERIAL_UI__
}
