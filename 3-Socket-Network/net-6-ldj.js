const events = require('events');
const util = require('util');

function LDJClient(stream) { //생성자 함수 (stream - 이벤트 발생시키는 객체)
    events.EventEmitter.call(this);
    let self = this;
    let buffer = '';
    stream.on('data', (data) => {
        buffer += data;
        console.log(buffer);
        let boundary = buffer.indexOf('\n'); // indexOf - 특정 문자열의 위치 구하기
        while (boundary !== -1) {
            let input = buffer.substr(0, boundary); // 0번째부터 boundary까지 문자열 잘라 붙이기
            buffer = buffer.substr(boundary + 1); //boundary 이후 문자열 불러오기
            self.emit('message', JSON.parse(input)); // emit() 이벤트 발생시키기
            boundary = buffer.indexOf('\n'); // boundary값 재설정
        }
    })
};

//LDJClient는 events.EventEmiiter를 상속하게 됨 (Node.js의 클래스 상속 방법)
//on 메소드 붙여 이벤트 리스닝이 가능해짐
util.inherits(LDJClient, events.EventEmitter);

exports.LDJClient = LDJClient;
exports.connect = (stream) => {
    return new LDJClient(stream);
}
// const client = new LDJClient(networkStream);
// client.on('message')