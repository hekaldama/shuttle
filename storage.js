"use strict";

var mechanism = require('node-persist');
mechanism.init({
    dir: 'storage',
});

var data = {
    ltm: '10.10.10.2',
    pool: 'foobar_pool',
}
mechanism.setItem('name', data)

function get(appId) {
    return mechanism.getItem(appId);
};

module.exports =  {
    get: get,
};
