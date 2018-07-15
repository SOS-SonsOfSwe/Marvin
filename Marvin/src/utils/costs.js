import ethPrice from 'eth-price'

export async function getEurFromEth(ether) {
  ethPrice('EUR')
    .then(ethInEur => {
      ethInEur = parseFloat(ethInEur[0]
        .slice(5))
      return(ethInEur * ether)
    })
}