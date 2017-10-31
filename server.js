const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// load the market data
require('./server/marketData')

app.prepare().then(() => {
    const server = express()

    // use dashboard/articles/article.js a  s /dashboard/articles/:title
    server.get('/dashboard/articles/:title', (req, res) => app.render(req, res,
        '/dashboard/articles/article',
        // eslint-disable-next-line
        Object.assign({ title: req.params.title }, req.query)
    ))

    // redirect from /post to /blog or /post?id to /blog/:id
    server.get('/dashboard/articles/article', (req, res) => {
        if (req.query.title) return res.redirect('/dashboard/articles')
        return res.redirect(301, `/articles/${req.query.id}`)
    })

    // handle each other url
    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
