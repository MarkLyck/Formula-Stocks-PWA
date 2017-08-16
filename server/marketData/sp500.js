const https = require('https')
const { marketIds } = require('../constants')
const { mutateMarket } = require('./model')

const updateSP500 = () => {
    const options = {
        host: 'www.quandl.com',
        path: '/api/v3/datasets/MULTPL/SP500_REAL_PRICE_MONTH.json?api_key=zP2W-4snDLyygfZVpw2v&start_date=1970-01-01',
    }

    https.get(options, (res) => {
        let str = ''
        let json = {}

        res.on('data', (chunk) => { str += chunk })

        res.on('end', () => {
            json = JSON.parse(str)
            mutateMarket(marketIds.SP500, json.dataset.data)
        })
    })
}

updateSP500()
