'use strict';
const zmq = require('zeromq');
const filename = process.argv[2];

const request = zmq.socket('req');

request.on('message', (data) => { //response를 수신할 이벤트 리스너
    let response = JSON.parse(data);
    console.log('Received response: ' + response);
});
request.connect('tcp://localhost:5433');
console.log('Sending request for ' + filename);
request.send(JSON.stringify({
    path: filename
}))