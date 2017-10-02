import React, { Component } from 'react'
import { JssProvider } from 'react-jss'
import { withStyles, createStyleSheet, MuiThemeProvider } from 'material-ui/styles'
import { getContext } from 'lib/materialStyles'
import customTheme from 'common/theme'

// Apply some reset
const styleSheet = createStyleSheet(theme => ({
    '@global': {
        '*': {
            boxSizing: 'border-box',
        },
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
            margin: 0,
            lineHeight: 1.5,
            color: customTheme.colors.black,
            fontFamily: 'proxima-nova, roboto, sans-serif',
            fontWeight: 400,
        },
        p: {
            margin: 0,
        },
        h3: {
            fontWeight: 300,
            margin: 0,
        },
        h4: {
            margin: 0,
        },
        h5: {
            margin: 0,
        },
        a: {
            color: customTheme.colors.primary,
            textDecoration: 'none',
        },
        ul: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
        },
        li: {
            listStyle: 'none',
            margin: 0,
        },
        'a[href="http://www.amcharts.com/javascript-charts/"]': {
            display: 'none !important',
        },
    },
}))

let AppWrapper = props => props.children

AppWrapper = withStyles(styleSheet)(AppWrapper)

const withMaterial = (BaseComponent) => {
    class WithMaterial extends Component {
        static getInitialProps(ctx) {
            console.log('file getInitialProps')
            if (BaseComponent.getInitialProps) {
                return BaseComponent.getInitialProps(ctx)
            }

            return {}
        }

        componentDidMount() {
            // Remove the server-side injected CSS.

            // const jssStyles = document.querySelector('#jss-server-side')
            // if (jssStyles && jssStyles.parentNode) {
            //     jssStyles.parentNode.removeChild(jssStyles)
            // }
        }

        render() {
            const context = getContext()

            return (
                <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
                    <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
                        <AppWrapper>
                            <BaseComponent {...this.props} />
                        </AppWrapper>
                    </MuiThemeProvider>
                </JssProvider>
            )
        }
    }

    WithMaterial.displayName = `withMaterial(${BaseComponent.displayName})`

    return WithMaterial
}

export default withMaterial
