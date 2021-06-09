const EventEmitter = require('events')
const CoinMarketCap = require('coinmarketcap-api')

const wait = (timeout = 1000) => new Promise((resolve) => setTimeout(resolve, timeout))

module.exports = class CoinMagnet extends EventEmitter {
  constructor(apiKey, checkInterval = 10000) {
    super()
    this.coinmarketcap = new CoinMarketCap(apiKey)
    this.checkInterval = checkInterval
    process.on('SIGTERM', () => this.stop())
  }

  start() {
    this.running = true
    this.keepChecking()
    return this
  }

  stop() {
    this.running = false
    return this
  }

  async keepChecking() {
    let lastIdMap
    do {
      try {
        const idMap = await this.coinmarketcap.getIdMap()
        if (lastIdMap && lastIdMap.data.length < idMap.data.length) {
          this.emit('hooked', idMap.data[idMap.data.length - 1])
        }
        lastIdMap = idMap
        await wait(this.checkInterval)
      } catch (err) {
        this.emit('error', err)
      }
    } while (this.running)
  }
}
