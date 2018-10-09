rm -rf build\contracts\
truffle compile
truffle migrate
cd scripts
truffle console --network development << EOF
	exec ./fillblockchain.js
EOF
$SHELL
