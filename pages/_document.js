import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion/server'
import { flush } from 'emotion'
import { getContext, setContext } from 'lib/materialStyles'

const dev = process.env.NODE_ENV !== 'production'

class MyDocument extends Document {
    static getInitialProps(ctx) {
        // Reset the context for handling a new request.
        setContext()
        if (dev) { flush() }
        const page = ctx.renderPage()
        const styles = extractCritical(page.html)
        // Get the context with the collected side effects.
        const context = getContext()
        return {
            ...page,
            ...styles,
            //eslint-disable-next-line
            styles: <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />
        }
    }

    constructor(props) {
        super(props)
        const { __NEXT_DATA__, ids } = props
        if (ids) {
            __NEXT_DATA__.ids = this.props.ids
        }
    }

    render() {
        const context = getContext()
        return (
            <html lang="en">
                <Head>
                    <title>PWA</title>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
                    />
                    <meta name="theme-color" content={context.theme.palette.primary[500]} />
                    <link rel="manifest" href="static/manifest.json" />
                    { //eslint-disable-next-line
                    } <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />

                    <script src="https://js.stripe.com/v3/" />

                    <script src="https://www.amcharts.com/lib/3/amcharts.js" />
                    <script src="https://www.amcharts.com/lib/3/serial.js" />
                    <script src="https://www.amcharts.com/lib/3/pie.js" />
                    <script src="https://www.amcharts.com/lib/3/themes/light.js" />
                    {/* <script defer src="/static/fontawesome/light.min.js" /> */}
                    {/* <script defer src="/static/fontawesome/regular.min.js" /> */}
                    <script defer src="/static/fontawesome/solid.min.js" />
                    <script defer src="/static/fontawesome/fontawesome.min.js" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

export default MyDocument
