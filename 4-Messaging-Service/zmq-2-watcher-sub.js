// 클라이언트

"use strict";
const zmq = require('zeromq');

const subscriber = zmq.socket('sub');

subscriber.subscribe(""); //특정한 메세지를 받기 위한 필터 (공백 - 모든 메세지)

subscriber.on("message", (data) => { //EventEmitter를 상속하는 subscriber 객체
    let message = JSON.parse(data);
    let date = new Date(message.timestamp);
    console.log(`File '${message.file}' changed at ${date}`);
})

subscriber.connect("tcp://localhost:5432");
//zmq를 사용할 경우, 서버사이드의 연결이 끊겨도 종료되지 않고 대기상태에서, 재연결을 기다린다.