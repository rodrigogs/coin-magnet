const CoinMarketCap = require('coinmarketcap-api')

const wait = (timeout = 1000) => new Promise((resolve) => setTimeout(resolve, timeout))

describe('detect-new-coin', () => {
  it('should detect a new(mocked) coin', async () => {
    const CoinMagnet = require('.')
    const magnet = new CoinMagnet('api-key')

    let coin
    magnet.on('hooked', (hookedCoin) => coin = hookedCoin)
    magnet.on('error', (err) => console.error(err))

    jest.spyOn(CoinMarketCap.prototype, 'getIdMap').mockImplementationOnce(() => ({
      "data": [
        {
          "id": 1,
          "rank": 1,
          "name": "Bitcoin",
          "symbol": "BTC",
          "slug": "bitcoin",
          "is_active": 1,
          "first_historical_data": "2013-04-28T18:47:21.000Z",
          "last_historical_data": "2020-05-05T20:44:01.000Z",
          "platform": null
        },
      ],
        "status": {
        "timestamp": "2018-06-02T22:51:28.209Z",
          "error_code": 0,
          "error_message": "",
          "elapsed": 10,
          "credit_count": 1
      }
    }))

    magnet.start()

    setTimeout(() => {
      jest.spyOn(CoinMarketCap.prototype, 'getIdMap').mockImplementationOnce(() => ({
        "data": [
          {
            "id": 1,
            "rank": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "is_active": 1,
            "first_historical_data": "2013-04-28T18:47:21.000Z",
            "last_historical_data": "2020-05-05T20:44:01.000Z",
            "platform": null
          },
          {
            "id": 2,
            "rank": 2,
            "name": "Zezinhocoin",
            "symbol": "ZCN",
            "slug": "zezinhocoin",
            "is_active": 1,
            "first_historical_data": "2013-04-28T18:47:21.000Z",
            "last_historical_data": "2020-05-05T20:44:01.000Z",
            "platform": null
          },
        ],
        "status": {
          "timestamp": "2018-06-02T22:51:28.209Z",
          "error_code": 0,
          "error_message": "",
          "elapsed": 10,
          "credit_count": 1
        }
      }))
    }, 9000)

    await wait(15000)

    expect(coin).toEqual({
      "id": 2,
      "rank": 2,
      "name": "Zezinhocoin",
      "symbol": "ZCN",
      "slug": "zezinhocoin",
      "is_active": 1,
      "first_historical_data": "2013-04-28T18:47:21.000Z",
      "last_historical_data": "2020-05-05T20:44:01.000Z",
      "platform": null
    })
  }, 20000)
})
