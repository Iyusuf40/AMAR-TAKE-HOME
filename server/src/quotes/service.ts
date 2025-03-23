const VALID_SYMBOLS = ['AAPL', 'GOOGL', 'BTCUSD']

class QoutesGenerator {
  financialSymbolsToPriceMap: Record<string, number>
  priceUpdateIntervalMilliseconds: number

  constructor(
    financialSymbolsToPriceMap: Record<string, number> = {
      AAPL: 218,
      GOOGL: 164,
      BTCUSD: 84154
    },
    priceUpdateIntervalMilliseconds: number = 1000
  ) {
    this.financialSymbolsToPriceMap = financialSymbolsToPriceMap
    this.priceUpdateIntervalMilliseconds = priceUpdateIntervalMilliseconds
    this.simulatePriceUpdates()
  }

  private simulatePriceUpdates() {
    setInterval(() => {
      Object.keys(this.financialSymbolsToPriceMap).forEach((symbol) => {
        const currentPrice = this.financialSymbolsToPriceMap[symbol];
        const newPrice = this.generateRandomPrice(currentPrice);
        this.financialSymbolsToPriceMap[symbol] = newPrice;
      });
    }, this.priceUpdateIntervalMilliseconds);
  }

  private generateRandomPrice(basePrice: number): number {
    const fivePercent = 0.05
    // offset is basically a number between -0.5 to 0.5 both bounds inclusive, excluding 0
    const offset = (Math.random() - 0.5) || 0.5
    const fluctuation = basePrice * offset * fivePercent; // ±2.5% fluctuation
    return parseFloat((basePrice + fluctuation).toFixed(2));
  }

  getPiceForSymbol(symbol: string): number {
    if (!isValidSymbol(symbol)) {
      throw new Error('Invalid symbol, please use one of the following: ' + VALID_SYMBOLS.join(', '))
    }
    return this.financialSymbolsToPriceMap[symbol.toUpperCase()]
  }
}

const qoutesGenerator = new QoutesGenerator()

export default qoutesGenerator;
export { VALID_SYMBOLS }
export function isValidSymbol(symbol: string): boolean {
  return VALID_SYMBOLS.includes(symbol.toUpperCase())
}

