# coin-magnet

Magnetic fishing for crypto coins.

### Create a CoinMarketCap API key
https://pro.coinmarketcap.com/signup/?plan=0

## Usage
```js
const CoinMagnet = require('coin-magnet')

const magnet = new CoinMagnet('my-coinmarketcap-api-key', 15000)

magnet.on('hooked', (hookedCoin) => {
  // You just found a new coin!
  // Now it's time to do something cool with this information and send it to Telegram for instance. 
})
```
