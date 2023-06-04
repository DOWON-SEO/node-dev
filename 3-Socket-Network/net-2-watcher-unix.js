//1번과 동일하지만, unix 소켓을 이용한 연결
//네트워크 하드웨어를 거치지 않아 더 빠르다, 다만 당연하게도 시스템 내부에서만 작동함

"use strict";
const net = require('net');
const fs = require('fs');
const filename = process.argv[2];
const server = net.createServer((connection) => {
    
    // reporting
    console.log("User Connected...");
    connection.write(`Now watching '${filename}' for changes\n`);

    // watcher setup
    let watcher = fs.watch(filename, () => {
        console.log("oh dude, file has been changed");
        connection.write(`File '${filename}' changed: ${Date.now()} \n`)
    })

    // cleanup
    connection.on('close', () => {
        console.log("User Disconnected");
        watcher.close();
    })
});

if(!filename) {
    throw Error ('No target filename was specified.');
}
server.listen('/tmp/watcher.sock', () => {
    console.log("Listening for Users...");
}); // 이전과 동일하지만, unix 소켓 사용


// nc -U /tmp/watcher.sock