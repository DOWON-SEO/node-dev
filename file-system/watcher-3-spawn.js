//파일이 변경될 때, 자식 프로세스를 생성하도록 하기 (child-process 모듈 사용)
//Stream 사용
const fs = require('fs');
const filename = process.argv[2];
const spawn = require('child_process').spawn
//child_process란 - 부피가 큰 연산을 node가 실행되는 컴퓨터의 OS 혹은 커널에서 실행하게 도와준다

process.argv.forEach(element => {
    console.log(element);

    // 첫번째 파라미터 - node의 경로 /opt/homebrew/Cellar/node/19.3.0/bin/node
    // 두번째 파라미터 - 실행한 js파일의 경로 /Users/dowonseo/Code/node-beginner/file-system/watcher-argv.js
    // 세번째 파라미터 - target.txt
})

if (!filename) {
    throw Error("Error - A file to watch must be specified!");
}

fs.watch(filename, () => {
    let ls = spawn('ls', ['-l', filename]); // PC의 터미널에서 ls -l [filename] 실행
    ls.stdout.pipe(process.stdout);
    spawn('echo', ["this is everything"]).stdout.pipe(process.stdout);
    //stdin - 부모 프로세스로부터 자식 프로세스에게 데이터 보냄
    //stdout - 자식 프로세스가 데이터 출력
    //stderr - 명령에서 발생한 에러 출력
});
console.log("NOW WATCHING " + filename + " for changes");