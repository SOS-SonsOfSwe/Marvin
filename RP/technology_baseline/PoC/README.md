# PoC-Marvin

Proof of concept of the Marvin project developed by the Sons of Swe team for Red Babel.

## Getting Started

In few steps you will be able to test our product:

### Prerequisites

You will need to install:

```
Git
```
```
npm
```

And to clone the repository hosted at:
```
https://github.com/SOS-SonsOfSwe/Marvin-PoC
```

If you're using Windows you also have to digit from a shell
```
npm install --global --production windows-build-tools
```
to install Python and other utilities that are necessary to make the demo works.

Then the `Metamask` plugin for Firefox or Chrome is required.

### Installing

Use `npm` to install other required programs typing the following commands:

Installing the local blockchain generator:
```
npm install -g ganache-cli
```

Installing the Truffle package:
```
npm install -g truffle
```


### Deployment

Go inside the repository folder (in case you aren't already there).
First of all you have to set the Metamask RPC to the local one that will be offered by Ganache:
```
http://localhost:9545
```

We have prepared some scripts to make the project simpler to load:

This will start the local blockchain hosted in `http://localhost:9545` with the mnemonic key offered by Ganache:
```
startBlockchain.ps1
```

This will compile, migrate and then load the entire project:
```
loadProject.ps1
```


## Authors

* Sons of Swe team
