const { createServer } = require('http')
const path = require('path')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()
require('./server/marketData')

const PORT = process.env.PORT || 3000

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        if (req.url === '/sw.js') {
            app.serveStatic(req, res, path.resolve('./.next/sw.js'))
            // if pathname matches /articles/* load articles/article...
        } else if (pathname.indexOf('dashboard/articles/') > -1) {
            query.title = pathname.split('/')[pathname.split('/').length - 1]
            app.render(req, res, '/dashboard/articles/article', query)
        } else if (pathname.indexOf('/articles/') > -1) {
            query.title = pathname.split('/')[pathname.split('/').length - 1]
            app.render(req, res, '/articles/article', query)
        } else {
            handle(req, res)
        }
    })

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})
