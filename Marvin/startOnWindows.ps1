Start-Process powershell "ganache-cli -a 15 -m 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat' -p 9545"
timeout 10
Remove-Item -path build\contracts\ -recurse
truffle compile
truffle migrate
npm run start
