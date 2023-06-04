//유저 연결, 파일 watcher 코드

"use strict";
const net = require('net');
const fs = require('fs');
const filename = process.argv[2];
const server = net.createServer((connection) => { //net.createServer() 함수는 콜백 함수를 파라미터로 가지고, server 객체 반환
    // 클라이언트가 연결될 때마다 실행되는 부분
    //connection 변수는 데이터를 주거나 받을 때 사용할 수 있는 Socket 객체
    
    // reporting
    console.log("User Connected...");
    connection.write(`Now watching '${filename}' for changes\n`);
    // connection.write() 를 통해 클라이언트의 콘솔에 변화를 보고한다.

    // watcher setup
    let watcher = fs.watch(filename, () => { //파일에 대한 감시를 시작하고, watcher 변수에 대입한다. 파일 변경시 콜백함수 작동
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
server.listen(5432, () => {
    console.log("Listening for Users...")
}); //5432 포트 바인드