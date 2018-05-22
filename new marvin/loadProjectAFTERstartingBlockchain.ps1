Remove-Item -path build\contracts\ -recurse

truffle compile
truffle migrate
npm run start