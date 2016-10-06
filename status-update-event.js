"use strict";

var storage = require('./storage');
var f5 = require('./f5');
var dns = require('dns');

function mergeF5Data(data, storageData) {
    var host = data.host;
    var port = data.ports[0];

    dns.resolve4(host, function (err, addresses) {
        if (err) throw err;
        var f5Data = {
            address: addresses[0],
            port: port,
        };
        storageData.f5 = f5Data;
    });
}

function statusUpdateEvent(data) {
    storage.get(data.appId)
        .then(function (value) {
            mergeF5Data(data, value);
            return value;
        }).then(function (value) {
            f5(value);
            console.log(value);
        });
}

module.exports = (data) => {
    statusUpdateEvent(data);
}
