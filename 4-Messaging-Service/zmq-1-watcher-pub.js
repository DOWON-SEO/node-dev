"use strict";
const fs = require("fs");
const zmq = require("zeromq"); //zmq 사용


const publisher = zmq.socket('pub'); //엔드포인트 생성
const filename = process.argv[2];

fs.watch(filename, () => { // 이전과 다르게, watch() 함수를 단 한번만 호출한다
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }))
})

publisher.bind('tcp://*:5432', (error) => {
    console.log('Listening for zmq subscribers...');
})