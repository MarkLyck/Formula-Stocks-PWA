const https = require('https')
const { marketIds } = require('../constants')
const { mutateMarket } = require('./model')

const updateSP500 = () => {
    const options = {
        host: 'www.quandl.com',
        path: '/api/v3/datasets/EOD/DIA.json?api_key=YjZ14NUXoyAGAPRDomS5&trim_start=1970-01-01&collapse=monthly&column_index=4',
    }

    https.get(options, (res) => {
        let str = ''
        let json = {}

        res.on('data', (chunk) => { str += chunk })

        res.on('end', () => {
            json = JSON.parse(str)
            mutateMarket(marketIds.DJIA, json.dataset.data)
        })
    })
}

updateSP500()
