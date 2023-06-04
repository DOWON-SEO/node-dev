export const second = () => {
    function log() {
        console.log("log - second")
    }
    console.log("log-second")
    return log;
}