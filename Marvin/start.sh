trap 'kill $(jobs -p)' EXIT

./startBlockchain.sh &
sleep 10
./databasing_LoadProject.sh && fg

