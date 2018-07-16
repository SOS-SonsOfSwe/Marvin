import ethPrice from 'eth-price'
import "regenerator-runtime/runtime"; // needed for async calls

export async function getEurFromEth() {
  return (await ethPrice('EUR'))[0].slice(5)
}

export function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}