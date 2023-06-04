'use strict';
const zmq = require('zeromq');
const fs = require('fs');

const response = zmq.socket('rep'); //응답을 위한 소켓 연결

response.on('message', (data) => { //request에 대한 응답
    let request = JSON.parse(data);
    console.log('Received request - ' + request.path);

    fs.readFile(request.path, (error, content) => { //파일을 비동기로 읽는다
        console.log('Sending response content');
        response.send(JSON.stringify({ //응답을 보내기
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

response.bind('tcp://127.0.0.1:5433', (error) => {
    console.log('Listening for zmq request..');
})

process.on('SIGINT', () => { //SIGINT : 중단 신호 (Ctrl+C와 동일)
    console.log('Shutting down...');
    response.close();
})