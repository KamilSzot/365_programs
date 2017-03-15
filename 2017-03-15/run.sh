#!/bin/bash -e
PIDS[0]=0

r () {    
    eval $1 &
    PIDS[$i]=$!
    i=$i+1
} 


r '( cd server; tsc -w )'
r 'nodemon dist/server/server.js'
r 'node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --open'

trap "kill ${PIDS[*]}" SIGINT

wait