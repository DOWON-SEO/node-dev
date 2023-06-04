"use strict";
const net = require('net');
const ldj = require('./net-6-ldj');

const netClient = net.connect({port: 5432});
const ldjClient = ldj.connect(netClient);

ldjClient.on('message', (message) => {
    // console.log("-" + message.type);
    if(message.type === 'watching') console.log("Now Watching : " + message.file);
    else if(message.type === 'changed') console.log(`File ${message.file} changed at ${new Date(message.timestamp)}`);
    else throw new Error("Unrecognized message type: " + message.type);
})