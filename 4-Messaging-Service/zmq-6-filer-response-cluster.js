//다중 프로세스 처리를 위한 클러스터링 예제
//Master와 Worker의 구조

//작동하지 않는다

'use strict';
const cluster = require('cluster');
const zmq = require('zeromq');
const ipc = 'tcp://127.0.0.1:5444'



if (cluster.isMaster) { //Master 클러스터이면 fork() 함수 이용하여 프로세스 10개 복제
    const router = zmq.socket('router')
    const dealer = zmq.socket('dealer')
    
    router.bind('tcp://127.0.0.1:5433',(error) => { //router 생성
        console.log(error);
    });
    dealer.bind(ipc, (error) => { //dealer 생성
        console.log(error);
    });

    router.on('message', () => {
        // console.log(data.toString());
        // const a = JSON.parse(data);
        // console.log(a);
        let frames = Array.prototype.slice.call(arguments);
        console.log("hi");
        dealer.send(frames); //dealer에 메시지 보내기
    })
    dealer.on('message', () => {
        let frames = Array.prototype.slice.call(arguments);
        console.log("deal");
        router.send(frames); //router에 메시지 보내기
    })

    cluster.on('online', (worker) => { //하나의 Worker가 online 상태가 되었을 때 알림
        console.log(`Worker ${worker.process.pid} is online`);
    })
    for(let i = 0; i < 5; i++) {
        cluster.fork();
    }
}
else { //그렇지 않으면(Worker이면), 이하 작업 내용 수행
    let response = zmq.socket('rep')
    response.connect(ipc); // 특정 주소(dealer)에 연결

    console.log(process.pid);

    response.on('message', (data) => {
        console.log(data);
        let request = JSON.parse(data);
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