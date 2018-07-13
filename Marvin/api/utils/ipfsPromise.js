import IPFS from 'ipfs-mini'
import bs58 from 'bs58'

export default class ipfsPromise {
  constructor() {
    // Using Infura node

    // this.callback = new IPFS({
    //   host: "ipfs.infura.io",
    //   port: '5001',
    //   protocol: 'https'
    // })

    /* 
     * Using local node - if you choose this you have to run "ipfs daemon" before. 
     * You also need to loosen your IPFS node's CORS restrictions, changing config file in your .ipfs directory
     * and setting "Access-Control-Allow-Origin": ["*"] both in "Gateway" and "API"):
     *
     * this.callback = new IPFS({
     * host: "127.0.0.1",
     * port: '5001',
     * protocol: 'http'
     * })
     */

    // Using AWS Server Instance
    this.callback = new IPFS({
      host: "54.93.231.212", // IPv4 Public IP of the AWS Server Instance
      port: '5001'
    })
  }

  // Return bytes32 hex string from base58 encoded ipfs hash,
  // stripping leading 2 bytes from 34 byte IPFS hash
  // Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
  // E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
  // "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"

  static getBytes32FromIpfsHash(ipfsListing) {
    return "0x" + bs58.decode(ipfsListing)
      .slice(2)
      .toString('hex')
  }

  // Return base58 encoded ipfs hash from bytes32 hex string,
  // E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  // --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"

  static getIpfsHashFromBytes32(bytes32Hex) {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }

  pushJSON(jsonPARAM) {
    var ipfs = this.callback
    return new Promise(function (resolve, reject) {
      ipfs.addJSON(jsonPARAM, function (err, data) {
        // setTimeout(() => {
        //   return reject("no ipfs network allowed")
        // }, 5)
        if(err !== null) return reject(err);
        resolve(data);
      })
    })
  }

  getJSON(hashIpfsPARAM) {
    var ipfs = this.callback
    return new Promise(function (resolve, reject) {
      ipfs.catJSON(hashIpfsPARAM, function (err, data) {
        if(err !== null) return reject(err);
        resolve(data);
      })
    })
  }
}