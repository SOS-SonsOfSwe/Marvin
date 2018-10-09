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
Then, install all packages that are required for development:
```
npm i
```


### Deployment

Go inside the repository folder (in case you aren't already there).
First of all you have to set the Metamask RPC to the local one that will be offered by Ganache:
```
http://localhost:9545
```
Remember to login it with the phrase offered by ganache-cli:
```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

We have prepared some scripts to make the project simpler to load:
An all-in-one solution for loading the project from Ubuntu and Mac:
```
startOnLinux.sh
```
and on Windows:
```
startOnWindows.ps1
```
In case you want to test the product with some out-of-the-box informations, instead load:
```
startOnLinuxAndDatabasing.sh
```

Other scripts follows:
To start the local blockchain hosted in `http://localhost:9545`
```
startBlockchain.sh
```

To compile, migrate and then load the entire project:
```
loadProjectAFTERstartingBlockchain.sh
```

To only fill the blockchain without compiling the project:
`databasing_(no_npm_run_start)`

To fill the blockchain on loaded project:
`databasing_(onlyFillblockchain)`

To fill the blockchain and load the project (after starting the blockchain):
`loadProjectAFTERstartingBlockchain.sh`


Then some commands:
To compile and start the project:
`npm run start`

To make a build of the project:
`npm run build`

To test some truffle contract:
`npm run test`


## Authors

* Sons of Swe team
