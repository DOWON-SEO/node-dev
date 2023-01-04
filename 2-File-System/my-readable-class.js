const {Readable} = require("stream");

class OneToNine extends Readable { // Readable 클래스의 확장 클래스 OneToNine 정의
    i = 1;
    _read(size) { //_read 재정의 
        if(this.i === 10) {
            this.push("hey");
            this.push(null); //push - 데이터를 읽으려는 이에게 데이터 넘겨줌 (null 리턴시 멈춤)
            return;
        }
        this.push(this.i.toString());
        this.i += 1;
    }
}
const oneToNine = new OneToNine();
oneToNine.pipe(process.stdout);
//(무언가를 읽어와야 하는) Writeable 스트림인 process.stdout은
//(읽을 수 있는) Readable 객체 OneToNine에 대해 값 요청 (pipe로 연결되어 있음)
//push로 값 넘겨주는데, Stream이라서 쭉 연결됨
//null 값을 push해주고 종료


//console.log와 process.stdout의 차이는?
//console.log는 근본적으로 process.stdout.write()를 이용해 동작한다.
//가장 큰 특징은 개행 문자가 추가되었다는 사실

// Console.prototype.log = function() {
//     this._stdout.write(util.format.apply(this, arguments) + '\n');
// };