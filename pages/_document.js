import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion/server'
import { flush } from 'emotion'

const dev = process.env.NODE_ENV !== 'production'

// eslint-disable react/no-danger
class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        if (dev) { flush() }
        const page = renderPage()
        const styles = extractCritical(page.html)
        return { ...page, ...styles }
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
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
                    />
                    <meta name="theme-color" content="#673ab7" />
                    <link rel="manifest" href="static/manifest.json" />
                    <title>Formula Stocks</title>
                    { //eslint-disable-next-line
                    } <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
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
