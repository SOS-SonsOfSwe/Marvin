import ethPrice from 'eth-price'
import "regenerator-runtime/runtime"; // needed for async calls

export async function getEurFromEth() {
  return (await ethPrice('EUR'))[0].slice(5)
}