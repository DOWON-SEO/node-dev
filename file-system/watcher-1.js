const fs = require("fs");

fs.watch('./target.txt', () => { // watch 함수 - 첫 번째 인자 파일의 변화를 감지하면 콜백함수 호출
    console.log("file 'target.txt' has changed");
})
console.log("Now watching target.txt for changes");