const { updateMarket } = require('./model')

const marketUrls = {
    SP500: '/api/v3/datasets/MULTPL/SP500_REAL_PRICE_MONTH.json?api_key=zP2W-4snDLyygfZVpw2v&start_date=1970-01-01',
    DJIA: '/api/v3/datasets/EOD/DIA.json?api_key=YjZ14NUXoyAGAPRDomS5&trim_start=1970-01-01&collapse=monthly&column_index=4',
}

updateMarket(marketUrls.SP500, 'SP500')
updateMarket(marketUrls.DJIA, 'DJIA')
