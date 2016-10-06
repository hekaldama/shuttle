"use strict";

var EventSource = require('eventsource');
var es = new EventSource(process.env.MARATHON_HOST);

var sue = require('./status-update-event');

es.addEventListener('status_update_event', function (e) {
    sue(JSON.parse(e.data));
});
