'use strict';
const zmq = require('zeromq');
const filename = process.argv[2];
const socket1 = 'tcp://127.0.0.1:5433';

const request = zmq.socket('req');

request.on('message', (data) => {
    const response = JSON.parse(data);
    console.log(response);
})

request.connect(socket1);

for (let i = 0; i < 5; i++) {
    console.log('Sending request for ' + filename);
    request.send(JSON.stringify({
        path: filename
    }))
}