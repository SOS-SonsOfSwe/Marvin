import ethPrice from 'eth-price'

export function getEurFromEth(ether) {
  var ethInEur = ethPrice('EUR')
  ethInEur = parseFloat(ethInEur[0]
    .slice(5))
  return(ethInEur * ether)
}