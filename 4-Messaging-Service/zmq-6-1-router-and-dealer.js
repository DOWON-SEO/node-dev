'use strict';
const cluster = require('cluster');
const zmq = require('zeromq');
const fs = require('fs');
const socket1 = 'tcp://127.0.0.1:5433';
const socket2 = 'tcp://127.0.0.1:5444';

function master() {
    const router = zmq.socket('router');
    const dealer = zmq.socket('dealer');

    router.bind(socket1);
    dealer.bind(socket2);

    router.on('message', (...frames) => dealer.send(frames));
    dealer.on('message', (...frames) => router.send(frames));

    cluster.on('online', (worker) => {
        console.log(worker.process.pid + ": online");
    })
}

function worker() {
    const response = zmq.socket('rep');
    response.connect(socket2);
    response.on('message', (data) => {
        const request = JSON.parse(data);
        console.log(`${process.pid} received request for: ${request.path}`);
        
        fs.readFile(request.path, (error, data) => {
            console.log(`${process.pid} sending response`);
            response.send(JSON.stringify({ //dealer에 메시지 보내기
                pid: process.pid,
                data: data.toString(),
                timestamp: Date.now()
            }))
        })
    })
}

if (cluster.isMaster) {
    master();
    for(let i = 0; i < 10; i++) {
        cluster.fork();
    }
    
}
else {
    worker();
}