const fs = require('fs');
const stream = fs.createReadStream(process.argv[2]);

//pipe() 호출 대신 이벤트 리스닝을 통한 write
stream.on('data', (chunk) => {
    process.stdout.write(chunk);
})

stream.on('error', (err) => {
    process.stderr.write("ERROR: " + err.message + "\n");
})