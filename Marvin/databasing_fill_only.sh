cd scripts
truffle console --network development << EOF
	exec ./fillblockchain.js
EOF
cd ..
npm run start
$SHELL
