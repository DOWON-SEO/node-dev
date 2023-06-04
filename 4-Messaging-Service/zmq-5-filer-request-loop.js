'use strict';
const zmq = require('zeromq');
const filename = process.argv[2];

const request = zmq.socket('req');

request.on('message', (data) => { //response를 수신할 이벤트 리스너
    let response = JSON.parse(data);
    console.log('Received response: ' + response.content);
    console.log('Received response: ' + response.timestamp);
    console.log('Received response: ' + response.pid);
});
request.connect('tcp://127.0.0.1:5433');

for(let i = 0; i < 3; i++) {
    console.log('Sending request for ' + filename);
    request.send(JSON.stringify({
        path: filename
    }))
}