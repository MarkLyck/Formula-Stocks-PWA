import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion/server'
import { flush } from 'emotion'
import { getContext, setContext } from 'lib/materialStyles'

const dev = process.env.NODE_ENV !== 'production'

class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        // Reset the context for handling a new request.
        setContext()
        if (dev) { flush() }
        const page = renderPage()
        const styles = extractCritical(page.html)
        // Get the context with the collected side effects.
        const context = getContext()
        return {
            ...page,
            ...styles,
            //eslint-disable-next-line
            styles: <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />
        }
        // return { ...page, ...styles }
    }

    constructor(props) {
        super(props)
        const { __NEXT_DATA__, ids } = props
        if (ids) {
            __NEXT_DATA__.ids = this.props.ids
        }
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
                    />
                    <meta name="theme-color" content="#27A5F9" />
                    <link rel="manifest" href="static/manifest.json" />
                    <title>Formula Stocks</title>
                    { //eslint-disable-next-line
                    } <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />

                    <script src="https://www.amcharts.com/lib/3/amcharts.js" />
                    <script src="https://www.amcharts.com/lib/3/serial.js" />
                    <script src="https://www.amcharts.com/lib/3/pie.js" />
                    <script src="https://www.amcharts.com/lib/3/themes/light.js" />
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
