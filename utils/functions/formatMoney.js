export function convertCurrency(currency) {
  return Math.floor(currency / 1000) + '.000';
}

export function convertCurrencyDiscount(oldPrice, discount) {
  if (discount) {
    return Math.floor(oldPrice * (100 - discount) / 100000) + '.000';
  } else {
    return Math.floor(oldPrice / 1000) + '.000';
  }
}
