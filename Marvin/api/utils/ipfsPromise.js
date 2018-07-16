// import IPFS from 'ipfs-mini'
import "regenerator-runtime/runtime"; // needed for async calls
import bs58 from 'bs58'
import ipfsapi from 'ipfs-api'
import promiseTimeout from './timeout'
import { browserHistory } from 'react-router'

var instance = null

export default class ipfsPromise {
  constructor() {
    if(!instance) {
      instance = this
      // Using Infura node

      // this.ipfs = new IPFS({
      //   host: "ipfs.infura.io",
      //   port: '5001',
      //   protocol: 'https'
      // })

      /* 
       * Using local node - if you choose this you have to run "ipfs daemon" before. 
       * You also need to loosen your IPFS node's CORS restrictions, changing config file in your .ipfs directory
       * and setting "Access-Control-Allow-Origin": ["*"] both in "Gateway" and "API"):
       */
      // this.ipfs = new IPFS({
      //   host: "127.0.0.1",
      //   port: '5001',
      //   protocol: 'http'
      // })

      // Using AWS Server Instance
      // this.ipfs = new IPFS({
      //   host: "54.93.231.212", // IPv4 Public IP of the AWS Server Instance
      //   port: '5001'
      // })
      this.ipfsapi = new ipfsapi({
        host: "54.93.231.212", // IPv4 Public IP of the AWS Server Instance
        port: '5001'
      })
    } else {
      this.ipfs = instance.ipfs
      this.ipfsapi = instance.ipfsapi
    }
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

  // pushJSON(jsonPARAM) {
  //   var ipfs = this.ipfs
  //   return new Promise(function (resolve, reject) {
  //     ipfs.addJSON(jsonPARAM, function (err, data) {
  //       // setTimeout(() => {
  //       //   return reject("no ipfs network allowed")
  //       // }, 5)
  //       if(err !== null) return reject(err);
  //       return resolve(data);
  //     })
  //   })
  // }

  async pushJSON(jsonPARAM) {
    return new Promise(async (resolve, reject) => {
      var buf = Buffer.from(JSON.stringify(jsonPARAM));
      try {
        var hash = await promiseTimeout(20000, this.ipfsapi.add(buf))
        if(hash) return resolve(hash[0].hash)
      } catch(error) {
        console.error(error)
        alert('It seems that IPFS has some problems... \nCheck your network firewall or try again later.')
        browserHistory.push('/')
        return reject(error)
      }
    })
  }

  // getJSON(hashIpfsPARAM) {
  //   var ipfs = this.ipfs
  //   return new Promise(function (resolve, reject) {
  //     ipfs.catJSON(hashIpfsPARAM, function (err, data) {
  //       if(err !== null) return reject(err);
  //       return resolve(data);
  //     })
  //   })
  // }

  async getJSON(hashIpfsPARAM) {
    return new Promise(async (resolve, reject) => {
      try {
        var buffer = await promiseTimeout(10000, this.ipfsapi.cat(hashIpfsPARAM))
        var json = JSON.parse(buffer.toString())
        if(json !== null)
          return resolve(json)
      } catch(error) {
        console.error(error)
        alert('It seems that IPFS has some problems... \nCheck your network firewall or try again later.')
        browserHistory.push('/')
        return reject(error)
      }
    })
  }

  //   return this.ipfsapi.cat(hashIpfsPARAM)
  //     .then(buffer => {
  //       return JSON.parse(buffer.toString());
  //     })
  //     .catch(err => console.error(err))
  // }

  // pushFile(files) {
  //   var ipfs = this.ipfs
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(files)
  //   reader.onloadend = function () {
  //     const buf = buffer.Buffer(reader.result) // Convert data into buffer
  //     ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
  //       if(err) {
  //         console.error(err)
  //         return
  //       }
  //     })
  //   }
  // }

  // async getFile(hash) {
  //   return new Promise(async (resolve, reject) => {
  //     try {

  //       var buffer = await promiseTimeout(40000, this.ipfsapi.cat(hash))
  //       if(buffer) { // check better!
  //         // .then((buffer) => {
  //         var blob = new Blob([buffer], { type: "image/jpg" })
  //         console.log(blob)
  //         var urlCreator = window.URL || window.webkitURL;
  //         var imageUrl = urlCreator.createObjectURL(blob);
  //         var img = new Image();
  //         console.log(img)
  //         console.log(imageUrl)
  //         img.src = imageUrl;
  //         console.log(JSON.stringify(img))
  //         return resolve(img)
  //       }
  //     } catch(error) {
  //       console.error(error)
  //       alert('It seems that IPFS has some problems... \nCheck your network firewall or try again later.')
  //       browserHistory.push('/')
  //       return reject(error)
  //     }
  //     // })
  //   })
  // }

  pushFile(buffer) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await promiseTimeout(50000, this.ipfsapi.add(buffer))
        if(response) // console.log(response[0].hash)
          return resolve(response[0].hash)
      } catch(error) {
        console.error(error)
        alert('It seems that IPFS has some problems... \nCheck your network firewall or try again later.')
        browserHistory.push('/')
        return reject(error)
      }
    })
  }

  // console.log(reader)
  // const reader = new FileReader();
  // reader.readAsArrayBuffer(files); // Read Provided File
  // reader.onloadend = function () {
  // console.log(reader)

  // let url = `https://ipfs.io/ipfs/${result[0].hash}`
  // console.log(`Url --> ${url}`)
  // document.getElementById("url").innerHTML= url
  // document.getElementById("url").href= url
  // document.getElementById("output").src = url
  // })
  // })
  // const photo = document.getElementById("photo");
  // }
}