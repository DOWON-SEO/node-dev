const zmq = require('zeromq');
const pusher = zmq.socket('push');

for(let i = 0; i < 100; i++) {
    pusher.send(JSON.stringify({
        details: "details about this job",
    }));
}