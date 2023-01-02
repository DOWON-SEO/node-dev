const fs = require("fs");

fs.watch('./target.txt', () => {
    console.log("file 'target.txt' has changed");
})
console.log("Now watching target.txt for changes");