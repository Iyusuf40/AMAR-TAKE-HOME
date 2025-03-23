import assert from 'assert';
import qoutesGenerator, { isValidSymbol } from '../quotes/service';

describe('QoutesGenerator', () => {

  it('should return a price for a valid symbol', () => {
    const symbol = 'AAPL';
    const price = qoutesGenerator.getPiceForSymbol(symbol);
    assert.strictEqual(typeof price, 'number');
    assert(!Number.isNaN(price));
  });

  it('should return a price for a valid symbol regardless of case', () => {
    const symbol = 'aapl';
    const price = qoutesGenerator.getPiceForSymbol(symbol);
    assert.strictEqual(typeof price, 'number');
    assert(!Number.isNaN(price));
  });

  it('should update prices over time', (done) => {
    const initialPrices = { ...qoutesGenerator.financialSymbolsToPriceMap };
    setTimeout(() => {
      const updatedPrices = qoutesGenerator.financialSymbolsToPriceMap;
      let pricesChanged = false;
      Object.keys(initialPrices).forEach((symbol) => {
        if (initialPrices[symbol] !== updatedPrices[symbol]) {
          pricesChanged = true;
        }
      });
      assert.strictEqual(pricesChanged, true, "Prices should have changed");
      done();
    }, 1500); // Wait for more than the update interval
  }).timeout(2000);

  it('should throw an error for an invalid symbol', () => {
    const symbol = 'INVALID';
    assert.throws(() => {
      qoutesGenerator.getPiceForSymbol(symbol);
    }, Error);
  });

});

describe('isValidSymbol', () => {
  it('should return true for a valid symbol', () => {
    assert.strictEqual(isValidSymbol('AAPL'), true);
    assert.strictEqual(isValidSymbol('GOOGL'), true);
    assert.strictEqual(isValidSymbol('BTCUSD'), true);
  });

  it('should return true for a valid symbol regardless of case', () => {
    assert.strictEqual(isValidSymbol('aapl'), true);
    assert.strictEqual(isValidSymbol('googl'), true);
    assert.strictEqual(isValidSymbol('btcusd'), true);
  });

  it('should return false for an invalid symbol', () => {
    assert.strictEqual(isValidSymbol('INVALID'), false);
    assert.strictEqual(isValidSymbol('TSLA'), false);
    assert.strictEqual(isValidSymbol(''), false);
  });
});
